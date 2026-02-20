import { NextResponse } from "next/server";
import { ensureAdi, ensureAnvil } from "../../lib/orchestrator";

export const runtime = "nodejs";

export async function POST() {
  const anvil = await ensureAnvil();
  const contracts = await ensureAdi();
  return NextResponse.json({
    ok: true,
    data: { anvil, contracts },
    timestamp: new Date().toISOString(),
  });
}
