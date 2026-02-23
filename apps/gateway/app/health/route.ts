import { gateway } from "../lib/gateway";

export const GET = async (): Promise<Response> => {
    try {
        return Response.json({
            status: "healthy",
            ...(await gateway.getStats()),
        });
    } catch (err) {
        return Response.json({
            status: "degraded",
            error: String(err),
        });
    }
};
