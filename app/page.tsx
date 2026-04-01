"use client";

import { FloatingIsland } from "./components/luxury/FloatingIsland";
import { MagneticButton } from "./components/luxury/MagneticButton";
import { ParallaxWrapper } from "./components/luxury/ParallaxWrapper";
import { StitchHero } from "./components/stitch/StitchHero";
import { IntelligenceSection } from "./components/stitch/IntelligenceSection";
import { BentoGrid } from "./components/stitch/BentoGrid";
import { PrivacySection } from "./components/stitch/PrivacySection";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Zap, Lock, Activity, ArrowRight, Play, Cpu, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

/**
 * @title HALO_BILLION_DOLLAR_LANDING
 * @dev Replicating the absolute pinnacle of luxury UI inspired by Stitch/Apple.
 */
export default function BillionDollarLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Billion Dollar Transform (Moved to top level to follow Rule of Hooks)
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] text-white selection:bg-primary/30 selection:text-white">
      {/* 0. FLOATING ISLAND NAVIGATION */}
      <FloatingIsland />
      
      {/* 1. IMMERSIVE PARALLAX HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
         {/* Siri Gradient Spheres */}
         <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] siri-sphere blur-[120px] rounded-full opacity-30 animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] siri-sphere blur-[100px] rounded-full opacity-20 animate-pulse-slow" />
         
         <div className="absolute inset-x-0 bottom-0 siri-glow h-[400px] opacity-40 pointer-events-none" />
         
         <div className="relative z-10 text-center px-6 flex flex-col items-center gap-20">
            <ParallaxWrapper offset={120}>
               <motion.h1 
                 initial={{ opacity: 0, y: 50, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 className="text-[10rem] md:text-[16rem] font-black tracking-tighter leading-none uppercase text-white"
               >
                 HALO
               </motion.h1>
            </ParallaxWrapper>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="space-y-6"
            >
              <p className="text-2xl md:text-3xl font-medium text-white/40 max-w-3xl mx-auto leading-relaxed">
                 Autonomous AI security for your digital assets. <br className="hidden md:block" /> 
                 Luxury, uncompromised.
              </p>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="flex flex-col sm:flex-row items-center justify-center gap-12 pt-10"
            >
               <MagneticButton strength={40}>
                  INITIALIZE VAULT <ArrowRight className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform" />
               </MagneticButton>
               <button className="text-white/30 text-xl font-black uppercase tracking-[0.5em] hover:text-white transition-colors flex items-center gap-6 group">
                  <Play className="w-8 h-8 fill-current group-hover:rotate-12 transition-transform" /> WATCH_THE_FILM
               </button>
            </motion.div>
         </div>
         
         {/* Adaptive Scroll Indicator */}
         <motion.div 
           style={{ opacity: scrollIndicatorOpacity }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
         >
            <div className="text-[9px] font-mono tracking-[0.8em] text-white/20 uppercase font-black">SCROLL_FOR_INTEL</div>
            <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent" />
         </motion.div>
      </section>

      {/* 2. THE INTELLIGENCE SECTION (Parallax Textures) */}
      <div className="relative z-20">
         <IntelligenceSection />
      </div>

      {/* 3. BENTO GRID (Billion Dollar Tier) */}
      <div className="relative z-20 bg-surface py-20 px-10">
         <BentoGrid />
      </div>

      {/* 4. THE VAULT (Final CTA) */}
      <section className="relative z-20 h-screen flex flex-col items-center justify-center text-center px-10 border-t border-white/5 bg-black">
         <div className="absolute inset-0 siri-glow opacity-10 pointer-events-none" />
         
         <div className="max-w-5xl mx-auto space-y-24">
            <ParallaxWrapper offset={-80}>
               <h2 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.75] uppercase text-white">
                  JOIN THE<br />
                  <span className="text-primary glow-text">EVOLUTION.</span>
               </h2>
               <p className="text-zinc-700 text-xl md:text-3xl font-medium max-w-4xl mx-auto leading-tight pt-10">
                  "Protocol activation is by invite only. Initialize your proof of autonomy to begin the onboarding sequence."
               </p>
            </ParallaxWrapper>

            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="flex flex-col items-center gap-10"
            >
               <MagneticButton strength={60} className="scale-125">
                  INITIALIZE_GUARD <ArrowUpRight className="w-8 h-8 ml-4" />
               </MagneticButton>
               <div className="text-[10px] font-mono tracking-[0.6em] text-zinc-800 uppercase font-bold animate-pulse">
                  PRIVATE_ENCLAVE_ACTIVE // SECURED_BY_FLOW_EVM
               </div>
            </motion.div>
         </div>
      </section>

      {/* 5. FOOTER (Billion Dollar Luxury) */}
      <footer className="relative z-20 py-40 px-12 border-t border-white/5 bg-[#0a0a0a]">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="col-span-1 md:col-span-2 space-y-12">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-black font-black text-2xl">H</div>
                  <h1 className="text-5xl font-black tracking-tighter uppercase text-white shadow-lg">HALO</h1>
               </div>
               <p className="text-white/20 text-lg max-w-md font-medium leading-relaxed">
                  The billion-dollar autonomous security protocol built for the decentralised era. 
                  Guarding your future with intelligence that never sleeps.
               </p>
            </div>

            <div className="grid grid-cols-2 gap-20 col-span-1 md:col-span-2">
               <div className="space-y-8">
                  <h4 className="text-white/40 font-mono tracking-[0.5em] text-[10px] uppercase font-bold">PROTOCOL</h4>
                  <ul className="space-y-4 text-white font-black text-xl uppercase tracking-tighter">
                     <li className="hover:text-primary transition-colors cursor-pointer">Vault</li>
                     <li className="hover:text-primary transition-colors cursor-pointer">Intel</li>
                     <li className="hover:text-primary transition-colors cursor-pointer">Nodes</li>
                     <li className="hover:text-primary transition-colors cursor-pointer">Yield</li>
                  </ul>
               </div>
               <div className="space-y-8">
                  <h4 className="text-white/40 font-mono tracking-[0.5em] text-[10px] uppercase font-bold">INFO</h4>
                  <ul className="space-y-4 text-white font-black text-xl uppercase tracking-tighter">
                     <li className="hover:text-primary transition-colors cursor-pointer">Github</li>
                     <li className="hover:text-primary transition-colors cursor-pointer">Whitepaper</li>
                     <li className="hover:text-primary transition-colors cursor-pointer">Flow EVM</li>
                     <li className="hover:text-primary transition-colors cursor-pointer">Audit</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="text-center mt-40 text-[9px] font-mono text-zinc-900 tracking-[1em] uppercase font-black">
            © 2026_HALO_OS // BILLION_DOLLAR_UI_ACTIVE
         </div>
      </footer>
    </div>
  );
}
