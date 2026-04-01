"use client";

import { motion } from "framer-motion";
import { MessageSquare, Car, Utensils, MapPin, Zap, Lock, ScanLine, Shield } from "lucide-react";

/**
 * @title BentoGrid
 * @dev Replicating the 'Apple Intelligence' bento grid with HALO security themes.
 */
export function BentoGrid() {
  return (
    <section className="py-40 px-10 max-w-7xl mx-auto space-y-12 pb-60">
      {/* 1. Large Top Card (Liquid Intelligence) */}
      <div className="grid md:grid-cols-12 gap-12 h-[800px]">
        <motion.div 
           whileHover={{ y: -10 }}
           className="md:col-span-8 rounded-luxury bg-surface-container p-20 flex flex-col justify-between relative overflow-hidden group border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
        >
          <div className="relative z-10 space-y-12">
            <span className="text-tertiary font-black tracking-[0.8em] uppercase text-[10px] block opacity-40">PROTOCOL_AWARENESS</span>
            <h3 className="text-6xl md:text-8xl font-black max-w-2xl text-white tracking-tighter leading-none uppercase">
               "HALO, secure my yield position."
            </h3>
          </div>
          <img 
            alt="Secure Liquid City" 
            className="absolute right-0 bottom-0 w-2/3 h-2/3 object-cover rounded-tl-[12rem] opacity-30 group-hover:opacity-50 transition-opacity duration-1000" 
            src="https://images.unsplash.com/photo-1449156006004-972049d97a51?auto=format&fit=crop&q=80&w=1000" 
          />
        </motion.div>
        
        <motion.div 
           whileHover={{ y: -10 }}
           className="md:col-span-4 rounded-luxury bg-surface-container p-16 flex flex-col justify-center border border-primary/20 shadow-[0_40px_100px_rgba(0,0,0,0.3)]"
        >
          <MapPin className="text-primary w-20 h-20 mb-10" />
          <p className="text-3xl font-black tracking-tighter text-white leading-none uppercase">
             Contextual awareness that understands the frontier.
          </p>
        </motion.div>
      </div>

      {/* 2. Middle Grid (Car & Health Proxy) */}
      <div className="grid md:grid-cols-2 gap-12 h-[700px]">
        <motion.div 
          whileHover={{ y: -10 }}
          className="rounded-luxury bg-gradient-to-br from-secondary/10 to-surface-container p-20 flex flex-col justify-end group overflow-hidden relative border border-white/5 shadow-2xl"
        >
          <img 
            alt="Premium Interior" 
            className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-1000" 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000" 
          />
          <div className="relative z-10 space-y-8">
            <span className="text-secondary font-black tracking-[0.6em] uppercase text-[10px] block opacity-40">ON_THE_GRID</span>
            <h3 className="text-5xl font-black tracking-tighter text-white uppercase leading-none">"HALO, broadcast position to the oracle."</h3>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -10 }}
          className="rounded-luxury bg-surface-container p-20 flex flex-col justify-end group overflow-hidden relative border border-white/5 shadow-2xl"
        >
          <img 
            alt="Advanced HUD" 
            className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-1000" 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
          />
          <div className="relative z-10 space-y-8">
            <span className="text-primary font-black tracking-[0.6em] uppercase text-[10px] block opacity-40">ENCLAVE_SCAN</span>
            <h3 className="text-5xl font-black tracking-tighter text-white uppercase leading-none">"HALO, start a deep vault audit."</h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
