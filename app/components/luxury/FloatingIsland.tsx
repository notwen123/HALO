"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Shield, Cpu, Activity, Zap } from "lucide-react";
import Link from "next/link";
import { SafeConnect } from "../SafeConnect";
import { useState, useEffect } from "react";

/**
 * @title FloatingIsland
 * @dev A centered, pill-shaped navigation which floats at the top. 
 * Features extreme glassmorphism and adaptive layout for Bright Theme.
 */
export function FloatingIsland() {
  const { scrollY } = useScroll();
  
  // Adaptive Width & Transform based on scroll
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20 });
  
  const widthPercent = useTransform(smoothScrollY, [0, 200], [95, 60]);
  const y = useTransform(smoothScrollY, [0, 200], [32, 16]);
  const opacity = useTransform(smoothScrollY, [0, 200], [1, 0.98]);

  const width = useTransform(widthPercent, (v) => `${v}%`);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.div
      style={{ width, y, opacity }}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[90] glass-billion rounded-full px-12 h-24 flex items-center justify-between border border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-6 group">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all"
          >
            H
          </motion.div>
          <span className="text-3xl font-black tracking-tighter text-black uppercase hidden xl:block">HALO</span>
        </Link>
        
        <div className="w-[1px] h-8 bg-black/5 hidden md:block" />
        
        <nav className="hidden md:flex items-center gap-12 text-[11px] font-mono tracking-[0.6em] text-black/30 uppercase font-bold">
          <Link href="#vault" className="hover:text-primary transition-colors hover:tracking-[0.8em] duration-500">VAULT</Link>
          <Link href="#intel" className="hover:text-primary transition-colors hover:tracking-[0.8em] duration-500">INTEL</Link>
          <Link href="#secure" className="hover:text-primary transition-colors hover:tracking-[0.8em] duration-500">NODES</Link>
          <Link href="#network" className="hover:text-primary transition-colors hover:tracking-[0.8em] duration-500">NETWORK</Link>
          <Link href="#governance" className="hover:text-primary transition-colors hover:tracking-[0.8em] duration-500">GOVERNANCE</Link>
          <Link href="#security" className="hover:text-primary transition-colors hover:tracking-[0.8em] duration-500">SECURITY</Link>
        </nav>
      </div>

      <div className="flex items-center gap-8">
        <SafeConnect />
      </div>
    </motion.div>
  );
}
