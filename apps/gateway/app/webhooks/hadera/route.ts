import { glog } from "../../lib/logger";
import { NextResponse } from "next/server";

export const POST = async (request: Request): Promise<Response> => {
    try {
        const body = await request.json();

        glog.info("Hedera webhook received", {
            topicId: body.topicId,
            sequenceNumber: body.sequenceNumber,
        });

        // Process HCS mirror node events
        // (e.g., confirm attestation receipt)

        return NextResponse.json({ ok: true });
    } catch (error) {
        glog.error("Hedera webhook error", { error });
        return NextResponse.json({ ok: false }, { status: 500 });
    }
};
