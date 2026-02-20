import {
    createPublicClient,
    createWalletClient,
    getContract,
    http,
    type Address,
    type PublicClient,
    type WalletClient,
    zeroAddress,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { ADI_ABIS } from "./abis";

export interface AdiContractAddresses {
    identity: string;
    reputation: string;
    validation: string;
    sharedKernel: string;
    season: string;
    isc: string;
    badAgent?: string;
    vsa: string;
    document: string;
    cccId: string;
    cccToken: string;
}

export interface AdiClientConfig {
    rpcUrl: string;
    privateKey?: string;
    addresses: AdiContractAddresses;
}

export type AdiContractClients = ReturnType<typeof createAdiClients>["contracts"];
export type AdiClients = ReturnType<typeof createAdiClients>;

const normalizePrivateKey = (value?: string): `0x${string}` | undefined => {
    if (!value) return undefined;
    return (value.startsWith("0x") ? value : `0x${value}`) as `0x${string}`;
};

const toAddress = (value?: string): Address => {
    if (!value) return zeroAddress;
    return value as Address;
};

export const createAdiClients = ({ rpcUrl, privateKey, addresses }: AdiClientConfig) => {
    const transport = http(rpcUrl);
    const publicClient = createPublicClient({ transport });

    const normalizedKey = normalizePrivateKey(privateKey);
    const walletClient = normalizedKey
        ? createWalletClient({ transport, account: privateKeyToAccount(normalizedKey) })
        : undefined;

    const contracts = {
        identity: getContract({
            address: toAddress(addresses.identity),
            abi: ADI_ABIS.identity,
            client: { public: publicClient, wallet: walletClient },
        }),
        reputation: getContract({
            address: toAddress(addresses.reputation),
            abi: ADI_ABIS.reputation,
            client: { public: publicClient, wallet: walletClient },
        }),
        validation: getContract({
            address: toAddress(addresses.validation),
            abi: ADI_ABIS.validation,
            client: { public: publicClient, wallet: walletClient },
        }),
        sharedKernel: getContract({
            address: toAddress(addresses.sharedKernel),
            abi: ADI_ABIS.sharedKernel,
            client: { public: publicClient, wallet: walletClient },
        }),
        season: getContract({
            address: toAddress(addresses.season),
            abi: ADI_ABIS.season,
            client: { public: publicClient, wallet: walletClient },
        }),
        isc: getContract({
            address: toAddress(addresses.isc),
            abi: ADI_ABIS.isc,
            client: { public: publicClient, wallet: walletClient },
        }),
        badAgent: getContract({
            address: toAddress(addresses.badAgent),
            abi: ADI_ABIS.badAgent,
            client: { public: publicClient, wallet: walletClient },
        }),
        vsa: getContract({
            address: toAddress(addresses.vsa),
            abi: ADI_ABIS.vsa,
            client: { public: publicClient, wallet: walletClient },
        }),
        document: getContract({
            address: toAddress(addresses.document),
            abi: ADI_ABIS.document,
            client: { public: publicClient, wallet: walletClient },
        }),
        cccId: getContract({
            address: toAddress(addresses.cccId),
            abi: ADI_ABIS.cccId,
            client: { public: publicClient, wallet: walletClient },
        }),
        cccToken: getContract({
            address: toAddress(addresses.cccToken),
            abi: ADI_ABIS.cccToken,
            client: { public: publicClient, wallet: walletClient },
        }),
    } as const;

    return { publicClient, walletClient, contracts };
};
