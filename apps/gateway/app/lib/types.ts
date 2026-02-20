import { z } from "zod";

// ═══════════════════════════════════════════════════════
// CCC GATEWAY TYPES — next-forge API
// ═══════════════════════════════════════════════════════

// ── Zod Schemas (request validation) ──

export const ConnectSchema = z.object({
    ccc: z.string().length(3).regex(/^[A-Z]{3}$/),
    role: z.enum(["orchestrator", "user_agent", "tool_agent"]).default("user_agent"),
    contributor: z.string().optional(),
    contributorRole: z.string().optional(),
    tier: z.enum(["founding_og", "contributor", "tool_agent"]).default("contributor"),
    homeInstance: z.string().optional(),
    hederaAccountId: z.string().optional(),
    baseAddress: z.string().optional(),
    username: z.string().optional(),
});

export const CCCIdRequestSchema = z.object({
    ccc: z.string().length(3).regex(/^[A-Z]{3}$/),
    workspace: z.string().default("CCC"),
    username: z.string().optional(),
    externalHighWaterMark: z.number().optional(),
});

export const VolleySchema = z.object({
    from: z.string(),
    to: z.string().length(3).regex(/^[A-Z]{3}$/),
    volleyType: z.enum(["SEEK", "ACK", "STATUS", "ALERT"]).default("SEEK"),
    ref: z.string().optional(),
    content: z.any(),
    attest: z.boolean().default(false),
});

export const BroadcastSchema = z.object({
    from: z.string(),
    broadcastType: z.enum(["ANNOUNCEMENT", "STATUS", "ALERT", "ACK-REQUEST"]).default("ANNOUNCEMENT"),
    ref: z.string().optional(),
    content: z.any(),
});

export const LockRuleSchema = z.object({
    ruleId: z.string(),
    description: z.string(),
    approvalCccId: z.string(),
    category: z.enum(["identity", "workspace", "governance", "operational", "instance"]).default("operational"),
    lockedBy: z.string(),
});

export const BadAgentSchema = z.object({
    targetCcc: z.string().length(3),
    reason: z.string(),
    cccId: z.string().optional(),
    severity: z.enum(["WARNING", "FREEZE", "WIPE"]).default("WARNING"),
    reportedBy: z.string(),
});

// ── Response Types ──

export interface GatewayResponse<T = any> {
    ok: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
    timestamp: string;
    instance: string;
}

export interface AgentSummary {
    ccc: string;
    agentId: string;
    role: string;
    tier: string;
    homeInstance: string;
    connectedAt: string;
    cccIdCount: number;
}

export interface GatewayStats {
    instance: string;
    season: number;
    uptime: number;
    registeredAgents: number;
    totalCCCIds: number;
    totalVolleys: number;
    totalBroadcasts: number;
    hcsMessages: number;
    rulesLocked: number;
}
