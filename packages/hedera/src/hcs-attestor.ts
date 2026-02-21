import {
    TopicCreateTransaction,
    TopicMessageSubmitTransaction,
    TopicId,
    TopicInfoQuery,
    TransactionReceipt,
    Timestamp,
} from "@hashgraph/sdk";
import { createClient, getOperatorKey, getOperatorPublicKey } from "./config";
import { waitForPropagation } from "./utils/network-check";
import { HCSTopicType } from "./topic-types";
export { HCSTopicType } from "./topic-types";

// ═══════════════════════════════════════════════════════
// HCS ATTESTOR — @ccc-gateway/hedera
//
// Hedera Consensus Service integration for CCC Gateway.
// Every CCC-ID, #ContextVolley, VSA, and governance
// action is attested as an immutable HCS message.
//
// #FedArch Rules Enforced:
//   R-168: CCC-ID tied to contributor
//   R-169: Sequence resets at ISO week boundary
//   R-194: CCC workspace attestations only
//   R-212: Cross-instance deconfliction via sequence
//
// Team weown | ETHDenver 2026
// ═══════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────
// TYPES
// ───────────────────────────────────────────────────────


/**
 * Base attestation message — all HCS messages extend this
 */
export interface HCSBaseMessage {
    version: string;                       // "1.0.0"
    type: HCSTopicType;
    gateway_instance: string;              // "INT-E01"
    season: number;                        // 3
    timestamp: string;                     // ISO 8601
}

/**
 * CCC-ID attestation — minted when CCC-ID is generated
 */
export interface HCSCCCIdAttestation extends HCSBaseMessage {
    type: HCSTopicType.CCC_ID;
    ccc_id: string;                        // "LDC_2026-W07_015"
    contributor: string;                   // "LDC"
    year: number;                          // 2026
    week: number;                          // 7
    sequence: number;                      // 15
    instance: string;                      // "INT-P01"
    workspace: string;                     // "CCC"
    reward_amount: number;                 // 10 (in $CCC)
    nft_serial?: number;                   // Hedera NFT serial if minted
    base_tx_hash?: string;                 // Base L2 tx if registered
}

/**
 * #ContextVolley attestation — agent-to-agent communication proof
 */
export interface HCSContextVolleyAttestation extends HCSBaseMessage {
    type: HCSTopicType.CONTEXT_VOLLEY;
    volley_id: string;                     // UUID
    from: string;                          // "AI:@LDC"
    to: string;                            // "AI:@RMN"
    volley_type: string;                   // "SEEK" | "ACK" | "STATUS"
    ref_ccc_id: string;                    // Reference CCC-ID
    content_hash: string;                  // SHA-256 of content (privacy)
}

/**
 * Governance attestation — rule locks, #BadAgent, season events
 */
export interface HCSGovernanceAttestation extends HCSBaseMessage {
    type: HCSTopicType.GOVERNANCE;
    action: GovernanceAction;
    rule_id?: string;                      // "R-212"
    description?: string;
    approval_ccc_id?: string;             // Human approval CCC-ID (R-011)
    locked_by?: string;                    // "AI:@LDC"
    target_ccc?: string;                   // #BadAgent target
    reason?: string;                       // #BadAgent reason
    severity?: "WARNING" | "FREEZE" | "WIPE";
}

export type GovernanceAction =
    | "RULE_LOCKED"
    | "RULE_PROPOSED"
    | "BP_LOCKED"
    | "LEARNING_LOGGED"
    | "DEFINITION_ADDED"
    | "BAD_AGENT_FLAGGED"
    | "BAD_AGENT_RESOLVED"
    | "SEASON_STARTED"
    | "SEASON_PAUSED"
    | "SEASON_ENDED";

/**
 * VSA attestation — verification proof
 */
export interface HCSVSAAttestation extends HCSBaseMessage {
    type: HCSTopicType.VSA;
    vsa_id: string;
    subject_document: string;              // "SharedKernel"
    subject_version: string;               // "v3.1.2.1"
    verifier: string;                      // "AI:@GTM"
    result: "PASSED" | "FAILED";
    checks_total: number;
    checks_passed: number;
    master_ccc_id: string;
    approval_ccc_id: string;
}

/**
 * Agent registration attestation
 */
export interface HCSAgentRegistration extends HCSBaseMessage {
    type: HCSTopicType.AGENT_REGISTRY;
    ccc: string;                           // "LDC"
    agent_id: string;                      // "AI:@LDC"
    contributor: string;                   // "Dhruv"
    role: string;                          // "Agentic AI Engineer"
    tier: string;                          // "founding_og" | "contributor"
    home_instance: string;                 // "INT-P01"
    hedera_account_id: string;
    base_address?: string;
    agent_nft_serial?: number;
}

/**
 * Result of an HCS submission
 */
export interface HCSSubmitResult {
    topicId: string;
    sequenceNumber: number;
    transactionId: string;
    timestamp: string;
    messageSize: number;
}

/**
 * Topic registry — maps topic types to topic IDs
 */
export interface TopicRegistry {
    [HCSTopicType.CCC_ID]: string;
    [HCSTopicType.CONTEXT_VOLLEY]: string;
    [HCSTopicType.GOVERNANCE]: string;
    [HCSTopicType.VSA]: string;
    [HCSTopicType.AGENT_REGISTRY]: string;
    [HCSTopicType.SEASON]: string;
}

// ───────────────────────────────────────────────────────
// HCS ATTESTOR CLASS
// ───────────────────────────────────────────────────────

export class HCSAttestor {
    private topics: Partial<TopicRegistry> = {};
    private gatewayInstance: string;
    private season: number;
    private messageCount: number = 0;

    constructor(
        gatewayInstance: string = "INT-E01",
        season: number = 3
    ) {
        this.gatewayInstance = gatewayInstance;
        this.season = season;

        // Load from env if available
        this.loadTopicsFromEnv();
    }

    // ─────────────────────────────────────────────────
    // TOPIC MANAGEMENT
    // ─────────────────────────────────────────────────

    /**
     * Create a single HCS topic
     */
    async createTopic(
        topicType: HCSTopicType,
        memo?: string
    ): Promise<string> {
        const client = createClient();
        const operatorKey = getOperatorKey();

        const defaultMemo = `CCC Gateway | ${topicType} | ${this.gatewayInstance} | #WeOwnSeason00${this.season}`;

        const tx = await new TopicCreateTransaction()
            .setTopicMemo(memo || defaultMemo)
            .setSubmitKey(operatorKey.publicKey)
            .setAdminKey(operatorKey.publicKey)
            .freezeWith(client)
            .sign(operatorKey);

        const response = await tx.execute(client);
        const receipt = await response.getReceipt(client);
        const topicId = receipt.topicId!.toString();

        this.topics[topicType] = topicId;

        console.log(`✅ HCS Topic [${topicType}]: ${topicId}`);
        await waitForPropagation(3000); // Wait 3s for mirror node sync
        client.close();

        return topicId;
    }

    /**
     * Create ALL HCS topics for the CCC Gateway
     * Run once on initial deployment
     */
    async createAllTopics(): Promise<TopicRegistry> {
        console.log("\n🚀 Creating CCC Gateway HCS Topics...\n");

        const topicTypes = Object.values(HCSTopicType);

        for (const topicType of topicTypes) {
            await this.createTopic(topicType);
        }

        console.log("\n═══════════════════════════════════════════");
        console.log("✅ All HCS Topics Created");
        console.log("═══════════════════════════════════════════");

        for (const [type, id] of Object.entries(this.topics)) {
            console.log(`  ${type}: ${id}`);
        }

        console.log("═══════════════════════════════════════════");
        console.log("\nAdd to .env.topics:");
        for (const [type, id] of Object.entries(this.topics)) {
            const envKey = `HCS_TOPIC_${type.toUpperCase().replace(/-/g, "_")}`;
            console.log(`${envKey}=${id}`);
        }

        return this.topics as TopicRegistry;
    }

    /**
     * Load topic IDs from environment variables
     */
    private loadTopicsFromEnv(): void {
        const mapping: Record<HCSTopicType, string> = {
            [HCSTopicType.CCC_ID]: "HCS_TOPIC_CCC_ID",
            [HCSTopicType.CONTEXT_VOLLEY]: "HCS_TOPIC_CONTEXT_VOLLEY",
            [HCSTopicType.GOVERNANCE]: "HCS_TOPIC_GOVERNANCE",
            [HCSTopicType.VSA]: "HCS_TOPIC_VSA",
            [HCSTopicType.AGENT_REGISTRY]: "HCS_TOPIC_AGENT_REGISTRY",
            [HCSTopicType.SEASON]: "HCS_TOPIC_SEASON",
        };

        for (const [topicType, envKey] of Object.entries(mapping)) {
            const value = process.env[envKey];
            if (value) {
                this.topics[topicType as HCSTopicType] = value;
            }
        }
    }

    /**
     * Set a specific topic ID (for manual configuration)
     */
    setTopic(topicType: HCSTopicType, topicId: string): void {
        this.topics[topicType] = topicId;
    }

    /**
     * Ensure a topic exists for the given type.
     * If not configured, it is created and cached.
     */
    async ensureTopic(topicType: HCSTopicType): Promise<string> {
        return this.ensureTopicId(topicType);
    }

    /**
     * Ensure multiple topics exist.
     */
    async ensureTopics(topicTypes: HCSTopicType[]): Promise<Partial<TopicRegistry>> {
        for (const topicType of topicTypes) {
            await this.ensureTopicId(topicType);
        }
        return this.topics;
    }

    /**
     * Get topic info from Hedera
     */
    async getTopicInfo(topicType: HCSTopicType): Promise<{
        topicId: string;
        memo: string;
        sequenceNumber: number;
    }> {
        const topicId = await this.ensureTopicId(topicType);
        const client = createClient();

        const info = await new TopicInfoQuery()
            .setTopicId(TopicId.fromString(topicId))
            .execute(client);

        client.close();

        return {
            topicId,
            memo: info.topicMemo,
            sequenceNumber: info.sequenceNumber.toNumber(),
        };
    }

    // ─────────────────────────────────────────────────
    // ATTESTATION METHODS
    // ─────────────────────────────────────────────────

    /**
     * Attest a CCC-ID generation event
     */
    async attestCCCId(
        attestation: Omit<HCSCCCIdAttestation, "version" | "type" | "gateway_instance" | "season" | "timestamp">
    ): Promise<HCSSubmitResult> {
        const message: HCSCCCIdAttestation = {
            version: "1.0.0",
            type: HCSTopicType.CCC_ID,
            gateway_instance: this.gatewayInstance,
            season: this.season,
            timestamp: new Date().toISOString(),
            ...attestation,
        };

        return this.submitMessage(HCSTopicType.CCC_ID, message);
    }

    /**
     * Attest a #ContextVolley event
     */
    async attestContextVolley(
        attestation: Omit<HCSContextVolleyAttestation, "version" | "type" | "gateway_instance" | "season" | "timestamp">
    ): Promise<HCSSubmitResult> {
        const message: HCSContextVolleyAttestation = {
            version: "1.0.0",
            type: HCSTopicType.CONTEXT_VOLLEY,
            gateway_instance: this.gatewayInstance,
            season: this.season,
            timestamp: new Date().toISOString(),
            ...attestation,
        };

        return this.submitMessage(HCSTopicType.CONTEXT_VOLLEY, message);
    }

    /**
     * Attest a governance action (rule lock, #BadAgent, etc.)
     */
    async attestGovernance(
        attestation: Omit<HCSGovernanceAttestation, "version" | "type" | "gateway_instance" | "season" | "timestamp">
    ): Promise<HCSSubmitResult> {
        const message: HCSGovernanceAttestation = {
            version: "1.0.0",
            type: HCSTopicType.GOVERNANCE,
            gateway_instance: this.gatewayInstance,
            season: this.season,
            timestamp: new Date().toISOString(),
            ...attestation,
        };

        return this.submitMessage(HCSTopicType.GOVERNANCE, message);
    }

    /**
     * Attest a VSA verification
     */
    async attestVSA(
        attestation: Omit<HCSVSAAttestation, "version" | "type" | "gateway_instance" | "season" | "timestamp">
    ): Promise<HCSSubmitResult> {
        const message: HCSVSAAttestation = {
            version: "1.0.0",
            type: HCSTopicType.VSA,
            gateway_instance: this.gatewayInstance,
            season: this.season,
            timestamp: new Date().toISOString(),
            ...attestation,
        };

        return this.submitMessage(HCSTopicType.VSA, message);
    }

    /**
     * Attest an agent registration
     */
    async attestAgentRegistration(
        attestation: Omit<HCSAgentRegistration, "version" | "type" | "gateway_instance" | "season" | "timestamp">
    ): Promise<HCSSubmitResult> {
        const message: HCSAgentRegistration = {
            version: "1.0.0",
            type: HCSTopicType.AGENT_REGISTRY,
            gateway_instance: this.gatewayInstance,
            season: this.season,
            timestamp: new Date().toISOString(),
            ...attestation,
        };

        return this.submitMessage(HCSTopicType.AGENT_REGISTRY, message);
    }

    /**
     * Attest a season lifecycle event
     */
    async attestSeasonEvent(
        action: GovernanceAction,
        details: Record<string, any>
    ): Promise<HCSSubmitResult> {
        const message: HCSGovernanceAttestation = {
            version: "1.0.0",
            type: HCSTopicType.GOVERNANCE,
            gateway_instance: this.gatewayInstance,
            season: this.season,
            timestamp: new Date().toISOString(),
            action,
            ...details,
        };

        return this.submitMessage(HCSTopicType.SEASON, message);
    }

    // ─────────────────────────────────────────────────
    // BATCH ATTESTATION
    // ─────────────────────────────────────────────────

    /**
     * Batch attest multiple CCC-IDs (e.g., weekly summary import)
     */
    async batchAttestCCCIds(
        attestations: Array<Omit<HCSCCCIdAttestation, "version" | "type" | "gateway_instance" | "season" | "timestamp">>
    ): Promise<HCSSubmitResult[]> {
        const results: HCSSubmitResult[] = [];

        for (const attestation of attestations) {
            try {
                const result = await this.attestCCCId(attestation);
                results.push(result);

                // Rate limiting — Hedera allows ~100 TPS per topic
                await this.delay(50);
            } catch (err) {
                console.error(`  ⚠️ Batch attest failed for ${attestation.ccc_id}: ${err}`);
            }
        }

        console.log(`✅ Batch attested ${results.length}/${attestations.length} CCC-IDs`);
        return results;
    }

    // ─────────────────────────────────────────────────
    // CORE SUBMIT
    // ─────────────────────────────────────────────────

    /**
     * Submit a message to an HCS topic
     */
    private async submitMessage(
        topicType: HCSTopicType,
        message: HCSBaseMessage
    ): Promise<HCSSubmitResult> {
        const topicId = await this.ensureTopicId(topicType);
        const client = createClient();
        const operatorKey = getOperatorKey();

        const messageBytes = Buffer.from(JSON.stringify(message));

        // HCS message size limit = 1024 bytes
        if (messageBytes.length > 1024) {
            // Chunk large messages — submit hash + reference
            const hash = this.sha256(messageBytes);
            const refMessage = {
                ...message,
                _chunked: true,
                _content_hash: hash,
                _content_size: messageBytes.length,
            };
            const refBytes = Buffer.from(JSON.stringify(refMessage));

            const tx = await new TopicMessageSubmitTransaction()
                .setTopicId(TopicId.fromString(topicId))
                .setMessage(refBytes)
                .freezeWith(client)
                .sign(operatorKey);

            const response = await tx.execute(client);
            const receipt = await response.getReceipt(client);

            this.messageCount++;
            client.close();

            return {
                topicId,
                sequenceNumber: receipt.topicSequenceNumber!.toNumber(),
                transactionId: response.transactionId.toString(),
                timestamp: new Date().toISOString(),
                messageSize: refBytes.length,
            };
        }

        const tx = await new TopicMessageSubmitTransaction()
            .setTopicId(TopicId.fromString(topicId))
            .setMessage(messageBytes)
            .freezeWith(client)
            .sign(operatorKey);

        const response = await tx.execute(client);
        const receipt = await response.getReceipt(client);

        this.messageCount++;
        client.close();

        const result: HCSSubmitResult = {
            topicId,
            sequenceNumber: receipt.topicSequenceNumber!.toNumber(),
            transactionId: response.transactionId.toString(),
            timestamp: new Date().toISOString(),
            messageSize: messageBytes.length,
        };

        console.log(
            `  📜 HCS [${topicType}] seq #${result.sequenceNumber} — ${result.messageSize}B`
        );

        return result;
    }

    // ─────────────────────────────────────────────────
    // UTILITIES
    // ─────────────────────────────────────────────────

    private envKeyForTopic(topicType: HCSTopicType): string {
        const mapping: Record<HCSTopicType, string> = {
            [HCSTopicType.CCC_ID]: "HCS_TOPIC_CCC_ID",
            [HCSTopicType.CONTEXT_VOLLEY]: "HCS_TOPIC_CONTEXT_VOLLEY",
            [HCSTopicType.GOVERNANCE]: "HCS_TOPIC_GOVERNANCE",
            [HCSTopicType.VSA]: "HCS_TOPIC_VSA",
            [HCSTopicType.AGENT_REGISTRY]: "HCS_TOPIC_AGENT_REGISTRY",
            [HCSTopicType.SEASON]: "HCS_TOPIC_SEASON",
        };

        return mapping[topicType];
    }

    private async ensureTopicId(topicType: HCSTopicType): Promise<string> {
        const existing = this.topics[topicType];
        if (existing) return existing;

        // Reload in case env was updated at runtime by another route/action.
        this.loadTopicsFromEnv();
        const afterReload = this.topics[topicType];
        if (afterReload) return afterReload;

        // Last fallback: auto-create missing topic to avoid failed attestations.
        const created = await this.createTopic(topicType);
        process.env[this.envKeyForTopic(topicType)] = created;
        console.warn(`⚠️ HCS topic missing for ${topicType}; auto-created ${created}`);
        return created;
    }

    private getTopicId(topicType: HCSTopicType): string {
        const topicId = this.topics[topicType];
        if (!topicId) {
            throw new Error(
                `HCS topic not configured for type: ${topicType}. ` +
                `Run createAllTopics() or set via .env`
            );
        }
        return topicId;
    }

    private sha256(data: Buffer): string {
        const crypto = require("crypto");
        return crypto.createHash("sha256").update(data).digest("hex");
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Get attestor stats
     */
    getStats(): {
        topics: Partial<TopicRegistry>;
        messageCount: number;
        instance: string;
        season: number;
    } {
        return {
            topics: this.topics,
            messageCount: this.messageCount,
            instance: this.gatewayInstance,
            season: this.season,
        };
    }
}

// ───────────────────────────────────────────────────────
// CLI — Create topics when run directly
// ───────────────────────────────────────────────────────

const isMain = process.argv[1]?.includes("hcs-attestor");
if (isMain) {
    const args = process.argv.slice(2);

    if (args.includes("--create-topic") || args.includes("--create-all")) {
        const attestor = new HCSAttestor();
        attestor
            .createAllTopics()
            .then(() => {
                console.log("\n🎉 Done. Copy topic IDs to .env.topics");
                process.exit(0);
            })
            .catch((err) => {
                console.error("❌ Failed:", err);
                process.exit(1);
            });
    } else {
        console.log(`
Usage:
  tsx src/hcs-attestor.ts --create-all    Create all 6 HCS topics
    `);
    }
}
