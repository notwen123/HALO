"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, AlertOctagon, UserCheck, Key, ShieldAlert, Cpu, Power, Loader2, Info, CheckCircle, X, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { 
  VAULT_ADDRESS, VAULT_ABI, 
  GUARDIAN_REGISTRY_ADDRESS, REGISTRY_ABI,
  AGENT_IDENTITY_ADDRESS, IDENTITY_ABI 
} from "@/app/constants/contracts";

/**
 * @title SecurityModule
 * @dev High-end Emergency Controls & Guardian Registry for HALO OS on Flow EVM.
 * Integrated with real-time Vault protection state and Agent Identity metadata.
 */
export default function SecurityPage() {
  const { address } = useAccount();
  const [isPressingKill, setIsPressingKill] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [latestTxHash, setLatestTxHash] = useState<string | undefined>(undefined);

  // 1. Fetch Auto-Protection Status
  const { data: protectionEnabled, refetch: refetchStatus } = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: "autoProtectionEnabled",
  });

  // 2. Fetch Authorized Agent
  const { data: assignedAgent, refetch: refetchAgent } = useReadContract({
    address: GUARDIAN_REGISTRY_ADDRESS,
    abi: REGISTRY_ABI,
    functionName: "userToAgent",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // 3. Fetch Agent Metadata from Registry
  const { data: agentDetails } = useReadContract({
    address: GUARDIAN_REGISTRY_ADDRESS,
    abi: REGISTRY_ABI,
    functionName: "agents",
    args: assignedAgent ? [assignedAgent] : undefined,
    query: { enabled: !!assignedAgent && assignedAgent !== "0x0000000000000000000000000000000000000000" },
  });

  const agentMetadataURI = agentDetails ? (agentDetails as any)[2] : null;

  // 4. Contract Interactions
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && hash) {
      refetchStatus();
      refetchAgent();
      setIsPressingKill(false);
      setLatestTxHash(hash);
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, hash, refetchStatus, refetchAgent]);

  const handleToggleProtection = () => {
    writeContract({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: "toggleProtection",
      args: [!protectionEnabled],
    });
  };

  const handleBindAgent = () => {
    writeContract({
      address: GUARDIAN_REGISTRY_ADDRESS,
      abi: REGISTRY_ABI,
      functionName: "assignAgent",
      args: [VAULT_ADDRESS],
    });
  };

  const handleRevokeAgent = () => {
    writeContract({
      address: GUARDIAN_REGISTRY_ADDRESS,
      abi: REGISTRY_ABI,
      functionName: "revokeAgent",
    });
  };

  const hasAgent = assignedAgent && assignedAgent !== "0x0000000000000000000000000000000000000000";

  return (
    <div className="space-y-16 text-black">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-label !text-black/20">HALO SECURITY PROTOCOL</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none font-heading">Security</h1>
        </div>
        <div className="text-right">
           <div className="px-8 py-3 rounded-full bg-black/5 border border-black/5 flex items-center gap-4 shadow-sm group">
              <Key className="w-5 h-5 text-primary group-hover:rotate-45 transition-transform" />
              <span className="text-label !text-black/60 uppercase">AUTH_AGENT: {hasAgent ? "AUTHORIZED" : "UNBOUND"}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Emergency Kill Switch */}
         <div className="lg:col-span-7 bg-red-50/20 border border-red-100 rounded-[4.5rem] p-16 space-y-14 relative overflow-hidden group">
            <div className="absolute top-10 right-10 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
               <ShieldAlert className="w-64 h-64 text-red-600" />
            </div>
            
            <div className="space-y-6 relative z-10">
               <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${protectionEnabled ? "bg-red-600 shadow-red-200" : "bg-black shadow-black/20"}`}>
                  {protectionEnabled ? <Power className="w-12 h-12" /> : <ShieldAlert className="w-12 h-12" />}
               </div>
               <h2 className="text-6xl font-black tracking-tighter uppercase text-red-900 leading-tight font-heading">Autonomous<br />Protection</h2>
               <p className="text-red-800/80 font-bold text-xl uppercase tracking-tight font-sans max-w-md">
                 {protectionEnabled 
                   ? "The Autonomous Guardian is currently active. Your vault is under active protocol monitoring."
                   : "Protection is disabled. Your on-chain assets are not being monitored by the Autonomous Guardian."}
               </p>
            </div>

            <div className="p-12 rounded-[4rem] bg-white border border-red-100 shadow-xl space-y-10 relative z-10">
               <div className="space-y-4">
                  <div className="flex justify-between px-4">
                    <p className="text-label !text-red-400">VAULT_PROTECTION_STATE</p>
                    <span className={`text-label ${protectionEnabled ? "!text-red-600" : "!text-black/40"}`}>
                      {protectionEnabled ? "ACTIVE" : "DISABLED"}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-red-50 overflow-hidden shadow-inner">
                     <motion.div 
                       initial={false}
                       animate={{ width: (isPending || isConfirming) ? "100%" : (protectionEnabled ? "100%" : "0%") }}
                       className={`h-full ${isPending || isConfirming ? "bg-amber-500 animate-pulse" : "bg-red-600"}`} 
                     />
                  </div>
               </div>
               
               <div className="flex flex-col gap-6">
                  <button 
                    disabled={isPending || isConfirming}
                    onMouseDown={() => setIsPressingKill(true)}
                    onMouseUp={() => setIsPressingKill(false)}
                    onClick={handleToggleProtection}
                    className={`w-full h-32 rounded-[2.5rem] text-white text-md font-black tracking-[0.6em] uppercase transition-all shadow-2xl relative group overflow-hidden ${protectionEnabled ? "bg-black hover:bg-red-700" : "bg-red-600 hover:bg-black"}`}
                  >
                     <AnimatePresence mode="wait">
                        <motion.div
                          key={isPending ? "signing" : isConfirming ? "verifying" : "idle"}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="relative z-10 font-heading text-center"
                        >
                          {isPending ? "SIGNING_ON_CHAIN..." : isConfirming ? "FINALIZING_BLOCK..." : (protectionEnabled ? "DEACTIVATE_GUARDIAN" : "ACTIVATE_GUARDIAN")}
                        </motion.div>
                     </AnimatePresence>
                  </button>
                  <p className="text-center text-label !text-red-300 !tracking-widest">TRANSACTIONAL_OVERRIDE_ENABLED</p>
               </div>
            </div>
         </div>

         {/* Guardian Registry */}
         <div className="lg:col-span-5 p-16 rounded-[4.5rem] border border-black/10 bg-white shadow-sm flex flex-col justify-between h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.01),transparent)]">
            <div className="space-y-10">
               <div className="flex items-center gap-6 border-b border-black/5 pb-10 mb-10">
                  <div className="w-14 h-14 bg-black rounded-3xl flex items-center justify-center text-white shadow-xl">
                     <UserCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter uppercase font-heading">Authorized Agent</h3>
               </div>

               <div className="space-y-8">
                  {hasAgent ? (
                    <motion.div 
                      layout
                      className="p-10 rounded-[3rem] bg-black text-white hover:shadow-2xl transition-all group border border-white/5"
                    >
                       <div className="flex items-center gap-8">
                          <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                             <Cpu className="w-10 h-10" />
                          </div>
                          <div className="space-y-2 overflow-hidden">
                             <p className="text-label !text-white/40 !tracking-tight">AUTONOMOUS_ENTITY_ID</p>
                             <p className="text-xl font-black tracking-tighter uppercase font-heading truncate text-white">{assignedAgent as string}</p>
                             <div className="flex items-center gap-3">
                               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                               <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest italic">{agentMetadataURI ? "METADATA_VERIFIED" : "IDENTITY_SYNCED"}</span>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  ) : (
                    <div className="p-16 rounded-[3rem] border-2 border-dashed border-black/5 bg-black/[0.01] flex flex-col items-center justify-center text-center space-y-6">
                       <Lock className="w-12 h-12 text-black/10" />
                       <div className="space-y-2">
                          <p className="text-xl font-black tracking-tight text-black/40">NO_AGENT_AUTHORIZED</p>
                          <p className="text-label !text-black/20 !leading-relaxed">Access the Registry to bind an autonomous guardian to your vault.</p>
                       </div>
                    </div>
                  )}
                  
                  <button 
                    disabled={isPending || isConfirming}
                    onClick={hasAgent ? handleRevokeAgent : handleBindAgent}
                    className="w-full h-24 border border-black/10 rounded-[3rem] hover:bg-black hover:text-white transition-all text-label group flex items-center justify-center gap-3 relative overflow-hidden"
                  >
                     <AnimatePresence mode="wait">
                        <motion.div
                          key={isPending ? "signing" : "idle"}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          {isPending || isConfirming ? (
                            <span>SIGNING_PROTOCOL...</span>
                          ) : (
                            <span>{hasAgent ? "REVOKE_GUARDIAN" : "BIND_GENESIS_AGENT"}</span>
                          )}
                        </motion.div>
                     </AnimatePresence>
                  </button>
               </div>
            </div>

            <div className="pt-12">
               <div className="p-10 rounded-[2.5rem] bg-black/[0.02] border border-black/5 flex items-center gap-8 group">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-inner">
                     <Info className="w-8 h-8" />
                  </div>
                  <p className="text-label !text-black/30 !tracking-widest !leading-relaxed text-[11px]">System utilizing **Agent Identity (ERC-8004)** for decentralized verifiable guardianship.</p>
               </div>
            </div>
         </div>
      </div>

      {/* Transaction Success Popup */}
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
                   <h4 className="text-3xl font-black tracking-tighter uppercase font-heading leading-tight text-black">Security Update</h4>
                   <p className="text-[11px] font-bold text-black/30 uppercase leading-relaxed max-w-[220px]">Verified on Flow EVM Testnet. System indexed.</p>
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
                  className="w-full h-16 bg-black text-white rounded-3xl flex items-center justify-center gap-4 text-label !text-white !tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl group"
                >
                   <ExternalLink className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                   VIEW_ON_FLOWSCAN
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
