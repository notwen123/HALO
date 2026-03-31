"use client";

import { useAccount, useBalance } from "wagmi";
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  Activity, 
  Lock, 
  Eye, 
  ArrowUpRight, 
  AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import WorldIDGuardian from "./components/WorldIDVerification";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const [isProtectionActive, setIsProtectionActive] = useState(false);
  const [lastAction, setLastAction] = useState("Scan complete. No threats.");

  const formattedBalance = balanceData?.value 
    ? (Number(balanceData.value) / 1e18).toFixed(2) 
    : "0.00";

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 px-6">
      {/* TOP HEADER SECTION */}
      <div className="flex flex-col md:row items-center justify-between gap-8 py-10 bg-gradient-to-r from-primary/5 via-transparent to-transparent rounded-3xl p-8 border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all">
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 animate-pulse" />
         
         <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3 text-primary uppercase font-mono tracking-widest text-xs">
               <Activity className="w-4 h-4 animate-pulse" />
               Live Security Status: ENCRYPTED
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter leading-none">
               WELCOME, <span className="text-primary">{address ? address.slice(0, 6) + "..." + address.slice(-4) : "GUARDIAN"}</span>
            </h1>
            <p className="text-zinc-500 font-medium max-w-lg">
               Your HALO Autonomous Guardian is currently <span className={isProtectionActive ? "text-primary font-bold" : "text-red-500 font-bold"}>
                 {isProtectionActive ? "ACTIVE" : "IDLE"}
               </span>. Monitoring across FLOW_EVM network.
            </p>
         </div>

         <div className="flex flex-col items-center gap-4 relative z-10 w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProtectionActive(!isProtectionActive)}
              className={`w-full md:w-80 group flex items-center justify-center gap-4 px-10 py-6 rounded-2xl transition-all font-black text-xl italic tracking-tighter ${
                isProtectionActive 
                  ? "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.2)]" 
                  : "bg-primary text-background group-hover:scale-105 shadow-[0_0_40px_rgba(0,255,159,0.3)]"
              }`}
            >
              {isProtectionActive ? (
                <>
                  <Lock className="w-6 h-6" /> DISABLE PROTECTION
                </>
              ) : (
                <>
                  <Shield className="w-6 h-6" /> ENABLE GUARDIAN
                </>
              )}
            </motion.button>
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
               <AlertCircle className="w-3 h-3" /> Minimum 1.0 FLOW required for automation
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT PANEL: WALLET OVERVIEW */}
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass p-10 bg-zinc-950/40 hover:bg-zinc-900/50 transition-all cursor-pointer group">
                 <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Asset Balance</span>
                    <Zap className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                 </div>
                 <div className="text-6xl font-black tracking-tight italic">
                    {formattedBalance} <span className="text-primary text-2xl not-italic ml-2">FLOW</span>
                 </div>
                 <div className="mt-8 flex items-center gap-2 text-zinc-600 font-mono text-xs uppercase">
                    Available on Flow EVM Testnet
                 </div>
              </div>

              <div className="glass p-10 bg-zinc-950/40 flex flex-col justify-between">
                 <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Protection Action</span>
                    <h3 className="text-2xl font-bold mt-4 leading-tight italic">Redirect to Safe Protocol</h3>
                 </div>
                 <div className="mt-8 p-4 bg-zinc-900 rounded-xl border border-white/5 flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-xs font-mono text-primary/80">Strategy: High-Yield-Defensive-v1</span>
                 </div>
              </div>
           </div>

           {/* RECENT ACTIVITY LOG PREVIEW */}
           <div className="glass p-8">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold italic tracking-tight">RECENT SECURITY EVENTS</h3>
                 </div>
                 <button className="text-xs uppercase font-mono text-zinc-500 hover:text-primary transition-colors flex items-center gap-2">
                    View Full Audit <ArrowUpRight className="w-4 h-4" />
                 </button>
              </div>

              <div className="space-y-6">
                 {[
                   { msg: "Agent Identity v1.0.4 Synced", time: "2m ago", type: "system" },
                   { msg: "Vault scanning complete: 0 hacks detected", time: "15m ago", type: "success" },
                   { msg: "Connected to Storacha Decentralized Storage", time: "1h ago", type: "system" },
                 ].map((act, i) => (
                   <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group cursor-pointer hover:px-4 hover:bg-white/5 transition-all rounded-xl">
                      <div className="flex items-center gap-4">
                         <div className={`w-2 h-2 rounded-full ${act.type === 'success' ? 'bg-primary' : 'bg-zinc-700'}`} />
                         <span className="text-zinc-300 font-medium">{act.msg}</span>
                      </div>
                      <span className="text-xs font-mono text-zinc-600">{act.time}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* RIGHT PANEL: GUARDIAN IDENTITY */}
        <div className="lg:col-span-1 space-y-8">
           <div className="glass p-10 bg-zinc-950/40 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                 <div className="w-48 h-48 rounded-[3rem] bg-zinc-900 border border-primary/20 mx-auto flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-4 rounded-3xl bg-primary/10 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                    <Shield className="w-24 h-24 text-primary glow-lg" />
                 </div>
                 <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight italic">GUARDIAN ALPHA</h3>
                    <div className="px-4 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-500 font-mono text-[10px] inline-block tracking-widest">
                       ERC-8004 // ID:1429
                    </div>
                    
                    <div className="pt-8 border-t border-white/5 mt-8 flex flex-col gap-4">
                       <WorldIDGuardian onVerified={() => setIsProtectionActive(false)} />
                       <p className="text-[10px] text-zinc-600 italic px-6 leading-relaxed">
                          *Human Identity verification required to unlock high-stakes guardian overrides.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass p-8 text-center space-y-4 bg-gradient-to-b from-primary/5 to-transparent">
              <div className="flex justify-center gap-2 mb-2">
                 {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-8 h-1 bg-primary/20 rounded-full" />
                 ))}
              </div>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Global Network Nodes</p>
              <div className="text-4xl font-bold tracking-tighter">14,204</div>
           </div>
        </div>

      </div>
    </div>
  );
}
