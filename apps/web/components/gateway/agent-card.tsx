interface AgentCardProps {
    agent: {
        ccc: string;
        agentId: string;
        contributor: string;
        role: string;
        tier: string;
        homeInstance: string;
        registeredAt: string;
        cccIdCount: number;
    };
}

const TIER_BADGES: Record<string, { label: string; color: string }> = {
    founding_og: { label: "🏛️ Founding OG", color: "bg-yellow-100 text-yellow-800" },
    contributor: { label: "👤 Contributor", color: "bg-blue-100 text-blue-800" },
    tool_agent: { label: "🔧 Tool Agent", color: "bg-gray-100 text-gray-800" },
};

export function AgentCard({ agent }: AgentCardProps) {
    const badge = TIER_BADGES[agent.tier] || TIER_BADGES.contributor || { label: "Unknown", color: "bg-gray-100 text-gray-800" };

    return (
        <div className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-mono font-bold">{agent.ccc}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${badge.color}`}>
                        {badge.label}
                    </span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                    {agent.homeInstance}
                </span>
            </div>

            <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Agent</span>
                    <span className="font-mono">{agent.agentId}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Contributor</span>
                    <span>{agent.contributor}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Role</span>
                    <span className="text-xs">{agent.role}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">CCC-IDs</span>
                    <span className="font-bold text-green-600">{agent.cccIdCount}</span>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                Registered {new Date(agent.registeredAt).toLocaleDateString()}
            </div>
        </div>
    );
}
