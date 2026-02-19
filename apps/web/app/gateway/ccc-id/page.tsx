import { CCCIdGenerator } from "@/components/gateway/ccc-id-generator";
import { CCCIdFeed } from "@/components/gateway/ccc-id-feed";

export default function CCCIdPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CCCIdGenerator />
            <CCCIdFeed />
        </div>
    );
}
