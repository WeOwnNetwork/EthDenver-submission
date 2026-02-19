import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";

export const GET = (): Response =>
    NextResponse.json({
        ok: true,
        data: gateway.getStats(),
        timestamp: new Date().toISOString(),
        instance: gateway.instance,
    });
