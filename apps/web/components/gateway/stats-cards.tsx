"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGatewayStats } from "@/lib/gateway-client";
import { Users, Hash, Radio, Shield } from "lucide-react";

export function StatsCards() {
    const { data: response, isLoading } = useGatewayStats();
    const stats = response?.data;

    const cards = [
        {
            label: "Agents Registered",
            value: stats?.onchain?.totalAgents ?? stats?.registeredAgents ?? 0,
            icon: Users,
            color: "text-emerald-400",
            bgColor: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20",
            glowClass: "glow-emerald",
        },
        {
            label: "CCC-IDs Generated",
            value: stats?.onchain?.totalCCCIds ?? stats?.totalCCCIds ?? 0,
            icon: Hash,
            color: "text-cyan-400",
            bgColor: "bg-cyan-500/10",
            borderColor: "border-cyan-500/20",
            glowClass: "glow-cyan",
        },
        {
            label: "Active Volleys",
            value: stats?.totalVolleys ?? 0,
            icon: Radio,
            color: "text-violet-400",
            bgColor: "bg-violet-500/10",
            borderColor: "border-violet-500/20",
            glowClass: "glow-violet",
        },
        {
            label: "ISC Certified",
            value: stats?.onchain?.totalVSAs ?? stats?.hcsMessages ?? 0,
            icon: Shield,
            color: "text-amber-400",
            bgColor: "bg-amber-500/10",
            borderColor: "border-amber-500/20",
            glowClass: "",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map((stat) => (
                <Card
                    key={stat.label}
                    className={`glass-card border ${stat.borderColor} hover:scale-[1.02] transition-all duration-300 ${stat.glowClass}`}
                >
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                        </div>
                        {isLoading ? (
                            <Skeleton className="h-8 w-12 mb-1" />
                        ) : (
                            <div className="text-2xl font-bold text-white mb-1">
                                {stat.value}
                            </div>
                        )}
                        <p className="text-xs text-slate-400">{stat.label}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
