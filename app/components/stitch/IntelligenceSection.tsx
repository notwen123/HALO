"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Zap, Lock } from "lucide-react";

/**
 * @title IntelligenceSection
 * @dev Split layout for HALO Intelligence and the new 'Siri-edge' UI mock.
 */
export function IntelligenceSection() {
  return (
    <section id="intel" className="py-60 px-10 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-32 items-center">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 text-white leading-none">
            HALO INTELLIGENCE.<br />
            <span className="text-primary glow-text">ALL-NEW POWERS.</span>
          </h2>
          <p className="text-2xl md:text-3xl text-white/40 leading-relaxed mb-10 max-w-xl font-medium uppercase tracking-tight">
            HALO is more capable than ever, with a whole new design and richer threat understanding. 
            It takes action across your vaults and gives you security that’s tailored to your unique context.
          </p>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="relative aspect-square rounded-luxury overflow-hidden bg-surface-container group border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        >
          {/* Luminous Edge UI Mockup Overlay */}
          <div className="absolute inset-0 ring-[40px] ring-inset ring-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10" />
          
          <img 
            alt="HALO Pulse Edge UI" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000" 
          />
          
          {/* Glass Overlay with Stats */}
          <div className="absolute bottom-12 left-12 right-12 glass-billion p-12 rounded-luxury z-20">
             <div className="flex items-center gap-4 mb-4 font-mono text-[10px] tracking-[0.5em] text-primary font-black uppercase">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> GUARDIAN_ENGINE_CONNECTED
             </div>
             <div className="text-4xl font-black tracking-tighter text-white uppercase leading-none">
                "HEH-LO, YOUR ASSETS ARE SECURE."
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
