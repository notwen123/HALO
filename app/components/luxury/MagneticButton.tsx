"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

/**
 * @title MagneticButton
 * @dev A billion-dollar tactile button for Bright Luxury.
 */
export function MagneticButton({ children, onClick, className = "", strength = 40 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Billion Dollar Spring - Apple Elastic Feel
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-strength, strength], [10, -10]);
  const rotateY = useTransform(springX, [-strength, strength], [-10, 10]);

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
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative group p-6">
      <motion.button
        style={{ x: springX, y: springY, rotateX, rotateY, perspective: 1000 }}
        onClick={onClick}
        whileTap={{ scale: 0.96 }}
        className={`
          relative z-10 bg-black px-14 py-7 rounded-full font-black text-2xl 
          tracking-tighter uppercase transition-shadow duration-500
          hover:shadow-[0_20px_80px_rgba(0,0,0,0.15)]
          border border-black/10
          ${className}
        `}
      >
        <span className="relative z-10 text-white flex items-center justify-center gap-4 transition-transform duration-300 group-hover:scale-105">
           {children}
        </span>
        
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full z-0 pointer-events-none" />
      </motion.button>
      
      {/* Magnetic Aura - Bright Mode */}
      <motion.div 
        style={{ x: springX, y: springY, opacity: 0 }}
        className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
      />
    </div>
  );
}
