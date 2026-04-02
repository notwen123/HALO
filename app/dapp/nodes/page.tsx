"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Activity, Shield, RefreshCcw, Server, Database } from "lucide-react";
import { useState } from "react";

/**
 * @title NodesModule
 * @dev High-end Infrastructure & Validator Staking Dashboard for HALO OS.
 */
export default function NodesPage() {
  const [isClaiming, setIsClaiming] = useState(false);
  const [rewards, setRewards] = useState("12.45");

  const nodes = [
    { id: "NODE_01", location: "NORTH_AMERICA", status: "ONLINE", load: "14%", icon: Server },
    { id: "NODE_02", location: "EUROPE_CENTRAL", status: "PENDING", load: "0%", icon: Database },
    { id: "NODE_03", location: "ASIA_PACIFIC", status: "ONLINE", load: "32%", icon: Cpu },
  ];

  return (
    <div className="space-y-12 text-black">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-xs font-mono tracking-[0.4em] text-black/30 uppercase">Halonow Infrastructure</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">Nodes</h1>
        </div>
        <div className="text-right">
           <button 
             onClick={() => { setIsClaiming(true); setTimeout(() => setIsClaiming(false), 2000); }}
             className="px-10 py-5 rounded-full bg-black text-white text-xs font-black tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-4"
           >
              {isClaiming ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 text-yellow-400" />}
              {isClaiming ? "SYNCING..." : "CLAIM_REWARDS"}
           </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         {/* Validator Stats (Left) */}
         <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-12 rounded-[4rem] border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] space-y-8 col-span-1 md:col-span-2">
               <div className="flex items-center gap-6 border-b border-black/5 pb-8">
                  <div className="w-14 h-14 bg-black/5 rounded-3xl flex items-center justify-center text-primary">
                     <Activity className="w-7 h-7" />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black tracking-tighter uppercase">Protocol Yield</h3>
                     <p className="text-xs font-mono tracking-[0.2em] text-black/30 uppercase">Global Staking Metrics</p>
                  </div>
               </div>
               <div className="grid grid-cols-3 gap-8">
                  {[
                    { label: "STAKED_TOTAL", value: "24.5M FLOW", sub: "Network Participation" },
                    { label: "POOL_HEALTH", value: "99.8%", sub: "Consensus Weight" },
                    { label: "UPTIME", value: "365d", sub: "Guaranteed Availability" },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                       <p className="text-[10px] font-mono tracking-[0.3em] text-black/30 uppercase">{stat.label}</p>
                       <p className="text-3xl font-black tracking-tighter text-black">{stat.value}</p>
                       <p className="text-[9px] font-bold text-black/20 uppercase tracking-tight">{stat.sub}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Individual Node Cards */}
            {nodes.map((node, i) => (
               <div key={i} className="p-10 rounded-[3rem] border border-black/5 bg-white shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-black/5 rounded-bl-[4rem] flex items-center justify-center translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform">
                     <node.icon className="w-10 h-10 text-black/10 group-hover:text-primary/20 transition-colors" />
                  </div>
                  <div className="space-y-6">
                     <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${node.status === "ONLINE" ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-amber-500"}`} />
                        <span className="text-[10px] font-mono tracking-[0.3em] text-black/40 uppercase font-black">{node.status}</span>
                     </div>
                     <div>
                        <h4 className="text-3xl font-black tracking-tighter uppercase">{node.id}</h4>
                        <p className="text-xs font-mono tracking-[0.2em] text-black/30 uppercase">{node.location}</p>
                     </div>
                     <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-[0.2em] text-black/20 uppercase">Core Load</span>
                        <span className="text-lg font-black font-mono tracking-tighter text-black">{node.load}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Rewards Center (Right) */}
         <div className="xl:col-span-4 p-12 rounded-[4rem] border border-black/5 bg-black text-white shadow-[0_20px_80px_rgba(0,0,0,0.1)] flex flex-col justify-between h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)]">
            <div className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/10 rounded-2xl">
                     <Zap className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase">Yield Hub</h3>
               </div>
               
               <div className="py-12 border-y border-white/10 space-y-4 text-center">
                  <p className="text-[11px] font-mono tracking-[0.4em] text-white/30 uppercase font-black underline underline-offset-8">Pending_Accrual</p>
                  <h2 className="text-7xl font-black tracking-tighter uppercase text-white leading-none">{rewards}</h2>
                  <p className="text-lg font-black tracking-tighter text-white/40 italic uppercase pb-4">FLOW</p>
                  <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10">
                     <span className="text-[9px] font-mono tracking-[0.3em] font-black text-green-400">EST_DAILY: 12.45 FLOW</span>
                  </div>
               </div>
            </div>

            <div className="space-y-6 pt-10">
               <button className="w-full py-6 rounded-[2rem] bg-white text-black text-xs font-black tracking-[0.4em] uppercase hover:scale-[1.05] active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
                  REINVEST_ALL
               </button>
               <p className="text-center text-[10px] font-mono tracking-[0.3em] text-white/20 uppercase">Manual_Harvest_Required_Weekly</p>
            </div>
         </div>
      </div>
    </div>
  );
}
