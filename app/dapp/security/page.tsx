"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, AlertOctagon, UserCheck, Key, ShieldAlert, Cpu, Power, Loader2, Info, CheckCircle, X, ExternalLink, Activity } from "lucide-react";
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
  const [txError, setTxError] = useState<string | null>(null);

  // 1. Fetch Auto-Protection Status
  useEffect(() => {
    document.title = "SECURITY | HALO OS";
  }, []);

  const { data: protectionEnabled, refetch: refetchStatus } = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: "autoProtectionEnabled",
    args: address ? [address] : undefined,
  });

  // 2. Fetch Authorized Agent
  const { data: assignedAgent, refetch: refetchAgent } = useReadContract({
    address: GUARDIAN_REGISTRY_ADDRESS,
    abi: REGISTRY_ABI,
    functionName: "userToAgent",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // 3. Fetch Global Registration Status for the Identity NFT
  const { data: globalAgentDetails, refetch: refetchGlobalRegistry } = useReadContract({
    address: GUARDIAN_REGISTRY_ADDRESS,
    abi: REGISTRY_ABI,
    functionName: "agents",
    args: [AGENT_IDENTITY_ADDRESS],
  });

  const isAgentRegistered = Array.isArray(globalAgentDetails) ? globalAgentDetails[3] : false;

  // 3.1 Fetch User's Agent NFT Balance
  const { data: userNftBalance, refetch: refetchBalance } = useReadContract({
    address: AGENT_IDENTITY_ADDRESS,
    abi: IDENTITY_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const hasNft = userNftBalance && Number(userNftBalance) > 0;

  // 4. Contract Interactions
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && hash) {
      refetchStatus();
      refetchAgent();
      refetchGlobalRegistry?.();
      refetchBalance();
      setIsPressingKill(false);
      setLatestTxHash(hash);
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, hash, refetchStatus, refetchAgent, refetchGlobalRegistry, refetchBalance]);

  const handleToggleProtection = () => {
    if (!address) return;
    setTxError(null);
    writeContract({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: "toggleProtection",
      args: [!protectionEnabled],
    });
  };

  const handleBindAgent = () => {
    if (!address) return;
    setTxError(null);

    // Stage 1: Check if registered
    if (!isAgentRegistered) {
       // For demo, we register the Identity Contract as the agent for this NFT
       writeContract({
         address: GUARDIAN_REGISTRY_ADDRESS,
         abi: REGISTRY_ABI,
         functionName: "registerAgent",
         args: [AGENT_IDENTITY_ADDRESS, BigInt(0), "ipfs://halo-genesis-sentry"],
       });
       return;
    }

    // Stage 2: Assign
    writeContract({
      address: GUARDIAN_REGISTRY_ADDRESS,
      abi: REGISTRY_ABI,
      functionName: "assignAgent",
      args: [AGENT_IDENTITY_ADDRESS],
    });
  };

  const handleRevokeAgent = () => {
    if (!hasAgent) return;
    setTxError(null);
    writeContract({
      address: GUARDIAN_REGISTRY_ADDRESS,
      abi: REGISTRY_ABI,
      functionName: "revokeAgent",
    });
  };

  const hasAgent = assignedAgent && assignedAgent !== "0x0000000000000000000000000000000000000000";

  const agentMetadataURI = Array.isArray(globalAgentDetails) ? globalAgentDetails[2] : null;

  const mockInterventions = [
    { type: "MITIGATION", msg: "Unauthorized Withdraw Request Sinked", time: "2m ago", status: "BLOCKED" },
    { type: "OPTIMIZATION", msg: "Yield Strategy Rebalanced for Apex", time: "14h ago", status: "OPTIMIZED" },
    { type: "SENTRY", msg: "EVM State Anomaly Detected & Ignored", time: "1d ago", status: "VERIFIED" },
  ];

  return (
    <div className="space-y-16 text-black">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-label !text-black/20 uppercase tracking-[0.4em]">Emergency Protocol</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none font-heading text-black">Security</h1>
        </div>
        <div className="text-right flex items-center gap-6">
           <div className="px-8 py-3 rounded-full bg-black/5 border border-black/5 flex items-center gap-4 shadow-sm group">
              <Key className="w-5 h-5 text-primary group-hover:rotate-45 transition-transform" />
              <span className="text-label !text-black/60 uppercase">AUTH_AGENT: {hasAgent ? "AUTHORIZED" : "UNBOUND"}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Autonomous Protection Card */}
         <div className="lg:col-span-12 p-16 rounded-[4.5rem] border border-black/10 bg-white shadow-sm space-y-14 relative overflow-hidden group h-[500px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-[600px] h-full opacity-[0.03] pointer-events-none group-hover:scale-105 transition-transform duration-1000">
               <ShieldAlert className="w-full h-full text-red-600" />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
               <div className="space-y-8 max-w-xl">
                  <div className={`w-28 h-28 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-700 ${protectionEnabled ? "bg-red-600 shadow-red-200" : "bg-black shadow-black/20"}`}>
                     {protectionEnabled ? <Power className="w-14 h-14 animate-pulse" /> : <ShieldAlert className="w-14 h-14" />}
                  </div>
                  <div>
                    <h2 className="text-7xl font-black tracking-tighter uppercase text-red-900 leading-tight font-heading">
                      {protectionEnabled ? "Guardian Active" : "Inert Protocol"}
                    </h2>
                    <p className="text-red-800/60 font-bold text-xl uppercase tracking-tight font-sans mt-4">
                      {protectionEnabled 
                        ? (hasAgent 
                            ? "Autonomous monitoring enabled via localized Agent Identity. Protocol syncing on Flow EVM." 
                            : "Guardian active but unbound. Connect an Agent Identity for elite automation.")
                        : "Manual override only. The autonomous guardian core is currently decentralized offline."}
                    </p>
                  </div>
               </div>

               <div className="flex-1 w-full max-w-md">
                 <div className="p-12 rounded-[4rem] bg-white border border-red-100 shadow-xl space-y-10 relative">
                    <div className="space-y-4">
                       <div className="flex justify-between px-4">
                         <p className="text-label !text-red-400">CORE_PROTECTION_OS</p>
                         <span className={`text-label ${protectionEnabled ? "!text-red-600" : "!text-black/40"}`}>
                           {protectionEnabled ? "ONLINE" : "OFFLINE"}
                         </span>
                       </div>
                       <div className="h-4 rounded-full bg-red-50 overflow-hidden shadow-inner p-1">
                          <motion.div 
                            initial={false}
                            animate={{ width: (isPending || isConfirming) ? "100%" : (protectionEnabled ? "100%" : "0%") }}
                            className={`h-full rounded-full ${isPending || isConfirming ? "bg-amber-500 animate-pulse" : "bg-red-600"}`} 
                          />
                       </div>
                    </div>
                    
                    <div className="flex flex-col gap-6">
                       <button 
                         disabled={isPending || isConfirming}
                         onMouseDown={() => setIsPressingKill(true)}
                         onMouseUp={() => setIsPressingKill(false)}
                         onClick={handleToggleProtection}
                         className={`w-full h-28 rounded-[2.5rem] text-white text-md font-black tracking-[0.5em] uppercase transition-all shadow-2xl relative group/kill overflow-hidden ${protectionEnabled ? "bg-black hover:bg-red-700" : "bg-red-600 hover:bg-black"}`}
                       >
                          <AnimatePresence mode="wait">
                             <motion.div
                               key={isPending ? "signing" : isConfirming ? "verifying" : "idle"}
                               initial={{ y: 20, opacity: 0 }}
                               animate={{ y: 0, opacity: 1 }}
                               exit={{ y: -20, opacity: 0 }}
                               className="relative z-10 font-heading text-center"
                             >
                               {isPending ? "SIGNING_ON_CHAIN..." : isConfirming ? "FINALIZING_BLOCK..." : (protectionEnabled ? "DEACTIVATE_CORE" : "ACTIVATE_CORE")}
                             </motion.div>
                          </AnimatePresence>
                          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/kill:opacity-100 transition-opacity" />
                       </button>

                       {/* Error State Reporting */}
                       {txError && (
                         <motion.div 
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: "auto" }}
                           className="p-6 rounded-[2rem] bg-red-500/10 border border-red-500/20 text-center"
                         >
                            <p className="text-label !text-red-500 font-black tracking-widest">{txError}</p>
                         </motion.div>
                       )}
                    </div>
                 </div>
               </div>
            </div>

            <div className="relative h-12 w-full overflow-hidden flex items-center justify-center">
               <AnimatePresence>
                  {protectionEnabled && (
                    <motion.div 
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      className="flex gap-1"
                    >
                       {[...Array(60)].map((_, i) => (
                         <motion.div
                           key={i}
                           animate={{ height: [4, Math.random() * 24 + 4, 4] }}
                           transition={{ repeat: Infinity, duration: 1 + Math.random(), ease: "easeInOut", delay: i * 0.05 }}
                           className="w-1 bg-red-600/30 rounded-full"
                         />
                       ))}
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>

         {/* Intervention History */}
         <div className="lg:col-span-8 p-16 rounded-[4.5rem] border border-black/10 bg-white shadow-sm space-y-12">
            <div className="flex items-center gap-6 border-b border-black/5 pb-12 mb-12">
               <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center text-white shadow-2xl">
                  <Activity className="w-8 h-8" />
               </div>
               <div>
                  <h3 className="text-3xl font-black tracking-tighter uppercase font-heading">Intervention History</h3>
                  <p className="text-label !text-black/20">Autonomous Sentry Unit logs</p>
               </div>
            </div>

            <div className="space-y-8">
               {mockInterventions.map((log, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ x: 10 }}
                   className="p-10 rounded-[3rem] border border-black/5 bg-black/[0.012] flex items-center justify-between group cursor-default"
                 >
                    <div className="flex items-center gap-8">
                       <div className="w-20 h-20 rounded-[2.2rem] bg-white border border-black/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                          <Cpu className={`w-8 h-8 ${log.type === "MITIGATION" ? "text-red-500" : log.type === "OPTIMIZATION" ? "text-primary" : "text-amber-500"}`} />
                       </div>
                       <div className="space-y-1">
                          <p className="text-label !text-black/30 uppercase tracking-widest">{log.type} // {log.time}</p>
                          <h4 className="text-2xl font-black tracking-tighter uppercase font-heading text-black/80">{log.msg}</h4>
                       </div>
                    </div>
                    <div className="px-6 py-2 rounded-full bg-black/5 text-label !text-black/40 !tracking-widest">
                       {log.status}
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Guardian Binding Card */}
         <div className="lg:col-span-4 p-16 rounded-[4.5rem] border border-black/10 bg-black text-white shadow-2xl flex flex-col justify-between h-full group overflow-hidden relative border border-white/5 bg-[radial-gradient(ellipse_at_top_right,rgba(92,60,243,0.1),transparent)]">
            <div className="space-y-12 relative z-10">
               <div className="flex items-center gap-6 border-b border-white/10 pb-12 mb-12">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-primary shadow-inner">
                     <UserCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase font-heading">Identity Binding</h3>
               </div>

               <div className="space-y-10">
                  {hasAgent ? (
                    <motion.div 
                      layout
                      className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 text-white relative group/agent overflow-hidden"
                    >
                       <div className="flex items-center gap-8 relative z-10">
                          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover/agent:scale-110 transition-transform shadow-[0_0_40px_rgba(92,60,243,0.3)]">
                             <Cpu className="w-10 h-10" />
                          </div>
                          <div className="space-y-2 overflow-hidden">
                             <p className="text-label !text-white/40 !tracking-tight">BOUND_ENTITY_ID</p>
                             <p className="text-xl font-black tracking-tighter uppercase font-heading truncate">{assignedAgent as string}</p>
                             <div className="flex items-center gap-3">
                               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                               <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest italic">{agentMetadataURI ? "SYNC_HEALTHY" : "IDENTITY_LOCKED"}</span>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  ) : (
                    <div className="p-16 rounded-[3.5rem] border-2 border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center space-y-6">
                       <Lock className="w-12 h-12 text-white/10" />
                       <div className="space-y-2">
                          <p className="text-xl font-black tracking-tight text-white/40 uppercase">NO_AGENT_BOUND</p>
                          <p className="text-label !text-white/20 !leading-relaxed px-4">Bind an Identity NFT to activate autonomous protocol guardianship.</p>
                       </div>
                    </div>
                  )}
                  
                  <button 
                    disabled={isPending || isConfirming}
                    onClick={hasAgent ? handleRevokeAgent : handleBindAgent}
                    className={`w-full h-24 rounded-[3rem] transition-all text-label group flex items-center justify-center gap-3 relative overflow-hidden ${hasAgent ? "border border-white/10 hover:bg-red-500/10 hover:text-red-500" : "bg-white text-black hover:scale-105 active:scale-95"}`}
                  >
                     <AnimatePresence mode="wait">
                        <motion.div
                          key={isPending ? "signing" : "idle"}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          className="flex items-center gap-3 uppercase font-black tracking-widest"
                        >
                          {isPending || isConfirming ? (
                             <span>SIGNING_SEC...</span>
                          ) : (
                            <span>
                              {hasAgent ? "REVOKE_BOUND_AGENT" : (!hasNft ? "MINT_NFT_FIRST" : (!isAgentRegistered ? "REGISTER_NFT_TYPE" : "BIND_AGENT_CORE"))}
                            </span>
                          )}
                        </motion.div>
                     </AnimatePresence>
                  </button>
               </div>
            </div>

            <div className="pt-12 relative z-10">
               <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 flex items-center gap-8 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary shadow-inner group-hover:rotate-12 transition-transform">
                     <Info className="w-8 h-8" />
                  </div>
                  <p className="text-label !text-white/20 !tracking-widest !leading-relaxed text-[10px]">Utilizing **ERC-8004 Metadata Standards** for cross-layer autonomous verification.</p>
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
