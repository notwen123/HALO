"use client";

import { motion } from "framer-motion";
import { Network, Globe, Activity, Database, Zap, Cpu, History } from "lucide-react";

/**
 * @title NetworkModule
 * @dev High-end Ecosystem Statistics & Activity Feed for HALO OS.
 */
export default function NetworkPage() {
  return (
    <div className="space-y-12 text-black">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-xs font-mono tracking-[0.4em] text-black/30 uppercase">Halonow Ecosystem</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">Network</h1>
        </div>
        <div className="text-right">
           <div className="flex items-center gap-4 px-6 py-2 rounded-full bg-black/5 border border-black/5">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-mono font-black tracking-[0.2em] uppercase">Height: 1,492,021</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {[
           { label: "BLOCK_TIME", value: "2.4s", sub: "Flow_Consensus", icon: Activity },
           { label: "TX_COUNT", value: "148,220", sub: "Daily_Accumulated", icon: Database },
           { label: "ACTIVE_USERS", value: "12,942", sub: "Authorized_Endpoints", icon: Globe },
         ].map((stat, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="p-12 rounded-[4rem] border border-black/5 bg-white shadow-sm hover:shadow-xl transition-all group"
           >
              <div className="w-16 h-16 rounded-3xl bg-black/5 flex items-center justify-center text-black/20 group-hover:bg-black group-hover:text-white transition-all mb-8">
                 <stat.icon className="w-8 h-8" />
              </div>
              <p className="text-[10px] font-mono tracking-[0.4em] text-black/30 uppercase font-black">{stat.label}</p>
              <p className="text-4xl font-black tracking-tighter uppercase">{stat.value}</p>
              <p className="text-xs font-bold text-black/40 uppercase tracking-tight">{stat.sub}</p>
           </motion.div>
         ))}
      </div>

      <div className="p-12 rounded-[4rem] border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] space-y-10">
         <div className="flex items-center gap-4 border-b border-black/5 pb-10">
            <History className="w-6 h-6 text-black/20" />
            <h2 className="text-2xl font-black tracking-tighter uppercase">Chain Activity</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-black/5 flex flex-col justify-between h-48 hover:bg-black/5 transition-all">
                 <div className="flex justify-between items-start">
                    <p className="text-[10px] font-mono tracking-[0.2em] text-black/30 uppercase font-black">Block #1,492,02{idx}</p>
                    <span className="text-[9px] font-mono font-black text-green-500 uppercase">Confirmed</span>
                 </div>
                 <div>
                    <p className="text-[9px] font-mono tracking-[0.1em] text-black/20 uppercase pb-2">Hash_Signature</p>
                    <p className="text-xs font-mono font-black text-black/40 truncate uppercase">0x4a92...e283</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
