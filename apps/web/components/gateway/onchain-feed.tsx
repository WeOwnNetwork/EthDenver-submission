"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvents, type GatewayEvent } from "@/lib/gateway-client";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, UserPlus, Shield, FileText, Radio, ExternalLink, Hash, Inbox } from "lucide-react";

const EVENT_TYPE_MAP: Record<string, { icon: typeof Activity; badge: "emerald" | "cyan" | "violet" | "amber" | "secondary"; label: string }> = {
    CONNECT: { icon: UserPlus, badge: "emerald", label: "Register" },
    CCC_ID: { icon: Hash, badge: "cyan", label: "CCC-ID" },
    ISC: { icon: Shield, badge: "cyan", label: "ISC" },
    GOVERNANCE: { icon: FileText, badge: "violet", label: "Governance" },
    VOLLEY: { icon: Radio, badge: "amber", label: "Volley" },
    BROADCAST: { icon: Activity, badge: "secondary", label: "Broadcast" },
    RULE_LOCK: { icon: FileText, badge: "violet", label: "Rule Lock" },
    BAD_AGENT: { icon: Shield, badge: "amber", label: "Flag" },
};

function getConfig(type: string) {
    return EVENT_TYPE_MAP[type] ?? { icon: Activity, badge: "secondary" as const, label: type };
}

function timeAgo(dateStr: string): string {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 0) return "just now";
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

export function OnchainFeed() {
    const { data: response, isLoading } = useEvents(30);
    const events: GatewayEvent[] = response?.data?.events ?? [];

    return (
        <Card className="glass-card border-slate-800/50">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="w-5 h-5 text-cyan-400" />
                        On-Chain Activity
                    </CardTitle>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs text-slate-400">Live</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] pr-2">
                    {isLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-3 py-3 px-2">
                                    <Skeleton className="w-8 h-8 rounded-lg" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : events.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
                            <Inbox className="w-12 h-12 mb-3 opacity-40" />
                            <p className="text-sm font-medium">No events yet</p>
                            <p className="text-xs mt-1">Activity will appear here as you interact with the gateway</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {events.map((event, i) => {
                                const config = getConfig(event.type);
                                const Icon = config.icon;

                                return (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <div className="flex items-start gap-3 py-3 group hover:bg-slate-800/20 rounded-lg px-2 transition-colors">
                                            <div className="p-2 rounded-lg bg-slate-800/60 mt-0.5">
                                                <Icon className={`w-4 h-4 ${config.badge === "emerald" ? "text-emerald-400" :
                                                    config.badge === "cyan" ? "text-cyan-400" :
                                                        config.badge === "violet" ? "text-violet-400" :
                                                            config.badge === "amber" ? "text-amber-400" :
                                                                "text-slate-400"
                                                    }`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm font-medium text-slate-200 truncate">{event.summary}</span>
                                                    <Badge variant={config.badge} className="text-[10px] px-1.5 py-0">
                                                        {config.label}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-slate-400 truncate">
                                                    {event.agent}{event.cccId ? ` · ${event.cccId}` : ""}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 shrink-0">
                                                <span className="text-[10px] text-slate-500">{timeAgo(event.timestamp)}</span>
                                                {event.txHash && (
                                                    <ExternalLink className="w-3 h-3 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-cyan-400" />
                                                )}
                                            </div>
                                        </div>
                                        {i < events.length - 1 && <Separator className="opacity-30" />}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
