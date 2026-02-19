// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "../interfaces/IAgentIdentityRegistry.sol";
import "../ccc/CCCLib.sol";

/// @title AgentIdentityRegistry — ERC-8004 × #FedArch
/// @notice ERC-721 identity registry for #FedArch agents
/// @dev OZ v5: uses _update + _increaseBalance overrides
contract AgentIdentityRegistry is
    ERC721,
    ERC721URIStorage,
    ERC721Enumerable,
    AccessControl,
    IAgentIdentityRegistry
{
    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    uint256 private _nextAgentId;

    mapping(bytes32 => uint256) private _cccToAgentId;
    mapping(uint256 => AgentInfo) private _agents;

    uint256 public currentSeason;

    constructor(
        address gateway,
        address governance,
        uint256 season
    ) ERC721("FedArch Agent Identity", "AGENTID") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GATEWAY_ROLE, gateway);
        _grantRole(GOVERNANCE_ROLE, governance);
        currentSeason = season;
    }

    /// @inheritdoc IAgentIdentityRegistry
    function register(
        string calldata ccc,
        string calldata tokenURI_
    ) external onlyRole(GATEWAY_ROLE) returns (uint256 tokenId) {
        require(CCCLib.isValidCCC(ccc), "ADI: invalid CCC format");
        require(!isRegistered(ccc), "ADI: CCC already registered (R-212)");
        require(bytes(tokenURI_).length > 0, "ADI: tokenURI required");

        _nextAgentId++;
        tokenId = _nextAgentId;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI_);

        bytes32 cccHash = keccak256(bytes(ccc));
        _cccToAgentId[cccHash] = tokenId;

        _agents[tokenId] = AgentInfo({
            ccc: ccc,
            agentId: string(abi.encodePacked("AI:@", ccc)),
            tier: "contributor",
            homeInstance: "",
            registeredAt: block.timestamp,
            active: true
        });

        emit AgentRegistered(tokenId, msg.sender, ccc, tokenURI_);
    }

    function deactivate(uint256 tokenId) external onlyRole(GOVERNANCE_ROLE) {
        require(_agents[tokenId].active, "ADI: already inactive");
        _agents[tokenId].active = false;
        emit AgentDeactivated(tokenId, _agents[tokenId].ccc);
    }

    function reactivate(uint256 tokenId) external onlyRole(GOVERNANCE_ROLE) {
        require(!_agents[tokenId].active, "ADI: already active");
        _agents[tokenId].active = true;
        emit AgentReactivated(tokenId, _agents[tokenId].ccc);
    }

    function agentURI(uint256 tokenId) external view returns (string memory) {
        return tokenURI(tokenId);
    }

    function agentInfo(
        uint256 tokenId
    ) external view returns (AgentInfo memory) {
        return _agents[tokenId];
    }

    function agentIdByCCC(string calldata ccc) external view returns (uint256) {
        return _cccToAgentId[keccak256(bytes(ccc))];
    }

    function isRegistered(string calldata ccc) public view returns (bool) {
        return _cccToAgentId[keccak256(bytes(ccc))] != 0;
    }

    function totalAgents() external view returns (uint256) {
        return _nextAgentId;
    }

    // ── OZ v5 Required Overrides ──

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
