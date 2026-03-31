"use client";

import { useState } from "react";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { Shield, ShieldAlert, Zap, Lock, Unlock, Activity, Logs } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVaultData, GUARDIAN_VAULT_ABI } from "@/lib/contracts";

// Placeholder for deployment - I'll ask the user to fill this once it's deployed
const DUMMY_VAULT_ADDRESS = "0x0000000000000000000000000000000000000000" as `0x${string}`;

export default function Dashboard() {
  const { isConnected, address } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { protectionEnabled, refetchProtection } = useVaultData(DUMMY_VAULT_ADDRESS);
  const { writeContract, isPending } = useWriteContract();

  const handleToggle = async () => {
    writeContract({
      address: DUMMY_VAULT_ADDRESS,
      abi: GUARDIAN_VAULT_ABI,
      functionName: "toggleProtection",
      args: [!protectionEnabled],
    });
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-12 max-w-xl flex flex-col items-center gap-6"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-slow">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Secure Your Assets with HALO</h2>
          <p className="text-zinc-400 text-lg">
            Connect your wallet on Flow EVM Testnet to initialize your Guardian Vault and enable autonomous protection.
          </p>
          <ConnectKitButton />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT: STATUS & TOGGLE */}
      <div className="md:col-span-2 space-y-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`glass p-8 relative overflow-hidden flex items-center justify-between transition-all duration-500 ${protectionEnabled ? 'border-primary/30 shadow-[0_0_30px_rgba(0,255,159,0.05)]' : 'border-zinc-800'}`}
        >
          {protectionEnabled && <div className="absolute top-0 left-0 w-1 h-full bg-primary animate-pulse" />}
          
          <div className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl ${protectionEnabled ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'}`}>
              {protectionEnabled ? <Shield className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Autonomous Protection</h3>
              <p className="text-zinc-400">
                {protectionEnabled ? "Your AI Guardian is actively monitoring your assets." : "Protection is currently disabled. Assets are at risk."}
              </p>
            </div>
          </div>

          <button 
            onClick={handleToggle}
            disabled={isPending}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${protectionEnabled ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-primary text-background glow hover:scale-105'}`}
          >
            {isPending ? <Activity className="animate-spin w-5 h-5" /> : (protectionEnabled ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />)}
            {protectionEnabled ? "Disable" : "Enable"}
          </button>
        </motion.div>

        {/* VAULT STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-zinc-500 font-medium">Vault Balance</span>
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div className="text-4xl font-bold tracking-tighter">
              {balanceData?.value ? (Number(balanceData.value) / 1e18).toFixed(2) : "0.00"} <span className="text-primary text-xl font-normal ml-1">FLOW</span>
            </div>
          </div>
          <div className="glass p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-zinc-500 font-medium">Guarded Assets</span>
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div className="text-4xl font-bold tracking-tighter">
              100<span className="text-primary text-xl font-normal ml-1">%</span>
            </div>
          </div>
        </div>

        {/* RECENT LOGS */}
        <div className="glass p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Logs className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Activity Log</h3>
            </div>
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">Verifiable</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-lg border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm">Agent initialised identity (ERC-8004)</span>
              </div>
              <span className="text-xs text-zinc-500">2 mins ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-lg border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary/20" />
                <span className="text-sm opacity-50">Monitoring Flow EVM Testnet state...</span>
              </div>
              <span className="text-xs text-zinc-600">Active Now</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: AGENT CARD */}
      <div className="space-y-6">
        <div className="glass p-8 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-32 h-32 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center p-4">
               {/* Visual representation of the agent */}
               <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-primary to-accent opacity-20 animate-pulse" />
               <Shield className="w-12 h-12 text-primary absolute" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Guardian Agent Alpha</h4>
              <p className="text-sm text-primary font-mono opacity-60">ID: HALO-A-01</p>
            </div>
            <div className="w-full space-y-2 mt-4">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Reputation</span>
                <span className="text-primary">100/100</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="w-full h-full bg-primary" />
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-4">
             <div className="p-3 bg-zinc-900/50 rounded flex items-center justify-between">
                <span className="text-sm text-zinc-400">Verifiable Address</span>
                <span className="text-xs font-mono text-zinc-500">0x8004...4a2</span>
             </div>
             <div className="p-3 bg-zinc-900/50 rounded flex items-center justify-between">
                <span className="text-sm text-zinc-400">Storage Engine</span>
                <span className="text-xs font-mono text-zinc-500">Storacha</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
