"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, ArrowRight, EyeOff } from "lucide-react";
import { MagneticButton } from "../luxury/MagneticButton";

/**
 * @title PrivacySection
 * @dev Replicating the 'Siri' privacy highlight with HALO's uncompromised autonomy.
 */
export function PrivacySection() {
  return (
    <section className="py-60 bg-black border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-primary/5 blur-[160px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-10 text-center relative z-10 space-y-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-32 h-32 rounded-luxury glass-billion shadow-2xl group overflow-hidden mx-auto"
        >
          <Lock className="text-primary w-14 h-14 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-primary/10 animate-pulse pointer-events-none" />
        </motion.div>
        
        <motion.h2 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="text-7xl md:text-[10rem] font-black tracking-tighter text-white uppercase leading-[0.8] mb-12"
        >
           DESIGNED FOR<br />
           <span className="text-primary glow-text">PRIVACY.</span>
        </motion.h2>
        
        <motion.p 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="text-2xl md:text-4xl text-white/40 font-medium uppercase tracking-tight leading-none max-w-4xl mx-auto pb-20"
        >
           With HALO Intelligence, every action is designed to protect your autonomy. 
           Processing happens in your private enclave, and Private Cloud Compute ensures your data is never stored.
        </motion.p>
        
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
        >
           <MagneticButton strength={40}>
              EXPLORE_ENCLAVE <ArrowRight className="w-8 h-8 ml-4" />
           </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
