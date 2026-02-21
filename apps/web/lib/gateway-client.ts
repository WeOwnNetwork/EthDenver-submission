// ═══════════════════════════════════════════════════════
// CCC Gateway API Client
//
// Typed client for apps/api/gateway/* routes.
// Includes raw fetch functions + React Query hooks.
// ═══════════════════════════════════════════════════════

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

interface GatewayResponse<T = unknown> {
    ok: boolean;
    data?: T;
    error?: string;
    violations?: string[];
}

function toErrorString(value: unknown): string {
    if (typeof value === "string") return value;
    if (value instanceof Error) return value.message;
    if (value && typeof value === "object") {
        const maybeMessage = (value as { message?: unknown }).message;
        const maybeCode = (value as { code?: unknown }).code;

        if (typeof maybeMessage === "string" && typeof maybeCode === "string") {
            return `${maybeCode}: ${maybeMessage}`;
        }
        if (typeof maybeMessage === "string") return maybeMessage;
        if (typeof maybeCode === "string") return maybeCode;

        try {
            return JSON.stringify(value);
        } catch {
            return "Unexpected error";
        }
    }
    return "Unexpected error";
}

async function gw<T>(
    path: string,
    options?: RequestInit,
): Promise<GatewayResponse<T>> {
    const res = await fetch(`${API_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    const payload = (await res.json()) as GatewayResponse<T> & { error?: unknown };

    return {
        ...payload,
        error: payload.error !== undefined ? toErrorString(payload.error) : undefined,
    };
}

// ═══════════════════════════════════════════════════════
// RAW FETCH FUNCTIONS
// ═══════════════════════════════════════════════════════

export async function connectAgent(data: {
    ccc: string;
    contributor?: string;
    role?: "orchestrator" | "user_agent" | "tool_agent";
    tier?: "founding_og" | "contributor" | "tool_agent";
    hederaAccountId?: string;
    baseAddress?: string;
}) {
    return gw("/connect", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function listAgents() {
    return gw<{ agents: unknown[]; total: number }>("/agents");
}

export async function generateCCCId(data: {
    ccc: string;
    workspace?: string;
    externalHighWaterMark?: number;
}) {
    return gw<{ id: string; reward: number; hcsTxId?: string }>("/ccc-id", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function sendVolley(data: {
    from: string;
    to: string;
    volleyType?: "SEEK" | "ACK" | "STATUS" | "ALERT";
    ref?: string;
    content?: unknown;
    attest?: boolean;
}) {
    return gw("/volley", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function sendBroadcast(data: {
    from: string;
    broadcastType?: "ANNOUNCEMENT" | "STATUS" | "ALERT" | "ACK-REQUEST";
    content?: unknown;
}) {
    return gw("/broadcast", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function callProxyLLM(data: {
    providerId: string;
    model: string;
    messages: any[];
    temperature?: number;
    maxTokens?: number;
    config?: Record<string, string>;
}) {
    return gw<{ content: string; model: string; provider: string; tokensUsed?: number }>("/ai", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function lockRule(data: {
    ruleId: string;
    description: string;
    approvalCccId: string;
    lockedBy: string;
}) {
    return gw("/governance/lock-rule", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function flagBadAgent(data: {
    targetCcc: string;
    reason: string;
    severity?: "WARNING" | "FREEZE" | "WIPE";
    reportedBy: string;
}) {
    return gw("/governance/bad-agent", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function getStats() {
    return gw<{
        instance: string;
        season: number;
        uptime: number;
        registeredAgents: number;
        totalCCCIds: number;
        totalVolleys: number;
        totalBroadcasts: number;
        hcsMessages: number;
        rulesLocked: number;
        onchain?: {
            totalAgents: number;
            totalCCCIds: number;
            totalVSAs: number;
            sharedKernelVersion: string;
            currentSeason: number;
            totalRules: number;
            totalIncidents: number;
        };
        onchainIndex?: {
            lastIndexedBlock: number;
            lastSyncedAt: string;
            indexedEvents: number;
        };
    }>("/stats");
}

export async function getEvents(count = 50, agent?: string) {
    const params = new URLSearchParams({ count: String(count) });
    if (agent) params.set("agent", agent);
    return gw<GatewayEvent[] | { events: GatewayEvent[] }>(`/events?${params}`);
}

export async function getInfraStatus() {
    return gw<{
        anvil: {
            serviceUrl: string | null;
            bootstrapEnabled: boolean;
            online: boolean;
        };
        adi: {
            rpcUrl: string | null;
            configured: boolean;
            hydratedContracts: number;
        };
        index: {
            lastIndexedBlock: number;
            lastSyncedAt: string;
            indexedEvents: number;
        };
    }>("/infra");
}

export async function bootstrapInfra() {
    return gw<{
        adiConfigured: boolean;
        rpcUrl: string | null;
        index: {
            lastIndexedBlock: number;
            lastSyncedAt: string;
            indexedEvents: number;
        };
    }>("/infra", { method: "POST" });
}

// ═══════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════

export interface GatewayEvent {
    id: string;
    type: string;
    agent: string;
    summary: string;
    timestamp: string;
    cccId?: string;
    txHash?: string;
    source?: "gateway" | "onchain" | "timescaledb";
}

// ═══════════════════════════════════════════════════════
// REACT QUERY HOOKS
// ═══════════════════════════════════════════════════════

/** Fetch gateway stats, auto-refreshing every 5s */
export function useGatewayStats() {
    return useQuery({
        queryKey: ["gateway-stats"],
        queryFn: () => getStats(),
        refetchInterval: 15_000,
        refetchOnWindowFocus: false,
    });
}

/** Fetch gateway event log */
export function useEvents(count = 30, agent?: string) {
    return useQuery({
        queryKey: ["gateway-events", count, agent || "all"],
        queryFn: () => getEvents(count, agent),
        refetchInterval: 10_000,
        refetchOnWindowFocus: false,
    });
}

export function useInfraStatus() {
    return useQuery({
        queryKey: ["gateway-infra"],
        queryFn: () => getInfraStatus(),
        refetchInterval: 10_000,
        refetchOnWindowFocus: false,
    });
}

export function useBootstrapInfra() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: bootstrapInfra,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["gateway-infra"] });
            qc.invalidateQueries({ queryKey: ["gateway-stats"] });
            qc.invalidateQueries({ queryKey: ["gateway-events"] });
        },
    });
}

/** Mutation: connect / register an agent */
export function useConnectAgent() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: connectAgent,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["gateway-stats"] });
        },
    });
}

/** Mutation: generate a CCC-ID */
export function useGenerateCCCId() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: generateCCCId,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["gateway-stats"] });
            qc.invalidateQueries({ queryKey: ["gateway-events"] });
        },
    });
}

/** Mutation: send a #ContextVolley */
export function useSendVolley() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: sendVolley,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["gateway-events"] });
        },
    });
}

/** Mutation: proxy LLM call through gateway */
export function useCallLLM() {
    return useMutation({
        mutationFn: callProxyLLM,
    });
}

// ═══════════════════════════════════════════════════════
// HEDERA TOKEN FUNCTIONS
// ═══════════════════════════════════════════════════════

export async function getTokenRegistry() {
    return gw<{
        tokens: Record<string, string | null>;
        hcsTopics: Record<string, string | null>;
        hederaAccount: string | null;
        hcsStats: { messageCount: number; topicCount: number };
    }>("/tokens");
}

export async function tokenAction(action: string, payload: Record<string, unknown> = {}) {
    return gw("/tokens", {
        method: "POST",
        body: JSON.stringify({ action, ...payload }),
    });
}

/** Fetch Hedera token registry */
export function useTokenRegistry() {
    return useQuery({
        queryKey: ["token-registry"],
        queryFn: () => getTokenRegistry(),
        refetchInterval: 30_000,
        refetchOnWindowFocus: false,
    });
}

/** Mutation: execute a Hedera token action */
export function useTokenAction() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ action, ...payload }: { action: string;[key: string]: unknown }) =>
            tokenAction(action, payload),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ["token-registry"] });
            await qc.refetchQueries({ queryKey: ["token-registry"] });
            await qc.invalidateQueries({ queryKey: ["gateway-stats"] });
            await qc.refetchQueries({ queryKey: ["gateway-stats"] });
            await qc.invalidateQueries({ queryKey: ["gateway-events"] });
            await qc.refetchQueries({ queryKey: ["gateway-events"] });
        },
    });
}
