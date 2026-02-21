// ═══════════════════════════════════════════════════════
// ZUSTAND STORE — @ccc-gateway/web
//
// Persistent app state: CCC identity, LLM config,
// onboarding status, season state.
// ═══════════════════════════════════════════════════════

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PersistedChatMessage {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    agentId?: string;
    cccId?: string;
    timestamp: string;
}

export interface PersistedGatewayEvent {
    id: string;
    type: string;
    agent: string;
    summary: string;
    timestamp: string;
    cccId?: string;
    txHash?: string;
    source?: "gateway" | "onchain" | "timescaledb";
}

export interface UserSessionHistory {
    chat: PersistedChatMessage[];
    events: PersistedGatewayEvent[];
    updatedAt: string;
}

interface UserConfig {
    ccc: string | null;
    contributor: string | null;
    walletAddress: string | null;
    executionNetwork: "adi" | "base-sepolia";
    llmProvider: string | null;
    llmModel: string | null;
    llmConfig: Record<string, string>;
    onboarded: boolean;
    seasonStarted: boolean;
    sessionHistory: Record<string, UserSessionHistory>;
    tokenRegistryCache: Record<string, string | null>;
}

interface AppStore extends UserConfig {
    setCCC: (ccc: string) => void;
    setContributor: (name: string) => void;
    setWallet: (address: string) => void;
    setExecutionNetwork: (network: "adi" | "base-sepolia") => void;
    setLLM: (provider: string, model: string, config: Record<string, string>) => void;
    completeOnboarding: () => void;
    startSeason: () => void;
    getSessionKey: (walletAddress?: string | null, ccc?: string | null) => string | null;
    setChatHistory: (key: string, chat: PersistedChatMessage[]) => void;
    setEventsHistory: (key: string, events: PersistedGatewayEvent[]) => void;
    pushChatMessage: (key: string, message: PersistedChatMessage, max?: number) => void;
    pushGatewayEvent: (key: string, event: PersistedGatewayEvent, max?: number) => void;
    clearSessionHistory: (key: string) => void;
    setTokenRegistryCache: (tokens: Record<string, string | null | undefined>) => void;
    clearTokenRegistryCache: () => void;
    reset: () => void;
}

const MAX_PERSISTED_CHAT = 300;
const MAX_PERSISTED_EVENTS = 300;

const touch = () => new Date().toISOString();

export const useAppStore = create<AppStore>()(
    persist(
        (set) => ({
            ccc: null,
            contributor: null,
            walletAddress: null,
            executionNetwork: "adi",
            llmProvider: null,
            llmModel: null,
            llmConfig: {},
            onboarded: false,
            seasonStarted: false,
            sessionHistory: {},
            tokenRegistryCache: {},

            setCCC: (ccc) => set({ ccc }),
            setContributor: (contributor) => set({ contributor }),
            setWallet: (walletAddress) => set({ walletAddress }),
            setExecutionNetwork: (executionNetwork) => set({ executionNetwork }),
            setLLM: (llmProvider, llmModel, llmConfig) =>
                set({ llmProvider, llmModel, llmConfig }),
            completeOnboarding: () => set({ onboarded: true }),
            startSeason: () => set({ seasonStarted: true }),
            getSessionKey: (walletAddress, ccc) => {
                const wallet = (walletAddress || "").trim().toLowerCase();
                const code = (ccc || "").trim().toUpperCase();
                if (!wallet || !code) return null;
                return `${wallet}:${code}`;
            },
            setChatHistory: (key, chat) =>
                set((state) => ({
                    sessionHistory: {
                        ...state.sessionHistory,
                        [key]: {
                            chat: chat.slice(-MAX_PERSISTED_CHAT),
                            events: state.sessionHistory[key]?.events || [],
                            updatedAt: touch(),
                        },
                    },
                })),
            setEventsHistory: (key, events) =>
                set((state) => ({
                    sessionHistory: {
                        ...state.sessionHistory,
                        [key]: {
                            chat: state.sessionHistory[key]?.chat || [],
                            events: events.slice(-MAX_PERSISTED_EVENTS),
                            updatedAt: touch(),
                        },
                    },
                })),
            pushChatMessage: (key, message, max = MAX_PERSISTED_CHAT) =>
                set((state) => {
                    const current = state.sessionHistory[key] || {
                        chat: [],
                        events: [],
                        updatedAt: touch(),
                    };

                    return {
                        sessionHistory: {
                            ...state.sessionHistory,
                            [key]: {
                                ...current,
                                chat: [...current.chat, message].slice(-max),
                                updatedAt: touch(),
                            },
                        },
                    };
                }),
            pushGatewayEvent: (key, event, max = MAX_PERSISTED_EVENTS) =>
                set((state) => {
                    const current = state.sessionHistory[key] || {
                        chat: [],
                        events: [],
                        updatedAt: touch(),
                    };

                    const deduped = [
                        ...current.events.filter((e) => e.id !== event.id),
                        event,
                    ];

                    return {
                        sessionHistory: {
                            ...state.sessionHistory,
                            [key]: {
                                ...current,
                                events: deduped.slice(-max),
                                updatedAt: touch(),
                            },
                        },
                    };
                }),
            clearSessionHistory: (key) =>
                set((state) => {
                    const next = { ...state.sessionHistory };
                    delete next[key];
                    return { sessionHistory: next };
                }),
            setTokenRegistryCache: (tokens) =>
                set((state) => ({
                    tokenRegistryCache: {
                        ...state.tokenRegistryCache,
                        ...Object.fromEntries(
                            Object.entries(tokens).map(([k, v]) => [k, v ?? null]),
                        ),
                    },
                })),
            clearTokenRegistryCache: () => set({ tokenRegistryCache: {} }),
            reset: () =>
                set({
                    ccc: null,
                    contributor: null,
                    walletAddress: null,
                    executionNetwork: "adi",
                    llmProvider: null,
                    llmModel: null,
                    llmConfig: {},
                    onboarded: false,
                    seasonStarted: false,
                    sessionHistory: {},
                    tokenRegistryCache: {},
                }),
        }),
        { name: "ccc-gateway-config" },
    ),
);
