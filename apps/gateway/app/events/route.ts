import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";
import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest): Promise<Response> => {
    const sync = request.nextUrl.searchParams.get("sync") === "1";
    const count = Math.max(1, Math.min(parseInt(request.nextUrl.searchParams.get("count") || "50"), 500));
    const agent = request.nextUrl.searchParams.get("agent");

    if (sync) {
        gateway.onchainIndexer.sync().catch((err) => {
            console.error("onchain sync failed:", err);
        });
    } else {
        gateway.onchainIndexer.syncIfStale().catch((err) => {
            console.error("onchain stale sync failed:", err);
        });
    }

    let gatewayEvents: Array<{
        id: string;
        type: string;
        agent: string;
        timestamp: string;
        summary: string;
        source?: string;
    }> = [];

    let persistentTotal = 0;

    try {
        if (gateway.timescale) {
            gatewayEvents = await gateway.getRecentPersistentEvents(count, agent || undefined);
            persistentTotal = await gateway.getPersistentEventCount(agent || undefined);
        } else {
            gatewayEvents = agent
                ? gateway.eventLog.getByAgent(agent)
                : gateway.eventLog.getRecent(count);
            persistentTotal = gateway.eventLog.count();
        }
    } catch (err) {
        console.error("failed to fetch persistent events, falling back to in-memory:", err);
        gatewayEvents = agent
            ? gateway.eventLog.getByAgent(agent)
            : gateway.eventLog.getRecent(count);
        persistentTotal = gateway.eventLog.count();
    }

    const onchainEvents = gateway.onchainIndexer.getRecentEvents(count).map((e) => ({
        id: e.id,
        type: "ONCHAIN",
        agent: e.contract,
        timestamp: e.timestamp,
        summary: e.summary,
        txHash: e.txHash,
        source: e.source,
    }));

    const events = [...gatewayEvents, ...onchainEvents]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, count);

    return NextResponse.json({
        ok: true,
        data: events,
        total: persistentTotal + gateway.onchainIndexer.getSnapshot().indexedEvents,
        timestamp: new Date().toISOString(),
        instance: gateway.instance,
    });
};
