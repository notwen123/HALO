"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, Activity, Cpu, Zap, Globe, Lock, AlertCircle, ShieldAlert, CheckCircle, X, ExternalLink, Server, Database, RefreshCcw, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { formatUnits } from "viem";
import { VAULT_ADDRESS, AGENT_IDENTITY_ADDRESS, IDENTITY_ABI, MOCK_YIELD_STRATEGY_ADDRESS, STRATEGY_ABI, REGISTRY_ABI, GUARDIAN_REGISTRY_ADDRESS, VAULT_ABI } from "@/app/constants/contracts";
import { useAccount } from "wagmi";
import { parseEther } from "viem";
import Link from "next/link";

/**
 * @title NodesModule
 * @dev High-end Infrastructure & Validator Staking Dashboard for HALO OS.
 * Now integrated with live Agent NFTs and Yield Strategy metrics on Flow EVM.
 */
export default function NodesPage() {
  useEffect(() => {
    document.title = "INFRASTRUCTURE | HALO OS";
  }, []);

  const { address } = useAccount();
  const [isClaiming, setIsClaiming] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);
  
  // 1. Fetch Total Vault Balance as "Pool Assets"
  const { data: vaultBalance } = useBalance({ address: VAULT_ADDRESS });
  
  // 2. Fetch Yield Strategy Balance
  const { data: yieldBalance } = useReadContract({
    address: MOCK_YIELD_STRATEGY_ADDRESS,
    abi: STRATEGY_ABI,
    functionName: "getBalance",
  });

  const [customAgentName, setCustomAgentName] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
       const saved = localStorage.getItem(`halo_agent_name_${address}`);
       if (saved) setCustomAgentName(saved);
    }
  }, [address]);

  // 3. Fetch Total Agents from Identity Contract
  const { data: totalAgents } = useReadContract({
    address: AGENT_IDENTITY_ADDRESS,
    abi: IDENTITY_ABI,
    functionName: "totalAgents",
  });

  // 3.1 Fetch User's Agent NFT Balance
  const { data: userNftBalance } = useReadContract({
    address: AGENT_IDENTITY_ADDRESS,
    abi: IDENTITY_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const hasNft = userNftBalance && Number(userNftBalance) > 0;

  // 4. Fetch User's Specific Agent from Registry
  const { data: userAgentData } = useReadContract({
    address: GUARDIAN_REGISTRY_ADDRESS,
    abi: REGISTRY_ABI,
    functionName: "userToAgent",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const hasAgent = userAgentData && userAgentData !== "0x0000000000000000000000000000000000000000";

  // 5. Contract Actions
  const { writeContract, data: hash, isPending: isTxPending } = useWriteContract();
  const { isLoading: isTxConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleHarvest = () => {
    if (!address) return;
    setTxError(null);
    writeContract({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: "executeProtectionAction",
      args: [address, MOCK_YIELD_STRATEGY_ADDRESS, parseEther("0.1")], // Simulating harvest for current user
    });
  };

  const handleCompound = () => {
    if (!address) return;
    setTxError(null);
    writeContract({
      address: MOCK_YIELD_STRATEGY_ADDRESS,
      abi: STRATEGY_ABI,
      functionName: "deposit",
      args: [parseEther("0.1")],
    });
  };

  const formattedVaultTotal = vaultBalance 
    ? Number(formatUnits(vaultBalance.value, vaultBalance.decimals))
    : 0;
  
  const formattedYieldTotal = yieldBalance
    ? Number(formatUnits(yieldBalance as bigint, 18))
    : 0;

  const totalPoolAssets = (formattedVaultTotal + formattedYieldTotal).toFixed(2);

  const nodes = [
    { id: "NODE_00_HALO", location: "GENESIS-CLUSTER", status: "ONLINE", load: "12%", icon: Shield },
    { id: "NODE_01_FLOW", location: "EVM-MAIN-FLOW", status: "ONLINE", load: "9%", icon: Server },
    { id: "NODE_02_AGENT", location: `VIRTUAL-${totalAgents?.toString() || "0"}`, status: "ONLINE", load: "22%", icon: Cpu },
  ];

  return (
    <div className="space-y-16 text-black">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-label !text-black/20">HALO INFRASTRUCTURE</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none font-heading">Nodes</h1>
        </div>
        <div className="text-right">
           <button 
             onClick={handleHarvest}
             disabled={isTxPending || isTxConfirming}
             className="px-12 h-16 rounded-full bg-black text-white text-label !text-white !tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center overflow-hidden group min-w-[280px] disabled:opacity-50"
           >
              <AnimatePresence mode="wait">
                 <motion.div
                   key={isTxPending || isTxConfirming ? "syncing" : "idle"}
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: -20, opacity: 0 }}
                   className="flex items-center gap-4"
                 >
                    {isTxPending || isTxConfirming ? (
                       <span>SYNCING_POOL...</span>
                    ) : (
                       <>
                          <Zap className="w-5 h-5 text-yellow-400 group-hover:rotate-12 transition-transform" />
                          <span>HARVEST_YIELD</span>
                       </>
                    )}
                 </motion.div>
              </AnimatePresence>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
         {/* Validator Core Stats */}
         <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-16 rounded-[4.5rem] border border-black/10 bg-white shadow-sm space-y-12 col-span-1 md:col-span-2">
               <div className="flex items-center gap-6 border-b border-black/5 pb-10">
                  <div className="w-16 h-16 bg-black/5 rounded-3xl flex items-center justify-center text-primary shadow-inner">
                     <Activity className="w-8 h-8" />
                  </div>
                  <div>
                     <h3 className="text-3xl font-black tracking-tighter uppercase font-heading">Protocol Staking</h3>
                     <p className="text-label !text-black/20">Live Flow EVM Participation</p>
                  </div>
               </div>
               <div className="grid grid-cols-3 gap-12">
                  {[
                    { label: "POOL_TOTAL", value: `${totalPoolAssets} FLOW`, sub: "ON-CHAIN VAULT ASSETS" },
                    { label: "WEIGHT", value: "99.8%", sub: "CONSENSUS STRENGTH" },
                    { label: "UPTIME", value: "99.9%", sub: "GUARANTEED AVAILABILITY" },
                  ].map((stat, i) => (
                    <motion.div key={i} className="space-y-3">
                       <p className="text-label !text-black/30 whitespace-nowrap">{stat.label}</p>
                       <p className="text-5xl font-black tracking-tighter text-black font-heading leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{stat.value}</p>
                       <p className="text-[10px] font-bold text-black/20 uppercase tracking-[0.1em] italic font-sans">{stat.sub}</p>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* High-End Node Monitors */}
            {nodes.map((node, i) => (
               <div key={i} className="p-12 rounded-[4rem] border border-black/5 bg-white shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden h-[340px] flex flex-col justify-between hover:bg-black">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-black/[0.015] rounded-bl-[4rem] flex items-center justify-center translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-700">
                     <node.icon className="w-12 h-12 text-black/5 group-hover:text-primary transition-colors" />
                  </div>
                   <div className="space-y-8 relative z-10 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className={`w-2.5 h-2.5 rounded-full ${node.status === "ONLINE" ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]" : "bg-amber-500"} animate-pulse`} />
                         <span className="text-label !text-black/30 group-hover:!text-white/40 transition-colors">{node.status}</span>
                      </div>
                      <div>
                         <h4 className="text-4xl font-black tracking-tighter uppercase font-heading group-hover:text-primary transition-colors">{node.id}</h4>
                         <p className="text-label !text-black/20 !font-mono !tracking-tight group-hover:!text-white/20 transition-colors">{node.location}</p>
                      </div>
                   </div>
                   <div className="pt-8 border-t border-black/5 flex items-center justify-between relative z-10">
                      <span className="text-label !text-black/20 group-hover:!text-white/20 transition-colors">RPC_LATENCY_12ms</span>
                      <span className="text-2xl font-black tracking-tighter text-black group-hover:text-white transition-colors">{node.load}</span>
                   </div>
               </div>
            ))}

            {/* Your Provisioned Guardians */}
            <div className="p-12 rounded-[4rem] border border-black/5 bg-white shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden h-auto col-span-1 md:col-span-2">
               <div className="flex items-center justify-between pb-8 border-b border-black/5">
                  <div className="flex items-center gap-4">
                     <Shield className="w-6 h-6 text-primary" />
                     <p className="text-label !text-black !tracking-widest capitalize">YOUR_ACTIVE_GUARDIANS</p>
                  </div>
                  <span className="text-label !text-black/20 uppercase font-mono">{hasAgent ? "1 ACTIVE" : (hasNft ? "1 UNBOUND" : "0 DISCOVERED")}</span>
               </div>
               
                <div className="pt-8">
                  {hasAgent ? (
                    <div className="p-10 rounded-[3rem] bg-black/5 border border-black/5 flex items-center justify-between group/card hover:bg-black hover:text-white transition-all duration-500">
                        <div className="space-y-2">
                           <h4 className="text-3xl font-black tracking-tighter uppercase font-heading group-hover/card:text-white transition-colors">
                              {customAgentName || "SENTRY_OS_ALPHA"}
                           </h4>
                           <p className="text-label !tracking-tight opacity-40 group-hover/card:opacity-100 transition-opacity font-mono text-sm">{userAgentData as string}</p>
                        </div>
                        <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center group-hover/card:bg-white/10 transition-colors">
                           <Activity className="w-6 h-6 text-green-500 group-hover/card:text-green-400" />
                        </div>
                    </div>
                  ) : hasNft ? (
                    <div className="p-10 rounded-[3rem] bg-amber-500/5 border border-amber-500/20 flex flex-col gap-6 group/dormant hover:bg-black transition-all duration-500">
                       <div className="flex items-center justify-between">
                          <div className="space-y-1">
                             <h4 className="text-2xl font-black tracking-tighter uppercase text-amber-600 font-heading group-hover/dormant:text-amber-400 transition-colors">DORMANT_IN_VAULT</h4>
                             <p className="text-xs font-mono opacity-40 uppercase tracking-tighter group-hover/dormant:text-white/40 transition-colors">Identity Found but Not Linked to Security Core</p>
                          </div>
                          <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center animate-pulse group-hover/dormant:bg-white/10 transition-colors">
                             <RefreshCcw className="w-5 h-5 text-amber-500" />
                          </div>
                       </div>
                       <Link 
                         href="/dapp/security"
                         className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-black text-white text-[10px] font-black tracking-[0.2em] hover:bg-primary border border-white/10 transition-colors group/link"
                       >
                          <span>LINK_TO_SECURITY_CORE</span>
                          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                       </Link>
                    </div>
                  ) : (
                    <div className="py-12 text-center space-y-4">
                       <p className="text-label !text-black/20">NO_GUARD_ACTIVE_IN_CLUSTER</p>
                       <p className="text-xs font-mono opacity-30 px-20">INITIALIZE IDENTITY NFT TO PROVISION INNODES TAB</p>
                    </div>
                  )}
               </div>
            </div>
         </div>

         {/* Elite Yield Hub */}
         <div className="xl:col-span-4 p-16 rounded-[4.5rem] border border-black/5 bg-black text-white shadow-2xl flex flex-col justify-between h-full bg-[radial-gradient(ellipse_at_top_right,rgba(92,60,243,0.1),transparent)] overflow-hidden">
            <div className="space-y-12 relative">
               <div className="flex items-center gap-5">
                  <div className="p-4 bg-white/10 rounded-2xl shadow-inner">
                     <Zap className="w-7 h-7 text-yellow-400" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter uppercase font-heading text-white">Protocol APY</h3>
               </div>
               
               <div className="py-16 border-y border-white/5 space-y-4 text-center relative">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-white/[0.02] blur-xl" />
                  <p className="text-label !text-white/30 decoration-primary/40 underline underline-offset-8">REAL_TIME_YIELD</p>
                  <h2 className="text-[8rem] font-black tracking-tighter uppercase text-white leading-none font-heading relative z-10">11.4</h2>
                  <p className="text-xl font-black tracking-tighter text-white/40 italic uppercase pb-4 font-heading">PERCENT APY</p>
                  <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 shadow-inner">
                     <span className="text-label !text-green-400">STATE: OPTIMIZED</span>
                  </div>
               </div>
            </div>

             <div className="space-y-8 pt-12">
                <button 
                  onClick={handleCompound}
                  disabled={isTxPending || isTxConfirming}
                  className="w-full py-7 rounded-[2.5rem] bg-white text-black text-label !tracking-[0.4em] hover:scale-[1.05] active:scale-95 transition-all shadow-[0_30px_80px_rgba(255,255,255,0.15)] disabled:opacity-50"
                >
                   {isTxPending || isTxConfirming ? "STAKING..." : "AUTO_COMPOUND"}
                </button>
                <p className="text-center text-label !text-white/20">FLOW_EVM_STAKING_V1</p>
             </div>
         </div>
      </div>
    </div>
  );
}
