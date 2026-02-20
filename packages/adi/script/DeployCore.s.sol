// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/core/AgentIdentityRegistry.sol";
import "../src/core/AgentReputationRegistry.sol";
import "../src/core/AgentValidationRegistry.sol";

/// @title DeployCore — core ERC-8004 phase deployment (3 contracts)
contract DeployCore is Script {
    function run() external {
        uint256 deployerKey = vm.envOr(
            "DEPLOYER_PRIVATE_KEY",
            vm.envUint("PRIVATE_KEY")
        );
        address deployer = vm.addr(deployerKey);

        console.log("Deployer:", deployer);
        console.log("Chain:", block.chainid);

        vm.startBroadcast(deployerKey);

        AgentIdentityRegistry identity = new AgentIdentityRegistry(
            deployer,
            deployer,
            3
        );
        AgentReputationRegistry reputation = new AgentReputationRegistry(
            deployer,
            address(identity)
        );
        AgentValidationRegistry validation = new AgentValidationRegistry(
            deployer,
            deployer,
            address(identity),
            address(reputation)
        );

        vm.stopBroadcast();

        console.log("");
        console.log("=== Core Phase ===");
        console.log("AgentIdentityRegistry:   ", address(identity));
        console.log("AgentReputationRegistry: ", address(reputation));
        console.log("AgentValidationRegistry: ", address(validation));
        console.log("Total contracts:          3");
        console.log("===================");
    }
}
