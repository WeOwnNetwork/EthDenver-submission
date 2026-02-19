"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/lib/gateway-client";

const TYPE_ICONS: Record<string, string> = {
    CONNECT: "🔌",
    "CCC-ID": "🆔",
    VOLLEY: "🏐",
    BROADCAST: "📢",
    GOVERNANCE: "🔒",
    BAD_AGENT: "🚨",
    DISCONNECT: "👋",
};

export function EventLog() {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            const res = await getEvents(100);
            if (res.ok)
                setEvents((res.data?.events || []) as any[]);
        };
        load();
        const interval = setInterval(load, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-card rounded-lg border">
            <div className="p-4 border-b">
                <h3 className="font-bold">📋 Event Log</h3>
                <p className="text-xs text-muted-foreground">
                    Live feed — refreshes every 3s
                </p>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
                {events.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                        No events yet — connect an agent to get started
                    </p>
                )}
                {events.map((event) => (
                    <div key={event.id} className="px-4 py-3 hover:bg-accent/30 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span>{TYPE_ICONS[event.type] || "📌"}</span>
                                <span className="text-sm">{event.summary}</span>
                            </div>
                            <span className="text-xs text-muted-foreground font-mono">
                                {new Date(event.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                            {event.agent} • {event.type}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
