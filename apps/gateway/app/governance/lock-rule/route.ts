import { NextResponse } from "next/server";
import { gateway } from "../../lib/gateway";
import { LockRuleSchema, type GatewayResponse } from "../../lib/types";
import { sendToMetaAgent } from "../../lib/anythingllm-bridge";
import crypto from "crypto";

export const POST = async (request: Request): Promise<Response> => {
    const start = Date.now();
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

        // Step 7: SEEK:META → Forward to #MetaAgent on INT-P01
        const metaMessage = `RULE_LOCKED ${parsed.ruleId} — ${parsed.description}
Approval: ${parsed.approvalCccId}
Locked by: AI:@${parsed.lockedBy}`;
        
        const metaResult = await sendToMetaAgent(parsed.lockedBy, metaMessage);

        await gateway.attestSafe(async () => {
            await gateway.hcs.attestGovernance({
                action: "RULE_LOCKED",
                rule_id: parsed.ruleId,
                description: parsed.description,
                approval_ccc_id: parsed.approvalCccId,
                locked_by: parsed.lockedBy,
            });
        });

        const eventId = crypto.randomUUID();
        await gateway.recordGatewayEvent({
            id: eventId,
            type: "GOVERNANCE",
            agent: parsed.lockedBy,
            summary: `🔒 ${parsed.ruleId} locked`,
            payload: {
                ruleId: parsed.ruleId,
                approvalCccId: parsed.approvalCccId,
                category: parsed.category,
            },
        });

        await gateway.logMetric({
            agentId: parsed.lockedBy,
            latencyMs: Date.now() - start,
            metadata: { type: "GOVERNANCE", eventId },
        });

        return NextResponse.json<GatewayResponse>({
            ok: true,
            data: { 
                ruleId: parsed.ruleId, 
                govReward: 10,
                metaResponse: metaResult?.response 
            },
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
