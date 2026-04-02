// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AgentIdentity
 * @dev Implementation of the ERC-8004 standard for agent identity.
 * Each NFT represents a unique autonomous agent.
 */
contract AgentIdentity is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    event AgentMinted(address indexed owner, uint256 tokenId, string tokenURI);

    constructor() ERC721("HALO Guardian Agent", "HALOA") Ownable(msg.sender) {}

    /**
     * @dev Mint a new agent identity.
     * @param _to Address of the agent or its controller.
     * @param _tokenURI URI pointing to the agent manifest (agent.json).
     */
    function mintAgent(address _to, string memory _tokenURI) public returns (uint256) {
        uint256 newItemId = _tokenIds++;
        _mint(_to, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        emit AgentMinted(_to, newItemId, _tokenURI);
        return newItemId;
    }

    function totalAgents() public view returns (uint256) {
        return _tokenIds;
    }
}
