"use client";

import { useAccount } from "wagmi";
import { ScrollText, Shield, Info, ExternalLink, Database, Cpu, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const auditLogs = [
  { event: "AGENT_IDENTITY_SYNC", status: "VERIFIED", timestamp: "2026-03-31 12:45:01", cid: "bafybeig...q1", details: "ERC-8004 Metadata Synchronised" },
  { event: "SCAN_NETWORK_THREATS", status: "CLEAN", timestamp: "2026-03-31 12:44:50", cid: "bafybeig...q2", details: "No malicious patterns detected on Flow Testnet" },
  { event: "VAULT_BALANCE_CHECK", status: "MONITORING", timestamp: "2026-03-31 12:44:32", cid: "bafybeig...q3", details: "Checking 0x8004...4A2 balance (0.00 FLOW)" },
  { event: "PROTECTION_ENABLED", status: "ACTIVE", timestamp: "2026-03-31 12:42:15", cid: "bafybeig...q4", details: "Autonomous mode enabled by human operator" },
];

export default function AuditPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
               <ScrollText className="w-6 h-6" />
            </div>
            <div>
               <h3 className="text-3xl font-black italic tracking-tighter">AUDIT TRAIL</h3>
               <p className="text-zinc-500 text-sm">Permanent, decentralised records of every agent action.</p>
            </div>
         </div>

         <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
               <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
               <input 
                  type="text" 
                  placeholder="Search logs..." 
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-white/5 rounded-xl text-sm focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all outline-none" 
               />
            </div>
            <button className="px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl hover:bg-zinc-800 transition-all">
               <Filter className="w-4 h-4 text-zinc-400" />
            </button>
         </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass p-6 flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-zinc-900/50 flex items-center justify-center text-zinc-500">
               <Database className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Logs Stored</p>
               <p className="text-xl font-bold">1,402 / ∞</p>
            </div>
         </div>
         <div className="glass p-6 flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-zinc-900/50 flex items-center justify-center text-zinc-500">
               <Cpu className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Agent Verifications</p>
               <p className="text-xl font-bold">1,210 Verified</p>
            </div>
         </div>
         <div className="glass p-6 flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
               <Shield className="w-6 h-6 shadow-[0_0_10px_rgba(0,255,159,0.2)]" />
            </div>
            <div>
               <p className="text-xs text-primary font-bold uppercase tracking-widest">Security Score</p>
               <p className="text-xl font-bold">99.8% Integrity</p>
            </div>
         </div>
      </div>

      {/* AUDIT LOG LIST */}
      <div className="glass overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-zinc-950/20 flex items-center justify-between">
           <span className="text-sm font-mono text-zinc-500">REALTIME_FEED_SYNC_ON</span>
           <div className="flex items-center gap-2 text-xs text-primary animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Live Monitoring
           </div>
        </div>

        <div className="divide-y divide-white/5">
           {auditLogs.map((log, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
               className="p-8 hover:bg-white/5 transition-all group flex flex-col md:row items-center gap-6 md:gap-12"
             >
                <div className="text-xs font-mono text-zinc-500 w-full md:w-40 bg-zinc-950 p-2 rounded-lg border border-white/5 shadow-inner">
                   {log.timestamp}
                </div>

                <div className="flex-1 w-full space-y-1">
                   <div className="flex items-center gap-3">
                      <h4 className="font-bold text-lg">{log.event}</h4>
                      <span className={`text-[10px] uppercase font-bold tracking-tight px-2 py-0.5 rounded ${
                         log.status === 'VERIFIED' || log.status === 'ACTIVE' 
                           ? 'bg-primary/10 text-primary' 
                           : 'bg-zinc-800 text-zinc-500'
                      }`}>
                         {log.status}
                      </span>
                   </div>
                   <p className="text-zinc-500 text-sm italic">"{log.details}"</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                   <div className="flex flex-col text-right">
                      <span className="text-[10px] uppercase text-zinc-600 font-bold">CID Storage</span>
                      <span className="text-xs font-mono text-primary/60">{log.cid}</span>
                   </div>
                   <button className="p-3 bg-zinc-900 border border-white/10 rounded-xl group-hover:bg-primary/20 group-hover:text-primary transition-all">
                      <ExternalLink className="w-5 h-5" />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="p-6 bg-zinc-950/20 text-center border-t border-white/5">
           <button className="text-zinc-500 hover:text-zinc-200 transition-all flex items-center gap-2 mx-auto text-sm font-medium">
              Load and Verify Legacy Logs (Pre-2026) <Info className="w-4 h-4" />
           </button>
        </div>
      </div>
    </div>
  );
}
