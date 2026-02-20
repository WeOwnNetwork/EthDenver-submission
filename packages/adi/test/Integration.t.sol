// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./utils/DeployedContracts.t.sol";
import "../src/attestation/VSARegistry.sol";
import "../src/governance/SharedKernelRegistry.sol";

/// @title Integration Test - Full ERC-8004 x FedArch E2E Flow
contract IntegrationTest is DeployedContracts {
    address public ldcWallet = address(0x10);
    address public shdWallet = address(0x11);

    function test_FullETHDenverFlow() public {
        // 1. Register agents
        vm.startPrank(gateway);
        uint256 ldcId = identity.register("LDC", "ipfs://QmLDC");
        uint256 shdId = identity.register("SHD", "ipfs://QmSHD");
        vm.stopPrank();
        assertEq(identity.totalAgents(), 2);

        // 2. Mint CCC-IDs with R-212
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
        cccIds.mintCCCId(
            "SHD_2026-W08_004",
            "SHD",
            2026,
            8,
            4,
            "INT-P01",
            10,
            "",
            3
        );
        vm.stopPrank();
        assertEq(cccIds.totalMinted(), 3);

        // 3. Reputation feedback
        vm.startPrank(gateway);
        reputation.giveFeedback(ldcId, 10, "ccc_id_generated", "", "");
        reputation.giveFeedback(ldcId, 10, "ccc_id_generated", "", "");
        reputation.giveFeedback(shdId, 10, "ccc_id_generated", "", "");
        vm.stopPrank();

        (int256 ldcScore, , ) = reputation.aggregateScore(ldcId);
        assertEq(ldcScore, 20);

        // 4. VSA validation
        vm.prank(gateway);
        uint256 vsaReq = validation.requestValidation(
            "vsa:SharedKernel:v3.1.2.1",
            "vsa",
            132,
            "ipfs://QmVSA"
        );
        vm.prank(validator);
        validation.respondValidation(vsaReq, true, 132, "ipfs://QmVSARes");

        // Submit VSA attestation
        vm.prank(gateway);
        vsa.submitVSA(
            "SharedKernel",
            "v3.1.2.1",
            "GTM",
            "INT-P01",
            VSARegistry.VSAType.FULL,
            true,
            132,
            132,
            "GTM_2026-W08_119",
            "GTM_2026-W08_122",
            "ipfs://QmVSA",
            "",
            3
        );
        assertEq(vsa.totalVSAs(), 1);

        // 5. ISC certification
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
            "Claude",
            "4 docs",
            "R-213",
            "BP-053",
            "BP-058",
            "GitHub",
            "OK"
        ];
        vm.prank(gateway);
        isc.submitISC(
            "INT-E01",
            3,
            "GTM",
            checks,
            notes,
            "GTM_2026-W08_100",
            ""
        );
        assertTrue(isc.isInstanceCertified("INT-E01", 3));

        // 6. Propose and lock a new rule
        vm.startPrank(gateway);
        kernel.proposeRule(
            "R-300",
            "E2E test rule",
            SharedKernelRegistry.RuleCategory.GOVERNANCE,
            SharedKernelRegistry.ItemType.RULE,
            "AI:@GTM"
        );
        kernel.lockRule("R-300", "LDC_2026-W08_010", "AI:@GTM", 3);
        vm.stopPrank();
        assertTrue(kernel.isLocked("R-300"));

        // 7. Mint $CCC rewards
        vm.startPrank(gateway);
        ccc.mint(ldcWallet, 50 * 1e18);
        ccc.mint(shdWallet, 10 * 1e18);
        vm.stopPrank();
        assertEq(ccc.balanceOf(ldcWallet), 50 * 1e18);

        // 8. Season stats
        vm.prank(gateway);
        seasons.updateSeasonStats(3, 1, 2, 14);
    }
}
