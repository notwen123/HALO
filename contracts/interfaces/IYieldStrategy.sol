// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title IYieldStrategy
 * @dev Interface for yield strategies that the GuardianVault can interact with.
 */
interface IYieldStrategy {
    function deposit(uint256 amount) external payable returns (bool);
    function withdraw(uint256 amount) external returns (bool);
    function getBalance() external view returns (uint256);
    function emergencyWithdraw() external returns (uint256);
}
