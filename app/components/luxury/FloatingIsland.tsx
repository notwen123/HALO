"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Cpu, Activity, Zap } from "lucide-react";
import Link from "next/link";
import { SafeConnect } from "../SafeConnect";
import { useState, useEffect } from "react";

/**
 * @title FloatingIsland
 * @dev A centered, pill-shaped navigation which floats at the top. 
 * Features extreme glassmorphism and adaptive layout.
 */
export function FloatingIsland() {
  const { scrollY } = useScroll();
  const width = useTransform(scrollY, [0, 100], ["95%", "60%"]);
  const y = useTransform(scrollY, [0, 100], [20, 10]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0.95]);

  return (
    <motion.div
      style={{ width, y, opacity }}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50 glass-billion rounded-luxury px-12 h-20 flex items-center justify-between"
    >
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-black text-xl shadow-2xl group-hover:rotate-12 transition-transform">H</div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase hidden md:block">HALO</span>
        </Link>
        <div className="w-[1px] h-6 bg-white/10 hidden md:block" />
        <nav className="hidden md:flex items-center gap-10 text-[10px] font-mono tracking-[0.5em] text-white/30 uppercase font-black">
          <Link href="#" className="hover:text-primary transition-colors">VAULT</Link>
          <Link href="#" className="hover:text-primary transition-colors">NODES</Link>
          <Link href="#" className="hover:text-primary transition-colors">SECURE</Link>
        </nav>
      </div>

      <div className="flex items-center gap-8">
        <div className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-luxury hidden lg:flex items-center gap-3">
           <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(211,187,255,1)]" />
           <span className="text-[9px] font-mono tracking-[0.4em] text-primary uppercase font-black">ENCLAVE_ACTIVE</span>
        </div>
        <SafeConnect />
      </div>
    </motion.div>
  );
}
