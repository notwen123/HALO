"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, ArrowRight, EyeOff } from "lucide-react";

/**
 * @title PrivacySection
 * @dev Replicating the 'Siri' privacy highlight with HALO's uncompromised autonomy.
 */
export function PrivacySection() {
  return (
    <section className="py-40 bg-surface-container-lowest border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-10 text-center relative z-10 space-y-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-primary/10 border border-primary/20 shadow-2xl group overflow-hidden"
        >
          <Lock className="text-primary w-12 h-12 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-primary/10 animate-pulse pointer-events-none" />
        </motion.div>
        
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-6xl md:text-9xl font-black italic tracking-tighter text-white"
        >
           DESIGNED FOR<br />
           <span className="text-gradient-siri">UNCOMPROMISED PRIVACY.</span>
        </motion.h2>
        
        <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="text-xl md:text-3xl text-on-surface-variant font-medium italic leading-relaxed max-w-3xl mx-auto pb-12"
        >
           With HALO Intelligence, every action is designed to protect your autonomy. 
           Most processing happens in your private enclave, and for larger requests, 
           Private Cloud Compute ensures your data is never stored or shared with external agents.
        </motion.p>
        
        <motion.button 
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           className="text-primary text-xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:underline mx-auto"
        >
          EXPLORING_LOCAL_ENCLAVE <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>
    </section>
  );
}
