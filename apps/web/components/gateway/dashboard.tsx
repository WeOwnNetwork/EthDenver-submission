"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChatPanel } from "./chat-panel";
import { OnchainFeed } from "./onchain-feed";
import { GovernancePanel } from "./governance-panel";
import { MessageSquare, Activity, Scale } from "lucide-react";

export function Dashboard() {
    return (
        <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 border border-slate-800/50 h-12">
                <TabsTrigger value="chat" className="flex items-center gap-2 data-[state=active]:bg-slate-800">
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">Chat</span>
                </TabsTrigger>
                <TabsTrigger value="onchain" className="flex items-center gap-2 data-[state=active]:bg-slate-800">
                    <Activity className="w-4 h-4" />
                    <span className="hidden sm:inline">On-Chain</span>
                </TabsTrigger>
                <TabsTrigger value="governance" className="flex items-center gap-2 data-[state=active]:bg-slate-800">
                    <Scale className="w-4 h-4" />
                    <span className="hidden sm:inline">Governance</span>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
                <ChatPanel />
            </TabsContent>
            <TabsContent value="onchain">
                <OnchainFeed />
            </TabsContent>
            <TabsContent value="governance">
                <GovernancePanel />
            </TabsContent>
        </Tabs>
    );
}
