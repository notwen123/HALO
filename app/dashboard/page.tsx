"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Activity, Zap, LogOut, Cpu, Lock } from "lucide-react";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  // Guard: redirect back to landing if wallet disconnected
  useEffect(() => {
    if (!isConnected) router.replace("/");
  }, [isConnected, router]);

  if (!isConnected) return null;

  const short = `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Top Bar */}
      <header className="fixed top-0 inset-x-0 z-50 h-20 flex items-center justify-between px-12 border-b border-black/5 bg-white/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-black text-lg">H</div>
          <span className="text-xl font-black tracking-tighter uppercase">HALO</span>
          <span className="ml-4 text-xs font-mono text-black/30 tracking-widest uppercase">Dashboard</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-mono text-black/40 border border-black/10 px-4 py-2 rounded-full">{short}</span>
          <button
            onClick={() => disconnect()}
            className="flex items-center gap-2 text-sm font-bold text-black/40 hover:text-black transition-colors"
          >
            <LogOut className="w-4 h-4" /> Disconnect
          </button>
        </div>
      </header>

      <main className="pt-32 pb-24 px-12 max-w-screen-xl mx-auto space-y-12">
        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-black text-white p-10 flex items-center justify-between"
        >
          <div className="space-y-2">
            <p className="text-xs font-mono tracking-[0.4em] text-white/40 uppercase">Guardian Status</p>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Protection Active</h1>
            <p className="text-white/40 font-bold text-sm uppercase tracking-tight">HALO is monitoring your vault 24/7</p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            <span className="text-sm font-black tracking-widest uppercase text-green-400">Online</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Shield, label: "Vault Balance", value: "0.00 FLOW", sub: "Flow EVM Testnet" },
            { icon: Activity, label: "Actions Taken", value: "0", sub: "All time" },
            { icon: Zap, label: "Yield Earned", value: "$0.00", sub: "Via MockYieldStrategy" },
          ].map(({ icon: Icon, label, value, sub }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-black/10 p-8 space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs font-mono tracking-[0.3em] text-black/30 uppercase">{label}</p>
              <p className="text-3xl font-black tracking-tighter">{value}</p>
              <p className="text-xs text-black/30 font-bold uppercase tracking-tight">{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Agent Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl border border-black/10 p-10 space-y-6"
        >
          <div className="flex items-center gap-4">
            <Cpu className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-black tracking-tighter uppercase">Agent Activity Log</h2>
          </div>
          <div className="font-mono text-sm text-black/30 space-y-3 border-t border-black/5 pt-6">
            <p>[HALO-A-01] Guardian agent initialized.</p>
            <p>[HALO-A-01] Vault monitoring started — awaiting deposit.</p>
            <p>[HALO-A-01] No threats detected. System nominal.</p>
          </div>
        </motion.div>

        {/* Kill Switch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl border border-red-100 bg-red-50/50 p-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Lock className="w-5 h-5 text-red-400" />
            <div>
              <p className="font-black uppercase tracking-tight text-red-900">Emergency Kill Switch</p>
              <p className="text-sm text-red-400 font-bold uppercase tracking-tight">Disables all autonomous actions immediately</p>
            </div>
          </div>
          <button className="px-8 py-3 rounded-full bg-red-500 text-white font-black text-sm uppercase tracking-widest hover:bg-red-600 transition-colors">
            Kill Switch
          </button>
        </motion.div>
      </main>
    </div>
  );
}
