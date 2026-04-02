"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Shield, Zap, CheckCircle, Info, ExternalLink, Activity, Database, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "success" | "info" | "warning" | "security";
  icon: any;
}

export default function NotificationPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "IDENTITY_INITIALIZED",
      description: "Genesis Guardian confirmed on Flow EVM Testnet.",
      time: "2 MINS AGO",
      type: "success",
      icon: Cpu,
    },
    {
      id: "2",
      title: "VAULT_SYNC_COMPLETE",
      description: "Asset balance successfully mapped to your controller.",
      time: "15 MINS AGO",
      type: "info",
      icon: Database,
    },
    {
      id: "3",
      title: "PROTECTION_TRIGGERED",
      description: "Auto-protection enabled during strategy simulation.",
      time: "1 HOUR AGO",
      type: "security",
      icon: Shield,
    },
    {
        id: "4",
        title: "STRATEGY_ACTIVE",
        description: "Mock Yield Strategy v0.1 initialized for user session.",
        time: "3 HOURS AGO",
        type: "info",
        icon: Zap,
      },
  ]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/5 backdrop-blur-sm cursor-pointer"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[450px] z-[110] bg-white border-l border-black/5 shadow-[-40px_0_100px_rgba(0,0,0,0.05)] flex flex-col"
          >
            {/* Header */}
            <div className="h-28 px-10 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tighter uppercase font-heading">Intelligence</h2>
                  <p className="text-label !text-black/20 uppercase tracking-[0.2em] font-medium">Protocol Feed</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 border border-black/5 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all group"
              >
                <X className="w-5 h-5 opacity-40 group-hover:opacity-100" />
              </button>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4 custom-scrollbar">
              {notifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  whileHover={{ x: -10 }}
                  className="p-8 rounded-[3rem] border border-black/5 bg-black/[0.01] hover:bg-white hover:shadow-2xl hover:border-black/10 transition-all group relative overflow-hidden"
                >
                  <div className="flex gap-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${notif.type === 'success' ? 'bg-green-500/10 text-green-500' : notif.type === 'security' ? 'bg-purple-500/10 text-primary' : 'bg-blue-500/10 text-blue-500'}`}>
                      <notif.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center gap-3">
                          <h4 className="text-sm font-black tracking-tighter uppercase font-heading text-black/80">{notif.title}</h4>
                          <span className="text-[9px] font-black tracking-widest text-black/20 uppercase">{notif.time}</span>
                       </div>
                       <p className="text-[11px] font-bold text-black/40 uppercase tracking-widest leading-relaxed">{notif.description}</p>
                    </div>
                  </div>
                  {/* Glass Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.div>
              ))}

              {notifications.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20 py-20">
                   <Activity className="w-16 h-16" />
                   <p className="text-xl font-black uppercase font-heading tracking-tighter">NO_SYSTEM_EVENTS</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-10 border-t border-black/5 bg-black/[0.01]">
              <button 
                onClick={() => setNotifications([])}
                className="w-full h-16 bg-black text-white rounded-3xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl group"
              >
                  <X className="w-4 h-4 text-primary" />
                  <span className="text-label !text-white !tracking-widest !font-black text-xs">CLEAR_MANIFEST</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
