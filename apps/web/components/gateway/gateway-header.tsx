"use client";

import { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useAppStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, Wifi, WifiOff, Hexagon, Settings } from "lucide-react";
import { SettingsPanel } from "./settings-panel";

export function GatewayHeader() {
    const { address, isConnected, chain } = useAccount();
    const { disconnect } = useDisconnect();
    const { ccc, contributor } = useAppStore();
    const [showSettings, setShowSettings] = useState(false);

    // Mounted guard — prevents SSR/CSR hydration mismatch on wallet state
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const shortAddress = address
        ? `${address.slice(0, 6)}…${address.slice(-4)}`
        : "";

    const connected = isMounted ? isConnected : false;
    const chainName = isMounted ? (chain?.name || (isConnected ? "Connected" : "Disconnected")) : "Connecting…";
    const displayAddress = isMounted ? shortAddress : "";

    return (
        <>
            <header className="sticky top-0 z-50 glass border-b border-slate-800/50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Left: Brand */}
                    <div className="flex items-center gap-3">
                        <div className="text-2xl animate-float">🤝</div>
                        <div>
                            <h1 className="text-lg font-bold gradient-fedarch-text leading-tight">
                                CCC Gateway
                            </h1>
                            <p className="text-[10px] text-slate-500 leading-tight">#FedArch · ETHDenver 2026</p>
                        </div>
                    </div>

                    {/* Center: Status badges */}
                    <div className="hidden md:flex items-center gap-2">
                        {ccc && (
                            <Badge variant="emerald" className="gap-1">
                                <Hexagon className="w-3 h-3" />
                                @{ccc}
                            </Badge>
                        )}
                        {contributor && (
                            <Badge variant="secondary" className="text-xs">
                                {contributor}
                            </Badge>
                        )}
                        <Badge variant={connected ? "cyan" : "destructive"} className="gap-1">
                            {connected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                            {chainName}
                        </Badge>
                    </div>

                    {/* Right: Settings + Wallet + Disconnect */}
                    <div className="flex items-center gap-2">
                        {displayAddress && (
                            <code className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-md font-mono">
                                {displayAddress}
                            </code>
                        )}
                        <Separator orientation="vertical" className="h-6" />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowSettings(true)}
                            className="text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10"
                        >
                            <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => disconnect()}
                            className="text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                        >
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </header>
            {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
        </>
    );
}
