import AgentIdentityRegistry from "../../out/AgentIdentityRegistry.sol/AgentIdentityRegistry.json";
import AgentReputationRegistry from "../../out/AgentReputationRegistry.sol/AgentReputationRegistry.json";
import AgentValidationRegistry from "../../out/AgentValidationRegistry.sol/AgentValidationRegistry.json";
import SharedKernelRegistry from "../../out/SharedKernelRegistry.sol/SharedKernelRegistry.json";
import SeasonRegistry from "../../out/SeasonRegistry.sol/SeasonRegistry.json";
import ISCRegistry from "../../out/ISCRegistry.sol/ISCRegistry.json";
import BadAgentRegistry from "../../out/BadAgentRegistry.sol/BadAgentRegistry.json";
import VSARegistry from "../../out/VSARegistry.sol/VSARegistry.json";
import DocumentRegistry from "../../out/DocumentRegistry.sol/DocumentRegistry.json";
import CCCIdRegistry from "../../out/CCCIdRegistry.sol/CCCIdRegistry.json";
import CCCGovernanceToken from "../../out/CCCGovernanceToken.sol/CCCGovernanceToken.json";

export const ADI_ABIS = {
    identity: AgentIdentityRegistry.abi,
    reputation: AgentReputationRegistry.abi,
    validation: AgentValidationRegistry.abi,
    sharedKernel: SharedKernelRegistry.abi,
    season: SeasonRegistry.abi,
    isc: ISCRegistry.abi,
    badAgent: BadAgentRegistry.abi,
    vsa: VSARegistry.abi,
    document: DocumentRegistry.abi,
    cccId: CCCIdRegistry.abi,
    cccToken: CCCGovernanceToken.abi,
} as const;

export const identityAbi = ADI_ABIS.identity;
export const reputationAbi = ADI_ABIS.reputation;
export const validationAbi = ADI_ABIS.validation;
export const sharedKernelAbi = ADI_ABIS.sharedKernel;
export const seasonAbi = ADI_ABIS.season;
export const iscAbi = ADI_ABIS.isc;
export const badAgentAbi = ADI_ABIS.badAgent;
export const vsaAbi = ADI_ABIS.vsa;
export const documentAbi = ADI_ABIS.document;
export const cccIdAbi = ADI_ABIS.cccId;
export const cccTokenAbi = ADI_ABIS.cccToken;

export type AdiContractName = keyof typeof ADI_ABIS;
