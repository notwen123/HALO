"use client";

import { motion } from "framer-motion";
import { Shield, Lock, AlertOctagon, UserCheck, Key, ShieldAlert, Cpu } from "lucide-react";
import { useState } from "react";

/**
 * @title SecurityModule
 * @dev High-end Emergency Controls & Guardian Registry for HALO OS.
 */
export default function SecurityPage() {
  const [isLocked, setIsLocked] = useState(false);
  const [guardians] = useState([
    { name: "MAIN_LEDGER", type: "Hardware", status: "ACTIVE", lastSeen: "1h ago" },
    { name: "HALO_AGENT_01", type: "Autonomous", status: "ONLINE", lastSeen: "Just now" },
  ]);

  return (
    <div className="space-y-12 text-black">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-xs font-mono tracking-[0.4em] text-black/30 uppercase">Protocol Security</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">Security</h1>
        </div>
        <div className="text-right">
           <div className="px-6 py-2 rounded-full bg-black/5 border border-black/5 flex items-center gap-3">
              <Key className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-mono font-black tracking-[0.3em] uppercase">Auth_Level: OMEGA</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Kill Switch Area (Left) */}
         <div className="lg:col-span-7 bg-red-50/30 border border-red-100 rounded-[4rem] p-16 space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none">
               <AlertOctagon className="w-64 h-64 text-red-600" />
            </div>
            
            <div className="space-y-4 relative">
               <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white shadow-[0_20px_50px_rgba(239,68,68,0.3)]">
                  <ShieldAlert className="w-10 h-10" />
               </div>
               <h2 className="text-5xl font-black tracking-tighter uppercase text-red-900 leading-tight">Emergency Kill Switch</h2>
               <p className="text-red-800/60 font-bold text-lg uppercase tracking-tight max-w-md">Activate this only if you suspect your vault has been compromised.</p>
            </div>

            <div className="p-10 rounded-[3rem] bg-white border border-red-100 shadow-xl space-y-8">
               <div className="space-y-2">
                  <p className="text-[10px] font-mono tracking-[0.4em] text-red-400 uppercase font-black px-2">Confirmation_Required</p>
                  <div className="h-2 rounded-full bg-red-100 overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: isLocked ? "100%" : "0%" }}
                       className="h-full bg-red-500" 
                     />
                  </div>
               </div>
               
               <div className="flex flex-col gap-4">
                  <button 
                    onMouseDown={() => setIsLocked(true)}
                    onMouseUp={() => setIsLocked(false)}
                    onMouseLeave={() => setIsLocked(false)}
                    className="w-full h-28 rounded-[2rem] bg-red-600 text-white text-xl font-black tracking-[0.6em] uppercase hover:bg-red-700 active:scale-95 transition-all shadow-2xl relative group overflow-hidden"
                  >
                     <span className="relative z-10">{isLocked ? "HOLDING..." : "HOLD_TO_KILL"}</span>
                     <motion.div 
                       className="absolute inset-0 bg-red-800 opacity-0 group-active:opacity-100 transition-opacity"
                     />
                  </button>
                  <p className="text-center text-[10px] font-mono tracking-[0.2em] text-red-400/60 uppercase">Warning: This action is recorded on Filecoin Mainnet Permanent Storage</p>
               </div>
            </div>
         </div>

         {/* Guardian Registry (Right) */}
         <div className="lg:col-span-5 p-12 rounded-[4rem] border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full">
            <div className="space-y-8">
               <div className="flex items-center gap-4 border-b border-black/5 pb-8 mb-8">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white">
                     <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase">Guardians</h3>
               </div>

               <div className="space-y-6">
                  {guardians.map((g, i) => (
                    <div key={i} className="p-8 rounded-3xl border border-black/5 hover:bg-black/5 transition-all group flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center text-black/20 group-hover:bg-black group-hover:text-white transition-all">
                             <Lock className="w-6 h-6" />
                          </div>
                          <div>
                             <p className="text-[10px] font-mono tracking-[0.2em] text-black/30 uppercase font-black">{g.type}</p>
                             <p className="text-xl font-black tracking-tighter uppercase">{g.name}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className="text-[9px] font-mono tracking-[0.3em] text-green-500 uppercase font-black">{g.status}</span>
                       </div>
                    </div>
                  ))}
                  
                  <button className="w-full py-6 rounded-3xl border-2 border-dashed border-black/10 text-black/30 text-[10px] font-mono tracking-[0.4em] uppercase font-black hover:border-black hover:text-black transition-all">
                     + ADD_NEW_GUARDIAN
                  </button>
               </div>
            </div>

            <div className="pt-10 space-y-4">
               <div className="p-6 rounded-2xl bg-black/5 flex items-center gap-4">
                  <Cpu className="w-5 h-5 text-primary" />
                  <p className="text-[10px] font-mono tracking-[0.1em] text-black/40 uppercase leading-relaxed">System using **ERC-8004** Agent Identity for decentralized human verification.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
