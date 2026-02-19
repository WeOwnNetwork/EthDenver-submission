import { AgentList } from "@/components/gateway/agent-list";

export default function AgentsPage() {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">🤖 Agent Registry</h2>
            <AgentList />
        </div>
    );
}
