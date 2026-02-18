// ═══════════════════════════════════════════════════════
// TOKEN TYPES — @ccc-gateway/hedera
// ═══════════════════════════════════════════════════════

export interface TokenCreateResult {
    tokenId: string;
    transactionId: string;
}

export interface TokenMintResult {
    serial?: number;
    transactionId: string;
    amount?: number;
}

export interface CCCIdNFTMetadata {
    ccc_id: string;
    contributor: string;
    year: number;
    week: number;
    sequence: number;
    instance: string;
    workspace: string;
    timestamp: string;
    hcs_topic_id?: string;
    hcs_sequence?: number;
}

export interface AgentIdMetadata {
    ccc: string;
    agent_id: string;
    contributor: string;
    role: string;
    tier: "founding_og" | "contributor" | "tool_agent";
    home_instance: string;
    season_joined: string;
    registered_at: string;
}

export enum RewardTier {
    WEEKLY_SUMMARY = 50,
    WEEKLY_PLAN = 25,
    WEEKLY_REFLECTION = 25,
    STANDARD = 10,
    RULE_LOCKED = 10,
    BP_LOCKED = 5,
    LEARNING_LOGGED = 2,
    DEFINITION_ADDED = 3,
}

export function getRewardForSequence(sequence: number): RewardTier {
    switch (sequence) {
        case 1: return RewardTier.WEEKLY_SUMMARY;
        case 2: return RewardTier.WEEKLY_PLAN;
        case 3: return RewardTier.WEEKLY_REFLECTION;
        default: return RewardTier.STANDARD;
    }
}
