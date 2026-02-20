// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../utils/DeployedContracts.t.sol";
import "../../src/governance/ISCRegistry.sol";

contract ISCRegistryTest is DeployedContracts {
    function setUp() public override {
        super.setUp();
        certifier = governance;
    }

    address public certifier;

    function test_SubmitFullCert() public {
        bool[8] memory checks = [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ];
        string[8] memory notes = [
            "Qwen3",
            "Claude Opus",
            "4 docs",
            "R-213",
            "BP-053",
            "BP-058",
            "GitHub",
            "Reachable"
        ];

        vm.prank(certifier);
        uint256 certId = isc.submitISC(
            "INT-E01",
            3,
            "GTM",
            checks,
            notes,
            "GTM_2026-W08_100",
            "ipfs://QmISC"
        );

        ISCRegistry.ISCCertification memory cert = isc.getCertification(certId);
        assertTrue(cert.certified);
        assertEq(cert.checksPassed, 8);
        assertTrue(isc.isInstanceCertified("INT-E01", 3));
    }

    function test_PartialCert() public {
        bool[8] memory checks = [
            true,
            true,
            false,
            true,
            true,
            true,
            false,
            true
        ];
        string[8] memory notes = ["", "", "Missing", "", "", "", "Stale", ""];

        vm.prank(certifier);
        isc.submitISC(
            "INT-P02",
            3,
            "LDC",
            checks,
            notes,
            "LDC_2026-W08_005",
            ""
        );

        assertFalse(isc.isInstanceCertified("INT-P02", 3));
    }

    function test_RevertDuplicateCert() public {
        bool[8] memory checks = [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ];
        string[8] memory notes = ["", "", "", "", "", "", "", ""];

        vm.startPrank(certifier);
        isc.submitISC("INT-E01", 3, "GTM", checks, notes, "CCC1", "");
        vm.expectRevert("ISC: already certified this season");
        isc.submitISC("INT-E01", 3, "GTM", checks, notes, "CCC2", "");
        vm.stopPrank();
    }

    function test_InstanceHistory() public {
        bool[8] memory checks = [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ];
        string[8] memory notes = ["", "", "", "", "", "", "", ""];

        vm.startPrank(certifier);
        isc.submitISC("INT-P01", 2, "GTM", checks, notes, "CCC1", "");
        isc.submitISC("INT-P01", 3, "GTM", checks, notes, "CCC2", "");
        vm.stopPrank();

        uint256[] memory history = isc.getInstanceHistory("INT-P01");
        assertEq(history.length, 2);
    }
}
