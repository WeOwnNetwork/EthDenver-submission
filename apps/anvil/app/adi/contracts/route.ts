import { NextResponse } from "next/server";
import { readBroadcastContracts } from "../../lib/orchestrator";

export const runtime = "nodejs";

export async function GET() {
  const contracts = await readBroadcastContracts();
  return NextResponse.json({ ok: true, data: { contracts }, timestamp: new Date().toISOString() });
}
