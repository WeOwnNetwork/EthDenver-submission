import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";
import { VolleySchema, type GatewayResponse } from "../lib/types";
import { glog } from "../lib/logger";
import crypto from "crypto";

export const POST = async (request: Request): Promise<Response> => {
    try {
        const body = await request.json();
        const parsed = VolleySchema.parse(body);

        const volleyId = crypto.randomUUID();
        gateway.totalVolleys++;

        // Attest if requested
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
                    ref_ccc_id: parsed.ref || "",
                    content_hash: contentHash,
                });
            });
        }

        gateway.eventLog.push({
            id: volleyId,
            type: "VOLLEY",
            agent: parsed.from,
            timestamp: new Date().toISOString(),
            summary: `🏐 ${parsed.from} → AI:@${parsed.to} (${parsed.volleyType})`,
        });

        glog.info("ContextVolley", { from: parsed.from, to: parsed.to, type: parsed.volleyType });

        return NextResponse.json<GatewayResponse>({
            ok: true,
            data: {
                volleyId,
                from: parsed.from,
                to: `AI:@${parsed.to}`,
                volleyType: parsed.volleyType,
                attested: parsed.attest,
                status: "delivered",
            },
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
