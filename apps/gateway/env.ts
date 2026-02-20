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

        // ── TimescaleDB (Tiger Data) ──
        TIMESCALEDB_URL: z.string().url().optional(),

        // ── OpenAI ──
        OPENAI_API_KEY: z.string().optional(),

        // ── AnythingLLM Instances ──
        INT_E01_URL: z.string().url().optional(),
        INT_E01_API_KEY: z.string().optional(),
        INT_E01_WORKSPACE: z.string().optional(),

        INT_P01_URL: z.string().url().optional(),
        INT_P01_API_KEY: z.string().optional(),
        INT_P01_WORKSPACE: z.string().optional(),

        INT_OG1_URL: z.string().url().optional(),
        INT_OG1_API_KEY: z.string().optional(),
        INT_OG1_WORKSPACE: z.string().optional(),

        INT_P02_URL: z.string().url().optional(),
        INT_P02_API_KEY: z.string().optional(),
        INT_P02_WORKSPACE: z.string().optional(),

        INT_OG8_URL: z.string().url().optional(),
        INT_OG8_API_KEY: z.string().optional(),
        INT_OG8_WORKSPACE: z.string().optional(),

        META_THREAD_URL: z.string().url().optional(),

        // ── ADI Contracts ──
        ADI_RPC_URL: z.string().url().optional(),
        ADI_PRIVATE_KEY: z.string().optional(),
        CONTRACT_IDENTITY: z.string().optional(),
        CONTRACT_REPUTATION: z.string().optional(),
        CONTRACT_VALIDATION: z.string().optional(),
        CONTRACT_SHARED_KERNEL: z.string().optional(),
        CONTRACT_SEASON: z.string().optional(),
        CONTRACT_ISC: z.string().optional(),
        CONTRACT_BAD_AGENT: z.string().optional(),
        CONTRACT_VSA: z.string().optional(),
        CONTRACT_DOCUMENT: z.string().optional(),
        CONTRACT_CCC_ID: z.string().optional(),
        CONTRACT_CCC_TOKEN: z.string().optional(),

        // ── ADL Testnet Indexer ──
        ADI_INDEX_STORAGE_PATH: z.string().optional(),
        ADI_INDEX_START_BLOCK: z.coerce.number().optional(),

        // ── Local Anvil Orchestrator Microservice ──
        ANVIL_SERVICE_URL: z.string().url().optional(),
        ANVIL_SERVICE_BOOTSTRAP: z.enum(["0", "1"]).optional(),

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
        TIMESCALEDB_URL: process.env.TIMESCALEDB_URL,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,

        INT_E01_URL: process.env.INT_E01_URL,
        INT_E01_API_KEY: process.env.INT_E01_API_KEY,
        INT_E01_WORKSPACE: process.env.INT_E01_WORKSPACE,

        INT_P01_URL: process.env.INT_P01_URL,
        INT_P01_API_KEY: process.env.INT_P01_API_KEY,
        INT_P01_WORKSPACE: process.env.INT_P01_WORKSPACE,

        INT_OG1_URL: process.env.INT_OG1_URL,
        INT_OG1_API_KEY: process.env.INT_OG1_API_KEY,
        INT_OG1_WORKSPACE: process.env.INT_OG1_WORKSPACE,

        INT_P02_URL: process.env.INT_P02_URL,
        INT_P02_API_KEY: process.env.INT_P02_API_KEY,
        INT_P02_WORKSPACE: process.env.INT_P02_WORKSPACE,

        INT_OG8_URL: process.env.INT_OG8_URL,
        INT_OG8_API_KEY: process.env.INT_OG8_API_KEY,
        INT_OG8_WORKSPACE: process.env.INT_OG8_WORKSPACE,

        META_THREAD_URL: process.env.META_THREAD_URL,

        ADI_RPC_URL: process.env.ADI_RPC_URL,
        ADI_PRIVATE_KEY: process.env.ADI_PRIVATE_KEY,
        CONTRACT_IDENTITY: process.env.CONTRACT_IDENTITY,
        CONTRACT_REPUTATION: process.env.CONTRACT_REPUTATION,
        CONTRACT_VALIDATION: process.env.CONTRACT_VALIDATION,
        CONTRACT_SHARED_KERNEL: process.env.CONTRACT_SHARED_KERNEL,
        CONTRACT_SEASON: process.env.CONTRACT_SEASON,
        CONTRACT_ISC: process.env.CONTRACT_ISC,
        CONTRACT_BAD_AGENT: process.env.CONTRACT_BAD_AGENT,
        CONTRACT_VSA: process.env.CONTRACT_VSA,
        CONTRACT_DOCUMENT: process.env.CONTRACT_DOCUMENT,
        CONTRACT_CCC_ID: process.env.CONTRACT_CCC_ID,
        CONTRACT_CCC_TOKEN: process.env.CONTRACT_CCC_TOKEN,

        ADI_INDEX_STORAGE_PATH: process.env.ADI_INDEX_STORAGE_PATH,
        ADI_INDEX_START_BLOCK: process.env.ADI_INDEX_START_BLOCK,

        ANVIL_SERVICE_URL: process.env.ANVIL_SERVICE_URL,
        ANVIL_SERVICE_BOOTSTRAP: process.env.ANVIL_SERVICE_BOOTSTRAP,
    },

}


)



