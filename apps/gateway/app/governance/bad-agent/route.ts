import { NextResponse } from "next/server";
import { gateway } from "../../lib/gateway";
import { BadAgentSchema, type GatewayResponse } from "../../lib/types";
import crypto from "crypto";

export const POST = async (request: Request): Promise<Response> => {
    try {
        const body = await request.json();
        const parsed = BadAgentSchema.parse(body);

        await gateway.attestSafe(async () => {
            await gateway.hcs.attestGovernance({
                action: "BAD_AGENT_FLAGGED",
                target_ccc: parsed.targetCcc,
                reason: parsed.reason,
                severity: parsed.severity,
            });
        });

        gateway.eventLog.push({
            id: crypto.randomUUID(),
            type: "BAD_AGENT",
            agent: parsed.reportedBy,
            timestamp: new Date().toISOString(),
            summary: `🚨 #BadAgent: ${parsed.targetCcc} — ${parsed.reason}`,
        });

        return NextResponse.json<GatewayResponse>({
            ok: true,
            data: { targetCcc: parsed.targetCcc, severity: parsed.severity },
            timestamp: new Date().toISOString(),
            instance: gateway.instance,
        });
    } catch (error) {
        return NextResponse.json<GatewayResponse>(
            { ok: false, error: { code: "ERROR", message: String(error) }, timestamp: new Date().toISOString(), instance: gateway.instance },
            { status: 400 }
        );
    }
};
