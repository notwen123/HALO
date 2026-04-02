"use client";

import { motion } from "framer-motion";
import { Globe, UserCheck, Key, Zap, Activity, MessageSquare } from "lucide-react";

/**
 * @title GovernanceModule
 * @dev High-end DAO Voting & Proposal Dashboard for HALO OS.
 */
export default function GovernancePage() {
  const proposals = [
    { title: "HP-01: Increase Auditor APY", status: "ACTIVE", votes: "45.2M FLOW", ends: "2d left", type: "Economic" },
    { title: "HP-00: Protocol Genesis Launch", status: "PASSED", votes: "128.5M FLOW", ends: "Concluded", type: "Core" },
  ];

  return (
    <div className="space-y-12 text-black">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-xs font-mono tracking-[0.4em] text-black/30 uppercase">Protocol Governance</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">Voting</h1>
        </div>
        <div className="text-right">
           <div className="px-6 py-2 rounded-full border border-black/5 bg-black/5 flex items-center gap-3">
              <UserCheck className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-mono font-black tracking-[0.3em] uppercase">Voting_Power: 450.00 FLOW</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Active Proposals (Left) */}
         <div className="lg:col-span-8 p-12 rounded-[4rem] border border-black/5 bg-white shadow-sm space-y-10">
            <div className="flex items-center gap-4 border-b border-black/5 pb-10">
               <Activity className="w-6 h-6 text-black/20" />
               <h3 className="text-2xl font-black tracking-tighter uppercase">Active Proposals</h3>
            </div>
            
            <div className="space-y-8">
               {proposals.map((p, i) => (
                 <motion.div
                   key={i}
                   whileHover={{ scale: 1.01 }}
                   className="p-10 rounded-[3rem] border border-black/5 bg-black/5 hover:bg-black hover:text-white transition-all group cursor-pointer flex items-center justify-between"
                 >
                    <div className="space-y-4">
                       <span className="text-[10px] font-mono tracking-[0.4em] text-black/40 group-hover:text-white/40 uppercase font-black">{p.type} // {p.status}</span>
                       <h4 className="text-3xl font-black tracking-tighter uppercase">{p.title}</h4>
                       <div className="flex items-center gap-6 text-[10px] font-mono tracking-[0.2em] text-black/30 group-hover:text-white/30 uppercase font-black">
                         <span>Votes: {p.votes}</span>
                         <span>Ends: {p.ends}</span>
                       </div>
                    </div>
                    <div className="w-16 h-16 rounded-full border border-black/10 group-hover:border-white/20 flex items-center justify-center">
                       <Zap className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                 </motion.div>
               ))}
               
               <button className="w-full py-6 rounded-3xl border-2 border-dashed border-black/10 text-black/20 text-[10px] font-mono tracking-[0.4em] uppercase font-black hover:border-black hover:text-black transition-all">
                  + CREATE_NEW_PROPOSAL
               </button>
            </div>
         </div>

         {/* DAO Stats (Right) */}
         <div className="lg:col-span-4 p-12 rounded-[4rem] border border-black/5 bg-white shadow-sm flex flex-col justify-between h-full group overflow-hidden">
            <div className="space-y-8">
               <div className="flex items-center gap-4 border-b border-black/5 pb-8 mb-8">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white">
                     <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase">DAO Insight</h3>
               </div>

               <div className="space-y-12">
                  <div className="space-y-2">
                     <p className="text-[10px] font-mono tracking-[0.3em] text-black/30 uppercase">Total Participation</p>
                     <p className="text-5xl font-black tracking-tighter leading-none">88.4M</p>
                     <p className="text-[10px] font-black italic tracking-widest text-primary uppercase">STAKED_FLOW</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-mono tracking-[0.3em] text-black/30 uppercase">Quorum Met</p>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-3 rounded-full bg-black/5 overflow-hidden">
                           <div className="w-[65%] h-full bg-black group-hover:bg-primary transition-all duration-1000 delay-300" />
                        </div>
                        <span className="text-xs font-black tracking-tighter">65%</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-10">
               <div className="p-8 rounded-3xl bg-black/5 flex items-center gap-6">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <p className="text-[10px] font-mono tracking-[0.1em] text-black/40 uppercase leading-relaxed">Join the HALO Community discussion on decentralized protocols.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
