"use client";

import { motion } from "framer-motion";
import { Zap, Lock, Shield, Cpu, Fingerprint } from "lucide-react";
import { TiltWrapper } from "../luxury/TiltWrapper";

/**
 * @title BentoGrid
 * @dev Replicating the 'Apple Intelligence' bento grid in Premium Mode.
 */
export function BentoGrid() {
  return (
    <section className="py-40 px-12 max-w-screen-2xl mx-auto space-y-16 pb-60 bg-surface">
      <div className="space-y-8 mb-20 text-center md:text-left">
        <h3 className="text-black/30 font-black tracking-[0.5em] text-sm uppercase">SYSTEM_CAPABILITIES</h3>
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-black uppercase leading-none">
          SECURED BY <br />
          <span className="text-siri">INTELLIGENCE.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-12 gap-12 min-h-[800px]">
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           whileHover={{ scale: 0.98 }}
           className="md:col-span-8 rounded-[5rem] bg-white flex flex-col justify-between relative overflow-hidden group border border-black/10 shadow-[0_40px_80px_rgba(0,0,0,0.03)]"
        >
          <TiltWrapper strength={10} className="w-full h-full p-20 flex flex-col justify-between">
            <div className="relative z-10 space-y-12">
              <div className="flex items-center gap-4 text-primary font-black tracking-[0.6em] uppercase text-[12px]">
                 <Cpu className="w-5 h-5" /> PROTOCOL_AWARENESS
              </div>
              <h3 className="text-6xl md:text-8xl font-black max-w-2xl text-black tracking-tighter leading-none uppercase">
                 "HALO, SECURE MY<br />YIELD POSITION."
              </h3>
              <p className="text-2xl font-extrabold max-w-lg leading-tight tracking-tight text-black/50 uppercase">
                 Autonomous agents monitoring markets instantly.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 w-2/3 h-2/3 mask-vignette opacity-20 transition-opacity duration-1000">
              <img 
                alt="Security Infrastructure" 
                className="w-full h-full object-cover rounded-tl-[16rem] group-hover:scale-110 transition-transform duration-[3000ms]" 
                src="https://images.unsplash.com/photo-1449156006004-972049d97a51?auto=format&fit=crop&q=80&w=1000" 
              />
            </div>
          </TiltWrapper>
        </motion.div>
        
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
           whileHover={{ scale: 1.02 }}
           className="md:col-span-4 rounded-[5rem] glass-billion flex flex-col justify-between border border-primary/20 shadow-2xl group overflow-hidden"
        >
           <TiltWrapper strength={15} className="w-full h-full p-16 flex flex-col justify-between">
              <div className="space-y-8">
                <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary border border-primary/20 group-hover:rotate-12 transition-transform duration-700 shadow-lg">
                   <Fingerprint className="w-12 h-12" />
                </div>
                <p className="text-4xl font-black tracking-tighter text-black leading-[1.1] uppercase">
                   BIOMETRIC DEAD-MAN'S SWITCH.
                </p>
              </div>
              <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: "0%" }}
                   whileInView={{ width: "100%" }}
                   transition={{ duration: 2, ease: "easeInOut" }}
                   className="h-full bg-primary" 
                 />
              </div>
           </TiltWrapper>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 min-h-[600px]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[5rem] bg-gradient-to-br from-white to-surface p-20 flex flex-col justify-end group overflow-hidden relative border border-black/10 shadow-2xl"
        >
          <div className="relative z-10 space-y-12">
            <div className="flex items-center gap-4 text-accent font-black tracking-[0.6em] uppercase text-[12px] opacity-60">
               <Zap className="w-5 h-5" /> THREAT_MATRIX_SCAN
            </div>
            <h3 className="text-5xl font-black tracking-tighter text-black uppercase leading-[0.9]">"HALO, START A DEEP<br />VAULT AUDIT."</h3>
            <div className="flex items-center gap-4 text-[12px] text-accent font-black tracking-[0.4em]">
               SCANNING_BLOCK_ACTIVE // 59,102...
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[5rem] glass-card p-20 flex flex-col justify-end group overflow-hidden relative border border-black/10 shadow-2xl"
        >
          <div className="relative z-10 space-y-12">
            <div className="flex items-center gap-4 text-primary font-black tracking-[0.6em] uppercase text-[12px] opacity-60">
               <Shield className="w-5 h-5" /> IMMUTABLE_MEMORY
            </div>
            <h3 className="text-5xl font-black tracking-tighter text-black uppercase leading-[0.9]">"HALO, LOG THIS<br />PERMANENTLY."</h3>
            <p className="text-black/50 text-xl font-black uppercase tracking-tight">Security records secured by Flow.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
