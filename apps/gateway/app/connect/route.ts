import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";
import { ConnectSchema, type GatewayResponse } from "../lib/types";
import { glog } from "../lib/logger";
import crypto from "crypto";

export const POST = async (request: Request): Promise<Response> => {
    const start = Date.now();
    try {
        const body = await request.json();
        const parsed = ConnectSchema.parse(body);

        // Check if already registered
        if (gateway.agentRegistry.isRegistered(parsed.ccc)) {
            const existing = gateway.agentRegistry.get(parsed.ccc)!;
            return NextResponse.json<GatewayResponse>({
                ok: true,
                data: {
                    agentId: existing.agentId,
                    status: "already_registered",
                    highWaterMark: gateway.cccGen.getHighWaterMark(parsed.ccc),
                    agents: gateway.agentRegistry.getAll(),
                },
                timestamp: new Date().toISOString(),
                instance: gateway.instance,
            });
        }

        // Register
        const agent = gateway.agentRegistry.register(parsed.ccc, {
            ccc: parsed.ccc,
            agentId: `AI:@${parsed.ccc}`,
            contributor: parsed.contributor || parsed.ccc,
            role: parsed.contributorRole || "contributor",
            tier: parsed.tier,
            homeInstance: parsed.homeInstance || gateway.instance,
            hederaAccountId: parsed.hederaAccountId || "",
            baseAddress: parsed.baseAddress || "",
            registeredAt: new Date().toISOString(),
        });

        // Attest to HCS
        await gateway.attestSafe(async () => {
            await gateway.hcs.attestAgentRegistration({
                ccc: parsed.ccc,
                agent_id: agent.agentId,
                contributor: agent.contributor,
                role: agent.role,
                tier: agent.tier,
                home_instance: agent.homeInstance,
                hedera_account_id: agent.hederaAccountId,
                base_address: agent.baseAddress,
            });
        });

        const eventId = crypto.randomUUID();
        await gateway.recordGatewayEvent({
            id: eventId,
            type: "CONNECT",
            agent: agent.agentId,
            summary: `${agent.agentId} registered (${agent.tier})`,
            payload: {
                ccc: parsed.ccc,
                tier: agent.tier,
                homeInstance: agent.homeInstance,
            },
        });

        await gateway.logMetric({
            agentId: agent.agentId,
            latencyMs: Date.now() - start,
            metadata: { type: "CONNECT", eventId },
        });

        glog.agentRegistered(parsed.ccc, agent.tier);

        return NextResponse.json<GatewayResponse>(
            {
                ok: true,
                data: {
                    agentId: agent.agentId,
                    status: "registered",
                    highWaterMark: 0,
                    agents: gateway.agentRegistry.getAll(),
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
                error: { code: "VALIDATION_ERROR", message: String(error) },
                timestamp: new Date().toISOString(),
                instance: gateway.instance,
            },
            { status: 400 }
        );
    }
};
