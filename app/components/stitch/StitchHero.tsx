"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

/**
 * @title StitchHero
 * @dev Replicating the 'Siri' hero aesthetic with HALO guard intelligence.
 */
export function StitchHero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* 1. Siri Glow Background */}
      <div className="absolute inset-0 siri-glow pointer-events-none opacity-50" />
      
      {/* 2. Main Content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[8rem] md:text-[14rem] font-extrabold tracking-tighter leading-none mb-4 text-white select-none"
        >
          HALO
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl font-medium text-on-surface-variant max-w-2xl mx-auto mb-16 italic"
        >
          The intelligence that guards you. <br className="hidden md:block" /> 
          In all the ways you need.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-zinc-200 transition-all active:scale-95 flex items-center gap-3">
            <Play className="w-5 h-5 fill-current" />
            Watch the protocol
          </button>
          <a className="text-primary text-xl font-bold flex items-center gap-2 hover:underline group cursor-pointer" href="#intel">
            Learn more about HALO Intelligence 
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* 3. Bottom Gradient & Animated Wave Area */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent z-20" />
      <div className="absolute bottom-20 flex justify-center w-full">
        <div className="w-full max-w-4xl h-48 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-tertiary to-secondary blur-[120px] opacity-10 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
