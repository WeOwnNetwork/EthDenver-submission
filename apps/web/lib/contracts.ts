// ═══════════════════════════════════════════════════════
// CONTRACT CLIENT — @ccc-gateway/web
//
// Typed viem clients for all 10 packages/adi contracts.
// Server-side only (uses private key).
// ═══════════════════════════════════════════════════════

import { createAdiClients, type AdiContractAddresses } from "@repo/adi";

// ── Contract Addresses (from deployment env vars) ──

export type ContractAddresses = AdiContractAddresses;

// ── Client Class ──

class ContractClients {
    private addresses: ContractAddresses;

    public identity: ReturnType<typeof createAdiClients>["contracts"]["identity"];
    public reputation: ReturnType<typeof createAdiClients>["contracts"]["reputation"];
    public validation: ReturnType<typeof createAdiClients>["contracts"]["validation"];
    public sharedKernel: ReturnType<typeof createAdiClients>["contracts"]["sharedKernel"];
    public seasonRegistry: ReturnType<typeof createAdiClients>["contracts"]["season"];
    public isc: ReturnType<typeof createAdiClients>["contracts"]["isc"];
    public vsa: ReturnType<typeof createAdiClients>["contracts"]["vsa"];
    public document: ReturnType<typeof createAdiClients>["contracts"]["document"];
    public cccId: ReturnType<typeof createAdiClients>["contracts"]["cccId"];
    public cccToken: ReturnType<typeof createAdiClients>["contracts"]["cccToken"];

    constructor() {
        const rpcUrl = process.env.ADI_RPC_URL || "https://rpc.ab.testnet.adifoundation.ai";
        const privateKey = process.env.ADI_PRIVATE_KEY || process.env.PRIVATE_KEY || "";

        this.addresses = {
            identity: process.env.CONTRACT_IDENTITY || "",
            reputation: process.env.CONTRACT_REPUTATION || "",
            validation: process.env.CONTRACT_VALIDATION || "",
            sharedKernel: process.env.CONTRACT_SHARED_KERNEL || "",
            season: process.env.CONTRACT_SEASON || "",
            isc: process.env.CONTRACT_ISC || "",
            vsa: process.env.CONTRACT_VSA || "",
            document: process.env.CONTRACT_DOCUMENT || "",
            cccId: process.env.CONTRACT_CCC_ID || "",
            cccToken: process.env.CONTRACT_CCC_TOKEN || "",
        };

        const { contracts } = createAdiClients({
            rpcUrl,
            privateKey: privateKey || undefined,
            addresses: this.addresses,
        });

        this.identity = contracts.identity;
        this.reputation = contracts.reputation;
        this.validation = contracts.validation;
        this.sharedKernel = contracts.sharedKernel;
        this.seasonRegistry = contracts.season;
        this.isc = contracts.isc;
        this.vsa = contracts.vsa;
        this.document = contracts.document;
        this.cccId = contracts.cccId;
        this.cccToken = contracts.cccToken;
    }

    /** Fetch aggregate onchain stats from all contracts */
    async getOnchainStats() {
        const [totalAgents, totalCCCIds, totalVSAs, skVersion, currentSeason] =
            await Promise.all([
                this.identity.read?.totalAgents?.().catch(() => 0n) ?? Promise.resolve(0n),
                this.cccId.read?.totalMinted?.().catch(() => 0n) ?? Promise.resolve(0n),
                this.vsa.read?.totalVSAs?.().catch(() => 0n) ?? Promise.resolve(0n),
                this.sharedKernel.read?.currentVersion?.().catch(() => "unknown") ?? Promise.resolve("unknown"),
                this.seasonRegistry.read?.currentSeason?.().catch(() => 0n) ?? Promise.resolve(0n),
            ]);

        return {
            totalAgents: Number(totalAgents),
            totalCCCIds: Number(totalCCCIds),
            totalVSAs: Number(totalVSAs),
            sharedKernelVersion: skVersion,
            currentSeason: Number(currentSeason),
        };
    }

    /** Safely execute a transaction, returning data or error */
    async txSafe<T>(fn: () => Promise<T>): Promise<{ data?: T; error?: string }> {
        try {
            const result = await fn();
            return { data: result };
        } catch (err: unknown) {
            return { error: err instanceof Error ? err.message : String(err) };
        }
    }
}

// Singleton (avoid multiple instances in dev)
const g = globalThis as unknown as { __contracts?: ContractClients };
export const contracts = g.__contracts ?? new ContractClients();
if (process.env.NODE_ENV !== "production") g.__contracts = contracts;
