"use client";

import { useState, useEffect } from "react";
import { sendVolley, listAgents } from "@/lib/gateway-client";

export function VolleyComposer() {
    const [agents, setAgents] = useState<any[]>([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [volleyType, setVolleyType] = useState<"SEEK" | "ACK" | "STATUS" | "ALERT">("SEEK");
    const [content, setContent] = useState("");
    const [attest, setAttest] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        listAgents().then((res) => {
            if (res.ok) setAgents(res.data?.agents || []);
        });
    }, []);

    const handleSend = async () => {
        setLoading(true);
        setResult(null);

        const res = await sendVolley({
            from: `AI:@${from}`,
            to,
            volleyType,
            content: content || undefined,
            attest,
        });

        setResult(res);
        setLoading(false);
    };

    return (
        <div className="bg-card rounded-lg border p-6">
            <h3 className="text-lg font-bold mb-4">🏐 Send #ContextVolley</h3>

            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs text-muted-foreground">FROM</label>
                        <select
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="">Select sender...</option>
                            {agents.map((a) => (
                                <option key={a.ccc} value={a.ccc}>
                                    AI:@{a.ccc} — {a.contributor}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">TO</label>
                        <select
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="">Select recipient...</option>
                            {agents
                                .filter((a) => a.ccc !== from)
                                .map((a) => (
                                    <option key={a.ccc} value={a.ccc}>
                                        AI:@{a.ccc} — {a.contributor}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="text-xs text-muted-foreground">TYPE</label>
                        <select
                            value={volleyType}
                            onChange={(e) => setVolleyType(e.target.value as any)}
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="SEEK">SEEK — Request</option>
                            <option value="ACK">ACK — Acknowledge</option>
                            <option value="STATUS">STATUS — Update</option>
                            <option value="ALERT">ALERT — Urgent</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <label className="flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer">
                            <input
                                type="checkbox"
                                checked={attest}
                                onChange={(e) => setAttest(e.target.checked)}
                            />
                            <span className="text-sm">📜 HCS Attest</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-muted-foreground">CONTENT</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Volley content (optional)..."
                        rows={3}
                        className="w-full px-3 py-2 border rounded-md resize-none"
                    />
                </div>

                <button
                    onClick={handleSend}
                    disabled={!from || !to || loading}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-md font-medium disabled:opacity-50 hover:bg-purple-700 transition-colors"
                >
                    {loading ? "Sending..." : "🏐 Send Volley"}
                </button>
            </div>

            {result && (
                <div className={`mt-4 p-3 rounded-md text-sm ${result.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {result.ok
                        ? `✅ Delivered to ${result.to} (${result.volleyType})${result.attested ? " — HCS attested" : ""}`
                        : `🚫 ${result.error}`}
                </div>
            )}
        </div>
    );
}
