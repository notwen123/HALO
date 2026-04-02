"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Activity, RefreshCcw, Server, Database, Shield } from "lucide-react";
import { useState } from "react";
import { useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { formatUnits } from "viem";
import { VAULT_ADDRESS, AGENT_IDENTITY_ADDRESS, IDENTITY_ABI, MOCK_YIELD_STRATEGY_ADDRESS, STRATEGY_ABI } from "@/app/constants/contracts";

/**
 * @title NodesModule
 * @dev High-end Infrastructure & Validator Staking Dashboard for HALO OS.
 * Now integrated with live Agent NFTs and Yield Strategy metrics on Flow EVM.
 */
export default function NodesPage() {
  const [isClaiming, setIsClaiming] = useState(false);
  
  // 1. Fetch Total Vault Balance as "Pool Assets"
  const { data: vaultBalance } = useBalance({ address: VAULT_ADDRESS });
  
  // 2. Fetch Yield Strategy Balance
  const { data: yieldBalance } = useReadContract({
    address: MOCK_YIELD_STRATEGY_ADDRESS,
    abi: STRATEGY_ABI,
    functionName: "getBalance",
  });

  // 3. Fetch Total Agents from Identity Contract
  const { data: totalAgents } = useReadContract({
    address: AGENT_IDENTITY_ADDRESS,
    abi: IDENTITY_ABI,
    functionName: "totalAgents",
  });

  const formattedVaultTotal = vaultBalance 
    ? Number(formatUnits(vaultBalance.value, vaultBalance.decimals))
    : 0;
  
  const formattedYieldTotal = yieldBalance
    ? Number(formatUnits(yieldBalance as bigint, 18))
    : 0;

  const totalPoolAssets = (formattedVaultTotal + formattedYieldTotal).toFixed(2);

  const nodes = [
    { id: "NODE_00_HALO", location: "GENESIS-CLUSTER", status: "ONLINE", load: "12%", icon: Shield },
    { id: "NODE_01_FLOW", location: "EVM-MAIN-FLOW", status: "ONLINE", load: "9%", icon: Server },
    { id: "NODE_02_AGENT", location: `VIRTUAL-${totalAgents?.toString() || "0"}`, status: "ONLINE", load: "22%", icon: Cpu },
  ];

  return (
    <div className="space-y-16 text-black">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-label !text-black/20">HALO INFRASTRUCTURE</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none font-heading">Nodes</h1>
        </div>
        <div className="text-right">
           <button 
             onClick={() => { setIsClaiming(true); setTimeout(() => setIsClaiming(false), 2000); }}
             className="px-12 py-5 rounded-full bg-black text-white text-label !text-white !tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-4 group"
           >
              {isClaiming ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 text-yellow-400 group-hover:rotate-12 transition-transform" />}
              {isClaiming ? "SYNCHRONIZING..." : "HARVEST_YIELD"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
         {/* Validator Core Stats */}
         <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-16 rounded-[4.5rem] border border-black/10 bg-white shadow-sm space-y-12 col-span-1 md:col-span-2">
               <div className="flex items-center gap-6 border-b border-black/5 pb-10">
                  <div className="w-16 h-16 bg-black/5 rounded-3xl flex items-center justify-center text-primary shadow-inner">
                     <Activity className="w-8 h-8" />
                  </div>
                  <div>
                     <h3 className="text-3xl font-black tracking-tighter uppercase font-heading">Protocol Staking</h3>
                     <p className="text-label !text-black/20">Live Flow EVM Participation</p>
                  </div>
               </div>
               <div className="grid grid-cols-3 gap-12">
                  {[
                    { label: "POOL_TOTAL", value: `${totalPoolAssets} FLOW`, sub: "ON-CHAIN VAULT ASSETS" },
                    { label: "WEIGHT", value: "99.8%", sub: "CONSENSUS STRENGTH" },
                    { label: "UPTIME", value: "99.9%", sub: "GUARANTEED AVAILABILITY" },
                  ].map((stat, i) => (
                    <motion.div key={i} className="space-y-3">
                       <p className="text-label !text-black/30 whitespace-nowrap">{stat.label}</p>
                       <p className="text-5xl font-black tracking-tighter text-black font-heading leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{stat.value}</p>
                       <p className="text-[10px] font-bold text-black/20 uppercase tracking-[0.1em] italic font-sans">{stat.sub}</p>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* High-End Node Monitors */}
            {nodes.map((node, i) => (
               <div key={i} className="p-12 rounded-[4rem] border border-black/5 bg-white shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden h-[340px] flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-black/[0.015] rounded-bl-[4rem] flex items-center justify-center translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-700">
                     <node.icon className="w-12 h-12 text-black/5 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-8 relative z-10">
                     <div className="flex items-center gap-4">
                        <div className={`w-2.5 h-2.5 rounded-full ${node.status === "ONLINE" ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]" : "bg-amber-500"} animate-pulse`} />
                        <span className="text-label !text-black/30">{node.status}</span>
                     </div>
                     <div>
                        <h4 className="text-4xl font-black tracking-tighter uppercase font-heading">{node.id}</h4>
                        <p className="text-label !text-black/20 !font-mono !tracking-tight">{node.location}</p>
                     </div>
                  </div>
                  <div className="pt-8 border-t border-black/5 flex items-center justify-between relative z-10">
                     <span className="text-label !text-black/20">RPC_LATENCY_12ms</span>
                     <span className="text-2xl font-black tracking-tighter text-black font-heading">{node.load}</span>
                  </div>
               </div>
            ))}
         </div>

         {/* Elite Yield Hub */}
         <div className="xl:col-span-4 p-16 rounded-[4.5rem] border border-black/5 bg-black text-white shadow-2xl flex flex-col justify-between h-full bg-[radial-gradient(ellipse_at_top_right,rgba(92,60,243,0.1),transparent)] overflow-hidden">
            <div className="space-y-12 relative">
               <div className="flex items-center gap-5">
                  <div className="p-4 bg-white/10 rounded-2xl shadow-inner">
                     <Zap className="w-7 h-7 text-yellow-400" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter uppercase font-heading">Protocol APY</h3>
               </div>
               
               <div className="py-16 border-y border-white/5 space-y-4 text-center relative">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-white/[0.02] blur-xl" />
                  <p className="text-label !text-white/30 decoration-primary/40 underline underline-offset-8">REAL_TIME_YIELD</p>
                  <h2 className="text-[8rem] font-black tracking-tighter uppercase text-white leading-none font-heading relative z-10">11.4</h2>
                  <p className="text-xl font-black tracking-tighter text-white/40 italic uppercase pb-4 font-heading">PERCENT APY</p>
                  <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 shadow-inner">
                     <span className="text-label !text-green-400">STATE: OPTIMIZED</span>
                  </div>
               </div>
            </div>

            <div className="space-y-8 pt-12">
               <button className="w-full py-7 rounded-[2.5rem] bg-white text-black text-label !tracking-[0.4em] hover:scale-[1.05] active:scale-95 transition-all shadow-[0_30px_80px_rgba(255,255,255,0.15)]">
                  AUTO_COMPOUND
               </button>
               <p className="text-center text-label !text-white/20">FLOW_EVM_STAKING_V1</p>
            </div>
         </div>
      </div>
    </div>
  );
}
