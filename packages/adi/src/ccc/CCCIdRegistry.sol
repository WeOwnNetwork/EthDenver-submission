// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./CCCLib.sol";

/// @title CCCIdRegistry — CCC-ID Onchain Registry
/// @notice Enforces R-168, R-169, R-181, R-201, R-202, R-212
contract CCCIdRegistry is AccessControl {
    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");

    struct CCCIdRecord {
        string cccId;
        string contributor;
        uint16 year;
        uint8 week;
        uint16 sequence;
        string instance;
        uint256 reward;
        string hcsTxId;
        uint256 mintedAt;
        uint256 season;
    }

    mapping(bytes32 => CCCIdRecord) public records;
    mapping(bytes32 => uint16) public highWaterMark;
    mapping(bytes32 => uint256) public contributorTotal;
    uint256 public totalMinted;

    event CCCIdMinted(
        string cccId,
        string contributor,
        uint16 year,
        uint8 week,
        uint16 sequence,
        string instance,
        uint256 reward
    );

    constructor(address gateway) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GATEWAY_ROLE, gateway);
    }

    function mintCCCId(
        string calldata cccId,
        string calldata contributor,
        uint16 year,
        uint8 week,
        uint16 sequence,
        string calldata instance,
        uint256 reward,
        string calldata hcsTxId,
        uint256 season
    ) external onlyRole(GATEWAY_ROLE) {
        require(CCCLib.isValidCCC(contributor), "CCCID: invalid CCC");
        require(CCCLib.isValidWeek(week), "CCCID: invalid week");
        require(CCCLib.isValidSequence(sequence), "CCCID: invalid sequence");

        bytes32 idHash = keccak256(bytes(cccId));
        require(records[idHash].mintedAt == 0, "CCCID: duplicate");

        bytes32 weekKey = CCCLib.hashCCCId(contributor, year, week);
        require(
            sequence > highWaterMark[weekKey],
            "CCCID: R-212 sequence must exceed HWM"
        );

        highWaterMark[weekKey] = sequence;
        records[idHash] = CCCIdRecord(
            cccId,
            contributor,
            year,
            week,
            sequence,
            instance,
            reward,
            hcsTxId,
            block.timestamp,
            season
        );
        contributorTotal[keccak256(bytes(contributor))]++;
        totalMinted++;

        emit CCCIdMinted(
            cccId,
            contributor,
            year,
            week,
            sequence,
            instance,
            reward
        );
    }

    function getHighWaterMark(
        string calldata contributor,
        uint16 year,
        uint8 week
    ) external view returns (uint16) {
        return highWaterMark[CCCLib.hashCCCId(contributor, year, week)];
    }

    function getContributorTotal(
        string calldata contributor
    ) external view returns (uint256) {
        return contributorTotal[keccak256(bytes(contributor))];
    }
}
