"use client";

import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Globe, Link2 } from "lucide-react";

const FEATURES = [
    { icon: Zap, text: "Generate CCC-IDs for every contribution", color: "text-emerald-400" },
    { icon: Shield, text: "Attest to Hedera Consensus Service", color: "text-cyan-400" },
    { icon: Globe, text: "Coordinate via #ContextVolley", color: "text-violet-400" },
    { icon: Link2, text: "Enforce governance with SharedKernel", color: "text-amber-400" },
];

export function LandingPage() {
    const { connect, isPending, error } = useConnect();

    const handleConnect = () => {
        if (typeof window !== "undefined" && !(window as any).ethereum) {
            alert("No wallet detected. Please install MetaMask or another EIP-1193 wallet extension, then reload.");
            return;
        }
        connect({ connector: injected() });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[hsl(222,47%,6%)] relative overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 bg-grid" />

            {/* Gradient orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px] animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
            <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px] animate-pulse-slow" style={{ animationDelay: "3s" }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-lg w-full mx-4 relative z-10"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.2, duration: 0.8 }}
                        className="text-7xl mb-6 animate-float"
                    >
                        🤝
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl font-bold mb-3"
                    >
                        <span className="gradient-fedarch-text">CCC Gateway</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center gap-2 mb-2"
                    >
                        <Badge variant="emerald">#FedArch</Badge>
                        <Badge variant="cyan">Agent Governance</Badge>
                        <Badge variant="violet">ETHDenver 2026</Badge>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-sm text-slate-400 mt-3"
                    >
                        Cooperative agent governance for the Agentic Society
                    </motion.p>
                </div>

                {/* Glass card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="glass rounded-2xl p-8 glow-emerald"
                >
                    <div className="space-y-4 mb-8">
                        {FEATURES.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                className="flex items-center gap-3 group"
                            >
                                <div className={`p-2 rounded-lg bg-slate-800/60 ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                                    <item.icon className="w-4 h-4" />
                                </div>
                                <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors">
                                    {item.text}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <Button
                            variant="gradient"
                            size="xl"
                            onClick={handleConnect}
                            disabled={isPending}
                            className="w-full text-base font-semibold"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <span className="animate-spin">⏳</span> Connecting...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    🔗 Connect Wallet
                                </span>
                            )}
                        </Button>

                        {error && (
                            <p className="text-xs text-center text-red-400 mt-3">
                                {error.message.includes("not found") || error.message.includes("No injected")
                                    ? "No wallet found — install MetaMask and reload."
                                    : error.message}
                            </p>
                        )}

                        <p className="text-xs text-center text-slate-500 mt-4">
                            Connect with MetaMask or any injected wallet
                        </p>
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-center mt-6 text-xs text-slate-600"
                >
                    ♾️ WeOwnNet 🌐 · Team weown · ETHDenver 2026
                </motion.div>
            </motion.div>
        </div>
    );
}
