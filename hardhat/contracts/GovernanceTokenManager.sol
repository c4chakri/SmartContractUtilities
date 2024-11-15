// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./GovernanceToken.sol";

contract GovernanceTokenManager {
    function createGovernanceToken(
        string memory name,
        string memory symbol,
        // uint256 initialSupply,
        address initialAddress,
        uint8 decimals,
        GovernanceToken.smartContractActions memory actions
    ) public returns (address) {
        GovernanceToken newToken = new GovernanceToken(
            name,
            symbol,
            // initialSupply,
            initialAddress,
            decimals,
            actions
        );
        return address(newToken);
    }
}
