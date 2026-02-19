// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Nonces.sol";

/// @title CCCGovernanceToken — $CCC
/// @notice Governance token for CCCbot.Net cooperative (ERC-20 + Votes)
/// @dev OZ v5: ERC20Votes uses Nonces from ERC20Permit
contract CCCGovernanceToken is ERC20, ERC20Votes, ERC20Permit, AccessControl {
    bytes32 public constant GATEWAY_ROLE = keccak256("GATEWAY_ROLE");

    constructor(
        address gateway
    ) ERC20("CCC Governance Token", "CCC") ERC20Permit("CCC Governance Token") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GATEWAY_ROLE, gateway);
    }

    function mint(address to, uint256 amount) external onlyRole(GATEWAY_ROLE) {
        _mint(to, amount);
    }

    // ── OZ v5 Required Overrides ──

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Votes) {
        super._update(from, to, value);
    }

    function nonces(
        address owner
    ) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}
