import { HCSAttestor, HCSTopicType } from "@repo/hedera/hcs";
import { TimescaleClient, INITIALIZE_COMMANDS } from "@repo/timescaledb";
import { CCCIdGenerator } from "./ccc-id-generator";
import { SharedKernel } from "./shared-kernel";
import { AgentRegistry } from "./agent-registry";
import { EventLog } from "./event-log";
import { getGatewayAdiClients } from "./adi-contracts";
import { OnchainIndexer } from "./onchain-indexer";
import { bootstrapAnvilMicroservice } from "./anvil-microservice";
import { env } from "../../env";
import crypto from "crypto";

// Allow self-signed TLS cert chains (TimescaleDB Cloud)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// ═══════════════════════════════════════════════════════
// CCC GATEWAY SINGLETON — next-forge API
//
// Shared state across all API route handlers.
// Initialized once per server lifecycle.
// ═══════════════════════════════════════════════════════

class CCCGatewaySingleton {
    public hcs: HCSAttestor;
    public timescale?: TimescaleClient;
    public cccGen: CCCIdGenerator;
    public kernel: SharedKernel;
    public agentRegistry: AgentRegistry;
    public eventLog: EventLog;
    public adi = getGatewayAdiClients();
    public onchainIndexer: OnchainIndexer;

    public instance: string;
    public season: number;
    public startTime: Date;

    // Stats
    public totalVolleys: number = 0;
    public totalBroadcasts: number = 0;

    constructor() {
        this.instance = env.GATEWAY_INSTANCE;
        this.season = env.GATEWAY_SEASON;
        this.startTime = new Date();

        this.hcs = new HCSAttestor(this.instance, this.season);
        
        if (env.TIMESCALEDB_URL) {
            this.timescale = new TimescaleClient({
                connectionString: env.TIMESCALEDB_URL,
                ssl: true,
            });
            this.initializeTimescale();
        }

        this.cccGen = new CCCIdGenerator();
        this.kernel = new SharedKernel();
        this.agentRegistry = new AgentRegistry();
        this.eventLog = new EventLog(2000);
        this.onchainIndexer = new OnchainIndexer(this.adi);

        this.loadHCSTopics();
        this.onchainIndexer.init().catch((err) => {
            console.error("Failed to initialize onchain indexer:", err);
        });

        this.bootstrapFromAnvilService().catch((err) => {
            console.error("Anvil microservice bootstrap failed:", err);
        });
    }

    public async bootstrapFromAnvilService(force = false): Promise<void> {
        const url = env.ANVIL_SERVICE_URL;
        const bootstrapEnabled = (env.ANVIL_SERVICE_BOOTSTRAP ?? "1") === "1";

        if (!url) return;
        if (!bootstrapEnabled && !force) return;

        const payload = await bootstrapAnvilMicroservice(url);
        const { contracts } = payload;

        process.env.ADI_RPC_URL = payload.rpcUrl;
        process.env.ADI_PRIVATE_KEY = contracts.ADI_PRIVATE_KEY || process.env.ADI_PRIVATE_KEY;

        const keys = [
            "CONTRACT_IDENTITY",
            "CONTRACT_REPUTATION",
            "CONTRACT_VALIDATION",
            "CONTRACT_SHARED_KERNEL",
            "CONTRACT_SEASON",
            "CONTRACT_ISC",
            "CONTRACT_BAD_AGENT",
            "CONTRACT_VSA",
            "CONTRACT_DOCUMENT",
            "CONTRACT_CCC_ID",
            "CONTRACT_CCC_TOKEN",
        ] as const;

        for (const key of keys) {
            if (contracts[key]) process.env[key] = contracts[key];
        }

        this.adi = getGatewayAdiClients();
        this.onchainIndexer = new OnchainIndexer(this.adi);
        await this.onchainIndexer.init();
    }

    private async initializeTimescale(): Promise<void> {
        if (!this.timescale) return;
        try {
            for (const cmd of INITIALIZE_COMMANDS) {
                await this.timescale.query(cmd);
            }
            console.log("✅ TimescaleDB (Tiger Data) initialized");
        } catch (err) {
            console.error(`❌ TimescaleDB initialization failed: ${err}`);
        }
    }

    private loadHCSTopics(): void {
        const mapping: [string | undefined, HCSTopicType][] = [
            [env.HCS_TOPIC_CCC_ID, HCSTopicType.CCC_ID],
            [env.HCS_TOPIC_CONTEXT_VOLLEY, HCSTopicType.CONTEXT_VOLLEY],
            [env.HCS_TOPIC_GOVERNANCE, HCSTopicType.GOVERNANCE],
            [env.HCS_TOPIC_VSA, HCSTopicType.VSA],
            [env.HCS_TOPIC_AGENT_REGISTRY, HCSTopicType.AGENT_REGISTRY],
            [env.HCS_TOPIC_SEASON, HCSTopicType.SEASON],
        ];

        for (const [value, topicType] of mapping) {
            if (value) this.hcs.setTopic(topicType, value);
        }
    }

    public async logEvent(data: {
        eventId: string;
        agentId: string;
        eventType: string;
        topicId?: string;
        payload: any;
        status?: string;
    }): Promise<void> {
        if (!this.timescale) return;
        
        try {
            await this.timescale.query(
                `INSERT INTO volley_events (time, event_id, agent_id, topic_id, event_type, payload, status)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [
                    new Date(),
                    data.eventId,
                    data.agentId,
                    data.topicId || null,
                    data.eventType,
                    JSON.stringify(data.payload),
                    data.status || 'delivered'
                ]
            );
        } catch (err) {
            console.error('Failed to log event to TimescaleDB:', err);
        }
    }

    public async recordGatewayEvent(data: {
        id?: string;
        type: string;
        agent: string;
        summary: string;
        topicId?: string;
        payload?: any;
        status?: string;
    }): Promise<string> {
        const eventId = data.id || crypto.randomUUID();
        const timestamp = new Date().toISOString();

        this.eventLog.push({
            id: eventId,
            type: data.type,
            agent: data.agent,
            timestamp,
            summary: data.summary,
        });

        await this.logEvent({
            eventId,
            agentId: data.agent,
            eventType: data.type,
            topicId: data.topicId,
            payload: data.payload ?? { summary: data.summary },
            status: data.status ?? "delivered",
        });

        return eventId;
    }

    public async getRecentPersistentEvents(count: number, agent?: string): Promise<Array<{
        id: string;
        type: string;
        agent: string;
        timestamp: string;
        summary: string;
        status: string | null;
        source: "timescaledb";
    }>> {
        if (!this.timescale) return [];

        const safeCount = Math.max(1, Math.min(count, 500));
        const rows = await this.timescale.query<{
            time: string;
            event_id: string;
            agent_id: string;
            event_type: string;
            payload: unknown;
            status: string | null;
        }>(
            `SELECT time, event_id, agent_id, event_type, payload, status
             FROM volley_events
             WHERE ($1::text IS NULL OR agent_id = $1)
             ORDER BY time DESC
             LIMIT $2`,
            [agent || null, safeCount]
        );

        return rows.rows.map((row) => {
            const payload =
                typeof row.payload === "string"
                    ? safeParseJson(row.payload)
                    : (row.payload as Record<string, unknown> | null);
            const p = payload as Record<string, unknown> | null;

            return {
                id: row.event_id,
                type: row.event_type,
                agent: row.agent_id,
                timestamp: new Date(row.time).toISOString(),
                summary: buildEventSummary(row.event_type, row.agent_id, payload),
                status: row.status,
                source: "timescaledb" as const,
                cccId: (p?.cccId as string) || undefined,
                to: (p?.to as string) || undefined,
                instance: (p?.instance as string) || undefined,
            };
        });
    }

    public async getPersistentUniqueAgentCount(): Promise<number> {
        if (!this.timescale) return this.agentRegistry.count();
        try {
            const res = await this.timescale.query<{ total: string }>(
                `SELECT COUNT(DISTINCT agent_id)::text AS total FROM volley_events WHERE event_type = 'CONNECT'`
            );
            return Number(res.rows[0]?.total || 0);
        } catch {
            return this.agentRegistry.count();
        }
    }

    public async getPersistentCountByType(eventType: string): Promise<number> {
        if (!this.timescale) return 0;
        try {
            const res = await this.timescale.query<{ total: string }>(
                `SELECT COUNT(*)::text AS total FROM volley_events WHERE event_type = $1`,
                [eventType]
            );
            return Number(res.rows[0]?.total || 0);
        } catch {
            return 0;
        }
    }

    public async getPersistentEventCount(agent?: string): Promise<number> {
        if (!this.timescale) return 0;

        const res = await this.timescale.query<{ total: string }>(
            `SELECT COUNT(*)::text AS total
             FROM volley_events
             WHERE ($1::text IS NULL OR agent_id = $1)`,
            [agent || null]
        );

        return Number(res.rows[0]?.total || 0);
    }

    public async getPersistenceDiagnostics(): Promise<{
        enabled: boolean;
        eventsCount: number;
        metricsCount: number;
        latestEventAt: string | null;
    }> {
        if (!this.timescale) {
            return {
                enabled: false,
                eventsCount: 0,
                metricsCount: 0,
                latestEventAt: null,
            };
        }

        try {
            const [eventsCountRes, metricsCountRes, latestEventRes] = await Promise.all([
                this.timescale.query<{ total: string }>(`SELECT COUNT(*)::text AS total FROM volley_events`),
                this.timescale.query<{ total: string }>(`SELECT COUNT(*)::text AS total FROM agent_metrics`),
                this.timescale.query<{ latest: string | null }>(`SELECT MAX(time)::text AS latest FROM volley_events`),
            ]);

            return {
                enabled: true,
                eventsCount: Number(eventsCountRes.rows[0]?.total || 0),
                metricsCount: Number(metricsCountRes.rows[0]?.total || 0),
                latestEventAt: latestEventRes.rows[0]?.latest || null,
            };
        } catch {
            return {
                enabled: true,
                eventsCount: 0,
                metricsCount: 0,
                latestEventAt: null,
            };
        }
    }

    public async logMetric(data: {
        agentId: string;
        cpuUsage?: number;
        memoryUsage?: number;
        requestCount?: number;
        latencyMs?: number;
        metadata?: any;
    }): Promise<void> {
        if (!this.timescale) return;

        try {
            await this.timescale.query(
                `INSERT INTO agent_metrics (time, agent_id, cpu_usage, memory_usage, request_count, latency_ms, metadata)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [
                    new Date(),
                    data.agentId,
                    data.cpuUsage || null,
                    data.memoryUsage || null,
                    data.requestCount || null,
                    data.latencyMs || null,
                    JSON.stringify(data.metadata || {})
                ]
            );
        } catch (err) {
            console.error('Failed to log metric to TimescaleDB:', err);
        }
    }

    public async getStats() {
        const [onchainStats, indexSnapshot, persistence, uniqueAgents, persistentVolleys, persistentConnects] =
            await Promise.all([
                this.onchainIndexer.getOnchainStats(),
                Promise.resolve(this.onchainIndexer.getSnapshot()),
                this.getPersistenceDiagnostics(),
                this.getPersistentUniqueAgentCount(),
                this.getPersistentCountByType('VOLLEY'),
                this.getPersistentCountByType('CONNECT'),
            ]);

        return {
            instance: this.instance,
            season: this.season,
            uptime: (Date.now() - this.startTime.getTime()) / 1000,
            registeredAgents: Math.max(this.agentRegistry.count(), uniqueAgents),
            totalCCCIds: Math.max(this.cccGen.getTotalGenerated(), persistentVolleys),
            totalVolleys: Math.max(this.totalVolleys, persistentVolleys),
            totalBroadcasts: this.totalBroadcasts,
            hcsMessages: this.hcs.getStats().messageCount,
            hcsAttested: persistentConnects + persistentVolleys,
            rulesLocked: this.kernel.getLockedCount(),
            onchain: onchainStats,
            onchainIndex: indexSnapshot,
            persistence,
        };
    }

    public async attestSafe(fn: () => Promise<void>): Promise<void> {
        try {
            await fn();
        } catch (err) {
            console.error(`⚠️ HCS attestation failed: ${err}`);
        }
    }
}

const safeParseJson = (value: string): Record<string, unknown> | null => {
    try {
        return JSON.parse(value) as Record<string, unknown>;
    } catch {
        return null;
    }
};

const buildEventSummary = (
    eventType: string,
    agentId: string,
    payload: Record<string, unknown> | null
): string => {
    const baseType = eventType.split("_")[0] || eventType;

    if (baseType === "VOLLEY") {
        const to = typeof payload?.to === "string" ? payload.to : "unknown";
        return `🏐 ${agentId} → ${to} (${eventType})`;
    }

    if (baseType === "CONNECT") {
        return `${agentId} connected`;
    }

    if (baseType === "BROADCAST") {
        const bt = typeof payload?.broadcastType === "string" ? payload.broadcastType : "ANNOUNCEMENT";
        return `📢 ${agentId} → ALL (${bt})`;
    }

    if (baseType === "CCC-ID") {
        const id = typeof payload?.ccc_id === "string" ? payload.ccc_id : "CCC-ID";
        return `${id} generated for ${agentId}`;
    }

    if (baseType === "BAD_AGENT") {
        const target = typeof payload?.targetCcc === "string" ? payload.targetCcc : "UNKNOWN";
        return `🚨 #BadAgent: ${target}`;
    }

    if (baseType === "GOVERNANCE") {
        const ruleId = typeof payload?.ruleId === "string" ? payload.ruleId : "rule";
        return `🔒 ${ruleId} locked by ${agentId}`;
    }

    return `${eventType} @ ${agentId}`;
};

// Singleton — shared across all route handlers
const globalForGateway = globalThis as unknown as {
    gateway: CCCGatewaySingleton | undefined;
};

export const gateway =
    globalForGateway.gateway ?? new CCCGatewaySingleton();

if (process.env.NODE_ENV !== "production") {
    globalForGateway.gateway = gateway;
}
