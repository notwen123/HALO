import { createPublicClient, http, createWalletClient, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { flowTestnet } from "wagmi/chains";
import { GUARDIAN_VAULT_ABI } from "./contracts";

/**
 * @title GuardianAgent Service
 * @dev The "Brain" of HALO. Monitors the user's vault and takes autonomous action.
 */
export class GuardianAgent {
  private publicClient;
  private walletClient;
  private vaultAddress: `0x${string}`;
  private agentAccount;

  constructor(privateKey: string, vaultAddress: `0x${string}`) {
    this.agentAccount = privateKeyToAccount(privateKey as `0x${string}`);
    this.vaultAddress = vaultAddress as any;

    this.publicClient = createPublicClient({
      chain: flowTestnet,
      transport: http(),
    });

    this.walletClient = createWalletClient({
      account: this.agentAccount,
      chain: flowTestnet,
      transport: http(),
    });
  }

  /**
   * @dev Main loop for the agent to check vault state.
   */
  async checkAndProtect() {
    console.log(`[Agent] Checking vault: ${this.vaultAddress}`);
    
    // 1. Check if protection is enabled
    const isEnabled = await this.publicClient.readContract({
      address: this.vaultAddress,
      abi: GUARDIAN_VAULT_ABI,
      functionName: "autoProtectionEnabled",
    });

    if (!isEnabled) {
      console.log("[Agent] Protection disabled by owner. Sleeping...");
      return;
    }

    // 2. Check vault balance
    const balance = await this.publicClient.getBalance({ address: this.vaultAddress });
    
    if (balance > 0n) {
      console.log(`[Agent] Threat detected: Unprotected funds (${balance.toString()} wei) found in vault!`);
      
      // 3. Execute protection action (Move to MockYieldStrategy)
      // For the demo, we use a predefined strategy address
      const strategyAddress = "0x61CBf3d0706a0780c5eEdB6b57D5B539C185Ae8C" as `0x${string}`;
      
      try {
        const { request } = await this.publicClient.simulateContract({
          account: this.agentAccount,
          address: this.vaultAddress,
          abi: GUARDIAN_VAULT_ABI,
          functionName: "executeProtectionAction",
          args: [strategyAddress, balance],
        });

        const hash = await this.walletClient.writeContract(request);
        console.log(`[Agent] Protection action executed! TX: ${hash}`);
        
        // 4. Log to Storacha (Simulated for this script)
        await this.logToStoracha(hash, balance);
      } catch (error) {
        console.error("[Agent] Failed to execute protection action:", error);
      }
    } else {
      console.log("[Agent] Vault secure. All funds are in yield strategies.");
    }
  }

  private async logToStoracha(txHash: string, amount: bigint) {
    const log = {
      event: "PROTECTION_EXECUTED",
      timestamp: Date.now(),
      txHash,
      amount: amount.toString(),
      agentId: "HALO-A-01",
    };
    
    console.log("[Agent] Uploading audit log to Storacha...", JSON.stringify(log));
    // In the real app, we use @storacha/client here
    return log;
  }
}
