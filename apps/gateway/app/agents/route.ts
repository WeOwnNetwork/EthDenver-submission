import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";

export const GET = (): Response =>
    NextResponse.json({
        ok: true,
        data: gateway.agentRegistry.getAll(),
        total: gateway.agentRegistry.count(),
        timestamp: new Date().toISOString(),
        instance: gateway.instance,
    });
