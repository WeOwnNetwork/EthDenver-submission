"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
    LLM_PROVIDERS,
    type LLMProvider,
    type LLMModel,
} from "@repo/ai-providers/providers";
import { useConnectAgent } from "@/lib/gateway-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Rocket, Loader2 } from "lucide-react";

type Step = "ccc" | "llm" | "confirm";
const STEPS: Step[] = ["ccc", "llm", "confirm"];

export function OnboardingFlow() {
    const [step, setStep] = useState<Step>("ccc");
    const { address } = useAccount();
    const store = useAppStore();
    const connectAgent = useConnectAgent();

    // ── Step 1: CCC Code ──
    const [ccc, setCcc] = useState("");
    const [contributor, setContributor] = useState("");

    // ── Step 2: LLM ──
    const [selectedProvider, setSelectedProvider] =
        useState<LLMProvider | null>(null);
    const [selectedModel, setSelectedModel] = useState<LLMModel | null>(null);
    const [llmConfig, setLlmConfig] = useState<Record<string, string>>({});

    const currentStepIndex = STEPS.indexOf(step);

    const handleCCCSubmit = () => {
        if (ccc.length !== 3) return;
        store.setCCC(ccc.toUpperCase());
        store.setContributor(contributor || ccc);
        store.setWallet(address || "");
        setStep("llm");
    };

    const handleLLMSubmit = () => {
        if (!selectedProvider || !selectedModel) return;
        store.setLLM(selectedProvider.id, selectedModel.id, llmConfig);
        setStep("confirm");
    };

    const handleConfirm = async () => {
        try {
            await connectAgent.mutateAsync({
                ccc: store.ccc!,
                contributor: store.contributor || undefined,
                role: "tool_agent",
                tier: "contributor",
                baseAddress: address,
            });
            store.completeOnboarding();
            toast.success(`Welcome, AI:@${store.ccc}! 🤝`);
        } catch (err) {
            toast.error(`Registration failed: ${err}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[hsl(222,47%,6%)] relative overflow-hidden p-4">
            <div className="absolute inset-0 bg-grid" />
            <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />

            <div className="max-w-2xl w-full relative z-10">
                {/* Wallet indicator */}
                <div className="text-center mb-4 flex items-center justify-center gap-2">
                    <Badge variant="secondary" className="font-mono text-xs">
                        🔗 {address?.slice(0, 6)}…{address?.slice(-4)}
                    </Badge>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                    <Progress value={((currentStepIndex + 1) / STEPS.length) * 100} className="h-1.5 mb-3" />
                    <div className="flex items-center justify-center gap-3">
                        {STEPS.map((s, i) => (
                            <div key={s} className="flex items-center gap-3">
                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step === s
                                            ? "gradient-fedarch text-white shadow-lg shadow-emerald-500/20 scale-110"
                                            : currentStepIndex > i
                                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                                : "bg-slate-800/60 text-slate-500 border border-slate-700/50"
                                        }`}
                                >
                                    {currentStepIndex > i ? "✓" : i + 1}
                                </div>
                                {i < 2 && (
                                    <div className={`w-12 h-0.5 transition-colors duration-300 ${currentStepIndex > i ? "bg-emerald-500/30" : "bg-slate-800"
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {/* ── STEP 1: CCC Code ── */}
                    {step === "ccc" && (
                        <motion.div
                            key="ccc"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="glass rounded-2xl p-8 glow-emerald"
                        >
                            <h2 className="text-2xl font-bold mb-2">
                                <span className="gradient-fedarch-text">Your CCC Code</span>
                            </h2>
                            <p className="text-slate-400 text-sm mb-6">
                                Choose your 3-letter Contributor Code Convention identifier.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-xs text-slate-400 uppercase tracking-wider">
                                        CCC Code
                                    </Label>
                                    <Input
                                        value={ccc}
                                        onChange={(e) =>
                                            setCcc(
                                                e.target.value
                                                    .toUpperCase()
                                                    .replace(/[^A-Z]/g, "")
                                                    .slice(0, 3),
                                            )
                                        }
                                        placeholder="LDC"
                                        maxLength={3}
                                        className="mt-1 bg-slate-900/50 border-slate-700/50 text-3xl font-mono text-center tracking-[0.5em] uppercase h-14"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-400 uppercase tracking-wider">
                                        Your Name
                                    </Label>
                                    <Input
                                        value={contributor}
                                        onChange={(e) => setContributor(e.target.value)}
                                        placeholder="Dhruv"
                                        className="mt-1 bg-slate-900/50 border-slate-700/50 h-12"
                                    />
                                </div>
                                <Button
                                    onClick={handleCCCSubmit}
                                    disabled={ccc.length !== 3}
                                    variant="gradient"
                                    size="lg"
                                    className="w-full"
                                >
                                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* ── STEP 2: LLM Selection ── */}
                    {step === "llm" && (
                        <motion.div
                            key="llm"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="glass rounded-2xl p-8 glow-cyan"
                        >
                            <h2 className="text-2xl font-bold mb-2">
                                <span className="gradient-fedarch-text">Select Your LLM</span>
                            </h2>
                            <p className="text-slate-400 text-sm mb-6">
                                Choose your inference provider for the CCC season.
                            </p>

                            {/* Provider Type Labels */}
                            <div className="flex gap-2 mb-4">
                                {(
                                    [
                                        "self-hosted",
                                        "bare-metal",
                                        "cloud",
                                    ] as const
                                ).map((type) => (
                                    <Badge
                                        key={type}
                                        variant={type === "self-hosted" ? "emerald" : type === "bare-metal" ? "cyan" : "violet"}
                                    >
                                        {type === "self-hosted"
                                            ? "🏠 Self-Hosted"
                                            : type === "bare-metal"
                                                ? "🖥️ Bare Metal"
                                                : "☁️ Cloud"}
                                    </Badge>
                                ))}
                            </div>

                            {/* Provider Cards */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {LLM_PROVIDERS.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => {
                                            setSelectedProvider(p);
                                            setSelectedModel(
                                                p.models.find(
                                                    (m) => m.recommended,
                                                ) || p.models[0] || null,
                                            );
                                        }}
                                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer hover:scale-[1.02] ${selectedProvider?.id === p.id
                                            ? "border-emerald-500/50 bg-emerald-950/20 glow-emerald"
                                            : "border-slate-700/50 hover:border-slate-600 bg-slate-800/30"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-lg">{p.icon}</span>
                                            <span className="font-semibold text-white text-sm">
                                                {p.name}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 line-clamp-1">
                                            {p.description}
                                        </p>
                                    </button>
                                ))}
                            </div>

                            {/* Model + Config */}
                            {selectedProvider && (
                                <div className="space-y-3 pt-4">
                                    <Separator className="opacity-20 -mt-3 mb-3" />
                                    <div>
                                        <Label className="text-xs text-slate-400 uppercase tracking-wider">
                                            Model
                                        </Label>
                                        <select
                                            value={selectedModel?.id || ""}
                                            onChange={(e) =>
                                                setSelectedModel(
                                                    selectedProvider.models.find(
                                                        (m) => m.id === e.target.value,
                                                    ) || null,
                                                )
                                            }
                                            className="w-full mt-1 px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                                        >
                                            {selectedProvider.models.map(
                                                (m) => (
                                                    <option key={m.id} value={m.id}>
                                                        {m.name} ({(m.contextWindow / 1000).toFixed(0)}K ctx)
                                                        {m.recommended ? " ⭐" : ""}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>
                                    {selectedProvider.configFields.map(
                                        (field) => (
                                            <div key={field.key}>
                                                <Label className="text-xs text-slate-400 uppercase tracking-wider">
                                                    {field.label}
                                                </Label>
                                                <Input
                                                    type={field.type === "password" ? "password" : "text"}
                                                    value={llmConfig[field.key] || ""}
                                                    onChange={(e) =>
                                                        setLlmConfig({
                                                            ...llmConfig,
                                                            [field.key]: e.target.value,
                                                        })
                                                    }
                                                    placeholder={field.placeholder}
                                                    className="mt-1 bg-slate-900/50 border-slate-700/50"
                                                />
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}

                            <div className="flex gap-3 mt-6">
                                <Button
                                    onClick={() => setStep("ccc")}
                                    variant="outline"
                                    size="lg"
                                    className="flex-1"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                </Button>
                                <Button
                                    onClick={handleLLMSubmit}
                                    disabled={!selectedProvider || !selectedModel}
                                    variant="gradient"
                                    size="lg"
                                    className="flex-1"
                                >
                                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* ── STEP 3: Confirm ── */}
                    {step === "confirm" && (
                        <motion.div
                            key="confirm"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="glass rounded-2xl p-8 glow-violet"
                        >
                            <h2 className="text-2xl font-bold mb-6">
                                <span className="gradient-fedarch-text">Confirm Setup</span>
                            </h2>

                            <div className="space-y-3 mb-6">
                                <Row label="CCC Code" value={store.ccc || ""} />
                                <Row label="Agent ID" value={`AI:@${store.ccc}`} />
                                <Row label="Contributor" value={store.contributor || ""} />
                                <Row label="Wallet" value={address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "—"} />
                                <Row label="LLM Provider" value={selectedProvider?.name || ""} />
                                <Row label="Model" value={selectedModel?.name || ""} />
                                <Row label="Season" value="#WeOwnSeason003" />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    onClick={() => setStep("llm")}
                                    variant="outline"
                                    size="lg"
                                    className="flex-1"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                </Button>
                                <Button
                                    onClick={handleConfirm}
                                    disabled={connectAgent.isPending}
                                    variant="gradient"
                                    size="lg"
                                    className="flex-1"
                                >
                                    {connectAgent.isPending ? (
                                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Registering...</>
                                    ) : (
                                        <><Rocket className="w-4 h-4 mr-2" /> Launch Gateway</>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between py-2.5 border-b border-slate-800/50">
            <span className="text-slate-500 text-sm">{label}</span>
            <span className="text-white font-mono text-sm">{value}</span>
        </div>
    );
}
