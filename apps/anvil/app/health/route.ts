import { NextResponse } from "next/server";
import { ensureAnvil, rpcHealthy } from "../lib/orchestrator";

export const runtime = "nodejs";

export async function GET() {
  const healthy = await rpcHealthy();
  return NextResponse.json({
    ok: true,
    data: {
      service: "anvil-orchestrator",
      healthy,
      rpcUrl: `http://${process.env.ANVIL_HOST || "127.0.0.1"}:${process.env.ANVIL_PORT || "8545"}`,
    },
    timestamp: new Date().toISOString(),
  });
}

export async function POST() {
  const state = await ensureAnvil();
  return NextResponse.json({ ok: true, data: state, timestamp: new Date().toISOString() });
}
