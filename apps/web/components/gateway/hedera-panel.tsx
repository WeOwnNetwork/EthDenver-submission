"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { useTokenRegistry, useTokenAction } from "@/lib/gateway-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Coins, Fingerprint, Users, ShieldCheck, Vote,
    Rocket, Zap, Pause, AlertTriangle, Hash,
    ExternalLink, Copy, CheckCircle,
} from "lucide-react";

// ═══════════════════════════════════════════════════════
// TOKEN CARD
// ═══════════════════════════════════════════════════════

interface TokenDef {
    key: string;
    name: string;
    symbol: string;
    type: "Fungible" | "NFT";
    icon: typeof Coins;
    color: string;
}

const TOKEN_DEFS: TokenDef[] = [
    { key: "CCC_TOKEN", name: "$CCC Contribution Token", symbol: "CCC", type: "Fungible", icon: Coins, color: "text-emerald-400" },
    { key: "CCCID_NFT", name: "CCC-ID Certificate", symbol: "CCCID", type: "NFT", icon: Fingerprint, color: "text-cyan-400" },
    { key: "AGENT_ID_NFT", name: "Agent Identity", symbol: "AGENTID", type: "NFT", icon: Users, color: "text-violet-400" },
    { key: "COOP_MEMBER_NFT", name: "Co-op Membership", symbol: "COOP", type: "NFT", icon: ShieldCheck, color: "text-amber-400" },
    { key: "GOV_TOKEN", name: "Governance Token", symbol: "GOV", type: "Fungible", icon: Vote, color: "text-rose-400" },
];

function TokenCard({ def, tokenId }: { def: TokenDef; tokenId: string | null }) {
    const Icon = def.icon;
    const [copied, setCopied] = useState(false);

    const copyId = () => {
        if (tokenId) {
            navigator.clipboard.writeText(tokenId);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    return (
        <Card className="bg-slate-900/50 border-slate-800/50 hover:border-slate-700/50 transition-all">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-slate-800/50 ${def.color}`}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">{def.name}</p>
                            <p className="text-xs text-slate-500">{def.symbol} · {def.type}</p>
                        </div>
                    </div>
                    <Badge variant={tokenId ? "emerald" : "secondary"} className="text-[10px]">
                        {tokenId ? "Active" : "Not Created"}
                    </Badge>
                </div>
                {tokenId && (
                    <div className="mt-3 flex items-center gap-2">
                        <code className="text-[11px] text-slate-400 bg-slate-800/60 px-2 py-1 rounded font-mono flex-1 truncate">
                            {tokenId}
                        </code>
                        <button onClick={copyId} className="text-slate-500 hover:text-white transition-colors">
                            {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <a
                            href={`https://hashscan.io/testnet/token/${tokenId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-cyan-400 transition-colors"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// ═══════════════════════════════════════════════════════
// MAIN PANEL
// ═══════════════════════════════════════════════════════

export function HederaPanel() {
    const { data, isLoading, error } = useTokenRegistry();
    const mutation = useTokenAction();
    const { ccc } = useAppStore();

    // Mint form state
    const [mintTokenId, setMintTokenId] = useState("");
    const [mintCccId, setMintCccId] = useState("");
    const [mintSequence, setMintSequence] = useState("4");

    // Enforcement form state
    const [freezeTokenId, setFreezeTokenId] = useState("");
    const [freezeAccountId, setFreezeAccountId] = useState("");
    const [freezeReason, setFreezeReason] = useState("");
    const [pauseTokenId, setPauseTokenId] = useState("");

    const registry = data?.data;

    const handleAction = async (action: string, payload: Record<string, unknown>, label: string) => {
        try {
            await mutation.mutateAsync({ action, ...payload });
            toast.success(`✅ ${label} — success`);
        } catch (err) {
            toast.error(`❌ ${label} failed: ${err}`);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4 p-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-xl" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <Card className="bg-red-950/20 border-red-800/50">
                <CardContent className="p-6 text-center">
                    <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <p className="text-sm text-red-300">Failed to load Hedera registry</p>
                    <p className="text-xs text-red-500 mt-1">{String(error)}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Account info bar */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800/50">
                <Hash className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-slate-400">Hedera Account:</span>
                <code className="text-xs font-mono text-cyan-300">{registry?.hederaAccount || "—"}</code>
                <span className="ml-auto text-xs text-slate-500">
                    HCS Messages: <strong className="text-white">{registry?.hcsStats?.messageCount ?? 0}</strong>
                </span>
            </div>

            <Tabs defaultValue="tokens" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border border-slate-800/50 h-10">
                    <TabsTrigger value="tokens" className="text-xs data-[state=active]:bg-slate-800">
                        <Coins className="w-3 h-3 mr-1" /> Tokens
                    </TabsTrigger>
                    <TabsTrigger value="mint" className="text-xs data-[state=active]:bg-slate-800">
                        <Zap className="w-3 h-3 mr-1" /> Mint
                    </TabsTrigger>
                    <TabsTrigger value="hcs" className="text-xs data-[state=active]:bg-slate-800">
                        <Hash className="w-3 h-3 mr-1" /> HCS
                    </TabsTrigger>
                    <TabsTrigger value="enforce" className="text-xs data-[state=active]:bg-slate-800">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Enforce
                    </TabsTrigger>
                </TabsList>

                {/* ── Tokens Tab ── */}
                <TabsContent value="tokens" className="space-y-3 mt-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                        {TOKEN_DEFS.map((def) => (
                            <TokenCard
                                key={def.key}
                                def={def}
                                tokenId={registry?.tokens?.[def.key] ?? null}
                            />
                        ))}
                    </div>

                    <Card className="bg-gradient-to-r from-emerald-950/30 to-cyan-950/30 border-emerald-800/30">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-white">Bootstrap All Tokens</p>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Create all 5 tokens on Hedera testnet in one transaction
                                </p>
                            </div>
                            <Button
                                onClick={() => handleAction("bootstrap", {}, "Bootstrap Tokens")}
                                disabled={mutation.isPending}
                                className="bg-emerald-600 hover:bg-emerald-700 text-sm"
                            >
                                <Rocket className="w-4 h-4 mr-1.5" />
                                {mutation.isPending ? "Creating…" : "Bootstrap"}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── Mint Tab ── */}
                <TabsContent value="mint" className="mt-3">
                    <Card className="bg-slate-900/50 border-slate-800/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-slate-300">Mint $CCC Reward</CardTitle>
                            <CardDescription>Award CCC tokens for contribution sequences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label className="text-xs text-slate-500">Token ID</Label>
                                    <Input
                                        value={mintTokenId || registry?.tokens?.CCC_TOKEN || ""}
                                        onChange={(e) => setMintTokenId(e.target.value)}
                                        placeholder="0.0.XXXXXX"
                                        className="mt-1 bg-slate-800/50 border-slate-700/50 font-mono text-xs"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-500">Sequence #</Label>
                                    <Input
                                        type="number"
                                        value={mintSequence}
                                        onChange={(e) => setMintSequence(e.target.value)}
                                        placeholder="4"
                                        className="mt-1 bg-slate-800/50 border-slate-700/50 font-mono text-xs"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs text-slate-500">CCC-ID</Label>
                                <Input
                                    value={mintCccId || `${ccc || "LDC"}_2026-W07_001`}
                                    onChange={(e) => setMintCccId(e.target.value)}
                                    placeholder="LDC_2026-W07_001"
                                    className="mt-1 bg-slate-800/50 border-slate-700/50 font-mono text-xs"
                                />
                            </div>
                            <Button
                                onClick={() =>
                                    handleAction("mint-ccc", {
                                        tokenId: mintTokenId || registry?.tokens?.CCC_TOKEN || "",
                                        cccId: mintCccId,
                                        sequence: Number(mintSequence) || 4,
                                    }, "Mint $CCC")
                                }
                                disabled={mutation.isPending}
                                variant="outline"
                                className="w-full"
                            >
                                <Zap className="w-3 h-3 mr-1.5" />
                                {mutation.isPending ? "Minting…" : "Mint $CCC Reward"}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── HCS Tab ── */}
                <TabsContent value="hcs" className="space-y-3 mt-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                        {Object.entries(registry?.hcsTopics || {}).map(([name, topicId]) => (
                            <Card key={name} className="bg-slate-900/50 border-slate-800/50">
                                <CardContent className="p-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Hash className="w-4 h-4 text-cyan-400" />
                                            <span className="text-xs font-medium text-slate-300">
                                                {name.replace(/_/g, " ")}
                                            </span>
                                        </div>
                                        <Badge variant={topicId ? "cyan" : "secondary"} className="text-[10px]">
                                            {topicId ? "Active" : "—"}
                                        </Badge>
                                    </div>
                                    {topicId && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <code className="text-[11px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded font-mono truncate flex-1">
                                                {topicId}
                                            </code>
                                            <a
                                                href={`https://hashscan.io/testnet/topic/${topicId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-500 hover:text-cyan-400"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* ── Enforcement Tab ── */}
                <TabsContent value="enforce" className="space-y-4 mt-3">
                    <Card className="bg-slate-900/50 border-amber-800/30">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-amber-400">🚨 Freeze Bad Agent</CardTitle>
                            <CardDescription>Freeze an agent's CCC token balance</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label className="text-xs text-slate-500">CCC Token ID</Label>
                                    <Input
                                        value={freezeTokenId || registry?.tokens?.CCC_TOKEN || ""}
                                        onChange={(e) => setFreezeTokenId(e.target.value)}
                                        placeholder="0.0.XXXXXX"
                                        className="mt-1 bg-slate-800/50 border-slate-700/50 font-mono text-xs"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-500">Agent Account ID</Label>
                                    <Input
                                        value={freezeAccountId}
                                        onChange={(e) => setFreezeAccountId(e.target.value)}
                                        placeholder="0.0.YYYYYY"
                                        className="mt-1 bg-slate-800/50 border-slate-700/50 font-mono text-xs"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs text-slate-500">Reason</Label>
                                <Input
                                    value={freezeReason}
                                    onChange={(e) => setFreezeReason(e.target.value)}
                                    placeholder="Violated R-xxx"
                                    className="mt-1 bg-slate-800/50 border-slate-700/50 text-xs"
                                />
                            </div>
                            <Button
                                onClick={() =>
                                    handleAction("freeze-bad-agent", {
                                        cccTokenId: freezeTokenId || registry?.tokens?.CCC_TOKEN || "",
                                        agentAccountId: freezeAccountId,
                                        reason: freezeReason,
                                    }, "Freeze Agent")
                                }
                                disabled={mutation.isPending || !freezeAccountId}
                                variant="outline"
                                className="w-full border-amber-700/50 text-amber-400 hover:bg-amber-950/30"
                            >
                                <AlertTriangle className="w-3 h-3 mr-1.5" />
                                {mutation.isPending ? "Freezing…" : "Freeze Agent"}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-red-800/30">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-red-400">⏸️ Pause Token (Season Transition)</CardTitle>
                            <CardDescription>Pause a token during season changes</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <Label className="text-xs text-slate-500">Token ID to Pause</Label>
                                <Input
                                    value={pauseTokenId}
                                    onChange={(e) => setPauseTokenId(e.target.value)}
                                    placeholder="0.0.XXXXXX"
                                    className="mt-1 bg-slate-800/50 border-slate-700/50 font-mono text-xs"
                                />
                            </div>
                            <Button
                                onClick={() =>
                                    handleAction("pause-token", {
                                        tokenId: pauseTokenId,
                                    }, "Pause Token")
                                }
                                disabled={mutation.isPending || !pauseTokenId}
                                variant="outline"
                                className="w-full border-red-700/50 text-red-400 hover:bg-red-950/30"
                            >
                                <Pause className="w-3 h-3 mr-1.5" />
                                {mutation.isPending ? "Pausing…" : "Pause Token"}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
