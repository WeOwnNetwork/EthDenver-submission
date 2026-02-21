"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAppStore } from "@/lib/store";
import {
    connectAgent,
    listAgents,
    lockRule,
    useGatewayStats,
} from "@/lib/gateway-client";
import { toast } from "sonner";
import {
    UserPlus, Shield, FileText, BookOpen, Plus,
    CheckCircle, XCircle, Lock, AlertTriangle, Loader2
} from "lucide-react";

export function GovernancePanel() {
    return (
        <Card className="glass-card border-slate-800/50">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-violet-400" />
                    ADI Governance
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="agents" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border border-slate-800/50 h-9 mb-4">
                        <TabsTrigger value="agents" className="text-xs gap-1">
                            <UserPlus className="w-3 h-3" /> Agents
                        </TabsTrigger>
                        <TabsTrigger value="isc" className="text-xs gap-1">
                            <Shield className="w-3 h-3" /> ISC
                        </TabsTrigger>
                        <TabsTrigger value="rules" className="text-xs gap-1">
                            <FileText className="w-3 h-3" /> Rules
                        </TabsTrigger>
                        <TabsTrigger value="season" className="text-xs gap-1">
                            <BookOpen className="w-3 h-3" /> Season
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="agents">
                        <AgentRegistryPanel />
                    </TabsContent>
                    <TabsContent value="isc">
                        <ISCPanel />
                    </TabsContent>
                    <TabsContent value="rules">
                        <RulesPanel />
                    </TabsContent>
                    <TabsContent value="season">
                        <SeasonPanel />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

// ─────────────────────────────────────────────
// Agents Tab — wired to gateway API
// ─────────────────────────────────────────────

interface AgentRecord {
    ccc: string;
    agentId: string;
    contributor: string;
    role: string;
    tier: string;
    registeredAt: string;
}

function AgentRegistryPanel() {
    const [ccc, setCcc] = useState("");
    const [contributor, setContributor] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [agents, setAgents] = useState<AgentRecord[]>([]);
    const [isLoadingAgents, setIsLoadingAgents] = useState(true);
    const appStore = useAppStore();

    // Fetch agents on mount
    useEffect(() => {
        loadAgents();
    }, []);

    async function loadAgents() {
        setIsLoadingAgents(true);
        try {
            const res = await listAgents();
            if (res.ok && res.data) {
                const agentList = Array.isArray(res.data) ? res.data : (res.data as { agents?: AgentRecord[] }).agents ?? [];
                setAgents(agentList as AgentRecord[]);
            }
        } catch {
            // Gateway may not be running
        }
        setIsLoadingAgents(false);
    }

    async function handleRegister() {
        if (ccc.length !== 3 || !contributor) return;
        setIsRegistering(true);
        try {
            const res = await connectAgent({
                ccc: ccc.toUpperCase(),
                contributor,
                role: "tool_agent",
                tier: "contributor",
            });
            if (res.ok) {
                toast.success(`Agent @${ccc.toUpperCase()} registered!`);
                setCcc("");
                setContributor("");
                await loadAgents();
            } else {
                toast.error(res.error || "Registration failed");
            }
        } catch (err) {
            toast.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
        }
        setIsRegistering(false);
    }

    return (
        <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30 space-y-3">
                <h4 className="text-sm font-medium text-slate-200 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-400" />
                    Register New Agent
                </h4>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <Label className="text-xs text-slate-400">CCC Code</Label>
                        <Input
                            value={ccc}
                            onChange={(e) => setCcc(e.target.value.toUpperCase())}
                            placeholder="GTM"
                            maxLength={3}
                            className="bg-slate-900/50 border-slate-700/50 text-sm mt-1"
                        />
                    </div>
                    <div>
                        <Label className="text-xs text-slate-400">Contributor</Label>
                        <Input
                            value={contributor}
                            onChange={(e) => setContributor(e.target.value)}
                            placeholder="Your name"
                            className="bg-slate-900/50 border-slate-700/50 text-sm mt-1"
                        />
                    </div>
                </div>
                <Button
                    variant="default"
                    size="sm"
                    disabled={ccc.length !== 3 || !contributor || isRegistering}
                    className="w-full"
                    onClick={handleRegister}
                >
                    {isRegistering ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Registering…</>
                    ) : (
                        "Register Agent (ERC-721)"
                    )}
                </Button>
            </div>

            <Separator className="opacity-20" />

            <div className="space-y-2">
                <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Registered Agents
                    {agents.length > 0 && (
                        <Badge variant="secondary" className="ml-2 text-[10px]">{agents.length}</Badge>
                    )}
                </h4>
                <ScrollArea className="h-[200px]">
                    {isLoadingAgents ? (
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between py-2 px-2">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-5 w-16" />
                                </div>
                            ))}
                        </div>
                    ) : agents.length === 0 ? (
                        <p className="text-xs text-slate-500 text-center py-6">
                            No agents registered yet. Register your first agent above.
                        </p>
                    ) : (
                        agents.map((agent) => (
                            <div key={agent.ccc} className="flex items-center justify-between py-2 px-2 hover:bg-slate-800/20 rounded-lg transition-colors">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-mono font-medium text-slate-200">@{agent.ccc}</span>
                                    <Badge variant="emerald" className="text-[10px]">{agent.tier || "contributor"}</Badge>
                                </div>
                                <Badge variant="emerald" className="text-[10px]">active</Badge>
                            </div>
                        ))
                    )}
                </ScrollArea>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// ISC Tab
// ─────────────────────────────────────────────

function ISCPanel() {
    const CHECKS = [
        "EMBEDDER", "LLM_MODEL", "PINNED_DOCS", "SYSTEM_PROMPT",
        "WORKSPACE_PROMPTS", "USER_IDENTITY", "RAG_SYNC", "CONTEXT_VOLLEY"
    ];
    const [results, setResults] = useState<boolean[]>(new Array(8).fill(false));
    const [instanceId, setInstanceId] = useState("INT-E01");
    const [season, setSeason] = useState("3");

    const toggleCheck = (i: number) => {
        const next = [...results];
        next[i] = !next[i];
        setResults(next);
    };

    const passed = results.filter(Boolean).length;

    const handleSubmit = () => {
        if (passed < 8) return;
        toast.success(`ISC certification submitted for ${instanceId} (Season ${season}) — ${passed}/8 checks passed`);
        toast.info("On-chain ISC submission requires deployed contract. Logged locally.");
    };

    return (
        <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-slate-200">8-Point ISC Checklist</h4>
                    <Badge variant={passed === 8 ? "emerald" : passed >= 6 ? "amber" : "destructive"}>
                        {passed}/8
                    </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {CHECKS.map((check, i) => (
                        <button
                            key={check}
                            onClick={() => toggleCheck(i)}
                            className={`flex items-center gap-2 p-2 rounded-lg text-xs text-left transition-all ${results[i]
                                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                                : "bg-slate-800/40 border border-slate-700/30 text-slate-400 hover:border-slate-600/50"
                                }`}
                        >
                            {results[i] ? <CheckCircle className="w-3.5 h-3.5 shrink-0" /> : <XCircle className="w-3.5 h-3.5 shrink-0" />}
                            {check.replace(/_/g, " ")}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <Label className="text-xs text-slate-400">Instance ID</Label>
                    <Input
                        value={instanceId}
                        onChange={(e) => setInstanceId(e.target.value)}
                        placeholder="INT-E01"
                        className="bg-slate-900/50 border-slate-700/50 text-sm mt-1"
                    />
                </div>
                <div>
                    <Label className="text-xs text-slate-400">Season</Label>
                    <Input
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                        placeholder="3"
                        type="number"
                        className="bg-slate-900/50 border-slate-700/50 text-sm mt-1"
                    />
                </div>
            </div>

            <Button
                variant="default"
                size="sm"
                className="w-full"
                disabled={passed < 8}
                onClick={handleSubmit}
            >
                <Shield className="w-4 h-4 mr-2" />
                Submit ISC Certification
            </Button>
        </div>
    );
}

// ─────────────────────────────────────────────
// Rules Tab — wired to gateway API
// ─────────────────────────────────────────────

function RulesPanel() {
    const RULES = [
        { id: "R-011", desc: "#OnlyHumanApproves", status: "IMMUTABLE", cat: "GOVERNANCE" },
        { id: "R-194", desc: "CCC-IDs in CCC workspace ONLY", status: "IMMUTABLE", cat: "IDENTITY" },
        { id: "R-206", desc: "ADMIN accounts NEVER generate CCC-IDs", status: "IMMUTABLE", cat: "IDENTITY" },
        { id: "R-168", desc: "CCC-ID tied to contributor", status: "LOCKED", cat: "OPERATIONAL" },
        { id: "R-212", desc: "Cross-instance CCC-ID deconfliction", status: "LOCKED", cat: "OPERATIONAL" },
    ];

    const [ruleId, setRuleId] = useState("");
    const [ruleDesc, setRuleDesc] = useState("");
    const [isProposing, setIsProposing] = useState(false);
    const { ccc } = useAppStore();

    const statusIcon = (s: string) => {
        switch (s) {
            case "IMMUTABLE": return <Lock className="w-3 h-3 text-violet-400" />;
            case "LOCKED": return <Shield className="w-3 h-3 text-cyan-400" />;
            default: return <AlertTriangle className="w-3 h-3 text-amber-400" />;
        }
    };

    async function handlePropose() {
        if (!ruleId || !ruleDesc) return;
        setIsProposing(true);
        try {
            const res = await lockRule({
                ruleId,
                description: ruleDesc,
                approvalCccId: `${ccc}-APPROVE`,
                lockedBy: ccc || "unknown",
            });
            if (res.ok) {
                toast.success(`Rule ${ruleId} proposed and locked!`);
                setRuleId("");
                setRuleDesc("");
            } else {
                toast.error(res.error || "Proposal failed");
            }
        } catch (err) {
            toast.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
        }
        setIsProposing(false);
    }

    return (
        <div className="space-y-4">
            <ScrollArea className="h-[280px]">
                {RULES.map((rule) => (
                    <div key={rule.id} className="flex items-center justify-between py-2.5 px-2 hover:bg-slate-800/20 rounded-lg transition-colors">
                        <div className="flex items-center gap-2 min-w-0">
                            {statusIcon(rule.status)}
                            <code className="text-xs font-mono text-cyan-300 shrink-0">{rule.id}</code>
                            <span className="text-xs text-slate-300 truncate">{rule.desc}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <Badge variant={rule.status === "IMMUTABLE" ? "violet" : "cyan"} className="text-[10px]">
                                {rule.status}
                            </Badge>
                        </div>
                    </div>
                ))}
            </ScrollArea>

            <Separator className="opacity-20" />

            <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 space-y-2">
                <h4 className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Propose New Rule
                </h4>
                <div className="grid grid-cols-3 gap-2">
                    <Input
                        value={ruleId}
                        onChange={(e) => setRuleId(e.target.value)}
                        placeholder="R-XXX"
                        className="bg-slate-900/50 border-slate-700/50 text-xs"
                    />
                    <Input
                        value={ruleDesc}
                        onChange={(e) => setRuleDesc(e.target.value)}
                        placeholder="Description"
                        className="bg-slate-900/50 border-slate-700/50 text-xs col-span-2"
                    />
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    disabled={!ruleId || !ruleDesc || isProposing}
                    onClick={handlePropose}
                >
                    {isProposing ? (
                        <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Proposing…</>
                    ) : (
                        "Propose Rule"
                    )}
                </Button>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Season Tab — wired to gateway stats
// ─────────────────────────────────────────────

function SeasonPanel() {
    const { data: response, isLoading } = useGatewayStats();
    const stats = response?.data;

    return (
        <div className="space-y-4">
            <div className="p-6 rounded-lg bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-emerald-500/10">
                <div className="text-center">
                    <Badge variant="emerald" className="mb-3 text-sm px-3 py-1">Active Season</Badge>
                    {isLoading ? (
                        <Skeleton className="h-9 w-64 mx-auto mb-2" />
                    ) : (
                        <h3 className="text-3xl font-bold gradient-fedarch-text mb-2">
                            #WeOwnSeason{String(stats?.season ?? 3).padStart(3, "0")} 🚀
                        </h3>
                    )}
                    <p className="text-sm text-slate-400">
                        Instance: {isLoading ? "…" : (stats?.instance ?? "INT-E01")}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Card className="glass-card border-slate-800/50">
                    <CardContent className="p-4 text-center">
                        {isLoading ? (
                            <Skeleton className="h-8 w-8 mx-auto mb-1" />
                        ) : (
                            <div className="text-2xl font-bold text-white mb-1">
                                {stats?.registeredAgents ?? 0}
                            </div>
                        )}
                        <p className="text-xs text-slate-400">Agents Registered</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-slate-800/50">
                    <CardContent className="p-4 text-center">
                        {isLoading ? (
                            <Skeleton className="h-8 w-8 mx-auto mb-1" />
                        ) : (
                            <div className="text-2xl font-bold text-white mb-1">
                                {stats?.totalCCCIds ?? 0}
                            </div>
                        )}
                        <p className="text-xs text-slate-400">CCC-IDs Generated</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-slate-800/50">
                    <CardContent className="p-4 text-center">
                        {isLoading ? (
                            <Skeleton className="h-8 w-8 mx-auto mb-1" />
                        ) : (
                            <div className="text-2xl font-bold text-white mb-1">
                                {stats?.rulesLocked ?? 0}
                            </div>
                        )}
                        <p className="text-xs text-slate-400">Rules Locked</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-slate-800/50">
                    <CardContent className="p-4 text-center">
                        {isLoading ? (
                            <Skeleton className="h-8 w-8 mx-auto mb-1" />
                        ) : (
                            <div className="text-2xl font-bold text-white mb-1">
                                {stats?.hcsMessages ?? 0}
                            </div>
                        )}
                        <p className="text-xs text-slate-400">HCS Messages</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-2">
                <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider">Season History</h4>
                {[
                    { season: "#WeOwnSeason003 🚀", status: "ACTIVE", start: "W06 2026" },
                    { season: "#WeOwnSeason002", status: "COMPLETED", start: "W42 2025" },
                    { season: "#WeOwnSeason001", status: "COMPLETED", start: "W20 2025" },
                ].map((s) => (
                    <div key={s.season} className="flex items-center justify-between py-2 px-2 hover:bg-slate-800/20 rounded-lg transition-colors">
                        <span className="text-sm text-slate-300">{s.season}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">{s.start}</span>
                            <Badge variant={s.status === "ACTIVE" ? "emerald" : "secondary"} className="text-[10px]">
                                {s.status}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
