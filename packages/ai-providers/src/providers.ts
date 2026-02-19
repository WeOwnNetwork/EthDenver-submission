// ═══════════════════════════════════════════════════════
// @repo/ai-providers — LLM Provider Registry
//
// 6 providers: self-hosted (Ollama), bare-metal (vLLM,
// llama.cpp), cloud (OpenRouter, Together, Groq).
// ═══════════════════════════════════════════════════════

export interface LLMProvider {
    id: string;
    name: string;
    type: "self-hosted" | "bare-metal" | "cloud";
    icon: string;
    description: string;
    models: LLMModel[];
    configFields: ConfigField[];
}

export interface LLMModel {
    id: string;
    name: string;
    contextWindow: number;
    recommended?: boolean;
}

export interface ConfigField {
    key: string;
    label: string;
    type: "text" | "url" | "password" | "select";
    placeholder: string;
    required: boolean;
}

export const LLM_PROVIDERS: LLMProvider[] = [
    {
        id: "ollama",
        name: "Ollama",
        type: "self-hosted",
        icon: "🦙",
        description: "Self-hosted, fully private. Runs on your machine.",
        models: [
            { id: "llama3.2:3b", name: "Llama 3.2 (3B)", contextWindow: 128_000, recommended: true },
            { id: "llama3.2:8b", name: "Llama 3.2 (8B)", contextWindow: 128_000 },
            { id: "mistral:7b", name: "Mistral (7B)", contextWindow: 32_000 },
            { id: "qwen2.5:7b", name: "Qwen 2.5 (7B)", contextWindow: 128_000 },
            { id: "phi-3:3.8b", name: "Phi-3 (3.8B)", contextWindow: 128_000 },
        ],
        configFields: [
            { key: "baseUrl", label: "Ollama URL", type: "url", placeholder: "http://localhost:11434", required: true },
        ],
    },
    {
        id: "vllm",
        name: "vLLM",
        type: "bare-metal",
        icon: "⚡",
        description: "High-throughput inference server. GPU required.",
        models: [
            { id: "meta-llama/Llama-3.2-8B-Instruct", name: "Llama 3.2 8B", contextWindow: 128_000, recommended: true },
            { id: "mistralai/Mistral-7B-Instruct-v0.3", name: "Mistral 7B", contextWindow: 32_000 },
        ],
        configFields: [
            { key: "baseUrl", label: "vLLM URL", type: "url", placeholder: "http://localhost:8000", required: true },
            { key: "apiKey", label: "API Key", type: "password", placeholder: "Optional", required: false },
        ],
    },
    {
        id: "llamacpp",
        name: "llama.cpp",
        type: "bare-metal",
        icon: "🔧",
        description: "CPU-optimized inference. No GPU needed.",
        models: [
            { id: "llama-3.2-3b", name: "Llama 3.2 (3B GGUF)", contextWindow: 128_000, recommended: true },
        ],
        configFields: [
            { key: "baseUrl", label: "Server URL", type: "url", placeholder: "http://localhost:8080", required: true },
        ],
    },
    {
        id: "openrouter",
        name: "OpenRouter",
        type: "cloud",
        icon: "🌐",
        description: "Access 100+ models via single API.",
        models: [
            { id: "anthropic/claude-opus-4", name: "Claude Opus 4", contextWindow: 1_000_000, recommended: true },
            { id: "meta-llama/llama-3.2-70b", name: "Llama 3.2 70B", contextWindow: 128_000 },
            { id: "google/gemini-2.0-flash", name: "Gemini 2.0 Flash", contextWindow: 1_000_000 },
        ],
        configFields: [
            { key: "apiKey", label: "OpenRouter API Key", type: "password", placeholder: "sk-or-...", required: true },
        ],
    },
    {
        id: "together",
        name: "Together AI",
        type: "cloud",
        icon: "🤝",
        description: "Fast inference for open-source models.",
        models: [
            { id: "meta-llama/Llama-3.2-70B-Instruct", name: "Llama 3.2 70B", contextWindow: 128_000, recommended: true },
            { id: "mistralai/Mixtral-8x22B", name: "Mixtral 8x22B", contextWindow: 65_000 },
        ],
        configFields: [
            { key: "apiKey", label: "Together API Key", type: "password", placeholder: "tok-...", required: true },
        ],
    },
    {
        id: "groq",
        name: "Groq",
        type: "cloud",
        icon: "⚡",
        description: "Ultra-fast inference on LPU hardware.",
        models: [
            { id: "llama-3.2-70b-versatile", name: "Llama 3.2 70B", contextWindow: 128_000, recommended: true },
            { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", contextWindow: 32_768 },
        ],
        configFields: [
            { key: "apiKey", label: "Groq API Key", type: "password", placeholder: "gsk_...", required: true },
        ],
    },
    {
        id: "perplexity",
        name: "Perplexity AI",
        type: "cloud",
        icon: "🔍",
        description: "AI search engine with real-time web access.",
        models: [
            { id: "sonar", name: "Sonar", contextWindow: 128_000 },
            { id: "sonar-pro", name: "Sonar Pro", contextWindow: 128_000, recommended: true },
        ],
        configFields: [
            { key: "apiKey", label: "Perplexity API Key", type: "password", placeholder: "pplx-...", required: true },
        ],
    },
];

export function getProviderById(id: string): LLMProvider | undefined {
    return LLM_PROVIDERS.find((p) => p.id === id);
}

export function getProvidersByType(type: LLMProvider["type"]): LLMProvider[] {
    return LLM_PROVIDERS.filter((p) => p.type === type);
}
