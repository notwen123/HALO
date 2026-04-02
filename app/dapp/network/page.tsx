"use client";

import { motion } from "framer-motion";
import { Zap, Globe, Activity, Database, Cpu, Network as NetworkIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useBlockNumber, useBalance, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { VAULT_ADDRESS, AGENT_IDENTITY_ADDRESS, IDENTITY_ABI } from "@/app/constants/contracts";

/**
 * @title NetworkModule
 * @dev High-end Ecosystem Statistics & Chain Explorer for HALO OS on Flow EVM.
 * Fully integrated with live network metrics and vault performance data.
 */
export default function NetworkPage() {
  useEffect(() => {
    document.title = "NETWORK | HALO OS";
  }, []);

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: vaultBalance } = useBalance({ address: VAULT_ADDRESS });
  
  // Fetch Total Agents from Identity Contract
  const { data: totalAgents } = useReadContract({
    address: AGENT_IDENTITY_ADDRESS,
    abi: IDENTITY_ABI,
    functionName: "totalAgents",
  });

  const tvl = vaultBalance 
    ? `${Number(formatUnits(vaultBalance.value, vaultBalance.decimals)).toFixed(2)}`
    : "0.00";

  const stats = [
    { label: "In-Cluster Guardians", value: totalAgents ? totalAgents.toString() : "---", sub: "Total Protocol Population", icon: Globe },
    { label: "Protocol Sync", value: "100%", sub: "Node Consensus", icon: Activity },
    { label: "Vault Locked", value: `${tvl} FLOW`, sub: "Liquidity TVL", icon: Database },
    { label: "Chain Height", value: blockNumber ? blockNumber.toLocaleString() : "---", sub: "Block Index State", icon: Cpu },
  ];

  return (
    <div className="space-y-16 text-black">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-label !text-black/20 uppercase tracking-[0.4em]">HALO ECOSYSTEM</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none font-heading text-black">Network</h1>
        </div>
        <div className="text-right">
           <div className="flex items-center gap-4 px-8 py-3 rounded-full bg-black text-white shadow-2xl group border border-white/5 transition-all">
              <Zap className="w-5 h-5 text-primary group-hover:animate-bounce" />
              <span className="text-label !text-white uppercase tracking-widest leading-none">
                {blockNumber ? `BLOCK: ${blockNumber.toString()}` : "SYNCING_RPC..."}
              </span>
           </div>
        </div>
      </div>

      {/* High-Impact Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         {stats.map((stat, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="p-16 rounded-[4.5rem] border border-black/10 bg-white shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all group relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/[0.015] rounded-bl-[4rem] group-hover:scale-110 transition-transform" />
              
              <div className="w-20 h-20 rounded-[2.5rem] bg-black/5 flex items-center justify-center text-black/20 group-hover:bg-black group-hover:text-white transition-all mb-10 shadow-inner relative z-10">
                 <stat.icon className="w-10 h-10" />
              </div>
              <div className="relative z-10">
                <p className="text-label !text-black/30 !tracking-widest uppercase mb-2">{stat.label}</p>
                <div className="flex items-baseline gap-4">
                  <p className="text-5xl font-black tracking-tighter uppercase font-heading">{stat.value}</p>
                </div>
                <p className="text-xs font-bold text-black/30 uppercase tracking-widest font-sans mt-2 italic opacity-60">{stat.sub}</p>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Network Health Alert */}
      <div className="p-16 rounded-[4.5rem] bg-black text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group border border-white/5">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(92,60,243,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
         
         <div className="flex items-center gap-10 relative z-10">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-[0_0_50px_rgba(92,60,243,0.2)] group-hover:scale-110 transition-transform duration-500">
               <NetworkIcon className="w-12 h-12" />
            </div>
            <div>
               <p className="text-label !text-white/20 uppercase tracking-widest">SYSTEM_HEALTH_METRIC</p>
               <h3 className="text-4xl font-black tracking-tighter uppercase font-heading">Synchronization: ACTIVE</h3>
               <p className="text-white/40 font-bold text-sm uppercase tracking-widest mt-2">Continuous Flow EVM Heartbeat Monitoring v1.0.4</p>
            </div>
         </div>
         <button className="px-12 py-6 rounded-full bg-white text-black text-label !text-black !tracking-[0.4em] hover:bg-primary hover:text-white transition-all relative z-10 font-heading">
            EXPLORE_NODES
         </button>
      </div>
    </div>
  );
}
