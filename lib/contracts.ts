import { formatEther, parseEther } from "viem";
import { useReadContract, useWriteContract, useAccount } from "wagmi";

// These will be filled after deployment, but for now we provide the logic
export const GUARDIAN_VAULT_ABI = [
  { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "autoProtectionEnabled", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bool", "name": "_enabled", "type": "bool" }], "name": "toggleProtection", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
] as const;

export const GUARDIAN_REGISTRY_ABI = [
  { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "userToAgent", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
] as const;

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
