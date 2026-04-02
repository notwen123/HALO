"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Box, Activity, Cpu } from "lucide-react";
import Link from "next/link";
import { SafeConnect } from "../SafeConnect";

/**
 * @title StitchNavbar
 * @dev Replicating the 'Siri' top navigation with HALO vault connectivity.
 */
export function StitchNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-3xl border-b border-white/5 h-16 flex items-center">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-10 w-full">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-3xl font-black italic tracking-tighter text-white uppercase group flex items-center gap-2">
            HALO
            <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-150 transition-transform origin-center" />
          </Link>
          
          <div className="hidden md:flex gap-10 items-center text-[9px] font-mono tracking-[0.4em] text-zinc-500 uppercase font-bold">
            <Link href="#vault" className="hover:text-white transition-opacity duration-200">VAULT</Link>
            <Link href="#intel" className="hover:text-white transition-opacity duration-200">INTEL</Link>
            <Link href="#nodes" className="hover:text-white transition-opacity duration-200">NODES</Link>
            <Link href="#network" className="hover:text-white transition-opacity duration-200">NETWORK</Link>
            <Link href="#governance" className="hover:text-white transition-opacity duration-200">GOVERNANCE</Link>
            <Link href="#security" className="hover:text-white transition-opacity duration-200">SECURITY</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <SafeConnect />
        </div>
      </div>
    </nav>
  );
}
