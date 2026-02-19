// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IAgentReputationRegistry — ERC-8004 Reputation Interface
interface IAgentReputationRegistry {
    struct Feedback {
        uint256 fromAgentId;
        uint256 toAgentId;
        int256 value;
        string feedbackType;
        string refCccId;
        string metadataURI;
        uint256 timestamp;
    }

    event FeedbackGiven(
        uint256 indexed fromAgentId,
        uint256 indexed toAgentId,
        int256 value,
        string feedbackType,
        string refCccId
    );

    function giveFeedback(
        uint256 toAgentId,
        int256 value,
        string calldata feedbackType,
        string calldata refCccId,
        string calldata metadataURI
    ) external;
    function getFeedback(
        uint256 agentId,
        uint256 offset,
        uint256 limit
    ) external view returns (Feedback[] memory);
    function feedbackCount(uint256 agentId) external view returns (uint256);
    function aggregateScore(
        uint256 agentId
    ) external view returns (int256 total, uint256 positive, uint256 negative);
}
