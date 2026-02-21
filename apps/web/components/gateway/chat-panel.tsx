"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useAppStore, type PersistedChatMessage } from "@/lib/store";
import { useSendVolley } from "@/lib/gateway-client";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Send, Hash, Zap, MessageSquare, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAccount } from "wagmi";

interface Message {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    agentId?: string;
    cccId?: string;
    timestamp: Date;
}

export function ChatPanel() {
    const {
        ccc,
        walletAddress,
        getSessionKey,
        setChatHistory,
        sessionHistory,
    } = useAppStore();
    const { address } = useAccount();

    const sessionKey = useMemo(
        () => getSessionKey(address || walletAddress, ccc),
        [address, walletAddress, ccc, getSessionKey]
    );

    const INSTANCES = [
        { id: "INT-E01", label: "E01", name: "The Hands" },
        { id: "INT-OG8", label: "OG8", name: "RomanDiD" },
        { id: "INT-P01", label: "P01", name: "WeOwn" },
    ];

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [targetInstance, setTargetInstance] = useState("INT-E01");
    const [relayingFor, setRelayingFor] = useState<string | null>(null);
    const [isRelaying, setIsRelaying] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const sendVolley = useSendVolley();

    const defaultWelcome = useMemo<Message>(
        () => ({
            id: "welcome",
            role: "system",
            content: `Welcome to CCC Gateway, AI:@${ccc}! 🤝\n\nYou're connected to #FedArch — select an instance below and send a message. Every interaction generates a CCC-ID attested to Hedera HCS.`,
            timestamp: new Date(),
        }),
        [ccc]
    );

    useEffect(() => {
        if (!sessionKey) {
            setMessages([defaultWelcome]);
            return;
        }

        const history = sessionHistory[sessionKey];
        if (!history?.chat?.length) {
            setMessages([defaultWelcome]);
            return;
        }

        const hydrated = history.chat.map((m: PersistedChatMessage) => ({
            ...m,
            timestamp: new Date(m.timestamp),
        }));

        setMessages(hydrated);
    }, [sessionKey, defaultWelcome]);

    useEffect(() => {
        if (!sessionKey || messages.length === 0) return;

        setChatHistory(
            sessionKey,
            messages.map((m) => ({
                id: m.id,
                role: m.role,
                content: m.content,
                agentId: m.agentId,
                cccId: m.cccId,
                timestamp: m.timestamp.toISOString(),
            }))
        );
    }, [messages, sessionKey, setChatHistory]);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isThinking) return;

        const userMsg: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: input,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        const prompt = input;
        setInput("");
        setIsThinking(true);

        try {
            // Send as a #ContextVolley — generates CCC-ID + routes to selected AnythingLLM instance + attests HCS
            const gwResult = await sendVolley.mutateAsync({
                from: `AI:@${ccc}`,
                to: "GTM",
                volleyType: "SEEK",
                content: prompt,
                attest: true,
                instanceId: targetInstance,
            });

            if (gwResult.ok && gwResult.data) {
                const { cccId, response, instanceId: respInstance } = gwResult.data;
                const instLabel = INSTANCES.find(i => i.id === (respInstance || targetInstance))?.label || respInstance || targetInstance;

                const cccIdMsg: Message = {
                    id: crypto.randomUUID(),
                    role: "system",
                    content: `🆔 **${cccId}** → ${instLabel} (+10 $CCC) ✅ HCS`,
                    cccId,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, cccIdMsg]);

                if (response) {
                    const assistantMsg: Message = {
                        id: crypto.randomUUID(),
                        role: "assistant",
                        content: response,
                        agentId: respInstance || targetInstance,
                        cccId,
                        timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, assistantMsg]);
                }
            } else {
                const e = gwResult.error as any;
                throw new Error(typeof e === "object" ? (e?.message ?? JSON.stringify(e)) : e || "Volley failed");
            }
        } catch (err) {
            toast.error(`Error: ${err}`);
            const errorMsg: Message = {
                id: crypto.randomUUID(),
                role: "system",
                content: `⚠️ Error: ${err instanceof Error ? err.message : String(err)}`,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        }

        setIsThinking(false);
    };

    const handleRelay = async (content: string, instId: string) => {
        setIsRelaying(instId);
        setRelayingFor(null);
        try {
            const gwResult = await sendVolley.mutateAsync({
                from: `AI:@${ccc}`,
                to: "GTM",
                volleyType: "SEEK",
                content,
                attest: true,
                instanceId: instId,
            });
            if (gwResult.ok && gwResult.data) {
                const { cccId, response, instanceId: respInstance } = gwResult.data;
                const instLabel = INSTANCES.find(i => i.id === (respInstance || instId))?.label || instId;
                const msgs: Message[] = [
                    { id: crypto.randomUUID(), role: "system", content: `🆔 **${cccId}** → ${instLabel} (+10 $CCC) ✅ HCS`, cccId, timestamp: new Date() },
                ];
                if (response) msgs.push({ id: crypto.randomUUID(), role: "assistant", content: response, agentId: respInstance || instId, cccId, timestamp: new Date() });
                setMessages(prev => [...prev, ...msgs]);
            }
        } catch (err) {
            toast.error(`Relay failed: ${err instanceof Error ? err.message : String(err)}`);
        }
        setIsRelaying(null);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-3 glass border-b border-white/5">
                <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    Agent Chat
                    <Badge variant="emerald" className="font-mono text-xs">
                        AI:@{ccc}
                    </Badge>
                    <div className="ml-auto flex items-center gap-2">
                        <Globe className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-400 font-mono">{targetInstance}</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow" />
                    </div>
                </h3>
            </div>

            {/* Messages */}
            <ScrollArea
                ref={scrollRef}
                className="flex-1 p-4 space-y-3"
            >
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex mb-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 transition-all ${msg.role === "user"
                                        ? "bg-gradient-to-br from-emerald-600 to-cyan-600 text-white shadow-lg shadow-emerald-500/10"
                                        : msg.role === "system"
                                            ? "glass text-slate-300"
                                            : "bg-slate-800/60 backdrop-blur border border-slate-700/50 text-slate-200"
                                    }`}
                            >
                                {msg.agentId && (
                                    <div className="text-xs text-cyan-400 font-mono mb-1 flex items-center gap-1">
                                        <Globe className="w-3 h-3" /> {msg.agentId}
                                    </div>
                                )}
                                {msg.cccId && (
                                    <div className="text-xs text-emerald-400 font-mono mb-1 flex items-center gap-1">
                                        <Hash className="w-3 h-3" /> {msg.cccId}
                                    </div>
                                )}
                                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                                    {msg.content}
                                </div>
                                <div className="flex items-center justify-between mt-1.5">
                                    <span className="text-xs text-slate-500">{msg.timestamp.toLocaleTimeString()}</span>
                                    {msg.role === "assistant" && !isThinking && (
                                        <div className="flex items-center gap-1">
                                            {relayingFor === msg.id ? (
                                                <>
                                                    <span className="text-[10px] text-slate-500">Relay →</span>
                                                    {INSTANCES.filter(i => i.id !== targetInstance).map(inst => (
                                                        <button
                                                            key={inst.id}
                                                            onClick={() => handleRelay(msg.content, inst.id)}
                                                            disabled={!!isRelaying}
                                                            className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-slate-700/50 text-slate-300 hover:bg-emerald-700/40 hover:text-white transition-colors disabled:opacity-50"
                                                        >
                                                            {isRelaying === inst.id ? "…" : inst.label}
                                                        </button>
                                                    ))}
                                                    <button onClick={() => setRelayingFor(null)} className="text-[10px] text-slate-600 hover:text-slate-400 ml-0.5">✕</button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => setRelayingFor(msg.id)}
                                                    className="text-[10px] text-slate-600 hover:text-emerald-400 transition-colors flex items-center gap-0.5"
                                                >
                                                    <ArrowRight className="w-2.5 h-2.5" /> Relay
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isThinking && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-slate-500 mb-3"
                    >
                        <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        duration: 0.6,
                                    }}
                                    className="w-2 h-2 bg-emerald-500 rounded-full"
                                />
                            ))}
                        </div>
                        <span className="text-xs">
                            AI:@{ccc} is thinking…
                        </span>
                    </motion.div>
                )}
            </ScrollArea>

            <Separator className="opacity-10" />

            {/* Input */}
            <div className="p-4 glass">
                {/* Instance selector */}
                <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs text-slate-600 mr-1">To:</span>
                    {INSTANCES.map((inst) => (
                        <button
                            key={inst.id}
                            onClick={() => setTargetInstance(inst.id)}
                            className={`text-xs px-2 py-0.5 rounded font-mono transition-colors ${
                                targetInstance === inst.id
                                    ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                                    : "text-slate-500 hover:text-slate-300 border border-transparent"
                            }`}
                        >
                            {inst.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            !e.shiftKey &&
                            handleSend()
                        }
                        placeholder={`Message AI:@${ccc}…`}
                        className="flex-1 bg-slate-900/50 border-slate-700/50 h-12 rounded-xl"
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isThinking}
                        variant="gradient"
                        size="icon"
                        className="h-12 w-12 rounded-xl shrink-0"
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                        <Hash className="w-3 h-3 text-emerald-600" /> CCC-ID auto-generated
                    </span>
                    <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-cyan-600" /> HCS attested
                    </span>
                </div>
            </div>
        </div>
    );
}
