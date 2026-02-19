// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "../interfaces/IAgentReputationRegistry.sol";

/// @title AgentReputationRegistry — ERC-8004 × #FedArch
/// @notice Stores signed reputation feedback signals for agents
contract AgentReputationRegistry is AccessControl, IAgentReputationRegistry {
    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");

    mapping(uint256 => Feedback[]) private _feedbacks;
    mapping(uint256 => int256) private _totalScore;
    mapping(uint256 => uint256) private _positiveCount;
    mapping(uint256 => uint256) private _negativeCount;

    address public identityRegistry;

    constructor(address gateway, address _identityRegistry) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GATEWAY_ROLE, gateway);
        identityRegistry = _identityRegistry;
    }

    function giveFeedback(
        uint256 toAgentId,
        int256 value,
        string calldata feedbackType,
        string calldata refCccId,
        string calldata metadataURI
    ) external onlyRole(GATEWAY_ROLE) {
        require(toAgentId > 0, "REP: invalid agentId");

        Feedback memory fb = Feedback({
            fromAgentId: 0,
            toAgentId: toAgentId,
            value: value,
            feedbackType: feedbackType,
            refCccId: refCccId,
            metadataURI: metadataURI,
            timestamp: block.timestamp
        });

        _feedbacks[toAgentId].push(fb);
        _totalScore[toAgentId] += value;
        if (value > 0) _positiveCount[toAgentId]++;
        else if (value < 0) _negativeCount[toAgentId]++;

        emit FeedbackGiven(0, toAgentId, value, feedbackType, refCccId);
    }

    function getFeedback(
        uint256 agentId,
        uint256 offset,
        uint256 limit
    ) external view returns (Feedback[] memory) {
        Feedback[] storage all = _feedbacks[agentId];
        uint256 total = all.length;
        if (offset >= total) return new Feedback[](0);
        uint256 end = offset + limit;
        if (end > total) end = total;
        uint256 count = end - offset;
        Feedback[] memory result = new Feedback[](count);
        for (uint256 i = 0; i < count; i++) result[i] = all[offset + i];
        return result;
    }

    function feedbackCount(uint256 agentId) external view returns (uint256) {
        return _feedbacks[agentId].length;
    }

    function aggregateScore(
        uint256 agentId
    ) external view returns (int256 total, uint256 positive, uint256 negative) {
        return (
            _totalScore[agentId],
            _positiveCount[agentId],
            _negativeCount[agentId]
        );
    }
}
