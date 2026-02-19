export interface AgentRecord {
    ccc: string;
    agentId: string;
    contributor: string;
    role: string;
    tier: string;
    homeInstance: string;
    hederaAccountId: string;
    baseAddress: string;
    registeredAt: string;
    cccIdCount: number;
}

export class AgentRegistry {
    private registry: Map<string, AgentRecord> = new Map();

    register(ccc: string, data: Omit<AgentRecord, "cccIdCount">): AgentRecord {
        const record = { ...data, cccIdCount: 0 };
        this.registry.set(ccc, record);
        return record;
    }

    incrementCCCId(ccc: string): void {
        const r = this.registry.get(ccc);
        if (r) r.cccIdCount++;
    }

    isRegistered(ccc: string): boolean { return this.registry.has(ccc); }
    get(ccc: string): AgentRecord | undefined { return this.registry.get(ccc); }
    getAll(): AgentRecord[] { return Array.from(this.registry.values()); }
    count(): number { return this.registry.size; }
}
