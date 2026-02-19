"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useAppStore } from "@/lib/store";
import { GatewayHeader } from "@/components/gateway/gateway-header";

export default function GatewayLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isConnected } = useAccount();
    const { onboarded } = useAppStore();

    // Mounted guard for SSR
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const showHeader = isMounted && isConnected && onboarded;

    return (
        <div className="min-h-screen bg-background">
            {showHeader && <GatewayHeader />}
            <main className={showHeader ? "container mx-auto px-4 py-6" : ""}>
                {children}
            </main>
        </div>
    );
}
