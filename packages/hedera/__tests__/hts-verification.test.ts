
import { describe, it, expect, beforeAll } from "vitest";
import { TokenType } from "@hashgraph/sdk";
import { createClient } from "../src/config";
import { createCCCToken } from "../src/tokens/ccc-token";
import { createGovToken } from "../src/tokens/governance-token";
import { HCSAttestor, HCSTopicType } from "../src/hcs-attestor";
import { isValidHederaId, validateTokenType, validateTopic } from "../src/utils/validation";
import { waitForPropagation } from "../src/utils/network-check";

// Only run if LIVE_TEST is set
const runLive = process.env.LIVE_TEST === "true" ? describe : describe.skip;

runLive("HTS & HCS On-Chain Verification", () => {
    let client: any; // Type 'Client' but simplified for test setup

    beforeAll(() => {
        client = createClient();
    });

    it("should create a Fungible Token (CCC) with correct ID format and Type", async () => {
        console.log("🚀 Creating CCC Token for verification...");
        const result = await createCCCToken();
        const tokenId = result.tokenId;

        console.log(`  Checking Token ID: ${tokenId}`);
        expect(isValidHederaId(tokenId)).toBe(true);

        const isValidType = await validateTokenType(client, tokenId, TokenType.FungibleCommon);
        expect(isValidType).toBe(true);
    });

    it("should create a Fungible Token (GOV) with correct ID format and Type", async () => {
        console.log("🚀 Creating GOV Token for verification...");
        // Need to add delay inside or wait here if createGovToken doesn't have it (it likely doesn't yet)
        const result = await createGovToken();
        const tokenId = result.tokenId;

        console.log(`  Checking GOV Token ID: ${tokenId}`);
        expect(isValidHederaId(tokenId)).toBe(true);

        // Wait for propagation since createGovToken might not have it built-in yet (we only added to ccc-token)
        await waitForPropagation(3000);

        const isValidType = await validateTokenType(client, tokenId, TokenType.FungibleCommon);
        expect(isValidType).toBe(true);
    });

    it("should create an HCS Topic with correct ID format", async () => {
        console.log("🚀 Creating HCS Topic for verification...");
        const attestor = new HCSAttestor();
        const topicId = await attestor.createTopic(HCSTopicType.CCC_ID, "Verification Test Topic");

        console.log(`  Checking Topic ID: ${topicId}`);
        expect(isValidHederaId(topicId)).toBe(true);

        const exists = await validateTopic(client, topicId);
        expect(exists).toBe(true);
    });
});
