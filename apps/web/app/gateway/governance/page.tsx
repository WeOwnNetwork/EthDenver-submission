import { GovernancePanel } from "@/components/gateway/governance-panel";

export default function GovernancePage() {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">🔒 Governance</h2>
            <GovernancePanel />
        </div>
    );
}
