// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IYieldStrategy.sol";
import "./GuardianRegistry.sol";

/**
 * @title GuardianVault
 * @dev The user's secure vault for holding assets and enabling autonomous protection.
 * Now refactored for Multi-User account mapping (Universal Access).
 */
contract GuardianVault {
    GuardianRegistry public registry;
    
    // Per-user accounting
    mapping(address => uint256) public balances;
    mapping(address => bool) public autoProtectionEnabled;
    mapping(address => mapping(address => bool)) public authorizedStrategies;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event ProtectionToggled(address indexed user, bool enabled);
    event ActionExecuted(address indexed user, address indexed agent, address indexed strategy, uint256 amount);
    event StrategyAuthorized(address indexed user, address indexed strategy, bool authorized);

    modifier onlyAuthorizedAgent(address _user) {
        require(registry.isAuthorized(_user, msg.sender), "Caller is not an authorized agent for this user");
        _;
    }

    constructor(address _registry) {
        registry = GuardianRegistry(_registry);
    }

    /**
     * @dev Toggle autonomous protection for the sender.
     */
    function toggleProtection(bool _enabled) external {
        autoProtectionEnabled[msg.sender] = _enabled;
        emit ProtectionToggled(msg.sender, _enabled);
    }

    /**
     * @dev Authorize a yield strategy for the sender.
     */
    function authorizeStrategy(address _strategy, bool _authorized) external {
        authorizedStrategies[msg.sender][_strategy] = _authorized;
        emit StrategyAuthorized(msg.sender, _strategy, _authorized);
    }

    /**
     * @dev Deposit funds into the vault for the sender.
     */
    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    /**
     * @dev Simple receive for direct transfers, credits msg.sender.
     */
    receive() external payable {
        deposit();
    }

    /**
     * @dev Withdraw funds from the vault for the sender.
     */
    function withdraw(uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Withdraw(msg.sender, _amount);
    }

    /**
     * @dev Allow an authorized agent to move funds to a safe strategy for a target user.
     * This is the "Autonomous Protection" mechanic.
     */
    function executeProtectionAction(address _user, address _strategy, uint256 _amount) external onlyAuthorizedAgent(_user) {
        require(autoProtectionEnabled[_user], "Autonomous protection is disabled for user");
        require(authorizedStrategies[_user][_strategy], "Strategy not authorized by user");
        require(balances[_user] >= _amount, "Insufficient user balance");

        // Debit user balance first
        balances[_user] -= _amount;

        // Move funds to strategy
        bool success = IYieldStrategy(_strategy).deposit{value: _amount}(_amount);
        require(success, "Strategy deposit failed");

        emit ActionExecuted(_user, msg.sender, _strategy, _amount);
    }

    /**
     * @dev Emergency kill switch to disable protection for the sender.
     */
    function killSwitch() external {
        autoProtectionEnabled[msg.sender] = false;
        emit ProtectionToggled(msg.sender, false);
    }
}
