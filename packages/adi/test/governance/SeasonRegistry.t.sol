// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../utils/DeployedContracts.t.sol";
import "../../src/governance/SeasonRegistry.sol";

contract SeasonRegistryTest is DeployedContracts {

    function test_Bootstrapped() public view {
        assertEq(seasons.currentSeason(), 3);
        assertEq(seasons.totalSeasons(), 3);
    }

    function test_StartNewSeason() public {
        vm.prank(governance);
        seasons.startSeason(4, "#WeOwnSeason004", 23, 39, "v4.0.0");
        assertEq(seasons.currentSeason(), 4);
        // Previous season should be completed
        SeasonRegistry.Season memory s3 = seasons.getSeason(3);
        assertEq(uint(s3.status), uint(SeasonRegistry.SeasonStatus.COMPLETED));
    }

    function test_PauseSeason() public {
        vm.prank(governance);
        seasons.pauseSeason("Maintenance");
        SeasonRegistry.Season memory s = seasons.getSeason(3);
        assertEq(uint(s.status), uint(SeasonRegistry.SeasonStatus.PAUSED));
    }

    function test_UpdateStats() public {
        vm.prank(governance);
        seasons.updateSeasonStats(150, 10, 5, 25);
        SeasonRegistry.Season memory s = seasons.getSeason(3);
        assertEq(s.totalCCCIds, 150);
        assertEq(s.totalVSAs, 10);
    }
}

