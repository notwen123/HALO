export const AGENT_IDENTITY_ADDRESS = "0x883c1968d57B7eb06EC82983a62431eB0C2e2717";
export const GUARDIAN_REGISTRY_ADDRESS = "0x52fbCa3406ea2e93A5564f71434f6ee8CDF77e13";
export const VAULT_ADDRESS = "0x109386b470FdfdE0805FB62a0A18E201bc25d44a";
export const YIELD_STRATEGY_ADDRESS = "0x87Ca40dE6B0982Ce5408d9622b5239396EE8f86C";
export const MOCK_YIELD_STRATEGY_ADDRESS = YIELD_STRATEGY_ADDRESS;

export const CHAIN_ID = 545; // Flow EVM Testnet 

export const VAULT_ABI = [
  {"inputs": [{"internalType": "address","name": "_registry","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},
  {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": true,"internalType": "address","name": "agent","type": "address"},{"indexed": true,"internalType": "address","name": "strategy","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "ActionExecuted","type": "event"},
  {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Deposit","type": "event"},
  {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "bool","name": "enabled","type": "bool"}],"name": "ProtectionToggled","type": "event"},
  {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": true,"internalType": "address","name": "strategy","type": "address"},{"indexed": false,"internalType": "bool","name": "authorized","type": "bool"}],"name": "StrategyAuthorized","type": "event"},
  {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Withdraw","type": "event"},
  {"inputs": [{"internalType": "address","name": "_strategy","type": "address"},{"internalType": "bool","name": "_authorized","type": "bool"}],"name": "authorizeStrategy","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "address","name": "","type": "address"}],"name": "authorizedStrategies","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "autoProtectionEnabled","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "balances","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "deposit","outputs": [],"stateMutability": "payable","type": "function"},
  {"inputs": [{"internalType": "address","name": "_user","type": "address"},{"internalType": "address","name": "_strategy","type": "address"},{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "executeProtectionAction","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [],"name": "killSwitch","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [],"name": "registry","outputs": [{"internalType": "contract GuardianRegistry","name": "","type": "address"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "bool","name": "_enabled","type": "bool"}],"name": "toggleProtection","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "withdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"stateMutability": "payable","type": "receive"}
] as const;

export const GUARDIAN_REGISTRY_ABI = [
  {"inputs": [{"internalType": "address","name": "_agentIdentity","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},
  {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": true,"internalType": "address","name": "agent","type": "address"}],"name": "AgentAssigned","type": "event"},
  {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "agent","type": "address"},{"indexed": false,"internalType": "string","name": "metadataURI","type": "string"}],"name": "AgentRegistered","type": "event"},
  {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": true,"internalType": "address","name": "agent","type": "address"}],"name": "AgentRevoked","type": "event"},
  {"inputs": [],"name": "agentIdentity","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "agents","outputs": [{"internalType": "address","name": "agentAddress","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"},{"internalType": "string","name": "metadataURI","type": "string"},{"internalType": "bool","name": "isActive","type": "bool"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "address","name": "_agent","type": "address"}],"name": "assignAgent","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [{"internalType": "address","name": "_user","type": "address"},{"internalType": "address","name": "_agent","type": "address"}],"name": "isAuthorized","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "address","name": "_agent","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"},{"internalType": "string","name": "_metadataURI","type": "string"}],"name": "registerAgent","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [],"name": "revokeAgent","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "userToAgent","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"}
] as const;
export const REGISTRY_ABI = GUARDIAN_REGISTRY_ABI;


export const AGENT_IDENTITY_ABI = [
  {"inputs": [],"stateMutability": "nonpayable","type": "constructor"},
  {"inputs": [{"internalType": "address","name": "_to","type": "address"},{"internalType": "string","name": "_tokenURI","type": "string"}],"name": "mintAgent","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [],"name": "totalAgents","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "tokenURI","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "address","name": "owner","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "ownerOf","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"}
] as const;
export const IDENTITY_ABI = AGENT_IDENTITY_ABI;


export const YIELD_STRATEGY_ABI = [
  {"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "deposit","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "payable","type": "function"},
  {"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "withdraw","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [],"name": "getBalance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"}
] as const;
export const STRATEGY_ABI = YIELD_STRATEGY_ABI;
