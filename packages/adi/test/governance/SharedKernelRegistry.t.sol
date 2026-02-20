// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../utils/DeployedContracts.t.sol";
import "../../src/governance/SharedKernelRegistry.sol";

contract SharedKernelRegistryTest is DeployedContracts {

    function test_BootstrappedRules() public view {
        assertEq(kernel.totalRules(), 13);
        assertTrue(kernel.isImmutable("R-011"));
        assertTrue(kernel.isImmutable("R-206"));
        assertTrue(kernel.isLocked("R-212"));
    }

    function test_ProposeAndLock() public {
        vm.startPrank(governance);
        kernel.proposeRule(
            "R-300",
            "Test rule",
            SharedKernelRegistry.RuleCategory.GOVERNANCE,
            SharedKernelRegistry.ItemType.RULE,
            "AI:@GTM"
        );

        SharedKernelRegistry.Rule memory r = kernel.getRule("R-300");
        assertTrue(r.exists);
        assertEq(
            uint(r.status),
            uint(SharedKernelRegistry.RuleStatus.PROPOSED)
        );

        kernel.lockRule("R-300", "LDC_2026-W08_010", "AI:@GTM", 3);
        r = kernel.getRule("R-300");
        assertEq(uint(r.status), uint(SharedKernelRegistry.RuleStatus.LOCKED));
        vm.stopPrank();
    }

    function test_RevertDeprecateImmutable() public {
        vm.prank(governance);
        vm.expectRevert("SK: IMMUTABLE rules cannot be deprecated");
        kernel.deprecateRule("R-011", "test");
    }

    function test_DeprecateLocked() public {
        vm.startPrank(governance);
        kernel.proposeRule(
            "R-301",
            "Temp rule",
            SharedKernelRegistry.RuleCategory.OPERATIONAL,
            SharedKernelRegistry.ItemType.RULE,
            "AI:@LDC"
        );
        kernel.lockRule("R-301", "LDC_2026-W08_011", "AI:@LDC", 3);
        kernel.deprecateRule("R-301", "No longer needed");
        SharedKernelRegistry.Rule memory r = kernel.getRule("R-301");
        assertEq(
            uint(r.status),
            uint(SharedKernelRegistry.RuleStatus.DEPRECATED)
        );
        vm.stopPrank();
    }

    function test_Version() public {
        assertEq(kernel.currentVersion(), "v3.1.2.1");
        vm.prank(governance);
        kernel.updateVersion("v3.2.0.0", "GTM_2026-W09_001");
        assertEq(kernel.currentVersion(), "v3.2.0.0");
    }
}

