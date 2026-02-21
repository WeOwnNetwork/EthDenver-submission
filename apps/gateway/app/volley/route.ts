import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";
import { VolleySchema, type GatewayResponse } from "../lib/types";
import { glog } from "../lib/logger";
import { sendToAnythingLLM, sendToMetaAgent } from "../lib/anythingllm-bridge";
import crypto from "crypto";

export const POST = async (request: Request): Promise<Response> => {
    const start = Date.now();
    try {
        const body = await request.json();
        const parsed = VolleySchema.parse(body);

        const volleyId = crypto.randomUUID();
        gateway.totalVolleys++;

        // Step 1: Resolve target instance
        const targetAgent = gateway.agentRegistry.get(parsed.to);
        const homeInstance = targetAgent?.homeInstance || "INT-E01";

        // Step 2: Generate CCC-ID for this volley
        const cccId = gateway.cccGen.generate(parsed.from, 0);
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
        gateway.agentRegistry.incrementCCCId(parsed.from);

        // Step 3: Forward to AnythingLLM (if remote or configured)
        let aiResponse = "";
        let deliveryStatus = "delivered";

        if (parsed.volleyType === "SEEK" && parsed.to === "GTM") {
            // Special handling for SEEK to GTM as per diagram 2
            const result = await sendToAnythingLLM(homeInstance, parsed.from, JSON.stringify(parsed.content));
            if (result) {
                aiResponse = result.response;
            } else {
                deliveryStatus = "forwarded";
            }
        } else if (parsed.ref?.startsWith("SEEK:META")) {
             const result = await sendToMetaAgent(parsed.from, JSON.stringify(parsed.content));
             if (result) aiResponse = result.response;
        } else {
            // Generic forwarding
            const result = await sendToAnythingLLM(homeInstance, parsed.from, JSON.stringify(parsed.content));
            if (result) aiResponse = result.response;
        }

        // Step 4: Attest to HCS (parallel-ish)
        if (parsed.attest) {
            const contentHash = crypto
                .createHash("sha256")
                .update(JSON.stringify(parsed.content || ""))
                .digest("hex");

            await gateway.attestSafe(async () => {
                await gateway.hcs.attestContextVolley({
                    volley_id: volleyId,
                    from: parsed.from,
                    to: `AI:@${parsed.to}`,
                    volley_type: parsed.volleyType,
                    ref_ccc_id: cccId.id,
                    content_hash: contentHash,
                });
            });
        }

        // Step 5: Onchain Record (Base Reputation - Placeholder for now)
        // In a real implementation, we would call a contract here
        // await gateway.base.giveReputation(parsed.from, 5); 

        await gateway.recordGatewayEvent({
            id: volleyId,
            type: "VOLLEY",
            agent: parsed.from,
            summary: `🏐 ${parsed.from} → AI:@${parsed.to} (${parsed.volleyType}) [${cccId}]`,
            payload: { 
                to: `AI:@${parsed.to}`, 
                attested: parsed.attest,
                cccId: cccId.id,
                aiResponse: aiResponse.substring(0, 500), // Truncate if too long
                instance: homeInstance
            },
            status: deliveryStatus
        });

        await gateway.logMetric({
            agentId: parsed.from,
            latencyMs: Date.now() - start,
            metadata: { type: "VOLLEY", volleyType: parsed.volleyType, cccId: cccId.id }
        });

        glog.info("ContextVolley", { from: parsed.from, to: parsed.to, type: parsed.volleyType, cccId: cccId.id });

        return NextResponse.json<GatewayResponse>({
            ok: true,
            data: {
                volleyId,
                from: parsed.from,
                to: `AI:@${parsed.to}`,
                volleyType: parsed.volleyType,
                attested: parsed.attest,
                status: deliveryStatus,
                response: aiResponse || undefined,
                cccId: cccId.id,
            },
            timestamp: new Date().toISOString(),
            instance: gateway.instance,
        });
    } catch (error) {
        console.error("Volley Error:", error);
        return NextResponse.json<GatewayResponse>(
            { ok: false, error: { code: "ERROR", message: String(error) }, timestamp: new Date().toISOString(), instance: gateway.instance },
            { status: 400 }
        );
    }
};
