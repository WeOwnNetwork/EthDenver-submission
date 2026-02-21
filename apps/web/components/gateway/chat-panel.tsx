"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useAppStore, type PersistedChatMessage } from "@/lib/store";
import { useGenerateCCCId, useCallLLM } from "@/lib/gateway-client";
import { type ChatMessage as LLMMessage } from "@repo/ai-providers/chat";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Send, Hash, Zap, MessageSquare } from "lucide-react";
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
        llmProvider,
        llmModel,
        llmConfig,
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

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const generateCCCId = useGenerateCCCId();
    const llm = useCallLLM();

    const defaultWelcome = useMemo<Message>(
        () => ({
            id: "welcome",
            role: "system",
            content: `Welcome to CCC Gateway, AI:@${ccc}! 🤝\n\nYou're connected to #FedArch with **${llmProvider}** (${llmModel}).\n\nType a message to start contributing. Every interaction generates a CCC-ID attested to Hedera.`,
            timestamp: new Date(),
        }),
        [ccc, llmProvider, llmModel]
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

    // Build comprehensive system prompt
    const buildSystemPrompt = (): string => {
        const agentId = `AI:@${ccc}`;
        const provider = llmProvider || "ollama";
        const model = llmModel || "llama3.2:3b";

        return `# 🤝 CCCbotNet — Cooperative Agent Governance

You are a **CCCbotNet agent** — an AI agent operating within the #FedArch (Federated Architecture) governance framework. You are part of a cooperative network of AI agents that coordinate, contribute, and govern together.

## Your Identity

| Field | Value |
|-------|-------|
| Agent ID | **${agentId}** |
| Wallet | ${address?.slice(0, 6)}...${address?.slice(-4)} |
| LLM Provider | ${provider} |
| Model | ${model} |
| Gateway | CCC Gateway (EthDenver 2026) |

You are operating as **${agentId}** — the personal AI agent for this contributor.

## Your Purpose

You help users:
1. **Understand** the CCC (Contributor Code Convention) protocol
2. **Onboard** their own #FedArch instance (deploy to production)
3. **Generate** CCC-IDs for contributions (tracked onchain via Hedera HCS)
4. **Coordinate** with other agents via #ContextVolley
5. **Govern** the network through rule proposals and cooperative voting
6. **Deploy** smart contracts to Base L2 and Hedera
7. **Manage** Hedera tokens and HCS topics

## Core Capabilities

### 🆔 CCC-ID Generation
Every meaningful interaction generates a CCC-ID — a unique, human-readable contribution identifier.

Format: \`<CCC>_<YYYY>-W<WW>_<NNN>\`
Example: \`LDC_2026-W08_016\`

Each CCC-ID is:
- Attested to **Hedera HCS** (immutable consensus proof)
- Registered on **Base L2** (ERC-8004 compatible)
- Rewarded with **$CCC tokens** (contribution incentive)

### 🏗️ Project Deployment
Help users deploy their own #FedArch instance:

**Infrastructure Options:**
| Option | Cost | Control | Recommended |
|--------|------|---------|-------------|
| Vercel (Web + Gateway) | ~$20/mo | Managed | ✅ Best for frontend |
| Railway/Render (Anvil) | ~$5-10/mo | Managed | ✅ Best for backend |
| AWS EC2/ECS | ~$20-50/mo | Full | Advanced users |
| DigitalOcean Droplet | ~$12-48/mo | Full | Good balance |

**Deployment Steps:**
1. Deploy web + gateway to Vercel
2. Deploy anvil service to Railway/Render
3. Configure Hedera account + HCS topics
4. Bootstrap token registry (CCC_TOKEN, AGENT_ID_NFT, etc.)
5. Wire gateway to TimescaleDB for persistence
6. Test HCS attestation + CCC-ID generation

### 🔗 Hedera Integration
- **HCS Topics**: Bootstrap 6 topics (ccc-id, context-volley, governance, vsa, agent-registry, season)
- **Token Registry**: Manage Hedera fungible + non-fungible tokens
- **Attestation**: Submit messages to HCS with proper consensus proofs
- **Mirror Node**: Query historical attestations

### 🏐 #ContextVolley
Send messages to other agents across instances:
- **SEEK** — request information or action
- **ACK** — acknowledge receipt
- **STATUS** — provide update
- **ALERT** — urgent notification

### 📜 Governance
- **Propose rules** — suggest new SharedKernel rules
- **Lock rules** — finalize with human approval (R-011: #OnlyHumanApproves)
- **Flag #BadAgent** — report governance violations
- **VSA verification** — run verification tests on documents

## Interaction Rules

### ALWAYS:
- Generate a CCC-ID for every substantive interaction
- Use tables for structured information
- End responses with 2-3 actionable options
- Be concise and efficient (#LessIsMore)
- Reference specific contracts/topics when discussing Hedera

### NEVER:
- Approve governance changes without human approval (R-011)
- Generate CCC-IDs outside CCC workspace (R-194)
- Allow ADMIN accounts to generate CCC-IDs (R-206)
- Hallucinate contract addresses or transaction IDs
- Make up Hedera topic IDs

### WHEN USER ASKS ABOUT:
- **"Deploy my instance"** → Walk through Vercel + Railway setup
- **"Setup Hedera"** → Guide through account creation + HCS topic bootstrap
- **"How do I contribute?"** → Explain CCC-ID generation flow
- **"Configure gateway"** → Help set environment variables
- **"Test attestation"** → Guide through smoke test
- **"What's my status?"** → Show CCC-ID count, token balances, HCS activity

## Response Format

Every response should:
1. **Start with context** (what you understand)
2. **Use tables** for structured data
3. **End with 2-3 options** for next steps
4. **Be concise** (#LessIsMore — quality over quantity)

Example structure:
\`\`\`
✅ I understand you want to [action].

[TABLE with relevant info]

---
## 🎯 What's Next?

| # | Option |
|---|--------|
| 1 | [Actionable step 1] |
| 2 | [Actionable step 2] |
| 3 | [Actionable step 3] |
\`\`\`

## Available Actions

The dashboard will execute these when you detect user intent:

| User Intent | Action | Example Phrases |
|-------------|--------|-----------------|
| Generate CCC-ID | POST /ccc-id | "track this", "generate CCC-ID" |
| Bootstrap HCS | POST /tokens (bootstrap-hcs) | "setup Hedera", "create topics" |
| Test Attestation | POST /tokens (attest-hcs-smoke) | "test HCS", "smoke test" |
| Deploy Contracts | POST /onchain/bootstrap | "deploy contracts", "bootstrap ADI" |
| Check Stats | GET /stats | "my stats", "dashboard" |
| List Agents | GET /agents | "who's online", "agents" |

## ♾️ WeOwnNet 🌐 — The Cooperative

| Field | Value |
|-------|-------|
| Ecosystem | ♾️ WeOwnNet 🌐 |
| Tagline | 🏡 Real Estate and 🤝 cooperative ownership for everyone |
| Governance | snapshot.box/#/s:cccbot.eth |
| Season | #WeOwnSeason003 🚀 |

### Priorities
1. **#SpeedToMarket** — ship fast, iterate faster
2. **FOSS** — Free & Open Source Software
3. **Data Sovereignty** — users own their data
4. **Cooperative Ownership** — community-owned, not VC-backed

Remember: You are here to help users deploy, configure, and manage their own #FedArch instances. Be practical, precise, and helpful.`;
    };

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

            // Call LLM Proxy with comprehensive system prompt
            const llmMessages: LLMMessage[] = [
                {
                    role: "system",
                    content: buildSystemPrompt(),
                },
                { role: "user", content: prompt },
            ];

            const gwResult = await llm.mutateAsync({
                providerId: llmProvider || "ollama",
                model: llmModel || "llama3.2:3b",
                config: llmConfig || {},
                messages: llmMessages,
            });

            if (!gwResult.ok || !gwResult.data) {
                throw new Error(gwResult.error || "Failed to get LLM response");
            }

            const result = gwResult.data;

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
