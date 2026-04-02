"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Database, Shield, Zap, Globe, Cpu, Activity, ArrowRight, X, Command } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * @title CommandPalette
 * @dev High-end navigation and search overlay for the HALO OS dApp.
 * Accessible via Header or CMD+K.
 */
export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const commands = [
    { name: "VAULT_INTERFACE", desc: "Manage deposits and on-chain holdings", icon: Database, href: "/dapp/vault" },
    { name: "SECURITY_PROTOCOL", desc: "Activate emergency guardians and agents", icon: Shield, href: "/dapp/security" },
    { name: "AGENCY_MINT", desc: "Initialize new autonomous agent identities", icon: Cpu, href: "/dapp/agents" },
    { name: "INTEL_AUDIT", desc: "Real-time network security logs", icon: Activity, href: "/dapp/intel" },
    { name: "NETWORK_STATE", desc: "Observe global TVL and consensus health", icon: Globe, href: "/dapp/network" },
    { name: "GOVERNANCE_HUB", desc: "Participatere in protocol evolution voting", icon: Globe, href: "/dapp/governance" },
  ];

  const filtered = commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null; // Toggle logic is handled in the parent but this listener fixes double triggers
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 bg-white/20 backdrop-blur-3xl"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-white border border-black/5 rounded-[4rem] shadow-[0_100px_150px_-50px_rgba(0,0,0,0.2)] overflow-hidden"
        >
          {/* Search Input */}
          <div className="p-10 border-b border-black/5 flex items-center gap-6 relative group">
             <Search className="w-8 h-8 text-black/20 group-focus-within:text-primary transition-colors" />
             <input 
               autoFocus
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="System Command Search..."
               className="flex-1 bg-transparent text-3xl font-black tracking-tighter uppercase outline-none placeholder:text-black/5 font-heading text-black"
             />
             <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/5 border border-black/5 text-label !text-black/20">
                <Command className="w-3 h-3" />
                <span>K / ESC</span>
             </div>
          </div>

          {/* Results List */}
          <div className="p-6 max-h-[500px] overflow-y-auto custom-scrollbar">
             <div className="grid grid-cols-1 gap-4">
                {filtered.length > 0 ? filtered.map((cmd) => (
                  <motion.button
                    key={cmd.name}
                    whileHover={{ x: 10, backgroundColor: "rgba(0,0,0,0.02)" }}
                    onClick={() => {
                        router.push(cmd.href);
                        onClose();
                    }}
                    className="p-8 rounded-[2.5rem] border border-transparent hover:border-black/5 flex items-center justify-between group transition-all"
                  >
                     <div className="flex items-center gap-8">
                        <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center text-black/20 group-hover:bg-black group-hover:text-white transition-all shadow-inner">
                           <cmd.icon className="w-8 h-8" />
                        </div>
                        <div className="text-left space-y-1">
                           <h4 className="text-xl font-black tracking-tighter uppercase font-heading text-black/80">{cmd.name}</h4>
                           <p className="text-[11px] font-bold text-black/20 uppercase tracking-widest">{cmd.desc}</p>
                        </div>
                     </div>
                     <ArrowRight className="w-6 h-6 text-black/10 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                  </motion.button>
                )) : (
                  <div className="p-16 text-center space-y-4">
                     <p className="text-2xl font-black text-black/10 uppercase tracking-tight">NULL_RESULT_DETECTED</p>
                     <p className="text-label !text-black/20 !tracking-widest">NO_SYSTEM_COMMAND_MATCHES_QUERY</p>
                  </div>
                )}
             </div>
          </div>

          {/* Footer Info */}
          <div className="p-10 bg-black/[0.012] border-t border-black/5 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                <span className="text-label !text-black/20 !tracking-widest italic !font-medium">HALO_SYSTEM_OS_V1.4</span>
             </div>
             <div className="text-label !text-black/10 uppercase tracking-[0.2em] font-black">Authorized Session</div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
