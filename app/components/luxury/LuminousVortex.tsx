"use client";

import { motion } from "framer-motion";

/**
 * @title LuminousVortex
 * @dev A premium, multi-layered SVG cyclone for high-performance background ambiance.
 * Optimized for 'Bright Theme' with ultra-low opacity gradients and smooth infinite rotation.
 */
export function LuminousVortex({ className }: { className?: string }) {
  return (
    <div className={`relative w-[600px] h-[600px] pointer-events-none select-none ${className}`}>
      {/* 1. OUTER REFRACTION LAYER */}
      <div className="absolute inset-0 rounded-full blur-[100px] bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent animate-pulse" />
      
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full opacity-100 drop-shadow-[0_0_50px_rgba(112,0,255,0.3)]"
      >
         <defs>
            <linearGradient id="vortex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#7000FF" stopOpacity="1" />
               <stop offset="100%" stopColor="#00A0FF" stopOpacity="0.6" />
            </linearGradient>
         </defs>

         {/* LAYER 1: FAST INNER STREAKS */}
         <motion.circle
            cx="50" cy="50" r="10"
            fill="none"
            stroke="url(#vortex-grad)"
            strokeWidth="1.5"
            strokeDasharray="5 15"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ 
               rotate: { duration: 4, repeat: Infinity, ease: "linear" },
               scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ originX: "50px", originY: "50px" }}
         />

         {/* LAYER 2: MID STREAKS */}
         <motion.circle
            cx="50" cy="50" r="25"
            fill="none"
            stroke="url(#vortex-grad)"
            strokeWidth="1"
            strokeDasharray="20 40"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50px", originY: "50px" }}
         />

         {/* LAYER 3: LARGE STREAKS */}
         <motion.circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="url(#vortex-grad)"
            strokeWidth="0.8"
            strokeDasharray="60 120"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50px", originY: "50px" }}
         />

         {/* LAYER 4: OUTER GOSSAMER RINGS */}
         <motion.circle
            cx="50" cy="50" r="48"
            fill="none"
            stroke="url(#vortex-grad)"
            strokeWidth="0.1"
            strokeDasharray="1 5"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50px", originY: "50px" }}
         />
      </svg>
      
      {/* 2. CORE GLOW */}
      <div className="absolute inset-[40%] rounded-full bg-white/20 blur-[40px]" />
    </div>
  );
}
