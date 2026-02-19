// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title ISCRegistry — Instance Season Certification (BP-059)
/// @notice 8-point certification checklist per instance per season
contract ISCRegistry is AccessControl {
    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");

    uint256 private _nextCertId;

    struct ISCCheck {
        bool passed;
        string notes;
    }

    struct ISCCertification {
        uint256 certId;
        string instanceId;
        uint256 season;
        address certifiedBy;
        string certifierCcc;
        uint256 certifiedAt;
        bool certified;
        uint256 checksPassed;
        string attestationCccId;
        string metadataURI;
        bool exists;
    }

    // certId → ISCCertification (without checks array, stored separately)
    mapping(uint256 => ISCCertification) private _certs;
    // certId → check index → ISCCheck
    mapping(uint256 => mapping(uint8 => ISCCheck)) private _checks;
    // instanceId hash + season → certId
    mapping(bytes32 => uint256) private _instanceSeasonCert;
    // Instance → certified seasons
    mapping(bytes32 => uint256[]) private _instanceHistory;

    string[8] public CHECK_NAMES = [
        "EMBEDDER",
        "LLM_MODEL",
        "PINNED_DOCS",
        "SYSTEM_PROMPT",
        "WORKSPACE_PROMPTS",
        "USER_IDENTITY",
        "RAG_SYNC",
        "CONTEXT_VOLLEY"
    ];

    event ISCSubmitted(
        uint256 indexed certId,
        string instanceId,
        uint256 season,
        bool certified,
        uint256 checksPassed
    );

    constructor(address certifier) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CERTIFIER_ROLE, certifier);
    }

    function submitISC(
        string calldata instanceId,
        uint256 season,
        string calldata certifierCcc,
        bool[8] calldata checkResults,
        string[8] calldata checkNotes,
        string calldata attestationCccId,
        string calldata metadataURI
    ) external onlyRole(CERTIFIER_ROLE) returns (uint256 certId) {
        bytes32 key = keccak256(abi.encodePacked(instanceId, season));
        require(
            _instanceSeasonCert[key] == 0,
            "ISC: already certified this season"
        );
        require(
            bytes(attestationCccId).length > 0,
            "ISC: R-011 approval CCC-ID required"
        );

        _nextCertId++;
        certId = _nextCertId;

        uint256 passed = 0;
        for (uint8 i = 0; i < 8; i++) {
            _checks[certId][i] = ISCCheck(checkResults[i], checkNotes[i]);
            if (checkResults[i]) passed++;
        }

        _certs[certId] = ISCCertification({
            certId: certId,
            instanceId: instanceId,
            season: season,
            certifiedBy: msg.sender,
            certifierCcc: certifierCcc,
            certifiedAt: block.timestamp,
            certified: (passed == 8),
            checksPassed: passed,
            attestationCccId: attestationCccId,
            metadataURI: metadataURI,
            exists: true
        });

        _instanceSeasonCert[key] = certId;
        _instanceHistory[keccak256(bytes(instanceId))].push(certId);
        emit ISCSubmitted(certId, instanceId, season, passed == 8, passed);
    }

    function getCertification(
        uint256 certId
    ) external view returns (ISCCertification memory) {
        return _certs[certId];
    }

    function getCheckResult(
        uint256 certId,
        uint8 checkIndex
    ) external view returns (bool passed, string memory notes) {
        require(checkIndex < 8, "ISC: invalid check index");
        ISCCheck storage check = _checks[certId][checkIndex];
        return (check.passed, check.notes);
    }

    function isInstanceCertified(
        string calldata instanceId,
        uint256 season
    ) external view returns (bool) {
        bytes32 key = keccak256(abi.encodePacked(instanceId, season));
        uint256 certId = _instanceSeasonCert[key];
        if (certId == 0) return false;
        return _certs[certId].certified;
    }

    function getInstanceHistory(
        string calldata instanceId
    ) external view returns (uint256[] memory) {
        return _instanceHistory[keccak256(bytes(instanceId))];
    }
}
