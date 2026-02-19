"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useAppStore } from "@/lib/store";
import { LandingPage } from "@/components/gateway/landing-page";
import { OnboardingFlow } from "@/components/gateway/onboarding-flow";
import { StatsCards } from "@/components/gateway/stats-cards";
import { Dashboard } from "@/components/gateway/dashboard";

export default function GatewayPage() {
    const { isConnected, isConnecting } = useAccount();
    const { onboarded } = useAppStore();

    // Mounted guard — prevents SSR/CSR hydration mismatch on wallet state
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    // Show loading spinner while connecting or pre-mount
    if (!isMounted || isConnecting) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-950">
                <div className="animate-spin text-5xl">🤝</div>
            </div>
        );
    }

    // Step 1: Not connected -> Landing with wallet connect
    if (!isConnected) return <LandingPage />;

    // Step 2: Connected but not onboarded -> Onboarding flow
    if (!onboarded) return <OnboardingFlow />;

    // Step 3: Onboarded -> Dashboard (header rendered by layout.tsx)
    return (
        <div className="space-y-6">
            <StatsCards />
            <Dashboard />
        </div>
    );
}
