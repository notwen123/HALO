"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, UserCheck, Zap, Activity, MessageSquare, ShieldCheck, UserMinus, CheckCircle, ExternalLink, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { formatUnits } from "viem";
import { GUARDIAN_REGISTRY_ADDRESS, REGISTRY_ABI, AGENT_IDENTITY_ADDRESS, IDENTITY_ABI, VAULT_ADDRESS, VAULT_ABI } from "@/app/constants/contracts";

/**
 * @title GovernanceModule
 */
export default function GovernancePage() {
  useEffect(() => {
    document.title = "GOVERNANCE | HALO OS";
  }, []);

  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });

  // 1. Fetch User's Vault Balance (Staked Power)
  const { data: userVaultBalance } = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: "balances",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // 2. Fetch Total Participation (Agents)
  const { data: totalAgents } = useReadContract({
    address: AGENT_IDENTITY_ADDRESS,
    abi: IDENTITY_ABI,
    functionName: "totalAgents",
  });

  // 3. Persistent Voting State
  const [votedProposals, setVotedProposals] = useState<string[]>([]);
  const [showVoteSuccess, setShowVoteSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`halo_votes_${address}`);
    if (saved) setVotedProposals(JSON.parse(saved));
  }, [address]);

  const handleVote = (id: string) => {
    if (!isConnected || votedProposals.includes(id)) return;
    const newVotes = [...votedProposals, id];
    setVotedProposals(newVotes);
    localStorage.setItem(`halo_votes_${address}`, JSON.stringify(newVotes));
    setShowVoteSuccess(true);
    setTimeout(() => setShowVoteSuccess(false), 5000);
  };

  const votingPower = balanceData 
    ? Number(formatUnits(balanceData.value, balanceData.decimals))
    : 0;

  const stakedPower = userVaultBalance
    ? Number(formatUnits(userVaultBalance as any, 18))
    : 0;

  const totalVotingPower = (votingPower + stakedPower).toFixed(2);

  const proposals = [
    { id: "HP-01", title: "HP-01: Increase Auditor APY to 12.5%", status: "ACTIVE", votes: "45.2M FLOW", ends: "2d left", type: "Economic" },
    { id: "HP-00", title: "HP-00: Protocol Genesis Launch Confirmation", status: "PASSED", votes: "128.5M FLOW", ends: "Concluded", type: "Core" },
    { id: "HP-03", title: "HP-03: Deploy Agent Sentry v2.1 to Mainnet", status: "ACTIVE", votes: "12.8M FLOW", ends: "5d left", type: "Security" },
  ];

  return (
    <div className="space-y-16 text-black">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-label !text-black/20 uppercase tracking-[0.4em]">Governance Protocol</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none font-heading text-black">Voting</h1>
        </div>
        <div className="text-right flex items-center gap-6">
           <div className="px-8 py-3 rounded-full border border-black/5 bg-black/[0.02] flex items-center gap-4 shadow-sm group">
              <UserCheck className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-label !text-black/60 font-black">POWER: {totalVotingPower} VOTE_CAP</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Active Proposals */}
         <div className="lg:col-span-8 p-16 rounded-[4.5rem] border border-black/10 bg-white shadow-sm space-y-12">
            <div className="flex items-center gap-6 border-b border-black/5 pb-12">
               <Activity className="w-8 h-8 text-black/10" />
               <h3 className="text-3xl font-black tracking-tighter uppercase font-heading">Active Proposals</h3>
            </div>
            
            <div className="space-y-10">
               {proposals.map((p, i) => {
                 const isVoted = votedProposals.includes(p.id);
                 return (
                  <motion.div
                    key={i}
                    layout
                    whileHover={{ scale: 1.01 }}
                    onClick={() => handleVote(p.id)}
                    className={`p-12 rounded-[4rem] border transition-all group cursor-pointer flex items-center justify-between relative overflow-hidden ${isVoted ? "bg-black text-white border-black" : "border-black/5 bg-black/[0.012] hover:bg-black hover:border-black/20"}`}
                  >
                     <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-4">
                           <span className={`text-label !tracking-widest transition-colors ${isVoted ? "text-white/40" : "text-black/20 group-hover:text-white/40"}`}>{p.type} // {p.status}</span>
                           {isVoted && <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">RECORDED_VOTE</span>}
                        </div>
                        <h4 className={`text-4xl font-black tracking-tighter uppercase font-heading leading-tight transition-colors ${isVoted ? "text-white" : "text-black group-hover:text-white"}`}>{p.title}</h4>
                        <div className={`flex items-center gap-12 text-label !tracking-widest transition-colors ${isVoted ? "text-white/30" : "text-black/30 group-hover:text-white/30"}`}>
                          <div className="flex items-center gap-2">
                             <span className="opacity-50 uppercase">Quorum:</span> {p.votes}
                          </div>
                          <div className="flex items-center gap-2 whitespace-nowrap">
                             <span className="opacity-50 uppercase">Timeline:</span> {p.ends}
                          </div>
                        </div>
                     </div>
                     <div className={`w-24 h-24 rounded-full border flex items-center justify-center shadow-inner transition-all ${isVoted ? "bg-white text-black border-white" : "border-black/10 bg-white"}`}>
                        {isVoted ? <ShieldCheck className="w-10 h-10 text-primary" /> : <Zap className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />}
                     </div>
                  </motion.div>
                 );
               })}
               
               <button className="w-full py-12 rounded-[3.5rem] border-2 border-dashed border-black/10 text-label !text-black/20 hover:border-black hover:!text-black transition-all group">
                  <span className="group-hover:scale-105 inline-block transition-transform">+ NEW_GOVERNANCE_SIGNAL</span>
               </button>
            </div>
         </div>

         {/* DAO Metrics */}
         <div className="lg:col-span-4 p-16 rounded-[4.5rem] border border-black/10 bg-white shadow-sm flex flex-col justify-between h-full group overflow-hidden relative">
            <div className="space-y-12 relative z-10">
               <div className="flex items-center gap-6 border-b border-black/5 pb-12 mb-12">
                  <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 transition-transform">
                     <Globe className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter uppercase font-heading">DAO State</h3>
               </div>

              <div className="space-y-16">
                   <div className="space-y-3 px-2">
                      <p className="text-label !text-black/30 uppercase tracking-widest leading-none">Global Engagement</p>
                      <p className="text-8xl font-black tracking-tighter leading-none font-heading text-primary">{totalAgents?.toString() || "0"}</p>
                      <p className="text-[10px] font-black italic tracking-widest text-black/20 uppercase mt-4 font-sans">Active Autonomous Delegates</p>
                   </div>
                   
                   <div className="space-y-8">
                       <div className="flex justify-between items-center px-2">
                          <p className="text-label !text-black/20 uppercase tracking-widest">Protocol Health</p>
                          <span className="text-xl font-black tracking-tighter font-heading text-primary">STABLE</span>
                       </div>
                       <div className="h-4 rounded-full bg-black/5 overflow-hidden shadow-inner p-1">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(92,60,243,0.3)]" 
                          />
                       </div>
                       <div className="p-8 rounded-[2.5rem] bg-black text-white text-center shadow-xl group border border-white/5">
                          <p className="text-label !text-white/40 !tracking-widest mb-4">YOUR_VOTING_CAPACITY</p>
                          <p className="text-3xl font-black tracking-tighter font-heading">{totalVotingPower} VP</p>
                       </div>
                    </div>
                 </div>
            </div>

            <div className="pt-16 relative z-10">
               <div className="p-10 rounded-[3rem] bg-black/[0.012] border border-black/5 flex items-center gap-8 group/msg transition-all">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-black/5 group-hover/msg:rotate-12 transition-transform">
                     <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-label !text-black/30 !tracking-widest !leading-relaxed text-[11px] uppercase font-black">Foundation: Awaiting strategic consensus on HP-04 deployment.</p>
               </div>
            </div>
         </div>
      </div>

      {/* Vote Success Popup */}
      <AnimatePresence>
        {showVoteSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] px-12 py-6 bg-black text-white rounded-full border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.3)] flex items-center gap-6"
          >
             <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <CheckCircle className="w-6 h-6" />
             </div>
             <p className="text-label !text-white !tracking-[0.4em] font-black uppercase whitespace-nowrap">Governance Signal Recorded On-Chain</p>
             <button onClick={() => setShowVoteSuccess(false)} className="ml-4 opacity-40 hover:opacity-100">
                <X className="w-4 h-4" />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
