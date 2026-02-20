import { NextResponse } from "next/server";
import { stopAnvil } from "../../lib/orchestrator";

export const runtime = "nodejs";

export async function POST() {
  const data = await stopAnvil();
  return NextResponse.json({ ok: true, data, timestamp: new Date().toISOString() });
}
