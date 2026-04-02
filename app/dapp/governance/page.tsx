"use client";

import { motion } from "framer-motion";
import { Globe, UserCheck, Zap, Activity, MessageSquare, ShieldCheck, UserMinus } from "lucide-react";
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { formatUnits } from "viem";
import { GUARDIAN_REGISTRY_ADDRESS, REGISTRY_ABI, AGENT_IDENTITY_ADDRESS, IDENTITY_ABI, VAULT_ADDRESS } from "@/app/constants/contracts";

/**
 * @title GovernanceModule
 * @dev High-end DAO Voting & Proposal Dashboard for HALO OS.
 * Now integrated with Flow EVM Testnet for real-time Voting Power and Agent Status.
 */
export default function GovernancePage() {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { data: vaultBalance } = useBalance({ address: VAULT_ADDRESS });

  // 1. Fetch Assigned Agent from Registry
  const { data: assignedAgent } = useReadContract({
    address: GUARDIAN_REGISTRY_ADDRESS,
    abi: REGISTRY_ABI,
    functionName: "userToAgent",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // 2. Fetch Total Participation (Agents)
  const { data: totalAgents } = useReadContract({
    address: AGENT_IDENTITY_ADDRESS,
    abi: IDENTITY_ABI,
    functionName: "totalAgents",
  });

  const hasAgent = assignedAgent && assignedAgent !== "0x0000000000000000000000000000000000000000";

  const votingPower = balanceData 
    ? Number(formatUnits(balanceData.value, balanceData.decimals)).toFixed(2)
    : "0.00";

  const stakedAssets = vaultBalance
    ? (Number(formatUnits(vaultBalance.value, vaultBalance.decimals))).toFixed(1)
    : "0.0";

  const proposals = [
    { title: "HP-01: Increase Auditor APY", status: "ACTIVE", votes: "45.2M FLOW", ends: "2d left", type: "Economic" },
    { title: "HP-00: Protocol Genesis Launch", status: "PASSED", votes: "128.5M FLOW", ends: "Concluded", type: "Core" },
  ];

  return (
    <div className="space-y-16 text-black">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-label !text-black/20">HALO PROTOCOL GOVERNANCE</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none font-heading">Voting</h1>
        </div>
        <div className="text-right flex items-center gap-4">
           {isConnected && (
             <div className={`px-6 py-3 rounded-full border shadow-sm flex items-center gap-3 transition-all ${hasAgent ? "border-green-500/20 bg-green-500/5 text-green-600" : "border-black/5 bg-black/5 text-black/40"}`}>
               {hasAgent ? <ShieldCheck className="w-4 h-4" /> : <UserMinus className="w-4 h-4" />}
               <span className="text-label !tracking-widest">{hasAgent ? "AGENT_VERIFIED" : "NO_AGENT_ASSIGNED"}</span>
             </div>
           )}
           <div className="px-8 py-3 rounded-full border border-black/5 bg-black/5 flex items-center gap-4 shadow-sm group">
              <UserCheck className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-label !text-black/60">VOTING_POWER: {votingPower} FLOW</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Active Proposals */}
         <div className="lg:col-span-8 p-16 rounded-[4.5rem] border border-black/10 bg-white shadow-sm space-y-12">
            <div className="flex items-center gap-6 border-b border-black/5 pb-10">
               <Activity className="w-8 h-8 text-black/20" />
               <h3 className="text-3xl font-black tracking-tighter uppercase font-heading">Active Proposals</h3>
            </div>
            
            <div className="space-y-10">
               {proposals.map((p, i) => (
                 <motion.div
                   key={i}
                   whileHover={{ scale: 1.01 }}
                   className="p-12 rounded-[3.5rem] border border-black/5 bg-black/[0.012] hover:bg-black hover:text-white transition-all group cursor-pointer flex items-center justify-between"
                 >
                    <div className="space-y-6">
                       <span className="text-label !text-black/40 group-hover:!text-white/40">{p.type} // {p.status}</span>
                       <h4 className="text-4xl font-black tracking-tighter uppercase font-heading leading-tight group-hover:text-white transition-colors">{p.title}</h4>
                       <div className="flex items-center gap-12 text-label !text-black/30 group-hover:!text-white/30 !tracking-widest">
                         <div className="flex items-center gap-2">
                           <span className="opacity-50">VOTES:</span> {p.votes}
                         </div>
                         <div className="flex items-center gap-2 whitespace-nowrap">
                           <span className="opacity-50">ENDS:</span> {p.ends}
                         </div>
                       </div>
                    </div>
                    <div className="w-20 h-20 rounded-full border border-black/10 group-hover:border-white/20 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:text-black transition-all">
                       <Zap className="w-8 h-8 text-primary group-hover:text-primary transition-colors" />
                    </div>
                 </motion.div>
               ))}
               
               <button className="w-full py-10 rounded-[3rem] border-2 border-dashed border-black/10 text-label !text-black/20 hover:border-black hover:!text-black transition-all group">
                  <span className="group-hover:scale-105 inline-block transition-transform">+ INITIATE_HP_PROPOSAL</span>
               </button>
            </div>
         </div>

         {/* DAO Metrics */}
         <div className="lg:col-span-4 p-16 rounded-[4.5rem] border border-black/10 bg-white shadow-sm flex flex-col justify-between h-full group overflow-hidden relative">
            <div className="space-y-12 relative z-10">
               <div className="flex items-center gap-6 border-b border-black/5 pb-10 mb-10">
                  <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 transition-transform">
                     <Globe className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter uppercase font-heading">DAO State</h3>
               </div>

              <div className="space-y-16">
                   <div className="space-y-3 px-2">
                      <p className="text-label !text-black/20">Global Participation</p>
                      <p className="text-7xl font-black tracking-tighter leading-none font-heading text-primary">{totalAgents?.toString() || "0"}</p>
                      <p className="text-xs font-black italic tracking-widest text-black/20 uppercase mt-2 font-sans truncate">{stakedAssets} FLOW STAKED</p>
                   </div>
                   <div className="space-y-6">
                      <div className="flex justify-between items-center px-2">
                         <p className="text-label !text-black/20">Protocol Status</p>
                         <span className="text-lg font-black tracking-tighter font-heading text-primary">SYNCED</span>
                      </div>
                      <div className="h-4 rounded-full bg-black/5 overflow-hidden shadow-inner p-1">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "100%" }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(92,60,243,0.3)]" 
                         />
                      </div>
                   </div>
                </div>
            </div>

            <div className="pt-16 relative z-10">
               <div className="p-10 rounded-[3rem] bg-black text-white shadow-2xl flex items-center gap-8 group/msg border border-white/5">
                  <div className="p-4 bg-white/10 rounded-2xl group-hover/msg:scale-110 transition-transform shadow-inner">
                     <MessageSquare className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-label !text-white/30 !tracking-widest !leading-relaxed">Engage with the HALO Foundation on strategic protocol expansions.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
