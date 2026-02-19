// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title SharedKernelRegistry — #FedArch Rules Onchain
/// @notice Stores SharedKernel rules, best practices, learnings, definitions
contract SharedKernelRegistry is AccessControl {
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    enum RuleStatus {
        PROPOSED,
        LOCKED,
        IMMUTABLE,
        DEPRECATED
    }
    enum RuleCategory {
        IDENTITY,
        WORKSPACE,
        GOVERNANCE,
        OPERATIONAL,
        INSTANCE
    }
    enum ItemType {
        RULE,
        BEST_PRACTICE,
        LEARNING,
        DEFINITION
    }

    struct Rule {
        string id;
        string description;
        RuleStatus status;
        RuleCategory category;
        ItemType itemType;
        string approvalCccId;
        string lockedBy;
        uint256 lockedAt;
        uint256 season;
        bool exists;
    }

    mapping(bytes32 => Rule) public rules;
    string[] public ruleIds;
    mapping(ItemType => uint256) public itemCounts;
    string public currentVersion;

    event RuleProposed(
        string indexed id,
        string description,
        ItemType itemType,
        string proposedBy
    );
    event RuleLocked(
        string indexed id,
        string approvalCccId,
        string lockedBy,
        uint256 season
    );
    event RuleDeprecated(string indexed id, string reason);
    event VersionUpdated(string version, string masterCccId);

    constructor(address governance) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, governance);
        currentVersion = "v3.1.2.1";
        _bootstrapImmutableRules();
    }

    function _bootstrapImmutableRules() private {
        _addRule(
            "R-011",
            "#OnlyHumanApproves",
            RuleStatus.IMMUTABLE,
            RuleCategory.GOVERNANCE,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
        _addRule(
            "R-194",
            "CCC-ID generation ONLY in CCC workspace",
            RuleStatus.IMMUTABLE,
            RuleCategory.WORKSPACE,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
        _addRule(
            "R-197",
            "Doc generation = #MetaAgent ONLY",
            RuleStatus.IMMUTABLE,
            RuleCategory.GOVERNANCE,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
        _addRule(
            "R-205",
            "#GODx10xMODE IMMUTABLE",
            RuleStatus.IMMUTABLE,
            RuleCategory.IDENTITY,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
        _addRule(
            "R-206",
            "ADMIN accounts NEVER generate CCC-IDs",
            RuleStatus.IMMUTABLE,
            RuleCategory.IDENTITY,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
        _addRule(
            "R-168",
            "CCC-ID tied to contributor",
            RuleStatus.LOCKED,
            RuleCategory.OPERATIONAL,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
        _addRule(
            "R-169",
            "CCC-ID resets at ISO week boundary",
            RuleStatus.LOCKED,
            RuleCategory.OPERATIONAL,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
        _addRule(
            "R-181",
            "_001 reserved for #WeeklySummary",
            RuleStatus.LOCKED,
            RuleCategory.OPERATIONAL,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
        _addRule(
            "R-201",
            "_002 reserved for #WeeklyPlan",
            RuleStatus.LOCKED,
            RuleCategory.OPERATIONAL,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
        _addRule(
            "R-202",
            "_003 reserved for #WeeklyReflection",
            RuleStatus.LOCKED,
            RuleCategory.OPERATIONAL,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
        _addRule(
            "R-212",
            "Cross-instance CCC-ID deconfliction",
            RuleStatus.LOCKED,
            RuleCategory.OPERATIONAL,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
        _addRule(
            "R-213",
            "System Prompt MUST include INSTANCE IDENTITY",
            RuleStatus.LOCKED,
            RuleCategory.INSTANCE,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
        _addRule(
            "R-214",
            "Event instance decommission (2 weeks post-event)",
            RuleStatus.LOCKED,
            RuleCategory.INSTANCE,
            ItemType.RULE,
            "GENESIS",
            "GENESIS",
            3
        );
    }

    function proposeRule(
        string calldata id,
        string calldata description,
        RuleCategory category,
        ItemType itemType,
        string calldata proposedBy
    ) external onlyRole(GOVERNANCE_ROLE) {
        bytes32 idHash = keccak256(bytes(id));
        require(!rules[idHash].exists, "SK: rule already exists");
        rules[idHash] = Rule(
            id,
            description,
            RuleStatus.PROPOSED,
            category,
            itemType,
            "",
            proposedBy,
            0,
            0,
            true
        );
        ruleIds.push(id);
        emit RuleProposed(id, description, itemType, proposedBy);
    }

    function lockRule(
        string calldata id,
        string calldata approvalCccId,
        string calldata lockedBy,
        uint256 season
    ) external onlyRole(GOVERNANCE_ROLE) {
        bytes32 idHash = keccak256(bytes(id));
        Rule storage rule = rules[idHash];
        require(rule.exists, "SK: rule not found");
        require(
            rule.status == RuleStatus.PROPOSED,
            "SK: not in PROPOSED state"
        );
        require(
            bytes(approvalCccId).length > 0,
            "SK: R-011 approval CCC-ID required"
        );
        rule.status = RuleStatus.LOCKED;
        rule.approvalCccId = approvalCccId;
        rule.lockedBy = lockedBy;
        rule.lockedAt = block.timestamp;
        rule.season = season;
        itemCounts[rule.itemType]++;
        emit RuleLocked(id, approvalCccId, lockedBy, season);
    }

    function deprecateRule(
        string calldata id,
        string calldata reason
    ) external onlyRole(GOVERNANCE_ROLE) {
        bytes32 idHash = keccak256(bytes(id));
        Rule storage rule = rules[idHash];
        require(rule.exists, "SK: rule not found");
        require(
            rule.status != RuleStatus.IMMUTABLE,
            "SK: IMMUTABLE rules cannot be deprecated"
        );
        rule.status = RuleStatus.DEPRECATED;
        emit RuleDeprecated(id, reason);
    }

    function updateVersion(
        string calldata version,
        string calldata masterCccId
    ) external onlyRole(GOVERNANCE_ROLE) {
        currentVersion = version;
        emit VersionUpdated(version, masterCccId);
    }

    function getRule(string calldata id) external view returns (Rule memory) {
        return rules[keccak256(bytes(id))];
    }

    function isImmutable(string calldata id) external view returns (bool) {
        return rules[keccak256(bytes(id))].status == RuleStatus.IMMUTABLE;
    }

    function isLocked(string calldata id) external view returns (bool) {
        RuleStatus s = rules[keccak256(bytes(id))].status;
        return s == RuleStatus.LOCKED || s == RuleStatus.IMMUTABLE;
    }

    function totalRules() external view returns (uint256) {
        return ruleIds.length;
    }

    function _addRule(
        string memory id,
        string memory description,
        RuleStatus status,
        RuleCategory category,
        ItemType itemType,
        string memory approvalCccId,
        string memory lockedBy,
        uint256 season
    ) private {
        bytes32 idHash = keccak256(bytes(id));
        rules[idHash] = Rule(
            id,
            description,
            status,
            category,
            itemType,
            approvalCccId,
            lockedBy,
            block.timestamp,
            season,
            true
        );
        ruleIds.push(id);
        itemCounts[itemType]++;
    }
}
