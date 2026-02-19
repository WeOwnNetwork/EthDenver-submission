import { HCSAttestor, HCSTopicType } from "@repo/hedera/hcs";
import { CCCIdGenerator } from "./ccc-id-generator";
import { SharedKernel } from "./shared-kernel";
import { AgentRegistry } from "./agent-registry";
import { EventLog } from "./event-log";
import { env } from "../../env";

// ═══════════════════════════════════════════════════════
// CCC GATEWAY SINGLETON — next-forge API
//
// Shared state across all API route handlers.
// Initialized once per server lifecycle.
// ═══════════════════════════════════════════════════════

class CCCGatewaySingleton {
    public hcs: HCSAttestor;
    public cccGen: CCCIdGenerator;
    public kernel: SharedKernel;
    public agentRegistry: AgentRegistry;
    public eventLog: EventLog;

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
        this.cccGen = new CCCIdGenerator();
        this.kernel = new SharedKernel();
        this.agentRegistry = new AgentRegistry();
        this.eventLog = new EventLog(2000);

        this.loadHCSTopics();
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

    public getStats() {
        return {
            instance: this.instance,
            season: this.season,
            uptime: (Date.now() - this.startTime.getTime()) / 1000,
            registeredAgents: this.agentRegistry.count(),
            totalCCCIds: this.cccGen.getTotalGenerated(),
            totalVolleys: this.totalVolleys,
            totalBroadcasts: this.totalBroadcasts,
            hcsMessages: this.hcs.getStats().messageCount,
            rulesLocked: this.kernel.getLockedCount(),
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

// Singleton — shared across all route handlers
const globalForGateway = globalThis as unknown as {
    gateway: CCCGatewaySingleton | undefined;
};

export const gateway =
    globalForGateway.gateway ?? new CCCGatewaySingleton();

if (process.env.NODE_ENV !== "production") {
    globalForGateway.gateway = gateway;
}
