export interface EventLogEntry {
    id: string;
    type: string;
    agent: string;
    timestamp: string;
    summary: string;
}

export class EventLog {
    private entries: EventLogEntry[] = [];
    private max: number;

    constructor(max = 1000) { this.max = max; }

    push(entry: EventLogEntry): void {
        this.entries.push(entry);
        if (this.entries.length > this.max) this.entries.shift();
    }

    getRecent(count = 50): EventLogEntry[] { return this.entries.slice(-count); }
    getByAgent(agentId: string): EventLogEntry[] { return this.entries.filter((e) => e.agent === agentId); }
    count(): number { return this.entries.length; }
}
