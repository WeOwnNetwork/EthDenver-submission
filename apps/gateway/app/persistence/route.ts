import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { gateway } from "../lib/gateway";

export const GET = async (request: NextRequest): Promise<Response> => {
  const agent = request.nextUrl.searchParams.get("agent") || undefined;
  const count = Math.max(1, Math.min(parseInt(request.nextUrl.searchParams.get("count") || "25"), 200));

  const diagnostics = await gateway.getPersistenceDiagnostics();
  const aggregates = gateway.timescale
    ? await gateway.getContinuousStats()
    : { hourly: [], daily: [] };
  const recent = gateway.timescale
    ? await gateway.getRecentPersistentEvents(count, agent)
    : (agent ? gateway.eventLog.getByAgent(agent) : gateway.eventLog.getRecent(count));

  return NextResponse.json({
    ok: true,
    data: {
      diagnostics,
      aggregates,
      mode: gateway.timescale ? "timescaledb" : "in-memory",
      recent,
    },
    timestamp: new Date().toISOString(),
    instance: gateway.instance,
  });
};

export const POST = async (request: NextRequest): Promise<Response> => {
  if (!gateway.timescale) {
    return NextResponse.json(
      { ok: false, error: "TimescaleDB is not configured" },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const action = String(body.action || "");

  try {
    if (action === "scratchpad-upsert") {
      await gateway.upsertScratchpadEntry({
        agentId: String(body.agentId || ""),
        clientId: String(body.clientId || ""),
        key: String(body.key || ""),
        value: body.value ?? {},
        ttl: typeof body.ttl === "string" ? body.ttl : undefined,
      });
      return NextResponse.json({ ok: true, action });
    }

    if (action === "working-memory-append") {
      await gateway.appendWorkingMemory({
        agentId: String(body.agentId || ""),
        clientId: String(body.clientId || ""),
        sessionId: typeof body.sessionId === "string" ? body.sessionId : undefined,
        memoryType: (body.memoryType as "episodic" | "semantic" | "procedural" | "conversation") || "episodic",
        content: String(body.content || ""),
        relevanceScore: typeof body.relevanceScore === "number" ? body.relevanceScore : undefined,
        decayRate: typeof body.decayRate === "number" ? body.decayRate : undefined,
        metadata: body.metadata,
      });
      return NextResponse.json({ ok: true, action });
    }

    if (action === "checkpoint-create") {
      await gateway.createCheckpoint({
        sessionId: String(body.sessionId || ""),
        agentId: String(body.agentId || ""),
        stepNumber: Number(body.stepNumber || 0),
        checkpointState: body.checkpointState ?? {},
        memorySnapshot: body.memorySnapshot,
      });
      return NextResponse.json({ ok: true, action });
    }

    return NextResponse.json(
      {
        ok: false,
        error: "Unknown action",
        supported: ["scratchpad-upsert", "working-memory-append", "checkpoint-create"],
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
};
