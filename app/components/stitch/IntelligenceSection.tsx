"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Zap, Lock } from "lucide-react";

/**
 * @title IntelligenceSection
 * @dev Split layout for HALO Intelligence and the new 'Siri-edge' UI mock.
 */
export function IntelligenceSection() {
  return (
    <section id="intel" className="py-32 px-10 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white">
            HALO Intelligence.<br />
            <span className="text-gradient-siri">All-new powers.</span>
          </h2>
          <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed mb-8 max-w-lg font-medium italic">
            HALO is more capable than ever, with a whole new design and richer threat understanding. 
            It takes action across your vaults and gives you security that’s tailored to your unique context.
          </p>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="relative aspect-square rounded-[3rem] overflow-hidden bg-surface-container-low group border border-white/5"
        >
          {/* Luminous Edge UI Mockup Overlay */}
          <div className="absolute inset-0 ring-[20px] ring-inset ring-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10" />
          
          <img 
            alt="HALO Pulse Edge UI" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000" 
          />
          
          {/* Glass Overlay with Stats */}
          <div className="absolute bottom-10 left-10 right-10 glass-card p-10 rounded-[2rem] z-20">
             <div className="flex items-center gap-4 mb-2 font-mono text-[10px] tracking-widest text-primary font-black uppercase">
                <Cpu className="w-4 h-4" /> GUARDIAN_ENGINE_ACTIVE
             </div>
             <div className="text-3xl font-black italic tracking-tighter text-white">
                "HEH-LO, YOUR ASSETS ARE SECURE."
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
