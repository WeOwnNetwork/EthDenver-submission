import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        GATEWAY_INSTANCE: z.string().default("INT-E01"),
        GATEWAY_SEASON: z.coerce.number().default(3),

        // ── Hedera ──
        HEDERA_ACCOUNT_ID: z.string().min(1),
        HEDERA_PRIVATE_KEY: z.string().min(1),
        HEDERA_NETWORK: z.enum(["testnet", "mainnet", "previewnet"]).default("testnet"),

        // ── HCS Topics ──
        HCS_TOPIC_CCC_ID: z.string().optional(),
        HCS_TOPIC_CONTEXT_VOLLEY: z.string().optional(),
        HCS_TOPIC_GOVERNANCE: z.string().optional(),
        HCS_TOPIC_VSA: z.string().optional(),
        HCS_TOPIC_AGENT_REGISTRY: z.string().optional(),
        HCS_TOPIC_SEASON: z.string().optional(),

        // ── Base L2 ──
        BASE_SEPOLIA_RPC: z.string().url().optional(),
        BASE_PRIVATE_KEY: z.string().optional(),

    },

    client: {

    },

    runtimeEnv: {
        GATEWAY_INSTANCE: process.env.GATEWAY_INSTANCE,
        GATEWAY_SEASON: process.env.GATEWAY_SEASON,
        HEDERA_ACCOUNT_ID: process.env.HEDERA_ACCOUNT_ID,
        HEDERA_PRIVATE_KEY: process.env.HEDERA_PRIVATE_KEY,
        HEDERA_NETWORK: process.env.HEDERA_NETWORK,
        HCS_TOPIC_CCC_ID: process.env.HCS_TOPIC_CCC_ID,
        HCS_TOPIC_CONTEXT_VOLLEY: process.env.HCS_TOPIC_CONTEXT_VOLLEY,
        HCS_TOPIC_GOVERNANCE: process.env.HCS_TOPIC_GOVERNANCE,
        HCS_TOPIC_VSA: process.env.HCS_TOPIC_VSA,
        HCS_TOPIC_AGENT_REGISTRY: process.env.HCS_TOPIC_AGENT_REGISTRY,
        HCS_TOPIC_SEASON: process.env.HCS_TOPIC_SEASON,
        BASE_SEPOLIA_RPC: process.env.BASE_SEPOLIA_RPC,
        BASE_PRIVATE_KEY: process.env.BASE_PRIVATE_KEY,
    },

}


)



