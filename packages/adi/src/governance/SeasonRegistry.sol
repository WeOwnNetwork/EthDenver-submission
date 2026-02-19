// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title SeasonRegistry — #WeOwnSeasons Lifecycle
/// @notice Season lifecycle: PLANNED → ACTIVE → COMPLETED (17 weeks/season)
contract SeasonRegistry is AccessControl {
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    enum SeasonStatus {
        PLANNED,
        ACTIVE,
        PAUSED,
        COMPLETED
    }

    struct Season {
        uint256 number;
        string tag;
        SeasonStatus status;
        uint256 startWeek;
        uint256 endWeek;
        uint256 startTimestamp;
        uint256 endTimestamp;
        uint256 totalCCCIds;
        uint256 totalAgents;
        uint256 totalRulesLocked;
        uint256 totalVSAs;
        string sharedKernelVersion;
        bool exists;
    }

    mapping(uint256 => Season) public seasons;
    uint256 public currentSeason;
    uint256 public totalSeasons;

    event SeasonStarted(uint256 indexed season, string tag, uint256 startWeek);
    event SeasonPaused(uint256 indexed season, string reason);
    event SeasonCompleted(
        uint256 indexed season,
        uint256 totalCCCIds,
        uint256 totalVSAs
    );
    event SeasonStatsUpdated(
        uint256 indexed season,
        uint256 cccIds,
        uint256 vsas
    );

    constructor(address governance) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, governance);
        _addSeason(
            1,
            "#WeOwnSeason001",
            SeasonStatus.COMPLETED,
            0,
            0,
            "v1.0.0"
        );
        _addSeason(
            2,
            "#WeOwnSeason002",
            SeasonStatus.COMPLETED,
            41,
            5,
            "v2.4.18"
        );
        _addSeason(
            3,
            "#WeOwnSeason003",
            SeasonStatus.ACTIVE,
            6,
            22,
            "v3.1.2.1"
        );
        currentSeason = 3;
    }

    function startSeason(
        uint256 number,
        string calldata tag,
        uint256 startWeek,
        uint256 endWeek,
        string calldata skVersion
    ) external onlyRole(GOVERNANCE_ROLE) {
        require(!seasons[number].exists, "SEASON: already exists");
        if (
            currentSeason > 0 &&
            seasons[currentSeason].status == SeasonStatus.ACTIVE
        ) {
            seasons[currentSeason].status = SeasonStatus.COMPLETED;
            seasons[currentSeason].endTimestamp = block.timestamp;
            emit SeasonCompleted(
                currentSeason,
                seasons[currentSeason].totalCCCIds,
                seasons[currentSeason].totalVSAs
            );
        }
        seasons[number] = Season(
            number,
            tag,
            SeasonStatus.ACTIVE,
            startWeek,
            endWeek,
            block.timestamp,
            0,
            0,
            0,
            0,
            0,
            skVersion,
            true
        );
        currentSeason = number;
        totalSeasons++;
        emit SeasonStarted(number, tag, startWeek);
    }

    function pauseSeason(
        string calldata reason
    ) external onlyRole(GOVERNANCE_ROLE) {
        require(
            seasons[currentSeason].status == SeasonStatus.ACTIVE,
            "SEASON: not active"
        );
        seasons[currentSeason].status = SeasonStatus.PAUSED;
        emit SeasonPaused(currentSeason, reason);
    }

    function updateSeasonStats(
        uint256 cccIds,
        uint256 vsas,
        uint256 agents,
        uint256 rulesLocked
    ) external onlyRole(GOVERNANCE_ROLE) {
        Season storage s = seasons[currentSeason];
        s.totalCCCIds = cccIds;
        s.totalVSAs = vsas;
        s.totalAgents = agents;
        s.totalRulesLocked = rulesLocked;
        emit SeasonStatsUpdated(currentSeason, cccIds, vsas);
    }

    function getSeason(uint256 number) external view returns (Season memory) {
        return seasons[number];
    }

    function _addSeason(
        uint256 number,
        string memory tag,
        SeasonStatus status,
        uint256 startWeek,
        uint256 endWeek,
        string memory skVersion
    ) private {
        seasons[number] = Season(
            number,
            tag,
            status,
            startWeek,
            endWeek,
            block.timestamp,
            status == SeasonStatus.COMPLETED ? block.timestamp : 0,
            0,
            0,
            0,
            0,
            skVersion,
            true
        );
        totalSeasons++;
    }
}
