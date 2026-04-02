"use client";

import { motion } from "framer-motion";
import { Lock, ArrowRight, ShieldCheck, EyeOff, Fingerprint } from "lucide-react";
import { MagneticButton } from "../luxury/MagneticButton";

/**
 * @title PrivacySection
 * @dev Replicating the 'Siri' privacy highlight with HALO's uncompromised autonomy in Premium Mode.
 */
export function PrivacySection() {
  return (
    <section className="py-60 bg-white border-t border-black/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full siri-glow opacity-80 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] siri-sphere blur-[160px] rounded-full opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-12 text-center relative z-10 space-y-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center w-48 h-48 rounded-[4rem] glass-billion shadow-2xl mx-auto border border-black/10"
        >
          <Lock className="text-primary w-24 h-24 group-hover:scale-110 transition-transform duration-700" />
        </motion.div>
        
        <div className="space-y-12">
          <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
             className="text-8xl md:text-[14rem] font-sans font-black tracking-tighter text-black uppercase leading-[0.75]"
          >
             PRIVATE BY<br />
             <span className="text-siri">DEFAULT.</span>
          </motion.h2>
          
          <motion.p 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
             className="text-3xl md:text-4xl text-black/40 font-black uppercase tracking-tight leading-tight max-w-5xl mx-auto pb-8"
          >
             "Every action HALO takes happens inside your private enclave on Flow. 
             Security that's invisible, autonomous, and absolute."
          </motion.p>
        </div>
        
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.6 }}
           className="flex flex-col items-center gap-12"
        >
           <MagneticButton strength={40}>
              <span className="flex items-center gap-6">
                EXPLORE_ENCLAVE <ArrowRight className="w-10 h-10 group-hover:translate-x-2 transition-transform" />
              </span>
           </MagneticButton>
           
           <div className="flex flex-wrap items-center justify-center gap-20 opacity-30">
              {[
                { icon: ShieldCheck, label: "FLOW_EVM" },
                { icon: EyeOff, label: "ZERO_KNOWLEDGE" },
                { icon: Fingerprint, label: "BIOMETRIC" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-4 grayscale contrast-200">
                  <badge.icon className="w-8 h-8" />
                  <span className="text-[12px] font-black tracking-[0.4em] uppercase">{badge.label}</span>
                </div>
              ))}
           </div>
        </motion.div>
      </div>
    </section>
  );
}
