"use client";

import { motion } from "framer-motion";
import { Database, Shield, Zap, ArrowDownLeft, ArrowUpRight, TrendingUp, History } from "lucide-react";
import { useState } from "react";

/**
 * @title VaultModule
 * @dev The core Asset Management interface for the HALO dApp.
 */
export default function VaultPage() {
  const [balance] = useState("0.00");
  const [flowPrice] = useState("0.84");

  const cards = [
    { title: "Total Portfolio", value: `$${balance}`, sub: "0.00 FLOW", icon: Database, color: "text-primary" },
    { title: "Vault Status", value: "SECURE", sub: "1 Guardian Active", icon: Shield, color: "text-green-500" },
    { title: "APY Performance", value: "11.4%", sub: "+0.2% Today", icon: Zap, color: "text-yellow-500" },
  ];

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-xs font-mono tracking-[0.4em] text-black/30 uppercase">Halonow Assets</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">Vault</h1>
        </div>
        <div className="text-right space-y-1">
          <p className="text-[10px] font-mono tracking-[0.2em] text-black/30 uppercase">Flow Asset Price</p>
          <div className="flex items-center gap-2 justify-end">
            <p className="text-2xl font-black font-mono tracking-tighter">${flowPrice}</p>
            <span className="text-xs font-bold text-green-500 font-mono tracking-tight">+4.2%</span>
          </div>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-10 rounded-[3rem] border border-black/5 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all flex flex-col justify-between group h-64"
          >
            <div className="flex justify-between items-start">
               <div className={`p-5 rounded-3xl bg-black/5 group-hover:scale-110 transition-transform ${card.color}`}>
                  <card.icon className="w-8 h-8" />
               </div>
               <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-black/20 group-hover:bg-black group-hover:text-white transition-all cursor-pointer">
                  <TrendingUp className="w-5 h-5" />
               </div>
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-mono tracking-[0.3em] text-black/30 uppercase">{card.title}</p>
               <h3 className="text-4xl font-black tracking-tighter uppercase">{card.value}</h3>
               <p className="text-xs font-bold text-black/40 uppercase tracking-tight">{card.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Interaction Area */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Deposit/Withdraw Form Card */}
        <div className="p-12 rounded-[4rem] border border-black/5 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-10">
           <div className="flex items-center gap-4 border-b border-black/5 pb-8">
              <div className="flex gap-4">
                 <button className="px-8 py-3 rounded-full bg-black text-white text-[10px] font-mono font-black tracking-[0.4em] uppercase">Deposit</button>
                 <button className="px-8 py-3 rounded-full border border-black/10 text-black/40 text-[10px] font-mono font-black tracking-[0.4em] uppercase hover:bg-black hover:text-white hover:border-black transition-all">Withdraw</button>
              </div>
           </div>

           <div className="space-y-6">
              <div className="space-y-2">
                 <div className="flex justify-between px-2">
                    <label className="text-[10px] font-mono tracking-[0.3em] text-black/30 uppercase">Amount</label>
                    <span className="text-[10px] font-mono text-black/30">MAX: 452.12 FLOW</span>
                 </div>
                 <div className="p-10 rounded-[2.5rem] bg-black/5 border border-transparent focus-within:border-black/10 flex items-center justify-between transition-all">
                    <input 
                      type="text" 
                      placeholder="0.00" 
                      className="bg-transparent text-5xl font-black tracking-tighter outline-none w-full placeholder:text-black/10"
                    />
                    <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-black/5">
                       <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs">F</div>
                       <span className="font-black tracking-tighter uppercase text-sm">FLOW</span>
                    </div>
                 </div>
              </div>

              <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <Zap className="w-5 h-5 text-primary" />
                    <p className="text-[10px] font-mono tracking-[0.2em] text-primary uppercase font-black">Estimated APY: 11.4%</p>
                 </div>
                 <Shield className="w-5 h-5 text-primary/30" />
              </div>

              <button className="w-full h-24 rounded-[2rem] bg-primary text-white text-md font-black tracking-[0.4em] uppercase shadow-[0_20px_60px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                 Authorize Authorization
              </button>
           </div>
        </div>

        {/* Transaction History / Health Card */}
        <div className="p-12 rounded-[4rem] border border-black/5 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col h-full">
           <div className="flex items-center justify-between border-b border-black/5 pb-10 mb-10">
              <div className="flex items-center gap-4">
                 <History className="w-6 h-6 text-black/20" />
                 <h3 className="text-xl font-black tracking-tighter uppercase">Recent Activity</h3>
              </div>
              <button className="text-[10px] font-mono font-black tracking-[0.2em] text-black/30 hover:text-black uppercase transition-colors underline underline-offset-8">View All</button>
           </div>
           
           <div className="flex-1 space-y-6">
              {[
                { type: "DEPOSIT", amount: "+450.00 FLOW", status: "VERIFIED", date: "2m ago", icon: ArrowDownLeft, color: "text-green-500" },
                { type: "AUTHORIZE", amount: "VAULT_LOCK_ON", status: "ACTIVE", date: "4h ago", icon: Shield, color: "text-blue-500" },
                { type: "WITHDRAW", amount: "-12.50 FLOW", status: "VERIFIED", date: "1d ago", icon: ArrowUpRight, color: "text-zinc-400" },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-3xl hover:bg-black/5 transition-all group">
                   <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center ${tx.color} shadow-sm group-hover:scale-105 transition-transform`}>
                         <tx.icon className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-xs font-mono tracking-[0.2em] text-black/30 uppercase font-bold">{tx.type}</p>
                         <p className="text-lg font-black tracking-tighter uppercase leading-none">{tx.amount}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-mono tracking-[0.1em] text-black/20 uppercase">{tx.date}</p>
                      <span className={`text-[10px] font-black tracking-widest uppercase ${tx.color}`}>{tx.status}</span>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-10 pt-10 border-t border-black/5 flex items-center justify-center">
              <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-black/5">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                 <span className="text-[9px] font-mono text-black/40 tracking-[0.3em] uppercase">Agent Monitoring Active</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
