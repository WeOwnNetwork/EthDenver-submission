import { NextResponse } from "next/server";
import { gateway } from "../../lib/gateway";
import { LockRuleSchema, type GatewayResponse } from "../../lib/types";
import crypto from "crypto";

export const POST = async (request: Request): Promise<Response> => {
    try {
        const body = await request.json();
        const parsed = LockRuleSchema.parse(body);

        const validation = gateway.kernel.validateGovernance({
            action: "RULE_LOCKED",
            approvalCccId: parsed.approvalCccId,
        });

        if (!validation.allowed) {
            return NextResponse.json<GatewayResponse>(
                { ok: false, error: { code: "R-011", message: validation.violations.join("; ") }, timestamp: new Date().toISOString(), instance: gateway.instance },
                { status: 403 }
            );
        }

        gateway.kernel.lockRule(parsed.ruleId, parsed.description, parsed.category);

        await gateway.attestSafe(async () => {
            await gateway.hcs.attestGovernance({
                action: "RULE_LOCKED",
                rule_id: parsed.ruleId,
                description: parsed.description,
                approval_ccc_id: parsed.approvalCccId,
                locked_by: parsed.lockedBy,
            });
        });

        gateway.eventLog.push({
            id: crypto.randomUUID(),
            type: "GOVERNANCE",
            agent: parsed.lockedBy,
            timestamp: new Date().toISOString(),
            summary: `🔒 ${parsed.ruleId} locked`,
        });

        return NextResponse.json<GatewayResponse>({
            ok: true,
            data: { ruleId: parsed.ruleId, govReward: 10 },
            timestamp: new Date().toISOString(),
            instance: gateway.instance,
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json<GatewayResponse>(
            { ok: false, error: { code: "ERROR", message: String(error) }, timestamp: new Date().toISOString(), instance: gateway.instance },
            { status: 400 }
        );
    }
};
