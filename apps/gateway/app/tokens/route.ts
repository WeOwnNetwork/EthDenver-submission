import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";

// List token registry & bootstrap new tokens on Hedera testnet
// GET /tokens  → return current token registry
// POST /tokens → run bootstrapTokenRegistry()

export async function GET() {
    try {
        // Return token registry from env or gateway state
        const tokens = {
            CCC_TOKEN: process.env.CCC_TOKEN || null,
            CCCID_NFT: process.env.CCCID_NFT || null,
            AGENT_ID_NFT: process.env.AGENT_ID_NFT || null,
            COOP_MEMBER_NFT: process.env.COOP_MEMBER_NFT || null,
            GOV_TOKEN: process.env.GOV_TOKEN || null,
        };

        const hcsTopics = {
            CCC_ID: process.env.HCS_TOPIC_CCC_ID || null,
            CONTEXT_VOLLEY: process.env.HCS_TOPIC_CONTEXT_VOLLEY || null,
            GOVERNANCE: process.env.HCS_TOPIC_GOVERNANCE || null,
            VSA: process.env.HCS_TOPIC_VSA || null,
            AGENT_REGISTRY: process.env.HCS_TOPIC_AGENT_REGISTRY || null,
            SEASON: process.env.HCS_TOPIC_SEASON || null,
        };

        const hederaAccount = process.env.HEDERA_ACCOUNT_ID || null;

        return NextResponse.json({
            ok: true,
            data: {
                tokens,
                hcsTopics,
                hederaAccount,
                hcsStats: gateway.hcs.getStats(),
            },
        });
    } catch (err: unknown) {
        return NextResponse.json(
            { ok: false, error: String(err) },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const action = body.action as string;

        if (action === "bootstrap") {
            // Dynamic import to avoid loading Hedera SDK on every request
            const { bootstrapTokenRegistry } = await import("@repo/hedera/tokens");
            const registry = await bootstrapTokenRegistry();
            return NextResponse.json({ ok: true, data: { registry } });
        }

        if (action === "mint-ccc") {
            const { mintCCCReward } = await import("@repo/hedera/tokens");
            const result = await mintCCCReward(
                body.tokenId,
                body.cccId,
                body.sequence || 4,
            );
            return NextResponse.json({ ok: true, data: result });
        }

        if (action === "mint-agent-id") {
            const { mintAgentId } = await import("@repo/hedera/tokens");
            const result = await mintAgentId(body.tokenId, body.metadata);
            return NextResponse.json({ ok: true, data: result });
        }

        if (action === "mint-ccc-id-nft") {
            const { mintCCCIdNFT } = await import("@repo/hedera/tokens");
            const result = await mintCCCIdNFT(body.tokenId, body.metadata);
            return NextResponse.json({ ok: true, data: result });
        }

        if (action === "freeze-bad-agent") {
            const { freezeBadAgent } = await import("@repo/hedera/tokens");
            const txId = await freezeBadAgent(
                body.cccTokenId,
                body.agentAccountId,
                body.reason,
            );
            return NextResponse.json({ ok: true, data: { transactionId: txId } });
        }

        if (action === "pause-token") {
            const { pauseForSeasonTransition } = await import("@repo/hedera/tokens");
            const txId = await pauseForSeasonTransition(body.tokenId);
            return NextResponse.json({ ok: true, data: { transactionId: txId } });
        }

        return NextResponse.json(
            { ok: false, error: `Unknown action: ${action}` },
            { status: 400 },
        );
    } catch (err: unknown) {
        return NextResponse.json(
            { ok: false, error: String(err) },
            { status: 500 },
        );
    }
}
