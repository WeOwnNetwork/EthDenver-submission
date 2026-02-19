// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../../src/core/AgentIdentityRegistry.sol";
import "../../src/core/AgentReputationRegistry.sol";
import "../../src/core/AgentValidationRegistry.sol";

contract AgentValidationRegistryTest is Test {
    AgentValidationRegistry public validation;
    address public gateway = address(0x1);
    address public validator = address(0x2);

    function setUp() public {
        AgentIdentityRegistry identity = new AgentIdentityRegistry(
            gateway,
            address(this),
            3
        );
        AgentReputationRegistry reputation = new AgentReputationRegistry(
            gateway,
            address(identity)
        );
        validation = new AgentValidationRegistry(
            gateway,
            validator,
            address(identity),
            address(reputation)
        );
    }

    function test_RequestAndRespond() public {
        vm.prank(gateway);
        uint256 reqId = validation.requestValidation(
            "vsa:SharedKernel:v3.1.2.1",
            "vsa",
            132,
            "ipfs://QmReq"
        );
        assertEq(reqId, 1);

        vm.prank(validator);
        validation.respondValidation(reqId, true, 132, "ipfs://QmRes");

        IAgentValidationRegistry.ValidationRecord memory v = validation
            .getValidation(reqId);
        assertTrue(v.completed);
        assertTrue(v.result);
        assertEq(v.checksPassed, 132);
    }

    function test_FailedValidation() public {
        vm.prank(gateway);
        uint256 reqId = validation.requestValidation(
            "vsa:PRJ-008:v0.1",
            "vsa",
            24,
            ""
        );
        vm.prank(validator);
        validation.respondValidation(reqId, false, 1, "ipfs://QmFail");

        IAgentValidationRegistry.ValidationRecord memory v = validation
            .getValidation(reqId);
        assertFalse(v.result);
        assertEq(v.checksPassed, 1);
    }

    function test_RevertDoubleResponse() public {
        vm.prank(gateway);
        uint256 reqId = validation.requestValidation("test", "vsa", 10, "");
        vm.prank(validator);
        validation.respondValidation(reqId, true, 10, "");
        vm.prank(validator);
        vm.expectRevert("VAL: already completed");
        validation.respondValidation(reqId, true, 10, "");
    }

    function test_RevertChecksExceed() public {
        vm.prank(gateway);
        uint256 reqId = validation.requestValidation("test", "vsa", 10, "");
        vm.prank(validator);
        vm.expectRevert("VAL: checksPassed > checksTotal");
        validation.respondValidation(reqId, true, 11, "");
    }

    function test_PassRate() public {
        vm.startPrank(gateway);
        uint256 r1 = validation.requestValidation("d1", "vsa", 100, "");
        uint256 r2 = validation.requestValidation("d2", "vsa", 50, "");
        uint256 r3 = validation.requestValidation("d3", "vsa", 24, "");
        vm.stopPrank();

        vm.startPrank(validator);
        validation.respondValidation(r1, true, 100, "");
        validation.respondValidation(r2, true, 50, "");
        validation.respondValidation(r3, false, 1, "");
        vm.stopPrank();

        (uint256 passed, uint256 total) = validation.passRate(0);
        assertEq(passed, 2);
        assertEq(total, 3);
    }
}
