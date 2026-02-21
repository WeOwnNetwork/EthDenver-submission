import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";
import { CCCIdRequestSchema, type GatewayResponse } from "../lib/types";
import { glog } from "../lib/logger";
import crypto from "crypto";

export const POST = async (request: Request): Promise<Response> => {
    const start = Date.now();
    try {
        const body = await request.json();
        const parsed = CCCIdRequestSchema.parse(body);

        // Governance validation
        const validation = gateway.kernel.validateCCCId({
            workspace: parsed.workspace,
            username: parsed.username,
        });

        if (!validation.allowed) {
            // Log violation to TimescaleDB
            await gateway.logEvent({
                eventId: crypto.randomUUID(),
                agentId: `AI:@${parsed.ccc}`,
                eventType: "CCC-ID_DENIED",
                payload: { violations: validation.violations, workspace: parsed.workspace },
                status: "denied"
            });

            return NextResponse.json<GatewayResponse>(
                {
                    ok: false,
                    error: {
                        code: "GOVERNANCE_VIOLATION",
                        message: validation.violations.join("; "),
                    },
                    timestamp: new Date().toISOString(),
                    instance: gateway.instance,
                },
                { status: 403 }
            );
        }

        // Generate CCC-ID
        const cccId = gateway.cccGen.generate(
            parsed.ccc,
            parsed.externalHighWaterMark || 0
        );

        if (!cccId) {
            return NextResponse.json<GatewayResponse>(
                {
                    ok: false,
                    error: { code: "SEQUENCE_EXHAUSTED", message: "Max 999 CCC-IDs per week" },
                    timestamp: new Date().toISOString(),
                    instance: gateway.instance,
                },
                { status: 429 }
            );
        }

        // Increment agent counter
        gateway.agentRegistry.incrementCCCId(parsed.ccc);

        // Reward tier
        const reward = [50, 25, 25][cccId.sequence - 1] || 10;

        // Attest to HCS
        await gateway.attestSafe(async () => {
            await gateway.hcs.attestCCCId({
                ccc_id: cccId.id,
                contributor: parsed.ccc,
                year: cccId.year,
                week: cccId.week,
                sequence: cccId.sequence,
                instance: gateway.instance,
                workspace: "CCC",
                reward_amount: reward,
            });
        });

        const eventId = crypto.randomUUID();
        await gateway.recordGatewayEvent({
            id: eventId,
            type: "CCC-ID",
            agent: `AI:@${parsed.ccc}`,
            summary: `${cccId.id} (+${reward} $CCC)`,
            payload: { ccc_id: cccId.id, reward },
        });

        await gateway.logCCCIdEvent({
            contributor: parsed.ccc,
            cccId: cccId.id,
            year: cccId.year,
            week: cccId.week,
            sequence: cccId.sequence,
            reward,
            instanceId: gateway.instance,
        });

        await gateway.logMetric({
            agentId: `AI:@${parsed.ccc}`,
            latencyMs: Date.now() - start,
            metadata: { type: "CCC-ID" }
        });

        glog.cccId(cccId.id, parsed.ccc, reward);

        return NextResponse.json<GatewayResponse>(
            {
                ok: true,
                data: {
                    ccc_id: cccId.id,
                    contributor: cccId.contributor,
                    year: cccId.year,
                    week: cccId.week,
                    sequence: cccId.sequence,
                    instance: gateway.instance,
                    reward,
                },
                timestamp: new Date().toISOString(),
                instance: gateway.instance,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json<GatewayResponse>(
            {
                ok: false,
                error: { code: "ERROR", message: String(error) },
                timestamp: new Date().toISOString(),
                instance: gateway.instance,
            },
            { status: 400 }
        );
    }
};
