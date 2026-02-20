// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/attestation/VSARegistry.sol";
import "../src/attestation/DocumentRegistry.sol";
import "../src/ccc/CCCIdRegistry.sol";

/// @title DeployAttestation — attestation/ccc phase deployment (3 contracts)
contract DeployAttestation is Script {
    function run() external {
        uint256 deployerKey = vm.envOr(
            "DEPLOYER_PRIVATE_KEY",
            vm.envUint("PRIVATE_KEY")
        );
        address deployer = vm.addr(deployerKey);

        console.log("Deployer:", deployer);
        console.log("Chain:", block.chainid);

        vm.startBroadcast(deployerKey);

        VSARegistry vsa = new VSARegistry(deployer);
        DocumentRegistry docs = new DocumentRegistry(deployer);
        CCCIdRegistry cccIds = new CCCIdRegistry(deployer);

        vm.stopBroadcast();

        console.log("");
        console.log("=== Attestation + CCC Phase ===");
        console.log("VSARegistry:      ", address(vsa));
        console.log("DocumentRegistry: ", address(docs));
        console.log("CCCIdRegistry:    ", address(cccIds));
        console.log("Total contracts:   3");
        console.log("===============================");
    }
}
