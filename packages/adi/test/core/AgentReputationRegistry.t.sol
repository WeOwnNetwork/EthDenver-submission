// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../utils/DeployedContracts.t.sol";
import "../../src/interfaces/IAgentReputationRegistry.sol";

contract AgentReputationRegistryTest is DeployedContracts {
    function setUp() public override {
        super.setUp();
        vm.prank(gateway);
        identity.register("LDC", "ipfs://QmLDC");
    }

    function test_GiveFeedback() public {
        vm.prank(gateway);
        reputation.giveFeedback(
            1,
            10,
            "ccc_id_generated",
            "LDC_2026-W08_005",
            ""
        );
        assertEq(reputation.feedbackCount(1), 1);
    }

    function test_AggregateScore() public {
        vm.startPrank(gateway);
        reputation.giveFeedback(1, 10, "ccc_id_generated", "", "");
        reputation.giveFeedback(1, 50, "vsa_passed", "", "");
        reputation.giveFeedback(1, -20, "vsa_failed", "", "");
        reputation.giveFeedback(1, 25, "rule_locked", "", "");
        vm.stopPrank();

        (int256 total, uint256 positive, uint256 negative) = reputation
            .aggregateScore(1);
        assertEq(total, 65);
        assertEq(positive, 3);
        assertEq(negative, 1);
    }

    function test_GetFeedbackPaginated() public {
        vm.startPrank(gateway);
        for (uint256 i = 0; i < 10; i++) {
            reputation.giveFeedback(1, 10, "ccc_id_generated", "", "");
        }
        vm.stopPrank();

        IAgentReputationRegistry.Feedback[] memory page1 = reputation
            .getFeedback(1, 0, 5);
        assertEq(page1.length, 5);
        IAgentReputationRegistry.Feedback[] memory page2 = reputation
            .getFeedback(1, 5, 5);
        assertEq(page2.length, 5);
    }
}
