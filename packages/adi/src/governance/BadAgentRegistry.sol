// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title BadAgentRegistry — incident tracking for #BadAgent governance flows
/// @notice Stores incident reports and their lifecycle (OPEN → RESOLVED)
contract BadAgentRegistry is AccessControl {
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    enum IncidentStatus {
        OPEN,
        RESOLVED
    }

    struct Incident {
        uint256 incidentId;
        uint256 agentId;
        string ccc;
        string reporterCcc;
        string reason;
        string evidenceURI;
        string refCccId;
        IncidentStatus status;
        string resolverCcc;
        string resolution;
        uint256 reportedAt;
        uint256 resolvedAt;
        bool exists;
    }

    uint256 private _nextIncidentId;
    mapping(uint256 => Incident) private _incidents;
    mapping(uint256 => uint256[]) private _incidentIdsByAgent;

    uint256 public totalIncidents;
    uint256 public openIncidents;
    uint256 public resolvedIncidents;

    event AgentFlagged(
        uint256 indexed incidentId,
        uint256 indexed agentId,
        string ccc,
        string reporterCcc,
        string reason,
        string refCccId
    );

    event IncidentResolved(
        uint256 indexed incidentId,
        uint256 indexed agentId,
        string resolverCcc,
        string resolution
    );

    constructor(address governance) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, governance);
    }

    function flagAgent(
        uint256 agentId,
        string calldata ccc,
        string calldata reporterCcc,
        string calldata reason,
        string calldata evidenceURI,
        string calldata refCccId
    ) external onlyRole(GOVERNANCE_ROLE) returns (uint256 incidentId) {
        require(agentId > 0, "BAD: invalid agentId");
        require(bytes(ccc).length > 0, "BAD: missing CCC");
        require(bytes(reporterCcc).length > 0, "BAD: missing reporter");
        require(bytes(reason).length > 0, "BAD: missing reason");

        _nextIncidentId++;
        incidentId = _nextIncidentId;

        _incidents[incidentId] = Incident({
            incidentId: incidentId,
            agentId: agentId,
            ccc: ccc,
            reporterCcc: reporterCcc,
            reason: reason,
            evidenceURI: evidenceURI,
            refCccId: refCccId,
            status: IncidentStatus.OPEN,
            resolverCcc: "",
            resolution: "",
            reportedAt: block.timestamp,
            resolvedAt: 0,
            exists: true
        });

        _incidentIdsByAgent[agentId].push(incidentId);
        totalIncidents++;
        openIncidents++;

        emit AgentFlagged(incidentId, agentId, ccc, reporterCcc, reason, refCccId);
    }

    function resolveIncident(
        uint256 incidentId,
        string calldata resolverCcc,
        string calldata resolution
    ) external onlyRole(GOVERNANCE_ROLE) {
        Incident storage incident = _incidents[incidentId];
        require(incident.exists, "BAD: incident not found");
        require(incident.status == IncidentStatus.OPEN, "BAD: incident already resolved");
        require(bytes(resolverCcc).length > 0, "BAD: missing resolver");

        incident.status = IncidentStatus.RESOLVED;
        incident.resolverCcc = resolverCcc;
        incident.resolution = resolution;
        incident.resolvedAt = block.timestamp;

        openIncidents--;
        resolvedIncidents++;

        emit IncidentResolved(
            incidentId,
            incident.agentId,
            resolverCcc,
            resolution
        );
    }

    function getIncident(uint256 incidentId) external view returns (Incident memory) {
        return _incidents[incidentId];
    }

    function getAgentIncidentIds(uint256 agentId) external view returns (uint256[] memory) {
        return _incidentIdsByAgent[agentId];
    }

    function isFlagged(uint256 agentId) external view returns (bool) {
        uint256[] storage ids = _incidentIdsByAgent[agentId];
        uint256 length = ids.length;
        for (uint256 i = 0; i < length; i++) {
            if (_incidents[ids[i]].status == IncidentStatus.OPEN) {
                return true;
            }
        }
        return false;
    }
}
