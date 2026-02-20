import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";

export const GET = async (request: Request): Promise<Response> => {
    const url = new URL(request.url);
    const count = Number(url.searchParams.get("count") || 100);
    const force = url.searchParams.get("sync") === "1";

    if (force) {
        await gateway.onchainIndexer.sync();
    } else {
        await gateway.onchainIndexer.syncIfStale();
    }

    return NextResponse.json({
        ok: true,
        data: {
            stats: await gateway.onchainIndexer.getOnchainStats(),
            index: gateway.onchainIndexer.getSnapshot(),
            events: gateway.onchainIndexer.getRecentEvents(count),
        },
        timestamp: new Date().toISOString(),
        instance: gateway.instance,
    });
};
