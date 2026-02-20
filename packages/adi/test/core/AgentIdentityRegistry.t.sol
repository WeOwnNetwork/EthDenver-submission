// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../utils/DeployedContracts.t.sol";
import "../../src/core/AgentIdentityRegistry.sol";

contract AgentIdentityRegistryTest is DeployedContracts {
    AgentIdentityRegistry public registry;

    function setUp() public override {
        super.setUp();
        registry = identity;
    }

    function test_RegisterAgent() public {
        vm.prank(gateway);
        uint256 id = registry.register("LDC", "ipfs://QmLDC");
        assertEq(id, 1);
        assertEq(registry.totalAgents(), 1);
        assertTrue(registry.isRegistered("LDC"));
    }

    function test_RegisterMultiple() public {
        vm.startPrank(gateway);
        registry.register("LDC", "ipfs://QmLDC");
        registry.register("SHD", "ipfs://QmSHD");
        registry.register("RMN", "ipfs://QmRMN");
        vm.stopPrank();
        assertEq(registry.totalAgents(), 3);
    }

    function test_RevertDuplicateCCC() public {
        vm.startPrank(gateway);
        registry.register("LDC", "ipfs://QmLDC");
        vm.expectRevert("ADI: CCC already registered (R-212)");
        registry.register("LDC", "ipfs://QmLDC2");
        vm.stopPrank();
    }

    function test_RevertInvalidCCC() public {
        vm.prank(gateway);
        vm.expectRevert("ADI: invalid CCC format");
        registry.register("ldc", "ipfs://Qm");
    }

    function test_RevertShortCCC() public {
        vm.prank(gateway);
        vm.expectRevert("ADI: invalid CCC format");
        registry.register("LD", "ipfs://Qm");
    }

    function test_RevertEmptyURI() public {
        vm.prank(gateway);
        vm.expectRevert("ADI: tokenURI required");
        registry.register("LDC", "");
    }

    function test_RevertUnauthorized() public {
        vm.prank(address(0xDEAD));
        vm.expectRevert();
        registry.register("LDC", "ipfs://Qm");
    }

    function test_AgentURI() public {
        vm.prank(gateway);
        uint256 id = registry.register("LDC", "ipfs://QmLDC");
        assertEq(registry.agentURI(id), "ipfs://QmLDC");
    }

    function test_AgentIdByCCC() public {
        vm.prank(gateway);
        uint256 id = registry.register("GTM", "ipfs://QmGTM");
        assertEq(registry.agentIdByCCC("GTM"), id);
    }

    function test_Deactivate() public {
        vm.prank(gateway);
        uint256 id = registry.register("LDC", "ipfs://QmLDC");
        vm.prank(governance);
        registry.deactivate(id);
        IAgentIdentityRegistry.AgentInfo memory info = registry.agentInfo(id);
        assertFalse(info.active);
    }

    function test_Reactivate() public {
        vm.prank(gateway);
        uint256 id = registry.register("LDC", "ipfs://QmLDC");
        vm.prank(governance);
        registry.deactivate(id);
        vm.prank(governance);
        registry.reactivate(id);
        IAgentIdentityRegistry.AgentInfo memory info = registry.agentInfo(id);
        assertTrue(info.active);
    }
}
