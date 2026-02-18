import {
    Client,
    PrivateKey,
    AccountId,
    PublicKey,
} from "@hashgraph/sdk";
const dotenv = require("dotenv");
dotenv.config();
//import { configDotenv } from "dotenv";

// ═══════════════════════════════════════════════════════
// HEDERA CLIENT CONFIGURATION
// @ccc-gateway/hedera
// ═══════════════════════════════════════════════════════

export interface HederaConfig {
    network: "testnet" | "mainnet" | "previewnet";
    operatorId: string;
    operatorKey: string;
}

export function getHederaConfig(): HederaConfig {
    const operatorId = process.env.HEDERA_ACCOUNT_ID;
    const operatorKey = process.env.HEDERA_PRIVATE_KEY;
    const network = (process.env.HEDERA_NETWORK || "testnet") as HederaConfig["network"];

    if (!operatorId || !operatorKey) {
        throw new Error(
            "Missing HEDERA_ACCOUNT_ID or HEDERA_PRIVATE_KEY in .env"
        );
    }

    return { network, operatorId, operatorKey };
}

export function createClient(config?: HederaConfig): Client {
    const cfg = config || getHederaConfig();

    let client: Client;
    switch (cfg.network) {
        case "mainnet":
            client = Client.forMainnet();
            break;
        case "previewnet":
            client = Client.forPreviewnet();
            break;
        default:
            client = Client.forTestnet();
    }

    client.setOperator(
        AccountId.fromString(cfg.operatorId),
        PrivateKey.fromStringECDSA(cfg.operatorKey)
    );

    return client;
}

export function getOperatorId(): AccountId {
    return AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
}

export function getOperatorKey(): PrivateKey {
    return PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY!);
}

export function getOperatorPublicKey(): PublicKey {
    return getOperatorKey().publicKey;
}
