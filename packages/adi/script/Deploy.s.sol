// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/core/AgentIdentityRegistry.sol";
import "../src/core/AgentReputationRegistry.sol";
import "../src/core/AgentValidationRegistry.sol";
import "../src/governance/SharedKernelRegistry.sol";
import "../src/governance/SeasonRegistry.sol";
import "../src/governance/ISCRegistry.sol";
import "../src/governance/CCCGovernanceToken.sol";
import "../src/attestation/VSARegistry.sol";
import "../src/attestation/DocumentRegistry.sol";
import "../src/ccc/CCCIdRegistry.sol";

/// @title Deploy — Full ERC-8004 × #FedArch Stack (10 contracts)
contract Deploy is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);
        console.log("Deployer:", deployer);
        console.log("Chain:", block.chainid);

        vm.startBroadcast(deployerKey);

        // Governance
        CCCGovernanceToken ccc = new CCCGovernanceToken(deployer);
        SharedKernelRegistry kernel = new SharedKernelRegistry(deployer);
        SeasonRegistry seasons = new SeasonRegistry(deployer);
        ISCRegistry isc = new ISCRegistry(deployer);

        // Core (ERC-8004)
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

        // Attestation
        VSARegistry vsa = new VSARegistry(deployer);
        DocumentRegistry docs = new DocumentRegistry(deployer);

        // CCC
        CCCIdRegistry cccIds = new CCCIdRegistry(deployer);

        vm.stopBroadcast();

        console.log("");
        console.log("=== ERC-8004 x FedArch - Full Stack ===");
        console.log("CCCGovernanceToken:     ", address(ccc));
        console.log("SharedKernelRegistry:   ", address(kernel));
        console.log("SeasonRegistry:         ", address(seasons));
        console.log("ISCRegistry:            ", address(isc));
        console.log("AgentIdentityRegistry:  ", address(identity));
        console.log("AgentReputationRegistry:", address(reputation));
        console.log("AgentValidationRegistry:", address(validation));
        console.log("VSARegistry:            ", address(vsa));
        console.log("DocumentRegistry:       ", address(docs));
        console.log("CCCIdRegistry:          ", address(cccIds));
        console.log("========================================");
        console.log("Total contracts:         10");
        console.log("Season:                  3");
        console.log("SharedKernel:            v3.1.2.1");
        console.log("========================================");
    }
}
