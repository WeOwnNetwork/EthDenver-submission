// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IAgentIdentityRegistry — ERC-8004 Identity Registry Interface
interface IAgentIdentityRegistry {
    struct AgentInfo {
        string ccc;
        string agentId;
        string tier;
        string homeInstance;
        uint256 registeredAt;
        bool active;
    }

    event AgentRegistered(
        uint256 indexed tokenId,
        address indexed owner,
        string ccc,
        string tokenURI
    );
    event AgentDeactivated(uint256 indexed tokenId, string ccc);
    event AgentReactivated(uint256 indexed tokenId, string ccc);

    function register(
        string calldata ccc,
        string calldata tokenURI
    ) external returns (uint256);
    function deactivate(uint256 tokenId) external;
    function reactivate(uint256 tokenId) external;
    function agentURI(uint256 tokenId) external view returns (string memory);
    function agentInfo(
        uint256 tokenId
    ) external view returns (AgentInfo memory);
    function agentIdByCCC(string calldata ccc) external view returns (uint256);
    function isRegistered(string calldata ccc) external view returns (bool);
    function totalAgents() external view returns (uint256);
}
