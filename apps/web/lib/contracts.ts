// ═══════════════════════════════════════════════════════
// CONTRACT CLIENT — @ccc-gateway/web
//
// Typed ethers.js clients for all 10 packages/adi contracts.
// Server-side only (uses private key).
// ═══════════════════════════════════════════════════════

import { ethers } from "ethers";

// ── Minimal ABIs (human-readable) ──

const IDENTITY_ABI = [
    "function register(string ccc, string tokenURI) external returns (uint256)",
    "function agentURI(uint256 agentId) external view returns (string)",
    "function agentIdByCCC(string ccc) external view returns (uint256)",
    "function isRegistered(string ccc) external view returns (bool)",
    "function totalAgents() external view returns (uint256)",
    "event AgentRegistered(uint256 indexed agentId, address indexed owner, string ccc, string tokenURI)",
];

const REPUTATION_ABI = [
    "function giveFeedback(uint256 toAgentId, int256 value, string feedbackType, string refCccId, string metadataURI) external",
    "function feedbackCount(uint256 agentId) external view returns (uint256)",
    "function aggregateScore(uint256 agentId) external view returns (int256 total, uint256 positive, uint256 negative)",
];

const VALIDATION_ABI = [
    "function requestValidation(string subject, string validationType, uint256 checksTotal, string metadataURI) external returns (uint256)",
    "function respondValidation(uint256 requestId, bool result, uint256 checksPassed, string metadataURI) external",
];

const SHARED_KERNEL_ABI = [
    "function proposeRule(string id, string description, uint8 category, uint8 itemType, string proposedBy) external",
    "function lockRule(string id, string approvalCccId, string lockedBy, uint256 season) external",
    "function getRule(string id) external view returns (tuple(string,string,uint8,uint8,uint8,string,string,uint256,uint256,bool))",
    "function isLocked(string id) external view returns (bool)",
    "function totalRules() external view returns (uint256)",
    "function currentVersion() external view returns (string)",
];

const SEASON_ABI = [
    "function currentSeason() external view returns (uint256)",
    "function getSeason(uint256 seasonId) external view returns (tuple(uint256,string,uint8,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,string,bool))",
    "function updateSeasonStats(uint256 cccIds, uint256 vsas, uint256 agents, uint256 rulesLocked) external",
];

const ISC_ABI = [
    "function submitISC(string instanceId, uint256 season, string certifierCcc, bool[8] checkResults, string[8] checkNotes, string attestationCccId, string metadataURI) external returns (uint256)",
    "function isInstanceCertified(string instanceId, uint256 season) external view returns (bool)",
];

const VSA_ABI = [
    "function submitVSA(string subjectDocument, string subjectVersion, string verifierCcc, string instanceId, uint8 vsaType, bool result, uint256 checksTotal, uint256 checksPassed, string masterCccId, string approvalCccId, string metadataURI, string hcsTxId, uint256 season) external returns (uint256)",
    "function getPassRate() external view returns (uint256 passed, uint256 total)",
    "function totalVSAs() external view returns (uint256)",
];

const DOCUMENT_ABI = [
    "function publishVersion(string name, string version, string masterCccId, string approvalCccId, string githubUrl, uint256 season) external",
    "function getCurrentVersion(string name) external view returns (tuple(string,string,string,string,string,uint256,uint256))",
];

const CCCID_ABI = [
    "function mintCCCId(string cccId, string contributor, uint16 year, uint8 week, uint16 sequence, string instance, uint256 reward, string hcsTxId, uint256 season) external",
    "function getHighWaterMark(string contributor, uint16 year, uint8 week) external view returns (uint16)",
    "function totalMinted() external view returns (uint256)",
    "function getContributorTotal(string contributor) external view returns (uint256)",
];

const CCC_TOKEN_ABI = [
    "function mint(address to, uint256 amount) external",
    "function balanceOf(address account) external view returns (uint256)",
    "function totalSupply() external view returns (uint256)",
];

// ── Contract Addresses (from deployment env vars) ──

export interface ContractAddresses {
    identity: string;
    reputation: string;
    validation: string;
    sharedKernel: string;
    season: string;
    isc: string;
    vsa: string;
    document: string;
    cccId: string;
    cccToken: string;
}

// ── Client Class ──

class ContractClients {
    private provider: ethers.JsonRpcProvider;
    private signer: ethers.Wallet;
    private addresses: ContractAddresses;

    public identity: ethers.Contract;
    public reputation: ethers.Contract;
    public validation: ethers.Contract;
    public sharedKernel: ethers.Contract;
    public seasonRegistry: ethers.Contract;
    public isc: ethers.Contract;
    public vsa: ethers.Contract;
    public document: ethers.Contract;
    public cccId: ethers.Contract;
    public cccToken: ethers.Contract;

    constructor() {
        const rpcUrl = process.env.ADI_RPC_URL || "https://rpc.ab.testnet.adifoundation.ai";
        const privateKey = process.env.ADI_PRIVATE_KEY || process.env.PRIVATE_KEY || "";

        this.provider = new ethers.JsonRpcProvider(rpcUrl);
        this.signer = new ethers.Wallet(privateKey, this.provider);

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

        this.identity = new ethers.Contract(this.addresses.identity, IDENTITY_ABI, this.signer);
        this.reputation = new ethers.Contract(this.addresses.reputation, REPUTATION_ABI, this.signer);
        this.validation = new ethers.Contract(this.addresses.validation, VALIDATION_ABI, this.signer);
        this.sharedKernel = new ethers.Contract(this.addresses.sharedKernel, SHARED_KERNEL_ABI, this.signer);
        this.seasonRegistry = new ethers.Contract(this.addresses.season, SEASON_ABI, this.signer);
        this.isc = new ethers.Contract(this.addresses.isc, ISC_ABI, this.signer);
        this.vsa = new ethers.Contract(this.addresses.vsa, VSA_ABI, this.signer);
        this.document = new ethers.Contract(this.addresses.document, DOCUMENT_ABI, this.signer);
        this.cccId = new ethers.Contract(this.addresses.cccId, CCCID_ABI, this.signer);
        this.cccToken = new ethers.Contract(this.addresses.cccToken, CCC_TOKEN_ABI, this.signer);
    }

    /** Fetch aggregate onchain stats from all contracts */
    async getOnchainStats() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const call = (c: ethers.Contract, fn: string) => (c as any)[fn]().catch(() => 0n);

        const [totalAgents, totalCCCIds, totalVSAs, skVersion, currentSeason] =
            await Promise.all([
                call(this.identity, "totalAgents"),
                call(this.cccId, "totalMinted"),
                call(this.vsa, "totalVSAs"),
                (this.sharedKernel as any).currentVersion().catch(() => "unknown"),
                call(this.seasonRegistry, "currentSeason"),
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
