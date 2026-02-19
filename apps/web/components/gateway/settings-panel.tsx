"use client";

import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useAppStore } from "@/lib/store";
import {
    LLM_PROVIDERS,
    type LLMProvider,
    type LLMModel,
} from "@repo/ai-providers/providers";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save, Trash2, LogOut, X } from "lucide-react";

interface SettingsPanelProps {
    onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
    const store = useAppStore();
    const { address } = useAccount();
    const { disconnect } = useDisconnect();

    // Profile
    const [ccc, setCcc] = useState(store.ccc || "");
    const [contributor, setContributor] = useState(store.contributor || "");

    // LLM
    const currentProvider = LLM_PROVIDERS.find(p => p.id === store.llmProvider);
    const [selectedProvider, setSelectedProvider] = useState<LLMProvider | null>(currentProvider || null);
    const currentModel = currentProvider?.models.find(m => m.id === store.llmModel);
    const [selectedModel, setSelectedModel] = useState<LLMModel | null>(currentModel || null);
    const [llmConfig, setLlmConfig] = useState<Record<string, string>>(store.llmConfig || {});

    const handleSaveProfile = () => {
        if (ccc.length !== 3) {
            toast.error("CCC code must be exactly 3 letters");
            return;
        }
        store.setCCC(ccc.toUpperCase());
        store.setContributor(contributor || ccc);
        toast.success("Profile updated");
    };

    const handleSaveLLM = () => {
        if (!selectedProvider || !selectedModel) {
            toast.error("Select a provider and model");
            return;
        }
        store.setLLM(selectedProvider.id, selectedModel.id, llmConfig);
        toast.success(`LLM updated to ${selectedProvider.name} / ${selectedModel.name}`);
    };

    const handleReset = () => {
        store.reset();
        toast.success("Session reset — redirecting to onboarding");
        onClose();
    };

    const handleDisconnect = () => {
        store.reset();
        disconnect();
        toast.success("Wallet disconnected");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-end">
            <div className="w-full max-w-lg h-full bg-slate-950 border-l border-slate-800/50 overflow-y-auto animate-in slide-in-from-right">
                {/* Header */}
                <div className="sticky top-0 z-10 glass border-b border-slate-800/50 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold gradient-fedarch-text">Settings</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <div className="p-6 space-y-6">
                    {/* ── Profile Section ── */}
                    <Card className="bg-slate-900/50 border-slate-800/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm uppercase tracking-wider text-slate-400">Profile</CardTitle>
                            <CardDescription>Your CCC identity</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <Label className="text-xs text-slate-500">Wallet</Label>
                                <p className="text-sm font-mono text-slate-300 mt-1">
                                    {address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "—"}
                                </p>
                            </div>
                            <div>
                                <Label className="text-xs text-slate-500">CCC Code</Label>
                                <Input
                                    value={ccc}
                                    onChange={(e) => setCcc(e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3))}
                                    placeholder="LDC"
                                    maxLength={3}
                                    className="mt-1 bg-slate-800/50 border-slate-700/50 font-mono uppercase tracking-widest"
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-slate-500">Contributor Name</Label>
                                <Input
                                    value={contributor}
                                    onChange={(e) => setContributor(e.target.value)}
                                    placeholder="Dhruv"
                                    className="mt-1 bg-slate-800/50 border-slate-700/50"
                                />
                            </div>
                            <Button onClick={handleSaveProfile} variant="outline" size="sm" className="w-full">
                                <Save className="w-3 h-3 mr-2" /> Save Profile
                            </Button>
                        </CardContent>
                    </Card>

                    {/* ── LLM Provider Section ── */}
                    <Card className="bg-slate-900/50 border-slate-800/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm uppercase tracking-wider text-slate-400">LLM Provider</CardTitle>
                            <CardDescription>
                                Current: {currentProvider ? `${currentProvider.icon} ${currentProvider.name}` : "None"}
                                {currentModel ? ` / ${currentModel.name}` : ""}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {/* Provider grid */}
                            <div className="grid grid-cols-2 gap-2">
                                {LLM_PROVIDERS.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => {
                                            setSelectedProvider(p);
                                            setSelectedModel(p.models.find(m => m.recommended) || p.models[0] || null);
                                        }}
                                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer text-xs ${selectedProvider?.id === p.id
                                                ? "border-emerald-500/50 bg-emerald-950/20"
                                                : "border-slate-700/50 hover:border-slate-600 bg-slate-800/30"
                                            }`}
                                    >
                                        <span className="mr-1">{p.icon}</span>
                                        <span className="font-medium text-white">{p.name}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Model select */}
                            {selectedProvider && (
                                <>
                                    <div>
                                        <Label className="text-xs text-slate-500">Model</Label>
                                        <select
                                            value={selectedModel?.id || ""}
                                            onChange={(e) =>
                                                setSelectedModel(
                                                    selectedProvider.models.find(m => m.id === e.target.value) || null
                                                )
                                            }
                                            className="w-full mt-1 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        >
                                            {selectedProvider.models.map((m) => (
                                                <option key={m.id} value={m.id}>
                                                    {m.name} ({(m.contextWindow / 1000).toFixed(0)}K)
                                                    {m.recommended ? " ⭐" : ""}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {selectedProvider.configFields.map((field) => (
                                        <div key={field.key}>
                                            <Label className="text-xs text-slate-500">{field.label}</Label>
                                            <Input
                                                type={field.type === "password" ? "password" : "text"}
                                                value={llmConfig[field.key] || ""}
                                                onChange={(e) =>
                                                    setLlmConfig({ ...llmConfig, [field.key]: e.target.value })
                                                }
                                                placeholder={field.placeholder}
                                                className="mt-1 bg-slate-800/50 border-slate-700/50"
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                            <Button onClick={handleSaveLLM} variant="outline" size="sm" className="w-full">
                                <Save className="w-3 h-3 mr-2" /> Save LLM
                            </Button>
                        </CardContent>
                    </Card>

                    {/* ── Session Section ── */}
                    <Card className="bg-slate-900/50 border-red-900/30">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm uppercase tracking-wider text-red-400">Danger Zone</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button onClick={handleReset} variant="outline" size="sm" className="w-full border-amber-700/50 text-amber-400 hover:bg-amber-950/30">
                                <Trash2 className="w-3 h-3 mr-2" /> Reset Onboarding
                            </Button>
                            <Button onClick={handleDisconnect} variant="outline" size="sm" className="w-full border-red-700/50 text-red-400 hover:bg-red-950/30">
                                <LogOut className="w-3 h-3 mr-2" /> Disconnect Wallet
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
