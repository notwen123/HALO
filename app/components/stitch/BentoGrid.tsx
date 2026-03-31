"use client";

import { motion } from "framer-motion";
import { MessageSquare, Car, Utensils, MapPin, Zap, Lock, ScanLine, Shield } from "lucide-react";

/**
 * @title BentoGrid
 * @dev Replicating the 'Apple Intelligence' bento grid with HALO security themes.
 */
export function BentoGrid() {
  return (
    <section className="py-24 px-10 max-w-7xl mx-auto space-y-12">
      {/* 1. Large Top Card (Liquid Intelligence) */}
      <div className="grid md:grid-cols-12 gap-8 h-[700px]">
        <motion.div 
           whileHover={{ scale: 1.01 }}
           className="md:col-span-8 rounded-xl bg-surface-container p-16 flex flex-col justify-between relative overflow-hidden group border border-white/5 shadow-2xl"
        >
          <div className="relative z-10 space-y-8">
            <span className="text-tertiary font-black tracking-[0.5em] uppercase text-xs block">// LIQUID_INTELLIGENCE</span>
            <h3 className="text-5xl md:text-7xl font-bold max-w-xl text-white tracking-tighter italic">
               "HALO, remind me to secure the Dry Bulk Yield when I leave the vault."
            </h3>
          </div>
          <img 
            alt="Secure Liquid City" 
            className="absolute right-0 bottom-0 w-2/3 h-2/3 object-cover rounded-tl-[10rem] opacity-20 group-hover:opacity-40 transition-opacity duration-700" 
            src="https://images.unsplash.com/photo-1449156006004-972049d97a51?auto=format&fit=crop&q=80&w=1000" 
          />
        </motion.div>
        
        <motion.div 
           whileHover={{ scale: 1.02 }}
           className="md:col-span-4 rounded-xl bg-surface-container-high p-12 flex flex-col justify-center border border-primary/20 shadow-xl"
        >
          <MapPin className="text-tertiary w-16 h-16 mb-8 group-hover:scale-110 transition-transform" />
          <p className="text-2xl font-black italic tracking-tighter text-white leading-tight">
             Contextual awareness that understands where you are and where you're going.
          </p>
        </motion.div>
      </div>

      {/* 2. Middle Grid (Car & Health Proxy) */}
      <div className="grid md:grid-cols-2 gap-8 h-[600px]">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="rounded-xl bg-gradient-to-br from-secondary/20 to-surface-container p-16 flex flex-col justify-end group overflow-hidden relative border border-white/5 shadow-2xl"
        >
          <img 
            alt="Premium Interior" 
            className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-1000" 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000" 
          />
          <div className="relative z-10 space-y-6">
            <span className="text-secondary font-black tracking-[0.5em] uppercase text-xs block group-hover:text-white transition-colors">// IN_THE_SECURE_CAR</span>
            <h3 className="text-4xl font-bold tracking-tighter italic text-white">"HALO, text the Oracle I'm 10 blocks away."</h3>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="rounded-xl bg-surface-container-high p-16 flex flex-col justify-end group overflow-hidden relative border border-white/5 shadow-2xl"
        >
          <img 
            alt="Advanced HUD" 
            className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-1000" 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
          />
          <div className="relative z-10 space-y-6">
            <span className="text-primary font-black tracking-[0.5em] uppercase text-xs block group-hover:text-white transition-colors">// ON_THE_FRONT_LINE</span>
            <h3 className="text-4xl font-bold tracking-tighter italic text-white">"HALO, start a Private Cloud Compute scan."</h3>
          </div>
        </motion.div>
      </div>

      {/* 3. Bottom Hero Card (The Vault) */}
      <motion.div 
        whileHover={{ scale: 1.005 }}
        className="rounded-xl bg-surface-container-low p-20 h-[700px] flex items-center relative overflow-hidden group border border-white/5 shadow-2xl"
      >
        <img 
           alt="Global Vault" 
           className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-1000" 
           src="https://images.unsplash.com/photo-1550741113-5039ed6ca639?auto=format&fit=crop&q=80&w=1000" 
        />
        <div className="relative z-10 max-w-2xl space-y-12">
          <span className="text-tertiary font-black tracking-[0.5em] uppercase text-xs block">// THE_COLD_VAULT</span>
          <h3 className="text-6xl md:text-8xl font-bold tracking-tighter italic text-white leading-[0.85]">
             "HALO, lock the protocol."
          </h3>
          <p className="text-2xl text-on-surface-variant font-medium italic leading-relaxed">
             Hands-free help for when your hands are full of yield. 
             Manage multiple vaults and find exploits with ease.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
