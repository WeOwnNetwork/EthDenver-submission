// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "../interfaces/IAgentValidationRegistry.sol";

/// @title AgentValidationRegistry — ERC-8004 × #FedArch
/// @notice Manages VSA / ISC validation workflows
contract AgentValidationRegistry is AccessControl, IAgentValidationRegistry {
    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");

    uint256 private _nextRequestId;

    mapping(uint256 => ValidationRecord) private _validations;
    mapping(uint256 => uint256) private _passCount;
    mapping(uint256 => uint256) private _totalCount;

    address public identityRegistry;
    address public reputationRegistry;

    constructor(
        address gateway,
        address validator,
        address _identityRegistry,
        address _reputationRegistry
    ) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GATEWAY_ROLE, gateway);
        _grantRole(VALIDATOR_ROLE, validator);
        identityRegistry = _identityRegistry;
        reputationRegistry = _reputationRegistry;
    }

    function requestValidation(
        string calldata subject,
        string calldata validationType,
        uint256 checksTotal,
        string calldata metadataURI
    ) external onlyRole(GATEWAY_ROLE) returns (uint256 requestId) {
        _nextRequestId++;
        requestId = _nextRequestId;

        _validations[requestId] = ValidationRecord({
            requestId: requestId,
            requesterAgentId: 0,
            validatorAgentId: 0,
            subject: subject,
            validationType: validationType,
            result: false,
            completed: false,
            checksTotal: checksTotal,
            checksPassed: 0,
            requestMetadataURI: metadataURI,
            responseMetadataURI: "",
            requestTimestamp: block.timestamp,
            responseTimestamp: 0
        });

        emit ValidationRequested(requestId, 0, subject);
    }

    function respondValidation(
        uint256 requestId,
        bool result,
        uint256 checksPassed,
        string calldata metadataURI
    ) external onlyRole(VALIDATOR_ROLE) {
        ValidationRecord storage v = _validations[requestId];
        require(!v.completed, "VAL: already completed");
        require(v.requestTimestamp > 0, "VAL: request not found");
        require(
            checksPassed <= v.checksTotal,
            "VAL: checksPassed > checksTotal"
        );

        v.validatorAgentId = 0;
        v.result = result;
        v.completed = true;
        v.checksPassed = checksPassed;
        v.responseMetadataURI = metadataURI;
        v.responseTimestamp = block.timestamp;

        _totalCount[v.requesterAgentId]++;
        if (result) _passCount[v.requesterAgentId]++;

        emit ValidationResponded(
            requestId,
            v.validatorAgentId,
            result,
            checksPassed,
            v.checksTotal
        );
    }

    function getValidation(
        uint256 requestId
    ) external view returns (ValidationRecord memory) {
        return _validations[requestId];
    }

    function validationCount(uint256 agentId) external view returns (uint256) {
        return _totalCount[agentId];
    }

    function passRate(
        uint256 agentId
    ) external view returns (uint256 passed, uint256 total) {
        return (_passCount[agentId], _totalCount[agentId]);
    }
}
