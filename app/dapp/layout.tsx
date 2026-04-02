"use client";

import { useAccount, useDisconnect, useBalance } from "wagmi";
import { formatUnits } from "viem";
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
  Bell,
  Server,
  Bot,
  Search,
  Command
} from "lucide-react";
import Link from "next/link";
import CommandPalette from "@/app/components/CommandPalette";
import NotificationPanel from "@/app/components/NotificationPanel";

/**
 * @title DAppLayout
 * @dev The persistent shell for the HALO 'Billion Dollar' dApp.
 */
export default function DAppLayout({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balanceData } = useBalance({ address });
  const router = useRouter();
  const pathname = usePathname();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Global Command Palette Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Guard: redirect back to landing if wallet disconnected
  useEffect(() => {
    if (!isConnected) router.replace("/");
  }, [isConnected, router]);

  if (!isConnected) return null;

  const shortAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  const navItems = [
    { name: "VAULT", href: "/dapp/vault", icon: Database },
    { name: "INTEL", href: "/dapp/intel", icon: Activity },
    { name: "AGENTS", href: "/dapp/agents", icon: Cpu },
    { name: "NODES", href: "/dapp/nodes", icon: Server },
    { name: "NETWORK", href: "/dapp/network", icon: Network },
    { name: "GOVERNANCE", href: "/dapp/governance", icon: Globe },
    { name: "SECURITY", href: "/dapp/security", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans flex">
      {/* Sidebar - Billion Dollar Definition */}
      <aside className="w-80 border-r border-black/10 bg-white flex flex-col fixed inset-y-0 z-50 shadow-[20px_0_60px_-20px_rgba(0,0,0,0.02)]">
        {/* Top Alignment - Synchronized with Header Height */}
        <div className="h-28 p-10 border-b border-black/10 flex items-center gap-4">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)]">H</div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase leading-tight">HALO</h1>
            <p className="text-label !text-black/20 !tracking-[0.2em] !font-medium">Built on Flow</p>
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
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-black/60"}`} />
                  <span className={`text-label ${isActive ? "!text-white !font-black" : "group-hover:!text-black opacity-80"}`}>
                    {name}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-black/10 space-y-6">
          <button
            onClick={() => disconnect()}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-label !text-black/30 hover:bg-red-50 hover:!text-red-600 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
            <span>TERMINATE</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-80">
        {/* Header - Billion Dollar Definition */}
        <header className="h-28 border-b border-black/10 flex items-center justify-between px-16 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="space-y-1">
            <h2 className="text-label !text-black/20">Authorized Session</h2>
            <div className="flex items-center gap-3">
              <p className="text-xl font-black tracking-tighter uppercase">{shortAddress}</p>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="px-6 h-12 rounded-full border border-black/5 flex items-center gap-4 text-black/40 hover:bg-black hover:text-white transition-all duration-300 group shadow-sm bg-black/[0.01]"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-label !tracking-widest !font-medium">SEARCH</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/5 border border-black/5 text-[9px] group-hover:bg-white/10 group-hover:border-white/10 transition-all font-sans font-black">
                <Command className="w-2 h-2 opacity-50" />
                <span>K</span>
              </div>
            </button>
            <button 
              onClick={() => setIsNotificationOpen(true)}
              className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:bg-black hover:text-white transition-all duration-300 relative group"
            >
              <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <div className="absolute top-0 right-0 w-3 h-3 bg-primary border-2 border-white rounded-full group-hover:scale-110 transition-transform" />
            </button>
            <div className="w-px h-8 bg-black/10 mx-2" />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-label !text-black/20">Vault Balance</p>
                <p className="text-xl font-black tracking-tighter uppercase">
                   {balanceData ? `${Number(formatUnits(balanceData.value, balanceData.decimals)).toFixed(2)} ${balanceData.symbol}` : "0.00 FLOW"}
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center group">
                <img src="/flow.png" alt="Flow" className="w-10 h-10 object-contain rounded-xl group-hover:scale-110 transition-transform duration-500" />
              </div>
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

      {/* Global Overlays */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
      <NotificationPanel 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
}
