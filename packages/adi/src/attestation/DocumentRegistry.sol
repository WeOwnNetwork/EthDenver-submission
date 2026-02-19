// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title DocumentRegistry — #PinnedDocs Version Tracking
/// @notice Tracks _SYS_/ document versions (SharedKernel, BEST-PRACTICES, PROTOCOLS, CCC)
contract DocumentRegistry is AccessControl {
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    struct DocumentVersion {
        string name;
        string version;
        string masterCccId;
        string approvalCccId;
        string githubUrl;
        uint256 publishedAt;
        uint256 season;
    }

    mapping(bytes32 => DocumentVersion[]) private _history;
    mapping(bytes32 => DocumentVersion) private _current;
    string[] public documentNames;

    event DocumentPublished(
        string name,
        string version,
        string masterCccId,
        string approvalCccId
    );

    constructor(address governance) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, governance);
        _publish(
            "SharedKernel",
            "v3.1.2.1",
            "GTM_2026-W07_119",
            "GTM_2026-W07_122",
            "https://github.com/CCCbotNet/fedarch",
            3
        );
        _publish(
            "BEST-PRACTICES",
            "v3.1.2.1",
            "GTM_2026-W07_119",
            "GTM_2026-W07_127",
            "https://github.com/CCCbotNet/fedarch",
            3
        );
        _publish(
            "PROTOCOLS",
            "v3.1.1.2",
            "GTM_2026-W06_407",
            "GTM_2026-W06_409",
            "https://github.com/CCCbotNet/fedarch",
            3
        );
        _publish(
            "CCC",
            "v3.1.2.1",
            "GTM_2026-W07_119",
            "GTM_2026-W07_132",
            "https://github.com/CCCbotNet/fedarch",
            3
        );
    }

    function publishVersion(
        string calldata name,
        string calldata version,
        string calldata masterCccId,
        string calldata approvalCccId,
        string calldata githubUrl,
        uint256 season
    ) external onlyRole(GOVERNANCE_ROLE) {
        _publish(name, version, masterCccId, approvalCccId, githubUrl, season);
    }

    function getCurrentVersion(
        string calldata name
    ) external view returns (DocumentVersion memory) {
        return _current[keccak256(bytes(name))];
    }

    function getVersionHistory(
        string calldata name
    ) external view returns (DocumentVersion[] memory) {
        return _history[keccak256(bytes(name))];
    }

    function totalDocuments() external view returns (uint256) {
        return documentNames.length;
    }

    function _publish(
        string memory name,
        string memory version,
        string memory masterCccId,
        string memory approvalCccId,
        string memory githubUrl,
        uint256 season
    ) private {
        bytes32 nameHash = keccak256(bytes(name));
        DocumentVersion memory doc = DocumentVersion(
            name,
            version,
            masterCccId,
            approvalCccId,
            githubUrl,
            block.timestamp,
            season
        );
        if (_history[nameHash].length == 0) documentNames.push(name);
        _history[nameHash].push(doc);
        _current[nameHash] = doc;
        emit DocumentPublished(name, version, masterCccId, approvalCccId);
    }
}
