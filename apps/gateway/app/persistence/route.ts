import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { gateway } from "../lib/gateway";

export const GET = async (request: NextRequest): Promise<Response> => {
  const agent = request.nextUrl.searchParams.get("agent") || undefined;
  const count = Math.max(1, Math.min(parseInt(request.nextUrl.searchParams.get("count") || "25"), 200));

  const diagnostics = await gateway.getPersistenceDiagnostics();
  const recent = gateway.timescale
    ? await gateway.getRecentPersistentEvents(count, agent)
    : (agent ? gateway.eventLog.getByAgent(agent) : gateway.eventLog.getRecent(count));

  return NextResponse.json({
    ok: true,
    data: {
      diagnostics,
      mode: gateway.timescale ? "timescaledb" : "in-memory",
      recent,
    },
    timestamp: new Date().toISOString(),
    instance: gateway.instance,
  });
};
