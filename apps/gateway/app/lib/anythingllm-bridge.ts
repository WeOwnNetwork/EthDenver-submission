import { env } from "../../env";

// ═══════════════════════════════════════════════════════
// ANYTHINGLLM BRIDGE — Cross-Instance Communication
//
// Each AnythingLLM instance has an API key.
// The gateway uses these keys to send #ContextVolleys
// to agents on remote instances and get live responses.
//
// Thread routing (Option 2 + 4):
//   - Per-agent persistent threads created on first volley
//   - Cached in-memory for the gateway process lifetime
//   - Caller may override with an explicit threadSlug
//
// Without API keys → volleys stay local
// With API keys → volleys cross instances with live AI
// ═══════════════════════════════════════════════════════

// Thread cache key: "fromCCC:instanceId" → threadSlug
const threadCache = new Map<string, string>();

interface InstanceConfig {
  url: string | undefined;
  apiKey: string | undefined;
  workspace: string | undefined;
}

const INSTANCES: Record<string, InstanceConfig> = {
  "INT-E01": {
    url: env.INT_E01_URL || "https://ethdenver.ccc.bot",
    apiKey: env.INT_E01_API_KEY,
    workspace: env.INT_E01_WORKSPACE || "ccc",
  },
  "INT-P01": {
    url: env.INT_P01_URL || "https://ai.weown.agency",
    apiKey: env.INT_P01_API_KEY,
    workspace: env.INT_P01_WORKSPACE || "ccc",
  },
  "INT-OG1": {
    url: env.INT_OG1_URL || "https://ai.yonksteam.xyz",
    apiKey: env.INT_OG1_API_KEY,
    workspace: env.INT_OG1_WORKSPACE || "ccc",
  },
  "INT-P02": {
    url: env.INT_P02_URL || "https://lite.burnedout.xyz",
    apiKey: env.INT_P02_API_KEY,
    workspace: env.INT_P02_WORKSPACE || "ccc",
  },
  "INT-OG8": {
    url: env.INT_OG8_URL || "https://ai.romandid.xyz",
    apiKey: env.INT_OG8_API_KEY,
    workspace: env.INT_OG8_WORKSPACE || "ccc",
  },
};

export function isLiveInstance(instanceId: string): boolean {
  const config = INSTANCES[instanceId];
  return !!(config?.url && config?.apiKey);
}

export function getConfiguredInstances(): string[] {
  return Object.entries(INSTANCES)
    .filter(([, cfg]) => cfg.url && cfg.apiKey)
    .map(([id]) => id);
}

// Creates a named thread on the target instance for the given CCC agent.
// Returns the thread slug on success, null on failure.
async function createThread(
  instanceId: string,
  fromCcc: string
): Promise<string | null> {
  const config = INSTANCES[instanceId];
  if (!config?.url || !config?.apiKey) return null;

  try {
    const res = await fetch(
      `${config.url}/api/v1/workspace/${config.workspace}/thread/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({ name: fromCcc }),
        signal: AbortSignal.timeout(10_000),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.thread?.slug ?? null;
  } catch {
    return null;
  }
}

// Returns the cached thread slug for this agent↔instance pair,
// creating a new thread on-demand if one doesn't exist yet.
async function getOrCreateThread(
  instanceId: string,
  fromCcc: string
): Promise<string | null> {
  const key = `${fromCcc}:${instanceId}`;
  if (threadCache.has(key)) return threadCache.get(key)!;
  const slug = await createThread(instanceId, fromCcc);
  if (slug) threadCache.set(key, slug);
  return slug;
}

export async function sendToAnythingLLM(
  instanceId: string,
  fromCcc: string,
  message: string,
  threadSlug?: string  // Option 4: caller-specified thread override
): Promise<{ response: string; instanceId: string; threadSlug?: string } | null> {
  const config = INSTANCES[instanceId];
  if (!config?.url || !config?.apiKey) return null;

  // Resolve thread: explicit override → cached/auto-created → workspace default
  const resolvedSlug = threadSlug ?? await getOrCreateThread(instanceId, fromCcc);

  const endpoint = resolvedSlug
    ? `${config.url}/api/v1/workspace/${config.workspace}/thread/${resolvedSlug}/chat`
    : `${config.url}/api/v1/workspace/${config.workspace}/chat`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        message: `#ContextVolley from AI:@${fromCcc}: ${message}`,
        mode: "chat",
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return {
      response: data.textResponse || "(no response)",
      instanceId,
      threadSlug: resolvedSlug ?? undefined,
    };
  } catch (error) {
    console.error(`AnythingLLM Bridge Error (${instanceId}):`, error);
    return null;
  }
}

export async function sendToMetaAgent(
  fromCcc: string,
  message: string
): Promise<{ response: string } | null> {
  const metaThreadUrl = env.META_THREAD_URL ||
    "https://ai.weown.agency/api/v1/workspace/tools/t/cc965930-dfad-47ec-b576-22b38b1024a2/chat";
  const apiKey = env.INT_P01_API_KEY;

  if (!apiKey) return null;

  try {
    const res = await fetch(metaThreadUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        message: `SEEK:META from AI:@${fromCcc}: ${message}`,
        mode: "chat",
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return { response: data.textResponse || "(no response)" };
  } catch (error) {
    console.error("MetaAgent Bridge Error:", error);
    return null;
  }
}
