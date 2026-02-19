// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title VSARegistry — Verification Summary Attestation
/// @notice Full VSA attestation onchain (BATCH, DEEP_FULL, FULL, FUNCTIONAL)
contract VSARegistry is AccessControl {
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    uint256 private _nextVsaId;

    enum VSAType {
        BATCH,
        DEEP_FULL,
        FULL,
        FUNCTIONAL
    }

    struct VSA {
        uint256 vsaId;
        string subjectDocument;
        string subjectVersion;
        string verifierCcc;
        string instanceId;
        VSAType vsaType;
        bool result;
        uint256 checksTotal;
        uint256 checksPassed;
        string masterCccId;
        string approvalCccId;
        string metadataURI;
        string hcsTxId;
        uint256 verifiedAt;
        uint256 season;
        bool exists;
    }

    mapping(uint256 => VSA) public vsas;
    mapping(bytes32 => uint256[]) private _documentVSAs;
    mapping(bytes32 => uint256[]) private _verifierVSAs;

    uint256 public totalVSAs;
    uint256 public passedVSAs;
    uint256 public totalChecks;
    uint256 public passedChecks;

    event VSASubmitted(
        uint256 indexed vsaId,
        string subjectDocument,
        string subjectVersion,
        bool result,
        uint256 checksPassed,
        uint256 checksTotal,
        string verifierCcc
    );

    constructor(address verifier) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, verifier);
    }

    function submitVSA(
        string calldata subjectDocument,
        string calldata subjectVersion,
        string calldata verifierCcc,
        string calldata instanceId,
        VSAType vsaType,
        bool result,
        uint256 checksTotal_,
        uint256 checksPassed_,
        string calldata masterCccId,
        string calldata approvalCccId,
        string calldata metadataURI,
        string calldata hcsTxId,
        uint256 season
    ) external onlyRole(VERIFIER_ROLE) returns (uint256 vsaId) {
        require(
            checksPassed_ <= checksTotal_,
            "VSA: checksPassed > checksTotal"
        );
        _nextVsaId++;
        vsaId = _nextVsaId;

        vsas[vsaId] = VSA(
            vsaId,
            subjectDocument,
            subjectVersion,
            verifierCcc,
            instanceId,
            vsaType,
            result,
            checksTotal_,
            checksPassed_,
            masterCccId,
            approvalCccId,
            metadataURI,
            hcsTxId,
            block.timestamp,
            season,
            true
        );

        _documentVSAs[
            keccak256(abi.encodePacked(subjectDocument, subjectVersion))
        ].push(vsaId);
        _verifierVSAs[keccak256(bytes(verifierCcc))].push(vsaId);

        totalVSAs++;
        if (result) passedVSAs++;
        totalChecks += checksTotal_;
        passedChecks += checksPassed_;

        emit VSASubmitted(
            vsaId,
            subjectDocument,
            subjectVersion,
            result,
            checksPassed_,
            checksTotal_,
            verifierCcc
        );
    }

    function getDocumentVSAs(
        string calldata doc,
        string calldata version
    ) external view returns (uint256[] memory) {
        return _documentVSAs[keccak256(abi.encodePacked(doc, version))];
    }

    function getVerifierVSAs(
        string calldata ccc
    ) external view returns (uint256[] memory) {
        return _verifierVSAs[keccak256(bytes(ccc))];
    }

    function getPassRate()
        external
        view
        returns (uint256 passed, uint256 total)
    {
        return (passedVSAs, totalVSAs);
    }
}
