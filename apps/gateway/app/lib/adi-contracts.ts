import { createAdiClients, type AdiContractAddresses, type AdiClients } from "@repo/adi";
import { env } from "../../env";

const runtimeEnv = (key: string, fallback?: string): string | undefined => {
    const value = process.env[key];
    return value && value.length > 0 ? value : fallback;
};

export const getGatewayAdiClients = (): AdiClients | undefined => {
    const rpcUrl = runtimeEnv("ADI_RPC_URL", env.ADI_RPC_URL);
    if (!rpcUrl) return undefined;

    const addresses: AdiContractAddresses = {
        identity: runtimeEnv("CONTRACT_IDENTITY", env.CONTRACT_IDENTITY) || "",
        reputation: runtimeEnv("CONTRACT_REPUTATION", env.CONTRACT_REPUTATION) || "",
        validation: runtimeEnv("CONTRACT_VALIDATION", env.CONTRACT_VALIDATION) || "",
        sharedKernel: runtimeEnv("CONTRACT_SHARED_KERNEL", env.CONTRACT_SHARED_KERNEL) || "",
        season: runtimeEnv("CONTRACT_SEASON", env.CONTRACT_SEASON) || "",
        isc: runtimeEnv("CONTRACT_ISC", env.CONTRACT_ISC) || "",
        badAgent: runtimeEnv("CONTRACT_BAD_AGENT", env.CONTRACT_BAD_AGENT) || "",
        vsa: runtimeEnv("CONTRACT_VSA", env.CONTRACT_VSA) || "",
        document: runtimeEnv("CONTRACT_DOCUMENT", env.CONTRACT_DOCUMENT) || "",
        cccId: runtimeEnv("CONTRACT_CCC_ID", env.CONTRACT_CCC_ID) || "",
        cccToken: runtimeEnv("CONTRACT_CCC_TOKEN", env.CONTRACT_CCC_TOKEN) || "",
    };

    return createAdiClients({
        rpcUrl,
        privateKey: runtimeEnv("ADI_PRIVATE_KEY", env.ADI_PRIVATE_KEY),
        addresses,
    });
};
