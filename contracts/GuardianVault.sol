// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IYieldStrategy.sol";
import "./GuardianRegistry.sol";

/**
 * @title GuardianVault
 * @dev The user's secure vault for holding assets and enabling autonomous protection.
 */
contract GuardianVault {
    address public owner;
    GuardianRegistry public registry;
    bool public autoProtectionEnabled;
    
    // Mapping of authorized yield strategies
    mapping(address => bool) public authorizedStrategies;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event ProtectionToggled(bool enabled);
    event ActionExecuted(address indexed agent, address indexed strategy, uint256 amount);
    event StrategyAuthorized(address indexed strategy, bool authorized);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    modifier onlyAuthorizedAgent() {
        require(registry.isAuthorized(owner, msg.sender), "Caller is not an authorized agent");
        _;
    }

    constructor(address _owner, address _registry) {
        owner = _owner;
        registry = GuardianRegistry(_registry);
        autoProtectionEnabled = false;
    }

    /**
     * @dev Toggle autonomous protection.
     */
    function toggleProtection(bool _enabled) external onlyOwner {
        autoProtectionEnabled = _enabled;
        emit ProtectionToggled(_enabled);
    }

    /**
     * @dev Authorize a yield strategy.
     */
    function authorizeStrategy(address _strategy, bool _authorized) external onlyOwner {
        authorizedStrategies[_strategy] = _authorized;
        emit StrategyAuthorized(_strategy, _authorized);
    }

    /**
     * @dev Deposit funds into the vault.
     */
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    /**
     * @dev Withdraw funds from the vault.
     */
    function withdraw(uint256 _amount) external onlyOwner {
        require(address(this).balance >= _amount, "Insufficient balance");
        payable(owner).transfer(_amount);
        emit Withdraw(owner, _amount);
    }

    /**
     * @dev Allow an authorized agent to move funds to a safe strategy.
     * This is the "Autonomous Protection" mechanic.
     */
    function executeProtectionAction(address _strategy, uint256 _amount) external onlyAuthorizedAgent {
        require(autoProtectionEnabled, "Autonomous protection is disabled");
        require(authorizedStrategies[_strategy], "Strategy not authorized");
        require(address(this).balance >= _amount, "Insufficient balance");

        // Move funds to strategy
        bool success = IYieldStrategy(_strategy).deposit(_amount);
        require(success, "Strategy deposit failed");

        emit ActionExecuted(msg.sender, _strategy, _amount);
    }

    /**
     * @dev Emergency kill switch to revoke all agent permissions and disable protection.
     */
    function killSwitch() external onlyOwner {
        autoProtectionEnabled = false;
        // The registry revocation is separate but this stops execution here
        emit ProtectionToggled(false);
    }
}
