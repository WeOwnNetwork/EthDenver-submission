// ═══════════════════════════════════════════════════════
// WAGMI CONFIG — @ccc-gateway/web
//
// viem + wagmi for wallet connection.
// Supports MetaMask and any injected EIP-1193 wallet.
// ═══════════════════════════════════════════════════════

import { http, createConfig } from "wagmi";
import { defineChain } from "viem";
import { injected } from "wagmi/connectors";

/** ADL Network Testnet */
export const adlTestnet = defineChain({
    id: 99999,
    name: "ADL Testnet",
    nativeCurrency: { name: "ADL", symbol: "ADL", decimals: 18 },
    rpcUrls: {
        default: { http: ["https://rpc.ab.testnet.adifoundation.ai"] },
    },
});

export const wagmiConfig = createConfig({
    chains: [adlTestnet],
    connectors: [injected()],
    transports: {
        [adlTestnet.id]: http(),
    },
});
