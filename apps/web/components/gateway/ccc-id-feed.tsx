"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/lib/gateway-client";

export function CCCIdFeed() {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            const res = await getEvents(20);
            if (res.ok) {
                const cccEvents = (res.data?.events || []).filter(
                    (e: any) => e.type === "CCC-ID"
                );
                setEvents(cccEvents);
            }
        };
        load();
        const interval = setInterval(load, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-card rounded-lg border p-4">
            <h3 className="text-sm font-bold mb-3 text-muted-foreground">
                RECENT CCC-IDs
            </h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
                {events.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No CCC-IDs generated yet
                    </p>
                )}
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="flex items-center justify-between py-2 px-3 bg-accent/50 rounded text-sm"
                    >
                        <span className="font-mono font-bold">{event.summary.split(" ")[1]}</span>
                        <span className="text-xs text-muted-foreground">
                            {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
