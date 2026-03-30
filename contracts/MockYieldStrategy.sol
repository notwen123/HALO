// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IYieldStrategy.sol";

/**
 * @title MockYieldStrategy
 * @dev A simple mock yield strategy for testing the GuardianVault.
 */
contract MockYieldStrategy is IYieldStrategy {
    uint256 public totalDeposits;

    function deposit(uint256 amount) external returns (bool) {
        totalDeposits += amount;
        return true;
    }

    function withdraw(uint256 amount) external returns (bool) {
        require(totalDeposits >= amount, "Insufficient deposits");
        totalDeposits -= amount;
        return true;
    }

    function getBalance() external view returns (uint256) {
        return totalDeposits;
    }

    function emergencyWithdraw() external returns (uint256) {
        uint256 amount = totalDeposits;
        totalDeposits = 0;
        return amount;
    }
}
