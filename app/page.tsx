"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Lock, Activity, ArrowRight, Zap, Eye, Globe } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRef } from "react";

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative min-h-[300vh] bg-background selection:bg-primary selection:text-background">
      {/* HERO SECTION */}
      <section className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center px-6">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <Image 
            src="/home/bajrangi/.gemini/antigravity/brain/530c60d2-9d62-470f-aa07-57dd2ff1e731/halo_hero_cybersecurity_1774940070630.png"
            alt="HALO Hero"
            fill
            className="object-cover opacity-60 grayscale-[40%] brightness-[60%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </motion.div>

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-mono border border-primary/20 mb-6 inline-block tracking-widest animate-pulse">
              PROTOCOL v2.0 // FRONTIERS
            </span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-glow">
              OWN YOUR <span className="text-primary">SAFETY.</span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
              The world's first autonomous private guardian for digital assets. 
              Intelligent agents monitoring your wealth 24/7 on Flow.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <Link href="/dashboard" className="group px-10 py-5 bg-primary text-background font-bold text-lg rounded-2xl flex items-center gap-3 active:scale-95 transition-all glow hover:scale-105">
              Launch Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative z-20 container mx-auto px-6 py-32 space-y-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Shield, 
              title: "Autonomous Guardian", 
              desc: "AI-driven agents that detect threats and move assets to safety instantly.",
              color: "primary" 
            },
            { 
              icon: Zap, 
              title: "Flow Speed", 
              desc: "Built on Flow EVM for sub-second protection and zero-friction onboarding.",
              color: "accent" 
            },
            { 
              icon: Eye, 
              title: "Verifiable Identity", 
              desc: "ERC-8004 registered agent cards ensure full transparency and compliance.",
              color: "primary" 
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass p-10 hover:border-primary/40 transition-colors group"
            >
              <div className={`w-14 h-14 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 text-${feature.color}`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-zinc-500 leading-relaxed italic">"{feature.desc}"</p>
            </motion.div>
          ))}
        </div>

        {/* HOW IT WORKS VISUAL */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="glass p-12 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 blur-[100px]" />
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-5xl font-bold tracking-tight">The Guardian Lifecycle.</h2>
              <ul className="space-y-6 text-xl">
                <li className="flex items-center gap-4 text-zinc-400">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-primary/40 flex items-center justify-center text-sm font-bold text-primary">1</div>
                  Deposit funds into your secure Vault.
                </li>
                <li className="flex items-center gap-4 text-zinc-400">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-primary/40 flex items-center justify-center text-sm font-bold text-primary">2</div>
                  Toggle "Enabled" — Agent begins monitoring.
                </li>
                <li className="flex items-center gap-4 text-primary font-medium">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-background">3</div>
                  Threat detected. Assets moved to safety.
                </li>
              </ul>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-64 h-64 relative animate-pulse-slow">
                 <Shield className="w-full h-full text-primary opacity-20" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="w-20 h-20 text-primary glow" />
                 </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ECOSYSTEM SECTION */}
        <div className="py-20 text-center space-y-12">
          <h4 className="text-zinc-600 font-mono tracking-widest uppercase">Trusted By Leading Protocols</h4>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all">
             <span className="text-4xl font-bold tracking-tighter">FLOW</span>
             <span className="text-4xl font-bold tracking-tighter">WORLD ID</span>
             <span className="text-4xl font-bold tracking-tighter">STORACHA</span>
             <span className="text-4xl font-bold tracking-tighter">FILECOIN</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-white/5 py-12 px-6">
        <div className="container mx-auto flex flex-col md:row items-center justify-between gap-8">
           <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center font-bold text-background text-sm">H</div>
              <span className="font-bold tracking-tight">HALO PROTOCOL</span>
           </div>
           <p className="text-zinc-600 text-sm">Built for PL_Genesis 2026. All rights reserved.</p>
           <div className="flex gap-6 text-zinc-400">
              <Link href="#" className="hover:text-primary">Docs</Link>
              <Link href="#" className="hover:text-primary">Github</Link>
              <Link href="#" className="hover:text-primary">Security</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
