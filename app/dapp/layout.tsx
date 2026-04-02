"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Activity, 
  Zap, 
  LogOut, 
  Cpu, 
  Lock, 
  LayoutDashboard, 
  Database, 
  Network, 
  Globe, 
  Settings,
  Bell
} from "lucide-react";
import Link from "next/link";

/**
 * @title DAppLayout
 * @dev The persistent shell for the HALO 'Billion Dollar' dApp.
 * Provides a high-end sidebar and global header.
 */
export default function DAppLayout({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const pathname = usePathname();

  // Guard: redirect back to landing if wallet disconnected
  useEffect(() => {
    if (!isConnected) router.replace("/");
  }, [isConnected, router]);

  if (!isConnected) return null;

  const shortAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  const navItems = [
    { name: "VAULT", href: "/dapp/vault", icon: Database },
    { name: "INTEL", href: "/dapp/intel", icon: Activity },
    { name: "NODES", href: "/dapp/nodes", icon: Cpu },
    { name: "NETWORK", href: "/dapp/network", icon: Network },
    { name: "GOVERNANCE", href: "/dapp/governance", icon: Globe },
    { name: "SECURITY", href: "/dapp/security", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans flex">
      {/* Sidebar */}
      <aside className="w-80 border-r border-black/5 bg-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-10 border-b border-black/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)]">H</div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase leading-tight">HALO</h1>
            <p className="text-[10px] font-mono text-black/30 tracking-[0.4em] uppercase">Built on Flow</p>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={name} href={href}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`
                    group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300
                    ${isActive ? "bg-black text-white" : "hover:bg-black/5 text-black/40 hover:text-black"}
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-black/40"}`} />
                  <span className={`text-[11px] font-mono font-black tracking-[0.4em] uppercase ${isActive ? "text-white" : "group-hover:text-black"}`}>
                    {name}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-black/5 space-y-6">
          <button
            onClick={() => disconnect()}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-mono font-black tracking-[0.4em] text-black/30 uppercase hover:bg-red-50 hover:text-red-500 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
            <span>TERMINATE</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-80">
        {/* Header */}
        <header className="h-28 border-b border-black/5 flex items-center justify-between px-16 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="space-y-1">
            <h2 className="text-xs font-mono tracking-[0.4em] text-black/30 uppercase">Authorized Session</h2>
            <div className="flex items-center gap-3">
              <p className="text-xl font-black tracking-tighter uppercase">{shortAddress}</p>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:bg-black hover:text-white transition-all duration-300 relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-0 right-0 w-3 h-3 bg-primary border-2 border-white rounded-full" />
            </button>
            <div className="w-px h-8 bg-black/10 mx-2" />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] font-mono tracking-[0.2em] text-black/30 uppercase">Vault Balance</p>
                <p className="text-xl font-black tracking-tighter uppercase">0.00 FLOW</p>
              </div>
              <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black font-black">?</div>
            </div>
          </div>
        </header>

        {/* Content Segment */}
        <main className="p-16">
          <AnimatePresence mode="wait">
             <motion.div
               key={pathname}
               initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
               exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
               transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
             >
                {children}
             </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
