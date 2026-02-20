import { NextResponse } from "next/server";
import { ensureAnvil } from "../../lib/orchestrator";

export const runtime = "nodejs";

export async function POST() {
  const data = await ensureAnvil();
  return NextResponse.json({ ok: true, data, timestamp: new Date().toISOString() });
}
