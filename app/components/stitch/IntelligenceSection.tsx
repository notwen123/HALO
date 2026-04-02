"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu } from "lucide-react";
import { TiltWrapper } from "../luxury/TiltWrapper";

/**
 * @title IntelligenceSection
 * @dev Split layout for HALO Intelligence in Premium Mode.
 */
export function IntelligenceSection() {
  return (
    <section id="intel" className="py-60 px-12 max-w-screen-2xl mx-auto overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2 gap-40 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="space-y-16"
        >
          <div className="space-y-8">
            <h2 className="text-7xl md:text-[10rem] font-extrabold tracking-tighter mb-4 text-black leading-[0.8] uppercase">
              AGENT <br />
              <span className="text-siri">INTEL.</span>
            </h2>
            <div className="h-2 w-48 bg-gradient-to-r from-[#FF00A0] to-transparent rounded-full" />
          </div>
          
          <div className="space-y-12">
            <p className="text-3xl md:text-4xl text-black/60 leading-tight max-w-xl font-extrabold tracking-tight uppercase">
               "HALO is more capable than ever. Security that’s tailored to your unique context."
            </p>
            
            <div className="flex flex-col gap-10">
              {[
                { icon: ShieldCheck, title: "VERIFIABLE_PROOF", desc: "Every action is logged in Filecoin's immutable layer." },
                { icon: Cpu, title: "AGENT_IDENTITY", desc: "Autonomous entities with unique on-chain identifiers." },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-8 group">
                  <div className="w-14 h-14 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center group-hover:bg-primary/10 transition-all duration-500">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-black tracking-[0.4em] text-black/30 uppercase mb-2">{feature.title}</h4>
                    <p className="text-black/90 font-bold tracking-tight text-2xl uppercase">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="relative aspect-square rounded-[5rem] overflow-hidden bg-surface group border border-black/10 shadow-2xl"
        >
          <img 
            alt="Intelligence Context" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000" 
          />
          
          <div className="absolute inset-0 flex flex-col justify-end p-16 z-20">
             <div className="glass-billion p-16 rounded-[4rem] border border-black/10 space-y-8 backdrop-blur-3xl">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4 text-[12px] tracking-[0.4em] text-primary font-black uppercase">
                      <div className="w-2 h-2 bg-primary rounded-full animate-ping" /> AGENT_ACTIVE
                   </div>
                   <div className="text-[12px] font-bold text-black/20 uppercase tracking-[0.3em]">ENCLAVE_SYNC</div>
                </div>
                <div className="text-5xl md:text-6xl font-black tracking-tighter text-black uppercase leading-none">
                   "HALO DETECTED<br />A SECURITY THREAT."
                </div>
                <div className="pt-4">
                   <div className="inline-block px-8 py-3 rounded-full border border-primary/40 text-primary text-[10px] font-black tracking-[0.5em] uppercase">NEUTRALIZING_THREAT</div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
