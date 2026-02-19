"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useGenerateCCCId } from "@/lib/gateway-client";
import { callLLM, type ChatMessage as LLMMessage } from "@repo/ai-providers/chat";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Send, Hash, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Message {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    agentId?: string;
    cccId?: string;
    timestamp: Date;
}

export function ChatPanel() {
    const { ccc, llmProvider, llmModel, llmConfig } = useAppStore();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "system",
            content: `Welcome to CCC Gateway, AI:@${ccc}! 🤝\n\nYou're connected to #FedArch with **${llmProvider}** (${llmModel}).\n\nType a message to start contributing. Every interaction generates a CCC-ID attested to Hedera.`,
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const generateCCCId = useGenerateCCCId();

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
            // Generate CCC-ID for this interaction
            const cccResult = await generateCCCId.mutateAsync({
                ccc: ccc!,
                workspace: "CCC",
            });

            if (cccResult.ok && cccResult.data) {
                const cccIdMsg: Message = {
                    id: crypto.randomUUID(),
                    role: "system",
                    content: `🆔 **${cccResult.data.id}** generated (+${cccResult.data.reward} $CCC)`,
                    cccId: cccResult.data.id,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, cccIdMsg]);
            }

            // Call LLM
            const llmMessages: LLMMessage[] = [
                {
                    role: "system",
                    content: `You are AI:@${ccc}, a #FedArch agent. Be concise. Use tables when helpful. #LessIsMore.`,
                },
                { role: "user", content: prompt },
            ];

            const result = await callLLM({
                providerId: llmProvider || "ollama",
                model: llmModel || "llama3.2:3b",
                config: llmConfig || {},
                messages: llmMessages,
            });

            const assistantMsg: Message = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: result.content,
                agentId: `AI:@${ccc}`,
                cccId: cccResult.ok ? cccResult.data?.id : undefined,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMsg]);
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
                    <div className="ml-auto flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow" />
                        <span className="text-xs text-slate-500">Live</span>
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
                                        <Zap className="w-3 h-3" /> {msg.agentId}
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
                                <div className="text-xs text-slate-500 mt-1.5">
                                    {msg.timestamp.toLocaleTimeString()}
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
