"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

/**
 * @title MagneticButton
 * @dev A billion-dollar tactile button that subtly follows the cursor.
 */
export function MagneticButton({ children, onClick, className = "", strength = 40 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) / (width / 2);
    const deltaY = (clientY - centerY) / (height / 2);

    x.set(deltaX * strength);
    y.set(deltaY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative group p-4">
      <motion.button
        style={{ x: springX, y: springY }}
        onClick={onClick}
        className={`
          relative z-10 glass-billion px-12 py-6 rounded-luxury font-black text-2xl 
          tracking-tighter uppercase transition-all duration-300
          hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95
          ${className}
        `}
      >
        <span className="relative z-10 text-white flex items-center justify-center gap-4">
           {children}
        </span>
        <div className="absolute inset-0 bg-primary/20 blur opacity-0 group-hover:opacity-40 transition-opacity rounded-luxury z-0" />
      </motion.button>
    </div>
  );
}
