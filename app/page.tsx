"use client";

import { StitchNavbar } from "./components/stitch/StitchNavbar";
import { StitchHero } from "./components/stitch/StitchHero";
import { IntelligenceSection } from "./components/stitch/IntelligenceSection";
import { BentoGrid } from "./components/stitch/BentoGrid";
import { PrivacySection } from "./components/stitch/PrivacySection";
import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * @title HALO_STITCH_LANDING
 * @dev Replicating the 'Siri' premium quality UI for the HALO Protocol.
 */
export default function StitchLandingPage() {
  return (
    <div className="bg-background text-foreground font-sans selection:bg-primary/30 min-h-screen">
      <StitchNavbar />
      
      <main className="pt-16">
        {/* HERO SECTION */}
        <StitchHero />

        {/* INTELLIGENCE SECTION */}
        <IntelligenceSection />

        {/* BENTO GRID OF USE CASES */}
        <BentoGrid />

        {/* PRIVACY HIGHLIGHT */}
        <PrivacySection />

        {/* CAPABILITIES / APPS GRID (Branded for Protocols) */}
        <section className="py-40 px-10 max-w-7xl mx-auto text-center space-y-24">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-6xl font-black italic tracking-tighter text-white"
           >
              HALO works across the ecosystem.
           </motion.h2>
           
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[
                { name: "Flow EVM", icon: "F" },
                { name: "Uniswap", icon: "U" },
                { name: "Aave", icon: "A" },
                { name: "Compound", icon: "C" },
                { name: "Curve", icon: "V" },
                { name: "MakerDAO", icon: "M" },
              ].map((app, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center gap-6 group cursor-pointer"
                >
                  <div className="w-24 h-24 rounded-[2rem] bg-surface-container-high flex items-center justify-center group-hover:bg-primary/20 transition-all border border-white/5 shadow-xl">
                     <span className="text-3xl font-black italic text-zinc-500 group-hover:text-primary transition-colors">{app.icon}</span>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase font-black">{app.name}</span>
                </motion.div>
              ))}
           </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-60 text-center px-10 relative overflow-hidden">
           <div className="absolute inset-x-0 bottom-0 siri-glow h-[400px] opacity-20 pointer-events-none" />
           
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="space-y-16 relative z-10"
           >
              <h2 className="text-[10rem] md:text-[18rem] font-black tracking-tighter mb-12 text-white italic leading-none opacity-10">
                 HALO.
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                 <Link href="/dashboard">
                   <button className="bg-white text-black px-12 py-6 rounded-full font-black text-2xl hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                      Initialize Vault
                   </button>
                 </Link>
                 <button className="bg-surface-container-high text-white px-12 py-6 rounded-full font-black text-2xl hover:bg-surface-bright transition-all active:scale-95 border border-white/5">
                    Watch the film
                 </button>
              </div>
           </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-surface-container-low w-full pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid md:grid-cols-4 gap-20 mb-20">
            <FooterCol 
              title="VAULT" 
              links={["Mac Protected", "iPad Enclave", "iPhone Core", "Watch Sentinel"]} 
            />
            <FooterCol 
              title="PROTOCOLS" 
              links={["HALO Yield", "Defensive DEX", "Guardian LP", "Flow EVM Core"]} 
            />
            <FooterCol 
              title="AUTONOMY" 
              links={["Local Enclave", "Proof of Human", "World ID Hub", "Private Compute"]} 
            />
            <FooterCol 
              title="PROTOCOL" 
              links={["Manifesto", "Open Architecture", "Investors", "Global Defense"]} 
            />
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
             <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest text-zinc-700 uppercase font-bold">
               <span>COPYRIGHT © 2026 HALO INC.</span>
               <div className="w-1 h-1 bg-zinc-900 rounded-full" />
               <span>ALL SYSTEMS OPERATIONAL</span>
             </div>
             
             <div className="flex flex-wrap justify-center gap-10 text-[10px] font-mono tracking-widest text-white/40 uppercase font-black">
                <a href="#" className="hover:text-primary transition-colors">PRIVACY</a>
                <a href="#" className="hover:text-primary transition-colors">TERMS</a>
                <a href="#" className="hover:text-primary transition-colors">HARDWARE</a>
                <a href="#" className="hover:text-primary transition-colors">LEGAL</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="space-y-8">
       <h4 className="text-white font-black italic tracking-widest text-xs opacity-40 uppercase tracking-[0.4em]">{title}</h4>
       <ul className="space-y-4">
          {links.map((link, i) => (
            <li key={i}>
              <a href="#" className="text-sm font-black italic uppercase tracking-wider text-zinc-500 hover:text-primary transition-colors">
                 {link}
              </a>
            </li>
          ))}
       </ul>
    </div>
  );
}
