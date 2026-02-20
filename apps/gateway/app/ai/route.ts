import { NextResponse } from "next/server";
import { callLLM, type ChatMessage } from "@repo/ai-providers/chat";
import { env } from "../../env";
import { gateway } from "../lib/gateway";
import crypto from "crypto";

export const POST = async (request: Request): Promise<Response> => {
    const start = Date.now();
    try {
        const body = await request.json();
        const { providerId, model, messages, temperature, maxTokens, config = {} } = body;

        if (!providerId || !model || !messages) {
            return NextResponse.json(
                { ok: false, error: "Missing required fields: providerId, model, messages" },
                { status: 400 }
            );
        }

        // Use gateway's OpenAI key if not provided in config
        const finalConfig = { ...config };
        if (providerId === "openai" && !finalConfig.apiKey && env.OPENAI_API_KEY) {
            finalConfig.apiKey = env.OPENAI_API_KEY;
        }

        const result = await callLLM({
            providerId,
            model,
            config: finalConfig,
            messages: messages as ChatMessage[],
            temperature,
            maxTokens,
        });

        const durationMs = Date.now() - start;

        // Log LLM call to TimescaleDB
        const agentId = (messages[messages.length - 1] as ChatMessage).role === 'user' 
            ? 'user' 
            : 'system'; // Simple heuristic for now

        await gateway.logEvent({
            eventId: crypto.randomUUID(),
            agentId: agentId,
            eventType: `LLM_CALL_${providerId.toUpperCase()}`,
            payload: { model, durationMs, tokensUsed: result.tokensUsed },
        });

        await gateway.logMetric({
            agentId: agentId,
            latencyMs: durationMs,
            metadata: { type: "LLM_CALL", provider: providerId, model }
        });

        return NextResponse.json({
            ok: true,
            data: result,
            timestamp: new Date().toISOString(),
            instance: gateway.instance,
        });
    } catch (error) {
        console.error("AI Proxy Error:", error);
        return NextResponse.json(
            {
                ok: false,
                error: { code: "AI_PROXY_ERROR", message: String(error) },
                timestamp: new Date().toISOString(),
                instance: gateway.instance,
            },
            { status: 500 }
        );
    }
};
