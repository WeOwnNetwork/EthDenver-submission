import { glog } from "../../lib/logger";
import { NextResponse } from "next/server";
import { gateway } from "../../lib/gateway";
import crypto from "crypto";

export const POST = async (request: Request): Promise<Response> => {
    try {
        const body = await request.json();

        glog.info("Hedera webhook received", {
            topicId: body.topicId,
            sequenceNumber: body.sequenceNumber,
        });

        await gateway.recordGatewayEvent({
            id: crypto.randomUUID(),
            type: "HEDERA_WEBHOOK",
            agent: "AI:@HEDERA",
            summary: `Webhook topic ${body.topicId || "unknown"} seq ${body.sequenceNumber || "-"}`,
            topicId: typeof body.topicId === "string" ? body.topicId : undefined,
            payload: body,
            status: "received",
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        glog.error("Hedera webhook error", { error });
        return NextResponse.json({ ok: false }, { status: 500 });
    }
};
