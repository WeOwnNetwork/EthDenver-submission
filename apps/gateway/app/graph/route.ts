import { NextResponse } from "next/server";
import { gateway } from "../lib/gateway";

export const GET = async (): Promise<Response> => {
    if (!gateway.timescale) {
        return NextResponse.json(
            {
                ok: false,
                error: "TimescaleDB is not configured",
            },
            { status: 503 }
        );
    }

    try {
        const result = await gateway.timescale.query<{ graph: unknown }>(
            "SELECT graph FROM network_graph LIMIT 1"
        );

        const graph = result.rows[0]?.graph as
            | {
                  nodes?: unknown[];
                  edges?: unknown[];
                  stats?: Record<string, unknown>;
              }
            | undefined;

        return NextResponse.json({
            ok: true,
            nodes: graph?.nodes ?? [],
            edges: graph?.edges ?? [],
            stats: graph?.stats ?? {
                total_nodes: 0,
                total_edges: 0,
                handshakes: 0,
                cross_instance_volleys_1h: 0,
            },
        });
    } catch (error) {
        return NextResponse.json(
            { ok: false, error: String(error) },
            { status: 500 }
        );
    }
};
