import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    getHederaConfig,
    createClient,
    getOperatorId,
    getOperatorKey,
} from "../src/config";

describe("Hedera Config", () => {
    it("should load config from environment", () => {
        const config = getHederaConfig();

        expect(config.operatorId).toBe("0.0.7899957");
        expect(config.operatorKey).toBeDefined();
        // Network defaults to testnet if not explicit, but ours is likely testnet
        expect(config.network).toBe("testnet");
    });

    it("should create testnet client", () => {
        const client = createClient();
        expect(client).toBeDefined();
    });

    it("should create mainnet client", () => {
        const client = createClient({
            network: "mainnet",
            operatorId: "0.0.12345",
            operatorKey: process.env.HEDERA_PRIVATE_KEY!,
        });
        expect(client).toBeDefined();
    });

    it("should throw when env vars missing", () => {
        const originalId = process.env.HEDERA_ACCOUNT_ID;
        delete process.env.HEDERA_ACCOUNT_ID;

        expect(() => getHederaConfig()).toThrow("Missing HEDERA_ACCOUNT_ID");

        process.env.HEDERA_ACCOUNT_ID = originalId;
    });

    it("should return operator ID", () => {
        const id = getOperatorId();
        expect(id.toString()).toBe("0.0.7899957");
    });

    it("should return operator key", () => {
        const key = getOperatorKey();
        expect(key).toBeDefined();
    });
});
