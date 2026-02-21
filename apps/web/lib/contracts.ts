// ═══════════════════════════════════════════════════════
// CONTRACT CLIENT — @ccc-gateway/web
//
// Typed viem clients for all 10 packages/adi contracts.
// Server-side only (uses private key).
// ═══════════════════════════════════════════════════════

import { createAdiClients, type AdiContractAddresses } from "@repo/adi";

// ── Contract Addresses (from deployment env vars) ──

export type ContractAddresses = AdiContractAddresses;

export const BASE_SEPOLIA_CONTRACTS: ContractAddresses = {
    identity: "0x8005122C7dA446D0610c73F8391bd54f588b9E53",
    reputation: "0xd0D0f817dF95bAcD5028Cb95Ae51E91e65a0F2C0",
    validation: "0x98C6cB0453e34759d7Cf7eF19c28656db1E4cf2A",
    sharedKernel: "0xD26e9EAA53a894994Bf1093a778a7967e4885713",
    season: "0x1248751972D770A272dfb67e355323453e63C6eF",
    isc: "0x956e62E019Db89FCfb3d2d7e91132CC498F08347",
    badAgent: "0xA2a9640f56b5ca0D8e743e8D88Ba4eD0b8ca51a4",
    vsa: "0x07939C49542Ae61B57B50C2BE277D933A7063BB4",
    document: "0x4F4B3E2Bd18a81f79D672fa5e467bF1d02fb24FA",
    cccId: "0x50569c44Daa4A57b9cf719204407B76006f62A07",
    cccToken: "0xe5cbD77A2896Da99808DD2B586Cbb13e70Ca6F0A",
};

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
        const selectedNetwork = process.env.NEXT_PUBLIC_EXECUTION_NETWORK || "adi";
        const isBase = selectedNetwork === "base-sepolia";

        const rpcUrl = isBase
            ? (process.env.BASE_SEPOLIA_RPC || "https://base-sepolia.drpc.org")
            : (process.env.ADI_RPC_URL || "https://rpc.ab.testnet.adifoundation.ai");
        const privateKey = process.env.ADI_PRIVATE_KEY || process.env.PRIVATE_KEY || "";

        this.addresses = isBase
            ? BASE_SEPOLIA_CONTRACTS
            : {
                identity: process.env.CONTRACT_IDENTITY || "",
                reputation: process.env.CONTRACT_REPUTATION || "",
                validation: process.env.CONTRACT_VALIDATION || "",
                sharedKernel: process.env.CONTRACT_SHARED_KERNEL || "",
                season: process.env.CONTRACT_SEASON || "",
                isc: process.env.CONTRACT_ISC || "",
                badAgent: process.env.CONTRACT_BAD_AGENT || "",
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
