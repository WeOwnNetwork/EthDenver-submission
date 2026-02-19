"use client";

import { useState } from "react";
import { generateCCCId } from "@/lib/gateway-client";

export function CCCIdGenerator() {
    const [ccc, setCcc] = useState("");
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await generateCCCId({
                ccc: ccc.toUpperCase(),
                workspace: "CCC",
            });

            if (res.ok) {
                setResult(res);
            } else {
                setError(res.error || res.violations?.join("; ") || "Unknown error");
            }
        } catch (err) {
            setError(String(err));
        }

        setLoading(false);
    };

    return (
        <div className="bg-card rounded-lg border p-6">
            <h3 className="text-lg font-bold mb-4">🆔 Generate CCC-ID</h3>

            <div className="flex gap-3 mb-4">
                <input
                    type="text"
                    value={ccc}
                    onChange={(e) => setCcc(e.target.value.toUpperCase().slice(0, 3))}
                    placeholder="CCC (e.g., LDC)"
                    maxLength={3}
                    className="flex-1 px-3 py-2 border rounded-md font-mono text-lg uppercase tracking-widest text-center"
                />
                <button
                    onClick={handleGenerate}
                    disabled={ccc.length !== 3 || loading}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
                >
                    {loading ? "..." : "Generate"}
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    🚫 {error}
                </div>
            )}

            {result && (
                <div className="p-4 bg-green-50 rounded-md space-y-2">
                    <div className="text-center">
                        <span className="text-2xl font-mono font-bold text-green-800">
                            {result.id || result.ccc_id}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
                        <div>Contributor: <strong>{result.contributor}</strong></div>
                        <div>Sequence: <strong>#{result.sequence}</strong></div>
                        <div>Week: <strong>W{String(result.week).padStart(2, "0")}</strong></div>
                        <div>Reward: <strong>+{result.reward} $CCC</strong></div>
                    </div>
                    <div className="text-xs text-green-600 mt-2">
                        Instance: {result.instance}
                    </div>
                </div>
            )}
        </div>
    );
}
