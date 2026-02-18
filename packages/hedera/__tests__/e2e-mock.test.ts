
import { describe, it, expect, beforeEach } from "vitest";
import { HCSAttestor, HCSTopicType } from "../src/hcs-attestor";
import {
    MOCK_CCC_IDS,
    MOCK_VOLLEYS,
    MOCK_GOVERNANCE,
    MOCK_VSA,
    MOCK_TOPICS,
    MOCK_CONTRIBUTORS,
} from "./mocks/data";

describe("Mock E2E — Full CCC Gateway Flow", () => {
    let attestor: HCSAttestor;

    beforeEach(() => {
        attestor = new HCSAttestor("INT-E01", 3);
        Object.entries(MOCK_TOPICS).forEach(([type, id]) => {
            attestor.setTopic(type as HCSTopicType, id);
        });
    });

    it("E2E: Agent registers → generates CCC-ID → attests → volleys → governance", async () => {
        // ── Step 1: Agent Registration ──
        const regResult = await attestor.attestAgentRegistration({
            ccc: MOCK_CONTRIBUTORS.LDC.ccc,
            agent_id: MOCK_CONTRIBUTORS.LDC.agentId,
            contributor: MOCK_CONTRIBUTORS.LDC.contributor,
            role: MOCK_CONTRIBUTORS.LDC.role,
            tier: MOCK_CONTRIBUTORS.LDC.tier,
            home_instance: MOCK_CONTRIBUTORS.LDC.homeInstance,
            hedera_account_id: MOCK_CONTRIBUTORS.LDC.hederaAccountId,
            base_address: MOCK_CONTRIBUTORS.LDC.baseAddress,
        });

        expect(regResult.topicId).toBe(MOCK_TOPICS[HCSTopicType.AGENT_REGISTRY]);
        expect(regResult.sequenceNumber).toBe(42);
        console.log("  ✅ Step 1: Agent @LDC registered");

        // ── Step 2: Generate CCC-ID ──
        const cccResult = await attestor.attestCCCId(MOCK_CCC_IDS.standard);

        expect(cccResult.topicId).toBe(MOCK_TOPICS[HCSTopicType.CCC_ID]);
        console.log("  ✅ Step 2: CCC-ID LDC_2026-W07_015 attested");

        // ── Step 3: #ContextVolley to @GTM ──
        const volleyResult = await attestor.attestContextVolley(
            MOCK_VOLLEYS.seekMeta
        );

        expect(volleyResult.topicId).toBe(MOCK_TOPICS[HCSTopicType.CONTEXT_VOLLEY]);
        console.log("  ✅ Step 3: #ContextVolley AI:@LDC → AI:@GTM");

        // ── Step 4: @GTM ACKs ──
        const ackResult = await attestor.attestContextVolley(MOCK_VOLLEYS.ack);

        expect(ackResult.topicId).toBe(MOCK_TOPICS[HCSTopicType.CONTEXT_VOLLEY]);
        console.log("  ✅ Step 4: ACK AI:@GTM → AI:@LDC");

        // ── Step 5: Rule locked ──
        const govResult = await attestor.attestGovernance(
            MOCK_GOVERNANCE.ruleLock
        );

        expect(govResult.topicId).toBe(MOCK_TOPICS[HCSTopicType.GOVERNANCE]);
        console.log("  ✅ Step 5: R-214 locked");

        // ── Step 6: VSA verification ──
        const vsaResult = await attestor.attestVSA(MOCK_VSA.passed);

        expect(vsaResult.topicId).toBe(MOCK_TOPICS[HCSTopicType.VSA]);
        console.log("  ✅ Step 6: VSA SharedKernel 130/130 PASS");

        // ── Verify total messages ──
        const stats = attestor.getStats();
        expect(stats.messageCount).toBe(6);
        console.log(`  ✅ Total HCS messages: ${stats.messageCount}`);
    });

    it("E2E: Weekly flow — reserved slots + standard contributions", async () => {
        // _001 #WeeklySummary
        const s1 = await attestor.attestCCCId(MOCK_CCC_IDS.weeklySummary);
        expect(s1.sequenceNumber).toBe(42);

        // _002 #WeeklyPlan
        const s2 = await attestor.attestCCCId(MOCK_CCC_IDS.weeklyPlan);
        expect(s2.sequenceNumber).toBe(42);

        // _003 #WeeklyReflection
        const s3 = await attestor.attestCCCId(MOCK_CCC_IDS.weeklyReflection);
        expect(s3.sequenceNumber).toBe(42);

        // _004 First assignable
        const s4 = await attestor.attestCCCId(MOCK_CCC_IDS.firstAssignable);
        expect(s4.sequenceNumber).toBe(42);

        // _015 Standard
        const s5 = await attestor.attestCCCId(MOCK_CCC_IDS.standard);
        expect(s5.sequenceNumber).toBe(42);

        expect(attestor.getStats().messageCount).toBe(5);
        console.log("  ✅ Weekly flow: _001 → _002 → _003 → _004 → _015");
    });

    it("E2E: Multi-agent registration", async () => {
        const contributors = [
            MOCK_CONTRIBUTORS.LDC,
            MOCK_CONTRIBUTORS.LFG,
            MOCK_CONTRIBUTORS.RMN,
            MOCK_CONTRIBUTORS.GTM,
        ];

        for (const c of contributors) {
            const result = await attestor.attestAgentRegistration({
                ccc: c.ccc,
                agent_id: c.agentId,
                contributor: c.contributor,
                role: c.role,
                tier: c.tier,
                home_instance: c.homeInstance,
                hedera_account_id: c.hederaAccountId,
                base_address: c.baseAddress,
            });

            expect(result.sequenceNumber).toBe(42);
            console.log(`  ✅ ${c.agentId} registered`);
        }

        expect(attestor.getStats().messageCount).toBe(4);
    });

    it("E2E: #BadAgent detection and freeze", async () => {
        // Step 1: Flag #BadAgent
        const flagResult = await attestor.attestGovernance(
            MOCK_GOVERNANCE.badAgent
        );
        expect(flagResult.topicId).toBe(MOCK_TOPICS[HCSTopicType.GOVERNANCE]);
        console.log("  ✅ #BadAgent flagged");

        // Step 2: Season pause (if severe)
        const pauseResult = await attestor.attestSeasonEvent(
            "SEASON_PAUSED",
            { reason: "Critical governance violation" }
        );
        expect(pauseResult.topicId).toBe(MOCK_TOPICS[HCSTopicType.SEASON]);
        console.log("  ✅ Season paused");

        expect(attestor.getStats().messageCount).toBe(2);
    });

    it("E2E: Batch weekly import (10 CCC-IDs)", async () => {
        const batch = Array.from({ length: 10 }, (_, i) => ({
            ccc_id: `LDC_2026-W07_${String(i + 4).padStart(3, "0")}`,
            contributor: "LDC",
            year: 2026,
            week: 7,
            sequence: i + 4,
            instance: "INT-E01",
            workspace: "CCC",
            reward_amount: 10,
        }));

        const results = await attestor.batchAttestCCCIds(batch);

        expect(results).toHaveLength(10);
        expect(attestor.getStats().messageCount).toBe(10);
        console.log("  ✅ Batch: 10 CCC-IDs attested");
    });
});
