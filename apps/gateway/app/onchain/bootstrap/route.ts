import { NextResponse } from "next/server";
import { gateway } from "../../lib/gateway";

export const POST = async (): Promise<Response> => {
  await gateway.bootstrapFromAnvilService(true);

  return NextResponse.json({
    ok: true,
    data: {
      adiConfigured: Boolean(gateway.adi),
      index: gateway.onchainIndexer.getSnapshot(),
      stats: await gateway.onchainIndexer.getOnchainStats(),
    },
    timestamp: new Date().toISOString(),
    instance: gateway.instance,
  });
};
