// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IAgentValidationRegistry — ERC-8004 Validation Interface
interface IAgentValidationRegistry {
    struct ValidationRecord {
        uint256 requestId;
        uint256 requesterAgentId;
        uint256 validatorAgentId;
        string subject;
        string validationType;
        bool result;
        bool completed;
        uint256 checksTotal;
        uint256 checksPassed;
        string requestMetadataURI;
        string responseMetadataURI;
        uint256 requestTimestamp;
        uint256 responseTimestamp;
    }

    event ValidationRequested(
        uint256 indexed requestId,
        uint256 indexed requesterAgentId,
        string subject
    );
    event ValidationResponded(
        uint256 indexed requestId,
        uint256 indexed validatorAgentId,
        bool result,
        uint256 checksPassed,
        uint256 checksTotal
    );

    function requestValidation(
        string calldata subject,
        string calldata validationType,
        uint256 checksTotal,
        string calldata metadataURI
    ) external returns (uint256);
    function respondValidation(
        uint256 requestId,
        bool result,
        uint256 checksPassed,
        string calldata metadataURI
    ) external;
    function getValidation(
        uint256 requestId
    ) external view returns (ValidationRecord memory);
    function validationCount(uint256 agentId) external view returns (uint256);
    function passRate(
        uint256 agentId
    ) external view returns (uint256 passed, uint256 total);
}
