import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";
import { env } from "../../env";

const withTimeout = async <T>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
};

const pingAnvilService = async (): Promise<boolean> => {
  if (!env.ANVIL_SERVICE_URL) return false;
  try {
    const res = await withTimeout(fetch(`${env.ANVIL_SERVICE_URL}/health`), 3000);
    return res.ok;
  } catch {
    return false;
  }
};

export const GET = async (): Promise<Response> => {
  const anvilOnline = await pingAnvilService();

  const contractKeys = [
    "CONTRACT_IDENTITY",
    "CONTRACT_REPUTATION",
    "CONTRACT_VALIDATION",
    "CONTRACT_SHARED_KERNEL",
    "CONTRACT_SEASON",
    "CONTRACT_ISC",
    "CONTRACT_BAD_AGENT",
    "CONTRACT_VSA",
    "CONTRACT_DOCUMENT",
    "CONTRACT_CCC_ID",
    "CONTRACT_CCC_TOKEN",
  ] as const;

  const hydratedContracts = contractKeys.filter((k) => Boolean(process.env[k])).length;

  return NextResponse.json({
    ok: true,
    data: {
      anvil: {
        serviceUrl: env.ANVIL_SERVICE_URL || null,
        bootstrapEnabled: (env.ANVIL_SERVICE_BOOTSTRAP ?? "1") === "1",
        online: anvilOnline,
      },
      adi: {
        rpcUrl: process.env.ADI_RPC_URL || env.ADI_RPC_URL || null,
        configured: Boolean(gateway.adi),
        hydratedContracts,
      },
      index: gateway.onchainIndexer.getSnapshot(),
    },
    timestamp: new Date().toISOString(),
    instance: gateway.instance,
  });
};

export const POST = async (): Promise<Response> => {
  await gateway.bootstrapFromAnvilService(true);

  return NextResponse.json({
    ok: true,
    data: {
      adiConfigured: Boolean(gateway.adi),
      rpcUrl: process.env.ADI_RPC_URL || env.ADI_RPC_URL || null,
      index: gateway.onchainIndexer.getSnapshot(),
      stats: await gateway.onchainIndexer.getOnchainStats(),
    },
    timestamp: new Date().toISOString(),
    instance: gateway.instance,
  });
};
