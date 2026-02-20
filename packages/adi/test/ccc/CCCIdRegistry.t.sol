// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../utils/DeployedContracts.t.sol";

contract CCCIdRegistryTest is DeployedContracts {

    function test_MintCCCId() public {
        vm.prank(gateway);
        cccIds.mintCCCId(
            "LDC_2026-W08_004",
            "LDC",
            2026,
            8,
            4,
            "INT-P01",
            10,
            "",
            3
        );
        assertEq(cccIds.totalMinted(), 1);
        assertEq(cccIds.getHighWaterMark("LDC", 2026, 8), 4);
    }

    function test_SequenceEnforcement() public {
        vm.startPrank(gateway);
        cccIds.mintCCCId(
            "LDC_2026-W08_004",
            "LDC",
            2026,
            8,
            4,
            "INT-P01",
            10,
            "",
            3
        );
        cccIds.mintCCCId(
            "LDC_2026-W08_005",
            "LDC",
            2026,
            8,
            5,
            "INT-P01",
            10,
            "",
            3
        );
        // Should fail: sequence not greater than HWM
        vm.expectRevert("CCCID: R-212 sequence must exceed HWM");
        cccIds.mintCCCId(
            "LDC_2026-W08_003",
            "LDC",
            2026,
            8,
            3,
            "INT-P01",
            10,
            "",
            3
        );
        vm.stopPrank();
    }

    function test_RevertDuplicate() public {
        vm.startPrank(gateway);
        cccIds.mintCCCId(
            "LDC_2026-W08_004",
            "LDC",
            2026,
            8,
            4,
            "INT-P01",
            10,
            "",
            3
        );
        vm.expectRevert("CCCID: duplicate");
        cccIds.mintCCCId(
            "LDC_2026-W08_004",
            "LDC",
            2026,
            8,
            4,
            "INT-P01",
            10,
            "",
            3
        );
        vm.stopPrank();
    }

    function test_ContributorTotal() public {
        vm.startPrank(gateway);
        cccIds.mintCCCId(
            "LDC_2026-W08_004",
            "LDC",
            2026,
            8,
            4,
            "INT-P01",
            10,
            "",
            3
        );
        cccIds.mintCCCId(
            "LDC_2026-W08_005",
            "LDC",
            2026,
            8,
            5,
            "INT-P01",
            10,
            "",
            3
        );
        vm.stopPrank();
        assertEq(cccIds.getContributorTotal("LDC"), 2);
    }

    function test_RevertInvalidCCC() public {
        vm.prank(gateway);
        vm.expectRevert("CCCID: invalid CCC");
        cccIds.mintCCCId(
            "ldc_2026-W08_004",
            "ldc",
            2026,
            8,
            4,
            "INT-P01",
            10,
            "",
            3
        );
    }
}
