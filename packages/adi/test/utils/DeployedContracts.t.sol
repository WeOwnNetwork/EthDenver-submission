// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../../src/core/AgentIdentityRegistry.sol";
import "../../src/core/AgentReputationRegistry.sol";
import "../../src/core/AgentValidationRegistry.sol";
import "../../src/governance/CCCGovernanceToken.sol";
import "../../src/governance/SharedKernelRegistry.sol";
import "../../src/governance/SeasonRegistry.sol";
import "../../src/governance/ISCRegistry.sol";
import "../../src/attestation/VSARegistry.sol";
import "../../src/attestation/DocumentRegistry.sol";
import "../../src/ccc/CCCIdRegistry.sol";

abstract contract DeployedContracts is Test {
    AgentIdentityRegistry public identity;
    AgentReputationRegistry public reputation;
    AgentValidationRegistry public validation;
    CCCGovernanceToken public ccc;
    SharedKernelRegistry public kernel;
    SeasonRegistry public seasons;
    ISCRegistry public isc;
    VSARegistry public vsa;
    DocumentRegistry public docs;
    CCCIdRegistry public cccIds;

    address public gateway;
    address public governance;
    address public validator;

    function setUp() public virtual {
        gateway = vm.envOr("ADI_TEST_GATEWAY", address(0x1));
        governance = vm.envOr("ADI_TEST_GOVERNANCE", gateway);
        validator = vm.envOr("ADI_TEST_VALIDATOR", address(0x2));

        bool useDeployed = vm.envOr("ADI_TEST_USE_DEPLOYED", false);
        if (useDeployed) {
            string memory rpcUrl = vm.envString("ADI_TEST_RPC_URL");
            vm.createSelectFork(rpcUrl);
            _loadDeployed();
        } else {
            _deployLocal();
        }
    }

    function _loadDeployed() internal {
        address identityAddr = vm.envOr("ADI_TEST_IDENTITY", address(0));
        address reputationAddr = vm.envOr("ADI_TEST_REPUTATION", address(0));
        address validationAddr = vm.envOr("ADI_TEST_VALIDATION", address(0));
        address cccAddr = vm.envOr("ADI_TEST_CCC_TOKEN", address(0));
        address kernelAddr = vm.envOr("ADI_TEST_SHARED_KERNEL", address(0));
        address seasonsAddr = vm.envOr("ADI_TEST_SEASON", address(0));
        address iscAddr = vm.envOr("ADI_TEST_ISC", address(0));
        address vsaAddr = vm.envOr("ADI_TEST_VSA", address(0));
        address docsAddr = vm.envOr("ADI_TEST_DOCUMENT", address(0));
        address cccIdsAddr = vm.envOr("ADI_TEST_CCC_ID", address(0));

        require(identityAddr != address(0), "ADI_TEST_IDENTITY missing");
        require(reputationAddr != address(0), "ADI_TEST_REPUTATION missing");
        require(validationAddr != address(0), "ADI_TEST_VALIDATION missing");
        require(cccAddr != address(0), "ADI_TEST_CCC_TOKEN missing");
        require(kernelAddr != address(0), "ADI_TEST_SHARED_KERNEL missing");
        require(seasonsAddr != address(0), "ADI_TEST_SEASON missing");
        require(iscAddr != address(0), "ADI_TEST_ISC missing");
        require(vsaAddr != address(0), "ADI_TEST_VSA missing");
        require(docsAddr != address(0), "ADI_TEST_DOCUMENT missing");
        require(cccIdsAddr != address(0), "ADI_TEST_CCC_ID missing");

        identity = AgentIdentityRegistry(identityAddr);
        reputation = AgentReputationRegistry(reputationAddr);
        validation = AgentValidationRegistry(validationAddr);
        ccc = CCCGovernanceToken(cccAddr);
        kernel = SharedKernelRegistry(kernelAddr);
        seasons = SeasonRegistry(seasonsAddr);
        isc = ISCRegistry(iscAddr);
        vsa = VSARegistry(vsaAddr);
        docs = DocumentRegistry(docsAddr);
        cccIds = CCCIdRegistry(cccIdsAddr);
    }

    function _deployLocal() internal {
        ccc = new CCCGovernanceToken(gateway);
        kernel = new SharedKernelRegistry(gateway);
        seasons = new SeasonRegistry(gateway);
        isc = new ISCRegistry(gateway);
        identity = new AgentIdentityRegistry(gateway, gateway, 3);
        reputation = new AgentReputationRegistry(gateway, address(identity));
        validation = new AgentValidationRegistry(
            gateway,
            validator,
            address(identity),
            address(reputation)
        );
        vsa = new VSARegistry(gateway);
        docs = new DocumentRegistry(gateway);
        cccIds = new CCCIdRegistry(gateway);
    }
}
