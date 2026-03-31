"use client";

import { useAccount } from "wagmi";
import { Shield, Users, Fingerprint, Code, Server, MessageSquare, ExternalLink, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function AgentPage() {
  const { address } = useAccount();

  const agentManifest = {
    name: "Guardian Agent Alpha",
    version: "1.0.4",
    protocol: "ERC-8004",
    manifest_uri: "ipfs://QmX...",
    capabilities: [
      "Asset Monitoring",
      "Dynamic Yield Routing",
      "Threat Detection",
      "Verification Logging"
    ],
    storage: {
      type: "Storacha",
      bucket: "halo-logs-v1"
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* LEFT: IDENTITY CARD */}
      <div className="md:col-span-1 space-y-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-10 bg-gradient-to-b from-primary/10 to-transparent border-primary/20"
        >
          <div className="w-40 h-40 rounded-[3rem] bg-zinc-900 border border-white/10 mx-auto flex items-center justify-center p-6 relative">
             <div className="absolute inset-4 rounded-3xl bg-primary/20 blur-2xl animate-pulse" />
             <Shield className="w-20 h-20 text-primary relative z-10" />
          </div>
          <h3 className="mt-8 text-2xl font-bold">Guardian Alpha</h3>
          <p className="text-primary font-mono text-xs uppercase tracking-widest mt-2">Active Sentinel // ID-8004</p>
          
          <div className="grid grid-cols-2 gap-4 mt-10">
             <div className="glass p-4 text-center">
                <p className="text-zinc-500 text-[10px] uppercase font-bold text-center">Uptime</p>
                <p className="text-xl font-bold text-center">99.9%</p>
             </div>
             <div className="glass p-4 text-center">
                <p className="text-zinc-500 text-[10px] uppercase font-bold text-center">Actions</p>
                <p className="text-xl font-bold text-center">142</p>
             </div>
          </div>

          <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
             <RefreshCw className="w-4 h-4" /> Re-sync Identity
          </button>
        </motion.div>

        <div className="glass p-6 text-left space-y-4">
           <div className="flex items-center gap-3 text-zinc-400">
              <Fingerprint className="w-4 h-4" />
              <span className="text-xs font-mono truncate">DID: key:z6Mkp...</span>
           </div>
           <div className="flex items-center gap-3 text-zinc-400">
              <Server className="w-4 h-4" />
              <span className="text-xs font-mono">FLOW_EVM_MAINNET_SYNC</span>
           </div>
        </div>
      </div>

      {/* RIGHT: CONFIG & MANIFEST */}
      <div className="md:col-span-2 space-y-6">
        <div className="glass p-8 space-y-8">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Code className="w-6 h-6 text-primary" />
                 <h3 className="text-xl font-bold">Agent Manifest (agent.json)</h3>
              </div>
              <button className="text-zinc-500 hover:text-primary transition-colors">
                 <ExternalLink className="w-5 h-5" />
              </button>
           </div>

           <div className="bg-zinc-950/80 rounded-2xl p-6 border border-white/10 font-mono text-sm leading-relaxed text-primary/70">
              <pre className="overflow-x-auto whitespace-pre-wrap">
{`{
  "contract": "0x8004...A2",
  "owner": "${address || '0xUser'}",
  "capabilities": ${JSON.stringify(agentManifest.capabilities, null, 2)},
  "trust_model": "semi-autonomous",
  "storage_root": "storacha://halo-logs",
  "identity_standard": "ERC-8004"
}`}
              </pre>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           <div className="glass p-8 flex items-center gap-6 group hover:border-primary/40 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                 <Users className="w-6 h-6" />
              </div>
              <div>
                 <p className="font-bold">Guardian Network</p>
                 <p className="text-xs text-zinc-500">Connect to peer agents</p>
              </div>
           </div>
           <div className="glass p-8 flex items-center gap-6 group hover:border-primary/40 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                 <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                 <p className="font-bold">Agent Logs</p>
                 <p className="text-xs text-zinc-500">View real-time chat</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
