"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Bot, Shield, Zap, Info, Plus, CheckCircle, X, ExternalLink, Activity, Terminal, Database, Code, Sparkles } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { AGENT_IDENTITY_ADDRESS, IDENTITY_ABI } from "@/app/constants/contracts";

/**
 * @title NeuralCore
 * @dev High-fidelity generative AI core with chromatic aberration and dynamic lattice animation.
 * Replaces the legacy "Bot Face" for a Billion Dollar OS aesthetic.
 */
function NeuralCore({ trait }: { trait: string }) {
  const colorMap: Record<string, string> = {
    SENTRY: "rgba(92, 60, 243, 0.8)",
    AUDITOR: "rgba(245, 158, 11, 0.8)",
    EXECUTOR: "rgba(236, 72, 153, 0.8)",
  };

  const coreColor = colorMap[trait] || colorMap.SENTRY;

  // Generate random points for the lattice
  const points = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    }));
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center scale-150">
      {/* Background Pulse Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at center, ${coreColor}, transparent 70%)`,
        }}
      />

      {/* Neural Lattice SVG */}
      <svg className="w-full h-full relative z-10 overflow-visible" viewBox="0 0 100 100">
        {/* Chromatic Aberration Layers */}
        {["#ff0000", "#00ff00", "#0000ff"].map((color, shiftIndex) => (
          <motion.g
            key={color}
            style={{ mixBlendMode: "screen", opacity: 0.4 }}
            animate={{
              x: [0, (shiftIndex - 1) * 2, 0],
              y: [0, (1 - shiftIndex) * 2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Lines */}
            {points.map((p, i) =>
              points.slice(i + 1, i + 4).map((p2) => (
                <motion.line
                  key={`${p.id}-${p2.id}`}
                  x1={p.x}
                  y1={p.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={coreColor}
                  strokeWidth="0.2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))
            )}
            {/* Nodes */}
            {points.map((p) => (
              <motion.circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r="0.8"
                fill={coreColor}
                animate={{
                  r: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.g>
        ))}
      </svg>

      {/* Overlay Scanlines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-full h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-20"
        />
      </div>

      {/* Central Core Glow Point */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-4 h-4 rounded-full bg-white blur-[2px] z-20 shadow-[0_0_20px_white]"
      />
    </div>
  );
}

export default function AgentsPage() {
  useEffect(() => {
    document.title = "AGENTS | HALO OS";
  }, []);

  const { address } = useAccount();
  const [agentName, setAgentName] = useState("");
  const [selectedTrait, setSelectedTrait] = useState("SENTRY");
  const [showPopup, setShowPopup] = useState(false);
  const [latestTxHash, setLatestTxHash] = useState<string | undefined>(undefined);

  // 1. Fetch Total Agents Global Stats
  const { data: totalAgents, refetch: refetchTotal } = useReadContract({
    address: AGENT_IDENTITY_ADDRESS,
    abi: IDENTITY_ABI,
    functionName: "totalAgents",
  });

  // 2. Fetch User's Agent Balance
  const { data: userBalance, refetch: refetchBalance } = useReadContract({
    address: AGENT_IDENTITY_ADDRESS,
    abi: IDENTITY_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const [txError, setTxError] = useState<string | null>(null);
  const alreadyMinted = userBalance ? Number(userBalance) > 0 : false;

  // 3. Contract Interaction (Minting)
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && hash) {
      refetchTotal?.();
      refetchBalance?.();
      setAgentName("");
      setLatestTxHash(hash);
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, hash, refetchTotal, refetchBalance]);

  const handleMintAgent = () => {
    if (!agentName || !address) return;
    setTxError(null);

    if (alreadyMinted) {
       setTxError("LIMIT_REACHED: ONE_GUARDIAN_PER_USER");
       return;
    }
    
    // For this prototype, we save the name locally so other pages can reflect it.
    localStorage.setItem(`halo_agent_name_${address}`, agentName);

    writeContract({
      address: AGENT_IDENTITY_ADDRESS,
      abi: IDENTITY_ABI,
      functionName: "mintAgent",
      args: [address, `ipfs://halo-agent-${Date.now()}`],
    });
  };

  const traits = [
    { id: "SENTRY", icon: Shield, desc: "High-latency defensive monitoring" },
    { id: "AUDITOR", icon: Terminal, desc: "Transaction validation & verification" },
    { id: "EXECUTOR", icon: Zap, desc: "High-speed protocol intervention" },
  ];

  return (
    <div className="space-y-16 text-black">
      {/* Page Header */}
      <div className="flex items-end justify-between px-4 lg:px-0">
        <div className="space-y-3">
          <p className="text-label !text-black/20 uppercase tracking-[0.4em]">Autonomous Registry</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none font-heading text-black">Agents</h1>
        </div>
        <div className="hidden lg:flex items-center gap-6">
           <div className="px-8 py-3 rounded-full bg-black/5 border border-black/5 flex items-center gap-4 shadow-sm group">
              <Bot className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-label !text-black/60 uppercase">OWNED_GUARDIANS: {userBalance?.toString() || "0"}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Genesis Minting Lab */}
         <div className="lg:col-span-7 p-8 lg:p-16 rounded-[4.5rem] border border-black/10 bg-white shadow-sm space-y-14 relative overflow-hidden group h-full flex flex-col justify-between">
            <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
               <Cpu className="w-64 h-64" />
            </div>

            <div className="space-y-12 relative z-10">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 transition-transform">
                     <Plus className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase font-heading">Initialize Core</h3>
                    <p className="text-label !text-black/20 uppercase tracking-widest">Protocol Version v1.42.0</p>
                  </div>
               </div>

               <div className="space-y-10">
                  <div className="space-y-4">
                     <p className="text-label !text-black/30 ml-4">AGENT_SYSTEM_NAME</p>
                     <div className="p-8 lg:p-10 rounded-[3.5rem] border-2 border-black/5 bg-black/[0.012] focus-within:border-primary focus-within:bg-white transition-all shadow-inner group/input relative">
                        <input 
                           type="text"
                           value={agentName}
                           onChange={(e) => setAgentName(e.target.value)}
                           placeholder="Enter Identity Name..."
                           className="w-full bg-transparent text-3xl lg:text-5xl font-black tracking-tighter outline-none uppercase placeholder:text-black/5 font-heading text-black"
                        />
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-focus-within/input:opacity-100 transition-opacity">
                           <Code className="w-8 h-8 text-primary shadow-sm" />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <p className="text-label !text-black/30 ml-4">BEHAVIORAL_PROTOCOLS</p>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {traits.map((trait) => (
                           <button 
                             key={trait.id}
                             onClick={() => setSelectedTrait(trait.id)}
                             className={`p-8 lg:p-10 rounded-[3rem] border transition-all flex flex-col items-center gap-4 group/trait relative overflow-hidden ${selectedTrait === trait.id ? "bg-black text-white border-black shadow-2xl" : "bg-white border-black/5 hover:border-black/20 text-black/40 hover:text-black"}`}
                           >
                              <trait.icon className={`w-8 h-8 ${selectedTrait === trait.id ? "text-primary" : "text-black/20 group-hover/trait:text-black"} transition-colors`} />
                              <span className={`text-label uppercase tracking-widest group-hover/trait:scale-105 transition-transform ${selectedTrait === trait.id ? "text-white" : "text-black/40 group-hover/trait:text-black"}`}>
                                {trait.id}
                              </span>
                              {selectedTrait === trait.id && (
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(92,60,243,0.1),transparent)]" />
                              )}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-14 relative z-10 border-t border-black/5">
                <button 
                  disabled={!agentName || isPending || isConfirming}
                  onClick={handleMintAgent}
                  className={`w-full h-24 lg:h-28 rounded-[2.5rem] text-white text-md font-black tracking-[0.5em] uppercase transition-all shadow-2xl relative overflow-hidden group/btn ${!agentName ? "bg-black/10 cursor-not-allowed text-black/20" : "bg-black hover:bg-primary active:scale-95"}`}
                >
                   <AnimatePresence mode="wait">
                      <motion.div 
                        key={isPending ? "signing" : isConfirming ? "finalizing" : "ready"}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="relative z-10 font-heading text-center"
                      >
                         {isPending ? "SIGNING_ON_CHAIN..." : isConfirming ? "FINALIZING_IDENTITY..." : alreadyMinted ? "GUARDIAN_ACTIVE" : "GENESIS_INITIALIZATION"}
                      </motion.div>
                   </AnimatePresence>
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                </button>

                {txError && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 p-6 rounded-[2rem] bg-red-500/10 border border-primary/20 text-center"
                  >
                     <p className="text-label !text-red-500 font-black tracking-widest leading-none">{txError}</p>
                  </motion.div>
                )}
            </div>
         </div>

         {/* Identity Preview Card - THE BILLION DOLLAR OVERHAUL */}
         <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="p-12 lg:p-16 rounded-[4.5rem] bg-black text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between aspect-square lg:aspect-auto h-[600px] border border-white/10 group/idcard">
               {/* Animated Hologram Dots */}
               <div className="absolute inset-0 opacity-[0.08] pointer-events-none group-hover/idcard:opacity-[0.12] transition-opacity duration-1000" 
                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
               
               {/* Scanline Effect Overlay */}
               <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

               <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-3">
                     <p className="text-label !text-white/20 uppercase tracking-[0.3em] font-black">ID // ERC-8004</p>
                     <p className="text-4xl font-black tracking-tighter uppercase font-heading text-white">#{totalAgents ? (Number(totalAgents) + 1).toString().padStart(4, '0') : "0001"}</p>
                  </div>
                  <div className="w-20 h-20 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center text-primary group-hover/idcard:rotate-12 group-hover/idcard:scale-110 transition-all duration-500 shadow-xl">
                     <Sparkles className="w-10 h-10" />
                  </div>
               </div>

               {/* REPLACED: BOT FACE -> NEURAL CORE */}
               <div className="relative z-10 text-center py-10">
                  <div className="w-64 h-64 mx-auto relative group/core">
                     <NeuralCore trait={selectedTrait} />
                     
                     {/* Floating Data Labels */}
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute -right-4 top-0 text-[10px] font-black text-primary/40 uppercase tracking-widest vertical-text"
                     >
                        SYNC_STATE // 100%
                     </motion.div>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                     <h2 className="text-5xl font-black tracking-tighter uppercase font-heading leading-tight truncate px-4 group-hover/idcard:text-primary transition-colors">
                        {agentName || "GENESIS_AGENT"}
                     </h2>
                     <div className="inline-flex items-center gap-4 border border-white/10 bg-white/5 px-10 py-3 rounded-full group-hover/idcard:bg-primary/20 transition-all shadow-lg">
                        <span className="text-label !text-primary !tracking-[0.4em] font-black">{selectedTrait}</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                     </div>
                  </div>
               </div>

               <div className="pt-10 border-t border-white/5 relative z-10">
                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <p className="text-label !text-white/20 !tracking-widest uppercase font-black">STRENGTH</p>
                        <p className="text-2xl font-black uppercase font-heading group-hover/idcard:translate-x-2 transition-transform">ELITE_LEVEL</p>
                     </div>
                     <div className="space-y-2 text-right">
                        <p className="text-label !text-white/20 !tracking-widest uppercase font-black">NETWORK</p>
                        <p className="text-2xl font-black uppercase font-heading group-hover/idcard:-translate-x-2 transition-transform">FLOW_EVM</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-10 rounded-[4rem] border border-black/5 bg-black/[0.012] flex items-center gap-8 group hover:bg-black hover:text-white transition-all duration-500 shadow-sm">
               <div className="w-20 h-20 bg-white rounded-2xl border border-black/5 flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform">
                  <Info className="w-10 h-10" />
               </div>
               <div className="space-y-1">
                 <p className="text-label uppercase tracking-widest font-black leading-tight group-hover:text-white transition-colors">Identity Information</p>
                 <p className="text-[11px] font-bold text-black/20 uppercase tracking-widest max-w-[280px] leading-relaxed italic group-hover:text-white/40 transition-colors">Minted agents are verified via decentralized proofs and stored as standard NFTs.</p>
               </div>
            </div>
         </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0, x: 100, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="fixed bottom-12 right-12 z-[150] w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden"
          >
             <div className="p-10 flex items-center gap-8">
                <div className="w-24 h-24 bg-green-500 rounded-[2.5rem] text-white shadow-[0_25px_50px_rgba(34,197,94,0.3)] flex items-center justify-center flex-shrink-0 animate-bounce-subtle">
                   <CheckCircle className="w-12 h-12" />
                </div>
                <div className="flex-1 space-y-3">
                   <p className="text-[10px] font-black text-green-600 tracking-[0.3em] uppercase">Status: Success</p>
                   <h4 className="text-3xl font-black tracking-tighter uppercase font-heading leading-tight text-black">New Agent Minted</h4>
                   <p className="text-[11px] font-bold text-black/30 uppercase leading-relaxed max-w-[220px]">Your Genesis Guardian has been initialized and synced on-chain.</p>
                </div>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="w-14 h-14 border border-black/5 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
                >
                   <X className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                </button>
             </div>
             
             <div className="px-10 pb-10">
                <a 
                  href={`https://evm-testnet.flowscan.io/tx/${latestTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-16 bg-black text-white rounded-3xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl group"
                >
                   <ExternalLink className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
                   <span className="text-label !text-white !tracking-[0.3em] !text-xs !font-black !inline-flex items-center">
                     VIEW_ON_FLOWSCAN
                   </span>
                </a>
              </div>
             
             <motion.div 
               initial={{ width: "100%" }}
               animate={{ width: "0%" }}
               transition={{ duration: 8, ease: "linear" }}
               className="absolute bottom-0 left-0 h-1.5 bg-green-500/50"
             />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
