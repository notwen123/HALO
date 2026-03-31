// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title GuardianRegistry
 * @dev Registry to manage the relationship between users and their AI agents.
 * This follows the spirit of ERC-8004 for agent identity.
 */
contract GuardianRegistry {
    address public agentIdentity;

    struct AgentInfo {
        address agentAddress;
        uint256 tokenId;
        string metadataURI; // URI to agent.json
        bool isActive;
    }

    constructor(address _agentIdentity) {
        agentIdentity = _agentIdentity;
    }
    
    // Mapping to check if an address is a registered agent
    mapping(address => AgentInfo) public agents;

    event AgentRegistered(address indexed agent, string metadataURI);
    event AgentAssigned(address indexed user, address indexed agent);
    event AgentRevoked(address indexed user, address indexed agent);

    // Mapping from user to their authorized agent
    mapping(address => address) public userToAgent;

    /**
     * @dev Register an agent with metadata (ERC-8004 style).
     */
    function registerAgent(address _agent, uint256 _tokenId, string calldata _metadataURI) external {
        agents[_agent] = AgentInfo({
            agentAddress: _agent,
            tokenId: _tokenId,
            metadataURI: _metadataURI,
            isActive: true
        });
        emit AgentRegistered(_agent, _metadataURI);
    }

    /**
     * @dev Assign an agent to a user.
     */
    function assignAgent(address _agent) external {
        require(agents[_agent].isActive, "Agent not registered or inactive");
        userToAgent[msg.sender] = _agent;
        emit AgentAssigned(msg.sender, _agent);
    }

    /**
     * @dev Revoke an agent's authority.
     */
    function revokeAgent() external {
        address currentAgent = userToAgent[msg.sender];
        require(currentAgent != address(0), "No agent assigned");
        delete userToAgent[msg.sender];
        emit AgentRevoked(msg.sender, currentAgent);
    }

    function isAuthorized(address _user, address _agent) external view returns (bool) {
        return userToAgent[_user] == _agent && agents[_agent].isActive;
    }
}
