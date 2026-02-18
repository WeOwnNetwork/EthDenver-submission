import { describe, it, expect } from "vitest";
import { createCCCToken, mintCCCReward } from "../src/tokens/ccc-token";
import { createCCCIdNFTCollection, mintCCCIdNFT } from "../src/tokens/ccc-id-nft";
import { createAgentIdCollection, mintAgentId } from "../src/tokens/agent-identity-nft";
import { createCoopMembershipCollection } from "../src/tokens/coop-membership";
import { createGovToken, mintGovReward } from "../src/tokens/governance-token";
import { freezeBadAgent, pauseForSeasonTransition } from "../src/tokens/enforcement";
import { getRewardForSequence, RewardTier } from "../src/tokens/types";
import { MOCK_CCC_IDS, MOCK_CONTRIBUTORS, MOCK_TOKEN_IDS } from "./mocks/data";

describe("Token Creation", () => {
    describe("$CCC Token", () => {
        it("should create $CCC fungible token", async () => {
            const result = await createCCCToken();
            expect(result.tokenId).toBe("0.0.88888");
            expect(result.transactionId).toContain("0.0.12345");
        });

        it("should mint $CCC reward for standard CCC-ID", async () => {
            const result = await mintCCCReward("0.0.88888", "LDC_2026-W07_015", 15);
            expect(result.transactionId).toBeDefined();
            expect(result.amount).toBe(10);
        });

        it("should mint 50 $CCC for #WeeklySummary (_001)", async () => {
            const result = await mintCCCReward("0.0.88888", "LDC_2026-W07_001", 1);
            expect(result.amount).toBe(50);
        });

        it("should mint 25 $CCC for #WeeklyPlan (_002)", async () => {
            const result = await mintCCCReward("0.0.88888", "LDC_2026-W07_002", 2);
            expect(result.amount).toBe(25);
        });

        it("should mint 25 $CCC for #WeeklyReflection (_003)", async () => {
            const result = await mintCCCReward("0.0.88888", "LDC_2026-W07_003", 3);
            expect(result.amount).toBe(25);
        });
    });

    describe("CCC-ID NFT", () => {
        it("should create CCC-ID NFT collection", async () => {
            const result = await createCCCIdNFTCollection();
            expect(result.tokenId).toBe("0.0.88888");
        });

        it("should mint CCC-ID NFT with metadata", async () => {
            const result = await mintCCCIdNFT("0.0.88888", {
                ccc_id: MOCK_CCC_IDS.standard.ccc_id,
                contributor: MOCK_CCC_IDS.standard.contributor,
                year: MOCK_CCC_IDS.standard.year,
                week: MOCK_CCC_IDS.standard.week,
                sequence: MOCK_CCC_IDS.standard.sequence,
                instance: MOCK_CCC_IDS.standard.instance,
                workspace: MOCK_CCC_IDS.standard.workspace,
                timestamp: new Date().toISOString(),
            });
            expect(result.serial).toBe(1);
            expect(result.transactionId).toBeDefined();
        });
    });

    describe("Agent Identity NFT", () => {
        it("should create Agent ID collection (max 999)", async () => {
            const result = await createAgentIdCollection();
            expect(result.tokenId).toBe("0.0.88888");
        });

        it("should mint Agent ID for @LDC", async () => {
            const result = await mintAgentId("0.0.88888", {
                ccc: MOCK_CONTRIBUTORS.LDC.ccc,
                agent_id: MOCK_CONTRIBUTORS.LDC.agentId,
                contributor: MOCK_CONTRIBUTORS.LDC.contributor,
                role: MOCK_CONTRIBUTORS.LDC.role,
                tier: MOCK_CONTRIBUTORS.LDC.tier as any,
                home_instance: MOCK_CONTRIBUTORS.LDC.homeInstance,
                season_joined: MOCK_CONTRIBUTORS.LDC.seasonJoined,
                registered_at: new Date().toISOString(),
            });
            expect(result.serial).toBe(1);
        });
    });

    describe("Cooperative Membership", () => {
        it("should create KYC-gated membership collection", async () => {
            const result = await createCoopMembershipCollection();
            expect(result.tokenId).toBe("0.0.88888");
        });
    });

    describe("GOV Token", () => {
        it("should create GOV governance token", async () => {
            const result = await createGovToken();
            expect(result.tokenId).toBe("0.0.88888");
        });

        it("should mint 10 GOV for rule lock", async () => {
            const result = await mintGovReward("0.0.88888", 10);
            expect(result.amount).toBe(10);
        });
    });

    describe("Enforcement", () => {
        it("should freeze #BadAgent", async () => {
            const txId = await freezeBadAgent(
                "0.0.88888",
                "0.0.99999",
                "Duplicate CCC-ID"
            );
            expect(txId).toContain("0.0.12345");
        });

        it("should pause token for season transition", async () => {
            const txId = await pauseForSeasonTransition("0.0.88888");
            expect(txId).toContain("0.0.12345");
        });
    });

    describe("Reward Tiers", () => {
        it("should return correct reward for each sequence", () => {
            expect(getRewardForSequence(1)).toBe(RewardTier.WEEKLY_SUMMARY);
            expect(getRewardForSequence(2)).toBe(RewardTier.WEEKLY_PLAN);
            expect(getRewardForSequence(3)).toBe(RewardTier.WEEKLY_REFLECTION);
            expect(getRewardForSequence(4)).toBe(RewardTier.STANDARD);
            expect(getRewardForSequence(100)).toBe(RewardTier.STANDARD);
            expect(getRewardForSequence(999)).toBe(RewardTier.STANDARD);
        });
    });
});
