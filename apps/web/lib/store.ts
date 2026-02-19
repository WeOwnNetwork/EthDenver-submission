// ═══════════════════════════════════════════════════════
// ZUSTAND STORE — @ccc-gateway/web
//
// Persistent app state: CCC identity, LLM config,
// onboarding status, season state.
// ═══════════════════════════════════════════════════════

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserConfig {
    ccc: string | null;
    contributor: string | null;
    walletAddress: string | null;
    llmProvider: string | null;
    llmModel: string | null;
    llmConfig: Record<string, string>;
    onboarded: boolean;
    seasonStarted: boolean;
}

interface AppStore extends UserConfig {
    setCCC: (ccc: string) => void;
    setContributor: (name: string) => void;
    setWallet: (address: string) => void;
    setLLM: (provider: string, model: string, config: Record<string, string>) => void;
    completeOnboarding: () => void;
    startSeason: () => void;
    reset: () => void;
}

export const useAppStore = create<AppStore>()(
    persist(
        (set) => ({
            ccc: null,
            contributor: null,
            walletAddress: null,
            llmProvider: null,
            llmModel: null,
            llmConfig: {},
            onboarded: false,
            seasonStarted: false,

            setCCC: (ccc) => set({ ccc }),
            setContributor: (contributor) => set({ contributor }),
            setWallet: (walletAddress) => set({ walletAddress }),
            setLLM: (llmProvider, llmModel, llmConfig) =>
                set({ llmProvider, llmModel, llmConfig }),
            completeOnboarding: () => set({ onboarded: true }),
            startSeason: () => set({ seasonStarted: true }),
            reset: () =>
                set({
                    ccc: null,
                    contributor: null,
                    walletAddress: null,
                    llmProvider: null,
                    llmModel: null,
                    llmConfig: {},
                    onboarded: false,
                    seasonStarted: false,
                }),
        }),
        { name: "ccc-gateway-config" },
    ),
);
