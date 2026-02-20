// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/core/AgentIdentityRegistry.sol";
import "../src/core/AgentReputationRegistry.sol";
import "../src/core/AgentValidationRegistry.sol";
import "../src/governance/SharedKernelRegistry.sol";
import "../src/governance/SeasonRegistry.sol";
import "../src/governance/ISCRegistry.sol";
import "../src/governance/BadAgentRegistry.sol";
import "../src/governance/CCCGovernanceToken.sol";
import "../src/attestation/VSARegistry.sol";
import "../src/attestation/DocumentRegistry.sol";
import "../src/ccc/CCCIdRegistry.sol";

/// @title DeployUnit — one-contract deployment helpers for very tight balances
contract DeployUnit is Script {
    function _deployerKey() internal view returns (uint256) {
        return vm.envOr("DEPLOYER_PRIVATE_KEY", vm.envUint("PRIVATE_KEY"));
    }

    function _deployer() internal view returns (address) {
        return vm.addr(_deployerKey());
    }

    function deployCCCGovernanceToken() external returns (address deployedAt) {
        uint256 key = _deployerKey();
        address deployer = vm.addr(key);
        vm.startBroadcast(key);
        deployedAt = address(new CCCGovernanceToken(deployer));
        vm.stopBroadcast();
        console.log("CCCGovernanceToken:", deployedAt);
    }

    function deploySharedKernelRegistry() external returns (address deployedAt) {
        uint256 key = _deployerKey();
        address deployer = vm.addr(key);
        vm.startBroadcast(key);
        deployedAt = address(new SharedKernelRegistry(deployer));
        vm.stopBroadcast();
        console.log("SharedKernelRegistry:", deployedAt);
    }

    function deploySeasonRegistry() external returns (address deployedAt) {
        uint256 key = _deployerKey();
        address deployer = vm.addr(key);
        vm.startBroadcast(key);
        deployedAt = address(new SeasonRegistry(deployer));
        vm.stopBroadcast();
        console.log("SeasonRegistry:", deployedAt);
    }

    function deployISCRegistry() external returns (address deployedAt) {
        uint256 key = _deployerKey();
        address deployer = vm.addr(key);
        vm.startBroadcast(key);
        deployedAt = address(new ISCRegistry(deployer));
        vm.stopBroadcast();
        console.log("ISCRegistry:", deployedAt);
    }

    function deployBadAgentRegistry() external returns (address deployedAt) {
        uint256 key = _deployerKey();
        address deployer = vm.addr(key);
        vm.startBroadcast(key);
        deployedAt = address(new BadAgentRegistry(deployer));
        vm.stopBroadcast();
        console.log("BadAgentRegistry:", deployedAt);
    }

    function deployAgentIdentityRegistry() external returns (address deployedAt) {
        uint256 key = _deployerKey();
        address deployer = vm.addr(key);
        vm.startBroadcast(key);
        deployedAt = address(new AgentIdentityRegistry(deployer, deployer, 3));
        vm.stopBroadcast();
        console.log("AgentIdentityRegistry:", deployedAt);
    }

    function deployAgentReputationRegistry() external returns (address deployedAt) {
        uint256 key = _deployerKey();
        address deployer = vm.addr(key);
        address identity = vm.envAddress("ADI_IDENTITY_ADDRESS");
        vm.startBroadcast(key);
        deployedAt = address(new AgentReputationRegistry(deployer, identity));
        vm.stopBroadcast();
        console.log("AgentReputationRegistry:", deployedAt);
    }

    function deployAgentValidationRegistry() external returns (address deployedAt) {
        uint256 key = _deployerKey();
        address deployer = vm.addr(key);
        address identity = vm.envAddress("ADI_IDENTITY_ADDRESS");
        address reputation = vm.envAddress("ADI_REPUTATION_ADDRESS");
        vm.startBroadcast(key);
        deployedAt = address(
            new AgentValidationRegistry(deployer, deployer, identity, reputation)
        );
        vm.stopBroadcast();
        console.log("AgentValidationRegistry:", deployedAt);
    }

    function deployVSARegistry() external returns (address deployedAt) {
        uint256 key = _deployerKey();
        address deployer = vm.addr(key);
        vm.startBroadcast(key);
        deployedAt = address(new VSARegistry(deployer));
        vm.stopBroadcast();
        console.log("VSARegistry:", deployedAt);
    }

    function deployDocumentRegistry() external returns (address deployedAt) {
        uint256 key = _deployerKey();
        address deployer = vm.addr(key);
        vm.startBroadcast(key);
        deployedAt = address(new DocumentRegistry(deployer));
        vm.stopBroadcast();
        console.log("DocumentRegistry:", deployedAt);
    }

    function deployCCCIdRegistry() external returns (address deployedAt) {
        uint256 key = _deployerKey();
        address deployer = vm.addr(key);
        vm.startBroadcast(key);
        deployedAt = address(new CCCIdRegistry(deployer));
        vm.stopBroadcast();
        console.log("CCCIdRegistry:", deployedAt);
    }

    function deployerAddress() external view returns (address) {
        return _deployer();
    }
}
