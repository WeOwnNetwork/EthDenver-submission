"use client";

import { useEffect, useState } from "react";
import { listAgents } from "@/lib/gateway-client";
import { AgentCard } from "./agent-card";

export function AgentList() {
    const [agents, setAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await listAgents();
            if (res.ok) setAgents(res.data?.agents || []);
            setLoading(false);
        };
        load();
        const interval = setInterval(load, 10000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="text-muted-foreground">Loading agents...</div>;
    }

    if (agents.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p className="text-4xl mb-2">🤖</p>
                <p>No agents registered yet.</p>
                <p className="text-sm">Connect an agent to get started.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
                <AgentCard key={agent.ccc} agent={agent} />
            ))}
        </div>
    );
}
