import { EventLog } from "@/components/gateway/event-log";

export default function EventsPage() {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">📋 Event Log</h2>
            <EventLog />
        </div>
    );
}
