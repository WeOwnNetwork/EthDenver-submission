import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AdiClients } from "@repo/adi";
import { env } from "../../env";

export interface IndexedOnchainEvent {
    id: string;
    txHash: string;
    blockNumber: number;
    logIndex: number;
    contract: string;
    topic0?: string;
    timestamp: string;
    summary: string;
    source: "onchain";
}

interface IndexState {
    lastIndexedBlock: number;
    lastSyncedAt: string;
    events: IndexedOnchainEvent[];
}

const MAX_EVENTS = 5000;
const DEFAULT_SYNC_INTERVAL_MS = 15_000;

export class OnchainIndexer {
    private clients?: AdiClients;
    private state: IndexState = {
        lastIndexedBlock: 0,
        lastSyncedAt: new Date(0).toISOString(),
        events: [],
    };
    private syncing = false;
    private readonly storagePath: string;
    private readonly contractAddresses: string[];

    constructor(clients?: AdiClients) {
        this.clients = clients;
        this.storagePath = env.ADI_INDEX_STORAGE_PATH || path.join(process.cwd(), ".data", "adl-onchain-index.json");
        this.contractAddresses = this.collectAddresses();
    }

    private collectAddresses(): string[] {
        if (!this.clients) return [];
        const c = this.clients.contracts;
        const addresses = [
            c.identity.address,
            c.reputation.address,
            c.validation.address,
            c.sharedKernel.address,
            c.season.address,
            c.isc.address,
            c.badAgent.address,
            c.vsa.address,
            c.document.address,
            c.cccId.address,
            c.cccToken.address,
        ]
            .map((v) => String(v || "").toLowerCase())
            .filter((v) => v && v !== "0x0000000000000000000000000000000000000000");

        return Array.from(new Set(addresses));
    }

    public async init(): Promise<void> {
        await this.loadState();
        await this.syncIfStale();
    }

    public getSnapshot() {
        return {
            lastIndexedBlock: this.state.lastIndexedBlock,
            lastSyncedAt: this.state.lastSyncedAt,
            indexedEvents: this.state.events.length,
        };
    }

    public getRecentEvents(count = 50): IndexedOnchainEvent[] {
        return this.state.events.slice(-Math.max(1, count)).reverse();
    }

    public async syncIfStale(): Promise<void> {
        const last = new Date(this.state.lastSyncedAt).getTime();
        if (Date.now() - last < DEFAULT_SYNC_INTERVAL_MS) return;
        await this.sync();
    }

    public async sync(): Promise<void> {
        if (!this.clients || this.contractAddresses.length === 0 || this.syncing) return;
        this.syncing = true;
        try {
            const publicClient = this.clients.publicClient;
            const latest = Number(await publicClient.getBlockNumber());

            let from = this.state.lastIndexedBlock > 0
                ? this.state.lastIndexedBlock + 1
                : this.initialStartBlock(latest);

            if (from > latest) {
                this.state.lastSyncedAt = new Date().toISOString();
                await this.persistState();
                return;
            }

            const blockTimestampCache = new Map<number, string>();
            const existingIds = new Set(this.state.events.map((e) => e.id));
            const nextEvents: IndexedOnchainEvent[] = [];

            const CHUNK = 500;
            for (let start = from; start <= latest; start += CHUNK) {
                const end = Math.min(start + CHUNK - 1, latest);
                const logs = await publicClient.getLogs({
                    address: this.contractAddresses as `0x${string}`[],
                    fromBlock: BigInt(start),
                    toBlock: BigInt(end),
                });

                for (const log of logs) {
                    const blockNumber = Number(log.blockNumber || 0n);
                    const logIndex = Number(log.logIndex || 0);
                    const txHash = String(log.transactionHash || "");
                    const id = `${txHash}:${logIndex}`;
                    if (!txHash || existingIds.has(id)) continue;

                    if (!blockTimestampCache.has(blockNumber)) {
                        const block = await publicClient.getBlock({ blockNumber: BigInt(blockNumber) });
                        blockTimestampCache.set(blockNumber, new Date(Number(block.timestamp) * 1000).toISOString());
                    }

                    const timestamp = blockTimestampCache.get(blockNumber) || new Date().toISOString();
                    const contract = String(log.address || "").toLowerCase();
                    const topic0 = log.topics?.[0];
                    const summary = `Onchain log @ ${contract.slice(0, 10)}… #${blockNumber}`;

                    nextEvents.push({
                        id,
                        txHash,
                        blockNumber,
                        logIndex,
                        contract,
                        topic0,
                        timestamp,
                        summary,
                        source: "onchain",
                    });
                    existingIds.add(id);
                }
            }

            if (nextEvents.length > 0) {
                this.state.events = [...this.state.events, ...nextEvents]
                    .sort((a, b) => (a.blockNumber - b.blockNumber) || (a.logIndex - b.logIndex))
                    .slice(-MAX_EVENTS);
            }

            this.state.lastIndexedBlock = latest;
            this.state.lastSyncedAt = new Date().toISOString();
            await this.persistState();
        } catch (error) {
            console.error("Onchain index sync failed:", error);
        } finally {
            this.syncing = false;
        }
    }

    public async getOnchainStats() {
        await this.syncIfStale();
        if (!this.clients) {
            return {
                totalAgents: 0,
                totalCCCIds: 0,
                totalVSAs: 0,
                sharedKernelVersion: "unknown",
                currentSeason: 0,
                totalRules: 0,
                totalIncidents: 0,
            };
        }

        const c = this.clients.contracts;
        const [
            totalAgents,
            totalCCCIds,
            totalVSAs,
            sharedKernelVersion,
            currentSeason,
            totalRules,
            totalIncidents,
        ] = await Promise.all([
            c.identity.read?.totalAgents?.().catch(() => 0n) ?? Promise.resolve(0n),
            c.cccId.read?.totalMinted?.().catch(() => 0n) ?? Promise.resolve(0n),
            c.vsa.read?.totalVSAs?.().catch(() => 0n) ?? Promise.resolve(0n),
            c.sharedKernel.read?.currentVersion?.().catch(() => "unknown") ?? Promise.resolve("unknown"),
            c.season.read?.currentSeason?.().catch(() => 0n) ?? Promise.resolve(0n),
            c.sharedKernel.read?.totalRules?.().catch(() => 0n) ?? Promise.resolve(0n),
            c.badAgent.read?.totalIncidents?.().catch(() => 0n) ?? Promise.resolve(0n),
        ]);

        return {
            totalAgents: Number(totalAgents),
            totalCCCIds: Number(totalCCCIds),
            totalVSAs: Number(totalVSAs),
            sharedKernelVersion,
            currentSeason: Number(currentSeason),
            totalRules: Number(totalRules),
            totalIncidents: Number(totalIncidents),
        };
    }

    private initialStartBlock(latest: number): number {
        const configured = env.ADI_INDEX_START_BLOCK;
        if (configured && configured > 0) return configured;
        return Math.max(0, latest - 5_000);
    }

    private async loadState(): Promise<void> {
        try {
            const raw = await readFile(this.storagePath, "utf-8");
            const parsed = JSON.parse(raw) as IndexState;
            if (!parsed || !Array.isArray(parsed.events)) return;
            this.state = {
                lastIndexedBlock: Number(parsed.lastIndexedBlock || 0),
                lastSyncedAt: parsed.lastSyncedAt || new Date(0).toISOString(),
                events: parsed.events.slice(-MAX_EVENTS),
            };
        } catch {
            // first run or invalid file
        }
    }

    private async persistState(): Promise<void> {
        const dir = path.dirname(this.storagePath);
        await mkdir(dir, { recursive: true });
        await writeFile(this.storagePath, JSON.stringify(this.state, null, 2), "utf-8");
    }
}
