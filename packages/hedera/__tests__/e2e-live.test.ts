import { describe, it, expect, beforeAll } from "vitest";
import { HCSAttestor, HCSTopicType } from "../src/hcs-attestor";
import { createCCCToken, mintCCCReward } from "../src/tokens/ccc-token";
import { pauseForSeasonTransition } from "../src/tokens/enforcement";
import {
    MOCK_CCC_IDS,
    MOCK_VOLLEYS,
    MOCK_GOVERNANCE,
    MOCK_VSA,
    MOCK_CONTRIBUTORS,
} from "./mocks/data";

// Only run if LIVE_TEST is set to avoid accidental cost/spam
const runLive = process.env.LIVE_TEST === "true" ? describe : describe.skip;

runLive("Live E2E — Hedera Testnet Interaction", () => {
    let attestor: HCSAttestor;
    let cccTokenId: string;

    beforeAll(async () => {
        // Increase timeout for network operations
        attestor = new HCSAttestor("INT-E01", 3);

        // Ensure topics exist. If not in env, create them.
        try {
            // Try to use existing env topics first
            attestor.getStats(); // Just to trigger internal check if we wanted, but logic is in constructor

            const stats = attestor.getStats();
            if (Object.keys(stats.topics).length === 0) {
                console.log("⚠️ No topics found in env. Creating temporary topics for test...");
                await attestor.createAllTopics();
            } else {
                console.log("ℹ️ Using topics from environment variables.");
            }

            // Create a fresh token for this run to test Minting/Pausing
            console.log("🚀 Creating fresh CCC Token for E2E...");
            const tokenResult = await createCCCToken();
            cccTokenId = tokenResult.tokenId;
            console.log(`ℹ️ E2E Token Created: ${cccTokenId}`);

        } catch (e) {
            console.error("Error setting up live test:", e);
        }
    }, 180000); // 3 minute setup timeout

    it("E2E: Full Flow on Testnet", async () => {
        console.log("🚀 Starting Live E2E Test...");

        // 1. Register Agent
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
        expect(regResult.transactionId).toBeDefined();
        console.log(`  ✅ Registered: ${regResult.transactionId}`);

        // 2. Attest CCC-ID
        const cccResult = await attestor.attestCCCId(MOCK_CCC_IDS.standard);
        expect(cccResult.transactionId).toBeDefined();
        console.log(`  ✅ CCC-ID Attested: ${cccResult.transactionId}`);

        // 2b. Mint Reward (HTS) - Test Minting
        if (cccTokenId) {
            const mintResult = await mintCCCReward(
                cccTokenId,
                MOCK_CCC_IDS.standard.ccc_id,
                MOCK_CCC_IDS.standard.sequence
            );
            expect(mintResult.transactionId).toBeDefined();
            console.log(`  ✅ CCC Reward Minted: ${mintResult.transactionId} (${mintResult.amount} CCC)`);
        }

        // 3. Volley
        const volleyResult = await attestor.attestContextVolley(MOCK_VOLLEYS.seekMeta);
        expect(volleyResult.transactionId).toBeDefined();
        console.log(`  ✅ Volley Sent: ${volleyResult.transactionId}`);

        // 4. Governance
        const govResult = await attestor.attestGovernance(MOCK_GOVERNANCE.ruleLock);
        expect(govResult.transactionId).toBeDefined();
        console.log(`  ✅ Governance Locked: ${govResult.transactionId}`);

        // 5. VSA
        const vsaResult = await attestor.attestVSA(MOCK_VSA.passed);
        expect(vsaResult.transactionId).toBeDefined();
        console.log(`  ✅ VSA Attested: ${vsaResult.transactionId}`);

        // 6. Enforcement (Pause) - Test Pause
        if (cccTokenId) {
            const pauseTx = await pauseForSeasonTransition(cccTokenId);
            expect(pauseTx).toBeDefined();
            console.log(`  ✅ Token Paused: ${pauseTx}`);
        }

    }, 300000); // 5 minute test timeout
});
