import { gateway } from "../lib/gateway";

export const GET = (): Response =>
    Response.json({
        status: "healthy",
        ...gateway.getStats(),
    });
