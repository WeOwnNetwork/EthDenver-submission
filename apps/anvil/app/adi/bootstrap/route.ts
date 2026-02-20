import { NextResponse } from "next/server";
import { bootstrap } from "../../lib/orchestrator";

export const runtime = "nodejs";

export async function POST() {
  const data = await bootstrap();
  return NextResponse.json({ ok: true, data, timestamp: new Date().toISOString() });
}
