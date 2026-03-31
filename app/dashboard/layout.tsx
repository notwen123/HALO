"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  LayoutDashboard, 
  Database, 
  Users, 
  ScrollText, 
  Settings, 
  LogOut,
  ChevronRight,
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectKitButton } from "connectkit";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Database, label: "My Vault", href: "/dashboard/vault" },
  { icon: Users, label: "Guardian Agent", href: "/dashboard/agent" },
  { icon: ScrollText, label: "Audit Trail", href: "/dashboard/audit" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/5 bg-zinc-950/40 backdrop-blur-xl fixed inset-y-0 z-50">
        <div className="flex flex-col h-full px-6 py-8">
          <Link href="/" className="flex items-center gap-3 mb-12 px-2 hover:scale-105 transition-transform">
            <div className="w-8 h-8 rounded-lg bg-primary glow flex items-center justify-center">
              <span className="text-background font-bold text-xl">H</span>
            </div>
            <span className="font-bold tracking-tighter text-xl">HALO</span>
          </Link>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all group ${
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "group-hover:text-primary transition-colors"}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-white/5 space-y-2">
            <Link href="#" className="flex items-center gap-3 p-3 rounded-xl text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-all">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>
            <Link href="/" className="flex items-center gap-3 p-3 rounded-xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Exit dApp</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* HEADER & MAIN CONTENT */}
      <div className="flex-1 ml-72">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-background/50 backdrop-blur-sm sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold tracking-tight capitalize">
                {pathname.split("/").pop() === "dashboard" ? "Overview" : pathname.split("/").pop()?.replace("-", " ")}
              </h2>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-zinc-500 text-sm font-mono">FLOW_EVM_TESTNET</span>
           </div>

           <div className="flex items-center gap-6">
              <button className="relative p-2 rounded-xl text-zinc-500 hover:bg-white/5 transition-all">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </button>
              <ConnectKitButton />
           </div>
        </header>

        <main className="p-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
