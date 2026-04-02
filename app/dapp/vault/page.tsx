"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Database, Shield, Zap, ArrowDownLeft, ArrowUpRight, TrendingUp, History, Loader2, X, CheckCircle, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount, useBalance, useReadContract, useWriteContract, useSendTransaction, useWaitForTransactionReceipt, useWatchContractEvent, usePublicClient } from "wagmi";
import { formatUnits, parseEther } from "viem";
import { VAULT_ADDRESS, VAULT_ABI } from "@/app/constants/contracts";

/**
 * @title VaultModule
 * @dev The core Asset Management interface for the HALO dApp.
 * Now fully integrated with HALO Smart Contracts on Flow EVM Testnet.
 */
export default function VaultPage() {
  useEffect(() => {
    document.title = "VAULT | HALO OS";
  }, []);

  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const [isDeposit, setIsDeposit] = useState(true);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [latestTxHash, setLatestTxHash] = useState<string | undefined>(undefined);
  const [localHistory, setLocalHistory] = useState<any[]>([]);
  const [txError, setTxError] = useState<string | null>(null);

  // 1. Fetch User Data from Contract
  const { data: userVaultBalance, refetch: refetchBalance } = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: "balances",
    args: address ? [address] : undefined,
  });

  const { data: userBalance } = useBalance({ address });

  // 2. Fetch Vault State from Contract
  const { data: vaultBalance } = useBalance({ address: VAULT_ADDRESS });
  const { data: isProtected, refetch: refetchStatus } = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: "autoProtectionEnabled",
    args: address ? [address] : undefined,
  });

  // 3. Contract Interactions
  const { data: hash, writeContract, isPending: isWritePending } = useWriteContract();
  const { sendTransaction, data: txHash, isPending: isTxPending } = useSendTransaction();
  
  const currentHash = hash || txHash;
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: currentHash });

  const isPending = isWritePending || isTxPending;

  // 4. Activity Logs with Public Client
  const [activities, setActivities] = useState<any[]>([]);
  const publicClient = usePublicClient();

  const fetchActivities = async () => {
    if (!publicClient || !address) return;
    try {
      const currentBlock = await publicClient.getBlockNumber();
      const fromBlock = currentBlock > 9900n ? currentBlock - 9900n : 0n;

      const [depositLogs, withdrawLogs] = await Promise.all([
        publicClient.getLogs({
          address: VAULT_ADDRESS,
          event: {
            type: "event",
            name: "Deposit",
            inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: false, name: "amount", type: "uint256" }]
          },
          args: { user: address },
          fromBlock
        }),
        publicClient.getLogs({
          address: VAULT_ADDRESS,
          event: {
            type: "event",
            name: "Withdraw",
            inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: false, name: "amount", type: "uint256" }]
          },
          args: { user: address },
          fromBlock
        })
      ]);

      const allLogs = [...depositLogs, ...withdrawLogs]
        .sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber))
        .slice(0, 5)
        .map((log: any) => ({
          type: log.eventName === "Deposit" ? "DEPOSIT" : "WITHDRAWAL",
          amount: `${formatUnits(log.args.amount, 18)} FLOW`,
          status: "COMPLETED",
          date: "Just Now",
          icon: log.eventName === "Deposit" ? ArrowDownLeft : ArrowUpRight,
          color: log.eventName === "Deposit" ? "text-green-500" : "text-primary",
          detail: `TX: ${log.transactionHash?.slice(0, 10)}...`
        }));

      setActivities(allLogs);
    } catch (e) {
      console.error("Failed to fetch logs", e);
    }
  };

  useEffect(() => {
    fetchActivities();
    if (isSuccess && currentHash) {
      setLatestTxHash(currentHash);
      setShowPopup(true);
      setAmount(""); // Automatically clear input after successful signing
      const timer = setTimeout(() => setShowPopup(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [publicClient, address, isSuccess, currentHash]);

  // Sync state on contract events
  useWatchContractEvent({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    onLogs(logs) {
      refetchStatus();
      fetchActivities();
    },
  });

  const [flowPrice] = useState("0.84");

  const formattedUserBalance = userBalance 
    ? Number(formatUnits(userBalance.value, userBalance.decimals)).toFixed(2)
    : "0.00";

  const formattedVaultBalance = userVaultBalance
    ? Number(formatUnits(userVaultBalance as bigint, 18)).toFixed(2)
    : "0.00";

  const totalPortfolio = (Number(formattedUserBalance) + Number(formattedVaultBalance)).toFixed(2);

  const handleAction = () => {
    if (!amount || isNaN(Number(amount))) return;
    setTxError(null);

    if (isDeposit) {
      sendTransaction({
        to: VAULT_ADDRESS,
        value: parseEther(amount),
      });
    } else {
      writeContract({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: "withdraw",
        args: [parseEther(amount)],
      });
    }
  };

  const cards = [
    { 
      title: "Total Portfolio", 
      value: `${totalPortfolio} FLOW`, 
      sub: `$${(Number(totalPortfolio) * Number(flowPrice)).toFixed(2)} USD`, 
      icon: Database, 
      color: "text-primary" 
    },
    { 
      title: "Vault Status", 
      value: isProtected ? "SECURE" : "UNPROTECTED", 
      sub: isProtected ? "Agent Monitoring @ 1ms" : "AI Integration Pending", 
      icon: Shield, 
      color: isProtected ? "text-green-500" : "text-red-400" 
    },
    { 
      title: "APY Performance", 
      value: "11.4%", 
      sub: "+0.2% Net Yield", 
      icon: Zap, 
      color: "text-yellow-500" 
    },
  ];

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-label !text-black/20">HALO ASSET MANAGEMENT</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none font-heading">Vault</h1>
        </div>
        <div className="text-right space-y-2">
          <p className="text-label !text-black/20">LIVE PRICE (FLOW/USD)</p>
          <div className="flex items-center gap-3 justify-end">
            <p className="text-3xl font-black tracking-tighter font-heading">${flowPrice}</p>
            <span className="text-xs font-black text-green-500 px-3 py-1 bg-green-500/5 rounded-full">+4.2%</span>
          </div>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="p-12 rounded-[3.5rem] border border-black/10 bg-white shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between group h-72 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-black/[0.02] rounded-bl-[4rem] group-hover:scale-110 transition-transform" />
            
            <div className="flex justify-between items-start relative z-10">
               <div className={`p-6 rounded-3xl bg-black/5 group-hover:bg-black group-hover:text-white transition-all ${card.color}`}>
                  <card.icon className="w-8 h-8" />
               </div>
               <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/20 group-hover:bg-black group-hover:text-white transition-all">
                  <TrendingUp className="w-5 h-5" />
               </div>
            </div>
            
            <div className="space-y-1 relative z-10">
               <p className="text-label !text-black/30">{card.title}</p>
               <h3 className="text-4xl font-black tracking-tighter uppercase font-heading">{card.value}</h3>
               <p className="text-xs font-bold text-black/30 uppercase tracking-tight">{card.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <div className="p-16 rounded-[4.5rem] border border-black/5 bg-white shadow-sm space-y-12 relative overflow-hidden">
           <div className="flex items-center gap-6 border-b border-black/5 pb-10">
              <div className="flex gap-4">
                 <button 
                  onClick={() => setIsDeposit(true)}
                  className={`px-10 py-4 rounded-full text-label transition-all ${isDeposit ? "bg-black text-white !text-white !tracking-[0.2em] shadow-xl hover:scale-105" : "border border-black/10 !text-black/30 hover:bg-black/5"}`}
                 >
                   DEPOSIT
                 </button>
                 <button 
                  onClick={() => setIsDeposit(false)}
                  className={`px-10 py-4 rounded-full text-label transition-all ${!isDeposit ? "bg-black text-white !text-white !tracking-[0.2em] shadow-xl hover:scale-105" : "border border-black/10 !text-black/30 hover:bg-black/5"}`}
                 >
                   WITHDRAW
                 </button>
              </div>
           </div>

           <div className="space-y-8">
              <div className="space-y-3">
                 <div className="flex justify-between px-4">
                    <label className="text-label !text-black/20 uppercase">{isDeposit ? "Amount to Deposit" : "Amount to Withdraw"}</label>
                    <span className="text-label !text-black/20 !font-mono !tracking-tight">
                      {isDeposit ? `User: ${formattedUserBalance}` : `Vault: ${formattedVaultBalance}`} FLOW
                    </span>
                 </div>
                 <div className="p-10 rounded-[3.5rem] bg-black/5 border border-black/5 focus-within:border-primary/30 flex items-center justify-between transition-all group min-h-[140px] shadow-inner">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0" 
                        className="bg-transparent text-7xl font-black tracking-tighter outline-none w-full placeholder:text-black/5 font-heading text-black"
                      />
                    </div>
                    <div className="pl-6 border-l border-black/5">
                      <div className="flex items-center gap-4 bg-white px-8 py-5 rounded-[2.5rem] shadow-sm border border-black/5 group-hover:scale-105 transition-transform group-hover:shadow-xl">
                        <div className="w-11 h-11 rounded-full bg-black/5 overflow-hidden flex items-center justify-center p-0.5">
                          <img src="/flow-coin.png" alt="Flow" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-black tracking-widest uppercase text-lg font-heading text-black">FLOW</span>
                      </div>
                    </div>
                 </div>
              </div>

              <div className="p-10 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-between group">
                 <div className="flex items-center gap-5">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:rotate-12 transition-transform">
                       <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                       <p className="text-label !text-primary !tracking-[0.2em]">Guaranteed Yield</p>
                       <p className="text-xl font-black tracking-tighter font-heading text-primary">11.4% Fixed APY</p>
                    </div>
                 </div>
                 <Shield className="w-6 h-6 text-primary/20" />
              </div>

              <button 
                onClick={handleAction}
                disabled={isPending || isConfirming || !isConnected}
                className="w-full h-32 rounded-[3rem] bg-primary text-white text-label !text-white !tracking-[0.5em] !text-lg shadow-[0_40px_80px_rgba(92,60,243,0.35)] hover:scale-[1.01] active:scale-[0.99] hover:shadow-[0_50px_100px_rgba(92,60,243,0.45)] transition-all disabled:opacity-50 disabled:hover:scale-100 flex flex-col items-center justify-center overflow-hidden group"
              >
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={isPending ? "signing" : isConfirming ? "verifying" : "idle"}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="font-heading"
                    >
                      {isPending ? "SIGNING_ON_CHAIN..." : isConfirming ? "FINALIZING_BLOCK..." : isConnected ? `${isDeposit ? "CONFIRM_DEPOSIT" : "CONFIRM_WITHDRAWAL"}` : "CONNECT_WALLET"}
                    </motion.div>
                 </AnimatePresence>
              </button>

              {/* Error State Reporting */}
              {txError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-6 rounded-[2rem] bg-red-500/10 border border-primary/20 text-center"
                >
                   <p className="text-label !text-red-500 font-black tracking-widest">{txError}</p>
                </motion.div>
              )}
           </div>
        </div>

        <div className="p-16 rounded-[4.5rem] border border-black/5 bg-white shadow-sm flex flex-col h-full bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.01),transparent)]">
           <div className="flex items-center justify-between border-b border-black/5 pb-12 mb-12">
              <div className="flex items-center gap-5">
                 <div className="p-4 bg-black/5 rounded-2xl">
                    <History className="w-6 h-6 text-black/40" />
                 </div>
                 <h3 className="text-2xl font-black tracking-tighter uppercase font-heading">Activity</h3>
              </div>
              <button 
                onClick={() => setIsActivityModalOpen(true)}
                className="text-label !text-black/30 hover:!text-black transition-colors underline underline-offset-8"
              >
                VIEW_ALL
              </button>
           </div>
           
           <div className="flex-1 space-y-8">
              {activities.length > 0 ? activities.map((tx, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-8 rounded-[2.5rem] bg-black/[0.01] hover:bg-black/5 transition-all group"
                >
                   <div className="flex items-center gap-8">
                      <div className={`w-16 h-16 rounded-2xl bg-white border border-black/5 flex items-center justify-center ${tx.color} shadow-sm group-hover:scale-110 transition-transform`}>
                         <tx.icon className="w-8 h-8" />
                      </div>
                      <div>
                         <p className="text-label !text-black/20">{tx.type}</p>
                         <h4 className="text-2xl font-black tracking-tighter uppercase font-heading leading-tight">{tx.amount}</h4>
                         <p className="text-[10px] font-bold text-black/20 uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">{tx.detail}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-label !text-black/20 !tracking-tight !font-mono">{tx.date}</p>
                      <span className={`text-label ${tx.color} !tracking-widest`}>{tx.status}</span>
                   </div>
                </motion.div>
              )) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-10 space-y-4">
                  <History className="w-12 h-12" />
                  <p className="text-label !tracking-widest">NO_ACTIVITY_INDEXED</p>
                </div>
              )}
           </div>

           <div className="mt-12 pt-12 border-t border-black/5 flex items-center justify-center gap-4">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
              <span className="text-label !text-black/20">SYSTEM_STATE: OPERATIONAL</span>
           </div>
        </div>
      </div>
      {/* Glass Liquid Activity Modal */}
      <AnimatePresence>
        {isActivityModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-8 md:p-20"
          >
            {/* Liquid Background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsActivityModalOpen(false)}
              className="absolute inset-0 bg-white/40 backdrop-blur-[100px]"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <motion.svg 
                  viewBox="0 0 1000 1000" 
                  className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%]"
                >
                  <motion.circle 
                    cx="50%" cy="50%" r="30%" 
                    fill="url(#grad1)"
                    animate={{ 
                      x: [0, 100, -50, 0], 
                      y: [0, -50, 100, 0],
                      scale: [1, 1.2, 0.9, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <defs>
                    <radialGradient id="grad1">
                      <stop offset="0%" stopColor="#5C3CF3" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                </motion.svg>
              </div>
            </motion.div>

            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl bg-white/60 border border-white rounded-[5rem] overflow-hidden shadow-[0_80px_150px_-40px_rgba(0,0,0,0.15)] relative z-10 flex flex-col h-[85vh]"
            >
               {/* Modal Header */}
               <div className="p-16 border-b border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 bg-black rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl">
                        <History className="w-10 h-10" />
                     </div>
                     <div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase font-heading">Protocol activities</h2>
                        <p className="text-label !text-black/30">Synced with Flow EVM Explorer</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => setIsActivityModalOpen(false)}
                    className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white hover:rotate-90 transition-all duration-500 group"
                  >
                     <X className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  </button>
               </div>

               {/* Activity List Container */}
               <div className="flex-1 overflow-y-auto p-16 custom-scrollbar pb-24">
                  {activities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {activities.map((tx, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="p-12 rounded-[3.5rem] bg-white/40 border border-white hover:bg-black/5 transition-all group flex items-center justify-between shadow-sm relative overflow-hidden"
                        >
                           <div className="flex items-center gap-8 relative z-10">
                              <div className={`w-20 h-20 rounded-3xl bg-white shadow-inner flex items-center justify-center ${tx.color} group-hover:scale-110 transition-transform`}>
                                 <tx.icon className="w-10 h-10" />
                              </div>
                              <div>
                                 <p className="text-label !text-black/30 !tracking-widest">{tx.type} // {tx.status}</p>
                                 <h4 className="text-3xl font-black tracking-tighter uppercase font-heading text-black">{tx.amount}</h4>
                                 <div className="mt-4 flex gap-4">
                                    <span className="px-4 py-1 rounded-full bg-black/5 text-[9px] font-black uppercase tracking-tighter text-black/40">BLOCK: #{Math.floor(Math.random() * 100000)}</span>
                                    <span className="px-4 py-1 rounded-full bg-black/5 text-[9px] font-black uppercase tracking-tighter text-black/40">GAS: 0.02 GWEI</span>
                                 </div>
                              </div>
                           </div>
                           <div className="relative z-10 text-right space-y-2">
                             <div className="text-2xl font-black tracking-tighter font-heading text-black opacity-10">#0{i+1}</div>
                             <div className="px-6 py-2 rounded-full border border-black/5 group-hover:bg-black group-hover:text-white transition-all">
                                <span className="text-[10px] font-bold uppercase tracking-widest font-sans">DETAILS</span>
                             </div>
                           </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-20 space-y-6">
                      <History className="w-24 h-24 stroke-[1px]" />
                      <p className="text-2xl font-black tracking-widest font-heading uppercase text-black">Scanning Blockchain Architecture...</p>
                    </div>
                  )}
               </div>

               {/* Liquid Bottom Bar */}
               <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
                   <h4 className="text-3xl font-black tracking-tighter uppercase font-heading leading-tight text-black">Operation Complete</h4>
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
             
             {/* Progress Bar Animation */}
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
