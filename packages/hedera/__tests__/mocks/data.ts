// ═══════════════════════════════════════════════════════
// MOCK DATA — CCC Gateway Test Fixtures
//
// Mirrors real #FedArch data structures for testing.
// Based on production SharedKernel v3.1.2.1
// ═══════════════════════════════════════════════════════

import { HCSTopicType } from "../../src/topic-types";

// ── Contributors ──

export const MOCK_CONTRIBUTORS = {
    LDC: {
        ccc: "LDC",
        agentId: "AI:@LDC",
        contributor: "Dhruv",
        role: "Agentic AI Engineer / Project Lead",
        tier: "contributor",
        homeInstance: "INT-P01",
        seasonJoined: "#WeOwnSeason002",
        hederaAccountId: "0.0.10001",
        baseAddress: "0x1111111111111111111111111111111111111111",
    },
    LFG: {
        ccc: "LFG",
        agentId: "AI:@LFG",
        contributor: "CoachLFG",
        role: "Co-Host / Coach",
        tier: "founding_og",
        homeInstance: "INT-OG9",
        seasonJoined: "#WeOwnSeason001",
        hederaAccountId: "0.0.10002",
        baseAddress: "0x2222222222222222222222222222222222222222",
    },
    RMN: {
        ccc: "RMN",
        agentId: "AI:@RMN",
        contributor: "Roman",
        role: "AI Platform Engineer",
        tier: "founding_og",
        homeInstance: "INT-OG8",
        seasonJoined: "#WeOwnSeason001",
        hederaAccountId: "0.0.10003",
        baseAddress: "0x3333333333333333333333333333333333333333",
    },
    GTM: {
        ccc: "GTM",
        agentId: "AI:@GTM",
        contributor: "yonks",
        role: "Co-Founder / Chief Digital Alchemist",
        tier: "founding_og",
        homeInstance: "INT-OG1",
        seasonJoined: "#WeOwnSeason001",
        hederaAccountId: "0.0.10004",
        baseAddress: "0x4444444444444444444444444444444444444444",
    },
} as const;

// ── CCC-IDs ──

export const MOCK_CCC_IDS = {
    standard: {
        ccc_id: "LDC_2026-W07_015",
        contributor: "LDC",
        year: 2026,
        week: 7,
        sequence: 15,
        instance: "INT-E01",
        workspace: "CCC",
        reward_amount: 10,
    },
    weeklySummary: {
        ccc_id: "LDC_2026-W07_001",
        contributor: "LDC",
        year: 2026,
        week: 7,
        sequence: 1,
        instance: "INT-E01",
        workspace: "CCC",
        reward_amount: 50,
    },
    weeklyPlan: {
        ccc_id: "LDC_2026-W07_002",
        contributor: "LDC",
        year: 2026,
        week: 7,
        sequence: 2,
        instance: "INT-E01",
        workspace: "CCC",
        reward_amount: 25,
    },
    weeklyReflection: {
        ccc_id: "LDC_2026-W07_003",
        contributor: "LDC",
        year: 2026,
        week: 7,
        sequence: 3,
        instance: "INT-E01",
        workspace: "CCC",
        reward_amount: 25,
    },
    firstAssignable: {
        ccc_id: "LDC_2026-W07_004",
        contributor: "LDC",
        year: 2026,
        week: 7,
        sequence: 4,
        instance: "INT-E01",
        workspace: "CCC",
        reward_amount: 10,
    },
    highSequence: {
        ccc_id: "GTM_2026-W07_306",
        contributor: "GTM",
        year: 2026,
        week: 7,
        sequence: 306,
        instance: "INT-OG1",
        workspace: "CCC",
        reward_amount: 10,
    },
};

// ── Context Volleys ──

export const MOCK_VOLLEYS = {
    seekMeta: {
        volley_id: "cv-001-uuid",
        from: "AI:@LDC",
        to: "AI:@GTM",
        volley_type: "SEEK",
        ref_ccc_id: "LDC_2026-W07_015",
        content_hash: "abc123def456",
    },
    ack: {
        volley_id: "cv-002-uuid",
        from: "AI:@GTM",
        to: "AI:@LDC",
        volley_type: "ACK",
        ref_ccc_id: "LDC_2026-W07_015",
        content_hash: "789ghi012jkl",
    },
};

// ── Governance ──

export const MOCK_GOVERNANCE = {
    ruleLock: {
        action: "RULE_LOCKED" as const,
        rule_id: "R-214",
        description: "Event instance decommission (2 weeks post-event)",
        approval_ccc_id: "GTM_2026-W07_222",
        locked_by: "AI:@GTM",
    },
    badAgent: {
        action: "BAD_AGENT_FLAGGED" as const,
        target_ccc: "TST",
        reason: "Duplicate CCC-ID across instances",
        severity: "FREEZE" as const,
    },
    seasonStart: {
        action: "SEASON_STARTED" as const,
        description: "#WeOwnSeason003 started W06",
    },
};

// ── VSA ──

export const MOCK_VSA = {
    passed: {
        vsa_id: "vsa-001",
        subject_document: "SharedKernel",
        subject_version: "v3.1.2.1",
        verifier: "AI:@GTM",
        result: "PASSED" as const,
        checks_total: 130,
        checks_passed: 130,
        master_ccc_id: "GTM_2026-W07_119",
        approval_ccc_id: "GTM_2026-W07_122",
    },
    failed: {
        vsa_id: "vsa-002",
        subject_document: "PRJ-008_DRAFT",
        subject_version: "v0.1.0",
        verifier: "AI:@GTM",
        result: "FAILED" as const,
        checks_total: 24,
        checks_passed: 1,
        master_ccc_id: "GTM_2026-W07_050",
        approval_ccc_id: "",
    },
};

// ── Topics ──

export const MOCK_TOPICS = {
    [HCSTopicType.CCC_ID]: "0.0.90001",
    [HCSTopicType.CONTEXT_VOLLEY]: "0.0.90002",
    [HCSTopicType.GOVERNANCE]: "0.0.90003",
    [HCSTopicType.VSA]: "0.0.90004",
    [HCSTopicType.AGENT_REGISTRY]: "0.0.90005",
    [HCSTopicType.SEASON]: "0.0.90006",
};

// ── Token IDs ──

export const MOCK_TOKEN_IDS = {
    CCC_TOKEN: "0.0.80001",
    CCCID_NFT: "0.0.80002",
    AGENT_ID_NFT: "0.0.80003",
    COOP_MEMBER_NFT: "0.0.80004",
    GOV_TOKEN: "0.0.80005",
};

// ── Invalid Data (for negative tests) ──

export const MOCK_INVALID = {
    badCCC: "TOOLONG",
    lowercaseCCC: "ldc",
    invalidWeek: 54,
    invalidSequence: 1000,
    adminUsername: "a-gtm_dev",
    wrongWorkspace: "tools",
    duplicateCCCId: "LDC_2026-W07_015",
};
