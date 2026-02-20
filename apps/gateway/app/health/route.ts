import { gateway } from "../lib/gateway";

export const GET = async (): Promise<Response> =>
    Response.json({
        status: "healthy",
        ...(await gateway.getStats()),
    });
