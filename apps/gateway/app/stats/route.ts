import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";

export const GET = async (): Promise<Response> =>
    NextResponse.json({
        ok: true,
        data: await gateway.getStats(),
        timestamp: new Date().toISOString(),
        instance: gateway.instance,
    });
