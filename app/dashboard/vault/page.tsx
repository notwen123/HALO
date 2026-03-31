"use client";

import { useAccount, useBalance } from "wagmi";
import { Shield, Zap, TrendingUp, Download, Upload, MoreHorizontal, Info } from "lucide-react";
import { motion } from "framer-motion";

const assets = [
  { name: "Flow", symbol: "FLOW", balance: "0.00", value: "$0.00", allocation: "100%", status: "Guarded" },
  { name: "USDC", symbol: "USDC", balance: "0.00", value: "$0.00", allocation: "0%", status: "Offline" },
  { name: "Wrapped Ethereum", symbol: "WETH", balance: "0.00", value: "$0.00", allocation: "0%", status: "Offline" },
];

export default function VaultPage() {
  const { address } = useAccount();
  const { data: balanceData } = useBalance({ address });

  const formattedBalance = balanceData?.value 
    ? (Number(balanceData.value) / 1e18).toFixed(2) 
    : "0.00";

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* PERFORMANCE OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Value", value: "$0.00", icon: Shield, trend: "+0% (24h)" },
          { label: "Protection Level", value: "100%", icon: Zap, trend: "Maximum" },
          { label: "Active Yields", value: "0%", icon: TrendingUp, trend: "Market Neutral" },
          { label: "Health Score", value: "99/100", icon: Shield, trend: "A+ Grade" },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 group hover:translate-y-[-4px] transition-all">
             <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-500 text-sm font-medium">{stat.label}</span>
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                   <stat.icon className="w-4 h-4" />
                </div>
             </div>
             <div className="text-3xl font-bold tracking-tight mb-2">{stat.value}</div>
             <div className="text-xs text-primary font-mono">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* ASSETS TABLE */}
      <div className="glass overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Asset Allocation</h3>
           </div>
           <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/20 transition-all">
                 <Download className="w-4 h-4" /> Deposit
              </button>
              <button className="px-4 py-2 bg-zinc-900 border border-white/10 text-zinc-400 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all">
                 <Upload className="w-4 h-4" /> Withdraw
              </button>
           </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500 text-xs uppercase tracking-widest font-mono">
                <th className="px-8 py-4">Asset</th>
                <th className="px-8 py-4 text-center">Status</th>
                <th className="px-8 py-4 text-right">Balance</th>
                <th className="px-8 py-4 text-right">Price</th>
                <th className="px-8 py-4 text-right">Value (USD)</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {assets.map((asset, i) => (
                <tr key={i} className="group hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center font-bold text-lg select-none">
                          {asset.symbol[0]}
                       </div>
                       <div>
                          <p className="font-bold">{asset.name}</p>
                          <p className="text-xs text-zinc-500 font-mono">{asset.symbol}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                     <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded border ${
                        asset.status === 'Guarded' 
                          ? 'bg-primary/10 text-primary border-primary/20' 
                          : 'bg-zinc-900 text-zinc-600 border-white/5'
                     }`}>
                        {asset.status}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-right font-mono font-bold">
                     {asset.symbol === 'FLOW' ? formattedBalance : asset.balance}
                  </td>
                  <td className="px-8 py-5 text-right font-mono text-zinc-500 text-sm italic">$0.64</td>
                  <td className="px-8 py-5 text-right font-mono font-bold">{asset.value}</td>
                  <td className="px-8 py-5 text-right">
                     <button className="p-2 hover:bg-zinc-800 rounded-lg transition-all">
                        <MoreHorizontal className="w-5 h-5 text-zinc-600" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STRATEGY CARD */}
      <div className="glass p-8 relative overflow-hidden bg-gradient-to-r from-primary/5 to-transparent">
         <div className="flex items-center gap-4 mb-2">
            <Info className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Active Protection Strategy</span>
         </div>
         <h4 className="text-2xl font-bold mb-4">Flow High-Yield Guardian (v1.0)</h4>
         <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed mb-6">
            Autonomous protection is currently routed through the <strong>MockYieldStrategy</strong>. 
            All deposits are monitored for volatility and moved to zero-risk safety accounts if a threat is detected.
         </p>
         <div className="flex gap-4">
            <div className="px-4 py-2 bg-zinc-950 border border-white/5 rounded-lg flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <span className="text-sm">Real-time verification active</span>
            </div>
         </div>
      </div>
    </div>
  );
}

// Fixed import for Database
import { Database } from "lucide-react";
