import { formatEther, parseEther } from "viem";
import { useReadContract, useWriteContract, useAccount } from "wagmi";

// These will be filled after deployment, but for now we provide the logic
export const GUARDIAN_VAULT_ABI = [
  { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "autoProtectionEnabled", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bool", "name": "_enabled", "type": "bool" }], "name": "toggleProtection", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "_strategy", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "executeProtectionAction", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "_strategy", "type": "address" }, { "internalType": "bool", "name": "_authorized", "type": "bool" }], "name": "authorizeStrategy", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
] as const;

// Deployed on Flow EVM Testnet
export const AGENT_IDENTITY_ADDRESS = "0x6b542A9361A7dd16c0b6396202A192326154a1e2";
export const GUARDIAN_REGISTRY_ADDRESS = "0xa4F78fbf10440afEa067A8fc5391d87f78919107";
export const MOCK_YIELD_STRATEGY_ADDRESS = "0x61CBf3d0706a0780c5eEdB6b57D5B539C185Ae8C";
export const INITIAL_VAULT_ADDRESS = "0x2f4C507343fC416eAD53A1223b7d344E1e90eeC4";

export const useVaultData = (vaultAddress?: `0x${string}`) => {
  const { address } = useAccount();

  const { data: protectionEnabled, refetch: refetchProtection } = useReadContract({
    address: vaultAddress,
    abi: GUARDIAN_VAULT_ABI,
    functionName: "autoProtectionEnabled",
  });

  return {
    protectionEnabled,
    refetchProtection,
  };
};
