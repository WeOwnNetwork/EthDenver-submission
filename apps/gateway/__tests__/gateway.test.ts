import { expect, test, describe } from "vitest";
import { GET } from "../app/health/route";

describe("CCC Gateway API", () => {
    test("Health check returns gateway stats", async () => {
        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.status).toBe("healthy");
        expect(data.instance).toBeDefined();
        expect(data.season).toBeDefined();
        expect(data.registeredAgents).toBeDefined();
        expect(data.totalCCCIds).toBeDefined();
    });
});
