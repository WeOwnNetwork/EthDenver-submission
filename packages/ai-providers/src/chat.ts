// ═══════════════════════════════════════════════════════
// @repo/ai-providers — Unified Chat Interface
//
// Single `callLLM()` function that routes to:
//   - Ollama (native /api/chat)
//   - vLLM / llama.cpp / cloud (OpenAI-compatible)
// ═══════════════════════════════════════════════════════
//import {} from "axios"
export interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface ChatOptions {
    providerId: string;
    model: string;
    config: Record<string, string>;
    messages: ChatMessage[];
    temperature?: number;
    maxTokens?: number;
}

export interface ChatResult {
    content: string;
    model: string;
    provider: string;
    tokensUsed?: number;
}

/** Map provider IDs to their OpenAI-compatible API base URLs */
const CLOUD_BASE_URLS: Record<string, string> = {
    openrouter: "https://openrouter.ai/api/v1",
    together: "https://api.together.xyz/v1",
    groq: "https://api.groq.com/openai/v1",
    perplexity: "https://api.perplexity.ai",
};

/**
 * Unified LLM chat function.
 * Routes to the correct API based on provider ID.
 */
export async function callLLM(options: ChatOptions): Promise<ChatResult> {
    const { providerId, model, config, messages, temperature = 0.7, maxTokens } = options;

    if (providerId === "ollama") {
        return callOllama(config.baseUrl || "http://localhost:11434", model, messages, temperature);
    }

    // vLLM, llama.cpp, and cloud providers all use OpenAI-compatible API
    const baseUrl = CLOUD_BASE_URLS[providerId] || config.baseUrl || "http://localhost:8000";
    const apiKey = config.apiKey || "";

    return callOpenAICompat(baseUrl, apiKey, model, messages, temperature, maxTokens, providerId);
}

/** Ollama native API (/api/chat) */
async function callOllama(
    baseUrl: string,
    model: string,
    messages: ChatMessage[],
    temperature: number,
): Promise<ChatResult> {
    const res = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model,
            messages,
            stream: false,
            options: { temperature },
        }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Ollama error (${res.status}): ${text}`);
    }

    const data = await res.json();
    return {
        content: data.message?.content || "",
        model,
        provider: "ollama",
        tokensUsed: data.eval_count,
    };
}

/** OpenAI-compatible API (/v1/chat/completions) */
async function callOpenAICompat(
    baseUrl: string,
    apiKey: string,
    model: string,
    messages: ChatMessage[],
    temperature: number,
    maxTokens: number | undefined,
    providerId: string,
): Promise<ChatResult> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (apiKey) {
        headers.Authorization = `Bearer ${apiKey}`;
    }

    const body: Record<string, unknown> = {
        model,
        messages,
        temperature,
    };
    if (maxTokens) body.max_tokens = maxTokens;

    const res = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`${providerId} error (${res.status}): ${text}`);
    }

    const data = await res.json();
    return {
        content: data.choices?.[0]?.message?.content || "",
        model,
        provider: providerId,
        tokensUsed: data.usage?.total_tokens,
    };
}
