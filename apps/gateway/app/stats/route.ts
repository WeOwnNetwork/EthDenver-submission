import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";
import { getConfiguredInstances } from "../lib/anythingllm-bridge";

export const GET = async (): Promise<Response> => {
    const stats = await gateway.getStats();
    return NextResponse.json({
        ok: true,
        data: {
            ...stats,
            liveInstances: getConfiguredInstances().length,
        },
        timestamp: new Date().toISOString(),
        instance: gateway.instance,
    });
};
