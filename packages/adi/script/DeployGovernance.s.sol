// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/governance/SharedKernelRegistry.sol";
import "../src/governance/SeasonRegistry.sol";
import "../src/governance/ISCRegistry.sol";
import "../src/governance/BadAgentRegistry.sol";
import "../src/governance/CCCGovernanceToken.sol";

/// @title DeployGovernance — governance phase deployment (5 contracts)
contract DeployGovernance is Script {
    function run() external {
        uint256 deployerKey = vm.envOr(
            "DEPLOYER_PRIVATE_KEY",
            vm.envUint("PRIVATE_KEY")
        );
        address deployer = vm.addr(deployerKey);

        console.log("Deployer:", deployer);
        console.log("Chain:", block.chainid);

        vm.startBroadcast(deployerKey);

        CCCGovernanceToken ccc = new CCCGovernanceToken(deployer);
        SharedKernelRegistry kernel = new SharedKernelRegistry(deployer);
        SeasonRegistry seasons = new SeasonRegistry(deployer);
        ISCRegistry isc = new ISCRegistry(deployer);
        BadAgentRegistry badAgent = new BadAgentRegistry(deployer);

        vm.stopBroadcast();

        console.log("");
        console.log("=== Governance Phase ===");
        console.log("CCCGovernanceToken:   ", address(ccc));
        console.log("SharedKernelRegistry: ", address(kernel));
        console.log("SeasonRegistry:       ", address(seasons));
        console.log("ISCRegistry:          ", address(isc));
        console.log("BadAgentRegistry:     ", address(badAgent));
        console.log("Total contracts:       5");
        console.log("========================");
    }
}
