"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Zap, Globe, Cpu, AlertTriangle, Terminal, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import { useBlockNumber, useGasPrice, useReadContract, usePublicClient, useWatchContractEvent } from "wagmi";
import { formatUnits } from "viem";
import { AGENT_IDENTITY_ADDRESS, IDENTITY_ABI, GUARDIAN_REGISTRY_ADDRESS, REGISTRY_ABI, VAULT_ADDRESS, VAULT_ABI } from "@/app/constants/contracts";

/**
 * @title IntelModule
 */
export default function IntelPage() {
  useEffect(() => {
    document.title = "INTEL | HALO OS";
  }, []);

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: gasPrice } = useGasPrice();
  const publicClient = usePublicClient();
  
  const [logs, setLogs] = useState<{ id: number; type: string; msg: string; status: string; time: string }[]>([]);

  // 1. Fetch Total Agents from Identity Contract
  const { data: totalAgents } = useReadContract({
    address: AGENT_IDENTITY_ADDRESS,
    abi: IDENTITY_ABI,
    functionName: "totalAgents",
  });

  // 2. Fetch Historical and Live Logs
  const fetchAuditLogs = async () => {
    if (!publicClient) return;
    try {
      const currentBlock = await publicClient.getBlockNumber();
      const fromBlock = currentBlock > 2000n ? currentBlock - 2000n : 0n;

      const [regLogs, assignLogs, depositLogs, withdrawLogs] = await Promise.all([
        publicClient.getLogs({
          address: GUARDIAN_REGISTRY_ADDRESS,
          event: {
            type: "event",
            name: "AgentRegistered",
            inputs: [{ indexed: true, name: "agent", type: "address" }, { indexed: false, name: "metadataURI", type: "string" }]
          },
          fromBlock
        }),
        publicClient.getLogs({
          address: GUARDIAN_REGISTRY_ADDRESS,
          event: {
            type: "event",
            name: "AgentAssigned",
            inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: true, name: "agent", type: "address" }]
          },
          fromBlock
        }),
        publicClient.getLogs({
          address: VAULT_ADDRESS,
          event: {
            type: "event",
            name: "Deposit",
            inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: false, name: "amount", type: "uint256" }]
          },
          fromBlock
        }),
        publicClient.getLogs({
          address: VAULT_ADDRESS,
          event: {
            type: "event",
            name: "Withdraw",
            inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: false, name: "amount", type: "uint256" }]
          },
          fromBlock
        })
      ]);

      const allLogs = [...regLogs, ...assignLogs, ...depositLogs, ...withdrawLogs]
        .sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber))
        .map((log: any, i) => {
           let type = "SYSTEM";
           let msg = "On-chain state change detected";
           
           if (log.eventName === "AgentRegistered") {
             type = "REGISTRY";
             msg = `New Agent Identity Registered: ${log.args.agent.slice(0, 10)}...`;
           } else if (log.eventName === "AgentAssigned") {
             type = "SECURITY";
             msg = `Agent Guardian Assigned to User: ${log.args.user.slice(0, 10)}...`;
           } else if (log.eventName === "Deposit") {
             type = "FINANCE";
             msg = `Deposit Protocol: ${formatUnits(log.args.amount, 18)} FLOW via ${log.args.user.slice(0, 8)}...`;
           } else if (log.eventName === "Withdraw") {
             type = "LIQUIDITY";
             msg = `Withdraw Protocol: ${formatUnits(log.args.amount, 18)} FLOW via ${log.args.user.slice(0, 8)}...`;
           }

           return {
             id: i,
             type,
             msg,
             status: "VERIFIED",
             time: `BLOCK: ${log.blockNumber.toString()}`
           };
        });

      setLogs(allLogs);
    } catch (e) {
      console.error("Failed to fetch audit logs", e);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [publicClient]);

  // Watch for live events
  useWatchContractEvent({
    address: GUARDIAN_REGISTRY_ADDRESS,
    abi: REGISTRY_ABI,
    onLogs() {
      fetchAuditLogs();
    }
  });

  // Push new block heartbeats
  useEffect(() => {
    if (blockNumber) {
      setLogs(prev => [
        { 
          id: Date.now(), 
          type: "HEARTBEAT", 
          msg: `Protocol Sync: Block #${blockNumber.toString()} Indexing.`, 
          status: "OK", 
          time: "JUST NOW" 
        },
        ...prev.slice(0, 10)
      ]);
    }
  }, [blockNumber]);

  const stats = [
    { label: "Block Height", value: blockNumber?.toString() || "---", icon: Layers, sub: "Flow EVM Mainstream" },
    { label: "Gas Velocity", value: gasPrice ? `${Number(formatUnits(gasPrice, 9)).toFixed(2)} gwei` : "---", icon: Zap, sub: "Real-time Pulse" },
    { label: "Active Guards", value: totalAgents ? totalAgents.toString() : "0", icon: ShieldCheck, sub: "Verified Agents" },
  ];

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <p className="text-label !text-black/20">HALO SECURITY PROTOCOL</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none font-heading">Intel</h1>
        </div>
        <div className="text-right">
           <div className={`px-8 py-3 rounded-full border border-green-500/20 bg-green-500/5 text-green-500 flex items-center gap-4 shadow-sm`}>
              <div className={`w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse`} />
              <span className="text-label !text-inherit">STATUS: ALPHA_STABLE</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
         {/* Live Intelligence Activity */}
         <div className="lg:col-span-8 p-16 rounded-[4.5rem] border border-black/10 bg-white shadow-sm space-y-12 overflow-hidden h-[850px] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-black/5 pb-12">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center text-white shadow-2xl">
                     <Activity className="w-8 h-8" />
                  </div>
                  <div>
                     <h3 className="text-3xl font-black tracking-tighter uppercase font-heading">Protocol activity</h3>
                     <p className="text-label !text-black/20">Live Flow EVM Synchronization</p>
                  </div>
               </div>
               <div className="px-6 py-2 rounded-full bg-black/5 text-label !text-black/30">LUNAR_FEED</div>
            </div>

            <div className="h-[450px] w-full rounded-[3.5rem] bg-black/[0.012] border border-black/5 overflow-hidden flex flex-col items-center justify-center relative">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)", backgroundSize: "24px 24px" }} />
               
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                 className="w-80 h-80 border border-black/5 rounded-full flex items-center justify-center relative"
               >
                  <div className="absolute inset-0 border-t-2 border-primary/20 rounded-full blur-sm" />
                  <div className="w-60 h-60 border border-black/10 rounded-full flex items-center justify-center">
                     <div className="w-40 h-40 border border-black/20 rounded-full flex items-center justify-center bg-white shadow-inner">
                        <Activity className="w-16 h-16 text-primary opacity-30" />
                     </div>
                  </div>
                  {/* Dynamic pulse markers */}
                  <div className="absolute top-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_rgba(92,60,243,0.8)]" />
               </motion.div>
               <p className="mt-10 text-label !text-black/20 !tracking-[0.8em]">SCANNING_FLOW_EVM</p>
            </div>

            <div className="grid grid-cols-3 gap-10 pt-8 border-t border-black/5">
               {stats.map((stat, i) => (
                 <div key={i} className="space-y-2">
                    <p className="text-label !text-black/20 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-4xl font-black tracking-tighter font-heading text-primary whitespace-nowrap overflow-hidden text-ellipsis">{stat.value}</p>
                    <p className="text-xs font-bold text-black/20 uppercase tracking-tight italic font-sans">{stat.sub}</p>
                 </div>
               ))}
            </div>
         </div>

         {/* Audit Terminal */}
         <div className="lg:col-span-4 p-16 rounded-[4.5rem] border border-black/5 bg-black text-white shadow-2xl flex flex-col h-[850px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)]">
            <div className="flex items-center gap-5 border-b border-white/10 pb-12 mb-12">
               <div className="p-4 bg-white/10 rounded-2xl">
                  <Terminal className="w-7 h-7 text-green-500" />
               </div>
               <h3 className="text-2xl font-black tracking-tighter uppercase font-heading text-white">Audit Log</h3>
            </div>

            <div className="flex-1 font-sans text-xs space-y-10 overflow-y-auto pr-2 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
               <style jsx>{`
                  .scrollbar-none::-webkit-scrollbar {
                     display: none;
                  }
               `}</style>
               {(logs as any[]).map((log: any) => (
                 <motion.div
                   key={log.id}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="space-y-3 pl-8 relative border-l border-white/10"
                 >
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]" />
                    <div className="flex justify-between text-white/20 text-label !text-inherit !tracking-widest">
                       <span>{log.type} // {log.status}</span>
                       <span className="font-mono text-[9px]">{log.time}</span>
                    </div>
                    <p className="text-green-400 font-black uppercase leading-relaxed tracking-tight break-all">
                       {log.msg}
                    </p>
                 </motion.div>
               ))}
            </div>

            <div className="mt-12 pt-12 border-t border-white/10 space-y-6">
               <button className="w-full py-5 rounded-[2.2rem] bg-white text-black text-label !tracking-[0.4em] hover:scale-[1.05] active:scale-95 transition-all shadow-[0_20px_60px_rgba(255,255,255,0.2)]">
                  VIEW_NETWORK_HEALTH
               </button>
               <p className="text-center text-label !text-white/20">AUTH_TOKEN: HALO_01_SEC</p>
            </div>
         </div>
      </div>
    </div>
  );
}
