import { createCCCToken } from "./ccc-token";
import { createCCCIdNFTCollection } from "./ccc-id-nft";
import { createAgentIdCollection } from "./agent-identity-nft";
import { createCoopMembershipCollection } from "./coop-membership";
import { createGovToken } from "./governance-token";
import fs from "fs";

export async function bootstrapTokenRegistry(): Promise<Record<string, string>> {
    console.log("\n🚀 Bootstrapping CCC Gateway Token Registry...\n");

    const registry: Record<string, string> = {};

    const ccc = await createCCCToken();
    registry["CCC_TOKEN"] = ccc.tokenId;
    console.log(`  ✅ $CCC: ${ccc.tokenId}`);

    const cccIdNft = await createCCCIdNFTCollection();
    registry["CCCID_NFT"] = cccIdNft.tokenId;
    console.log(`  ✅ CCC-ID NFT: ${cccIdNft.tokenId}`);

    const agentId = await createAgentIdCollection();
    registry["AGENT_ID_NFT"] = agentId.tokenId;
    console.log(`  ✅ Agent ID NFT: ${agentId.tokenId}`);

    const coopMem = await createCoopMembershipCollection();
    registry["COOP_MEMBER_NFT"] = coopMem.tokenId;
    console.log(`  ✅ Coop Membership: ${coopMem.tokenId}`);

    const gov = await createGovToken();
    registry["GOV_TOKEN"] = gov.tokenId;
    console.log(`  ✅ GOV: ${gov.tokenId}`);

    const envContent = Object.entries(registry)
        .map(([key, val]) => `${key}=${val}`)
        .join("\n");

    fs.writeFileSync(".env.tokens", envContent);

    console.log("\n═══════════════════════════════════════════");
    console.log("✅ CCC Gateway Token Registry — COMPLETE");
    console.log("═══════════════════════════════════════════");
    console.log(envContent);
    console.log("═══════════════════════════════════════════\n");

    return registry;
}

// CLI
const isMain = process.argv[1]?.includes("bootstrap");
if (isMain) {
    bootstrapTokenRegistry()
        .then(() => process.exit(0))
        .catch((err) => {
            console.error("❌ Bootstrap failed:", err);
            process.exit(1);
        });
}
