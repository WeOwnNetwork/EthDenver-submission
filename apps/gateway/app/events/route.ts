import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";
import type { NextRequest } from "next/server";

export const GET = (request: NextRequest): Response => {
    const count = parseInt(request.nextUrl.searchParams.get("count") || "50");
    const agent = request.nextUrl.searchParams.get("agent");

    const events = agent
        ? gateway.eventLog.getByAgent(agent)
        : gateway.eventLog.getRecent(count);

    return NextResponse.json({
        ok: true,
        data: events,
        total: gateway.eventLog.count(),
        timestamp: new Date().toISOString(),
        instance: gateway.instance,
    });
};
