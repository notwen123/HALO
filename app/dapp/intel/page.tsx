"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Zap, Globe, Cpu, AlertTriangle, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * @title IntelModule
 * @dev High-end Network Intelligence & Security Audit Log for the HALO dApp.
 */
export default function IntelPage() {
  const [threatLevel, setThreatLevel] = useState("LOW");
  const [logs, setLogs] = useState([
    { id: 1, type: "SYSTEM", msg: "HALO_OS initialized. Guardian monitoring active.", status: "OK", time: "JUST NOW" },
    { id: 2, type: "NETWORK", msg: "Flow EVM Testnet consensus synchronized.", status: "SYNCED", time: "2M AGO" },
    { id: 3, type: "SECURITY", msg: "Multi-sig guardian registry verified.", status: "VERIFIED", time: "15M AGO" },
  ]);

  const stats = [
    { label: "Active Connections", value: "24", icon: Globe, sub: "Nodes" },
    { label: "Audit Frequency", value: "2.4s", icon: Zap, sub: "Real-time" },
    { label: "Network Health", value: "99.9%", icon: ShieldCheck, sub: "Stable" },
  ];

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-xs font-mono tracking-[0.4em] text-black/30 uppercase">Halonow Intel</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">Intel</h1>
        </div>
        <div className="text-right">
           <div className={`px-6 py-2 rounded-full border ${threatLevel === "LOW" ? "border-green-500/20 bg-green-500/5 text-green-500" : "border-red-500/20 bg-red-500/5 text-red-500"} flex items-center gap-3`}>
              <div className={`w-2 h-2 rounded-full ${threatLevel === "LOW" ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
              <span className="text-[10px] font-mono font-black tracking-[0.3em] uppercase">Status: {threatLevel}_ALPHA</span>
           </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Live Performance Radar (Left) */}
         <div className="lg:col-span-8 p-12 rounded-[4rem] border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] space-y-10">
            <div className="flex items-center justify-between border-b border-black/5 pb-10">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-black rounded-3xl flex items-center justify-center text-white shadow-xl">
                     <Activity className="w-7 h-7" />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black tracking-tighter uppercase">Network Activity</h3>
                     <p className="text-xs font-mono tracking-[0.2em] text-black/30 uppercase">EVM Testnet Pulse</p>
                  </div>
               </div>
               <div className="flex gap-2">
                  <div className="px-5 py-2 rounded-full bg-black/5 text-[9px] font-mono tracking-[0.3em] font-black uppercase">Live_Feed</div>
               </div>
            </div>

            {/* Visualizer Placeholder / Chart area */}
            <div className="h-[400px] w-full rounded-[3rem] bg-black/5 border border-black/5 overflow-hidden flex flex-col items-center justify-center relative">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)", backgroundSize: "16px 16px" }} />
               
               {/* Center UI Ornament */}
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                 className="w-64 h-64 border border-black/5 rounded-full flex items-center justify-center"
               >
                  <div className="w-48 h-48 border border-black/10 rounded-full flex items-center justify-center">
                     <div className="w-32 h-32 border border-black/20 rounded-full flex items-center justify-center">
                        <Activity className="w-12 h-12 text-primary opacity-20" />
                     </div>
                  </div>
               </motion.div>
               <p className="mt-8 text-[11px] font-mono tracking-[0.6em] text-black/20 uppercase font-black">Decrypting_Ecosystem_Flow</p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6">
               {stats.map((stat, i) => (
                 <div key={i} className="space-y-1">
                    <p className="text-[10px] font-mono tracking-[0.3em] text-black/30 uppercase">{stat.label}</p>
                    <p className="text-2xl font-black tracking-tighter">{stat.value}</p>
                 </div>
               ))}
            </div>
         </div>

         {/* Intelligence Hub (Right) */}
         <div className="lg:col-span-4 p-12 rounded-[4rem] border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] flex flex-col h-full bg-black">
            <div className="flex items-center gap-4 border-b border-white/10 pb-10 mb-10">
               <Terminal className="w-6 h-6 text-green-500" />
               <h3 className="text-xl font-black tracking-tighter uppercase text-white">System Logs</h3>
            </div>

            <div className="flex-1 font-mono text-[11px] space-y-8 overflow-y-auto">
               {logs.map((log) => (
                 <motion.div
                   key={log.id}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="space-y-2 border-l border-white/10 pl-6 relative"
                 >
                    <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                    <div className="flex justify-between text-white/30 text-[9px] tracking-widest uppercase">
                       <span>{log.type} // {log.status}</span>
                       <span>{log.time}</span>
                    </div>
                    <p className="text-green-500/80 leading-relaxed font-bold uppercase tracking-tight">
                       {log.msg}
                    </p>
                 </motion.div>
               ))}
            </div>

            <div className="mt-10 pt-10 border-t border-white/10 space-y-4">
               <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-mono tracking-[0.4em] uppercase font-black hover:bg-white/10 transition-all">
                  Export Audit PDF
               </button>
               <p className="text-center text-[9px] font-mono tracking-[0.3em] text-white/20 uppercase">Audit_Signed_By_HALO_V1</p>
            </div>
         </div>
      </div>

      {/* Infrastructure Alert Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-12 rounded-[4rem] bg-amber-50 border border-amber-100 flex items-center justify-between"
      >
         <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(245,158,11,0.3)] shrink-0">
               <AlertTriangle className="w-10 h-10" />
            </div>
            <div>
               <p className="text-xs font-mono tracking-[0.4em] text-amber-600 uppercase font-bold">Optimization Warning</p>
               <h3 className="text-4xl font-black tracking-tighter uppercase text-amber-900 leading-tight">Node Latency Spike Detected</h3>
               <p className="text-amber-800/60 font-bold text-sm uppercase tracking-tight">HALO Agent 01 is re-routing your transactions for safety</p>
            </div>
         </div>
         <button className="px-10 py-5 rounded-full bg-amber-900 text-amber-50 font-black text-xs uppercase tracking-widest hover:bg-amber-800 transition-colors shadow-2xl">
            Dismiss Alert
         </button>
      </motion.div>
    </div>
  );
}
