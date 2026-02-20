import { NextResponse } from "next/server";
import { deployAdi, ensureAnvil } from "../../lib/orchestrator";

export const runtime = "nodejs";

export async function POST() {
  await ensureAnvil();
  const contracts = await deployAdi();
  return NextResponse.json({ ok: true, data: { contracts }, timestamp: new Date().toISOString() });
}
