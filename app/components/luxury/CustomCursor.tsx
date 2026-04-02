"use client";

import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * @title CustomCursor
 * @dev High-end, ZERO-LATENCY tracking cursor with velocity-based squash and stretch.
 * Optimized for 1:1 mouse mirroring as per user request.
 */
export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  // Direct mouse coordinates for 1:1 tracking (no lag)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Velocity values for squash-and-stretch (independent of position lag)
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);

  // Smooth out the squash and stretch scaling slightly so it's not jittery
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.1 };
  const scaleX = useSpring(useTransform(velocityX, [-3000, 3000], [0.7, 1.3]), smoothOptions);
  const scaleY = useSpring(useTransform(velocityY, [-3000, 3000], [1.3, 0.7]), smoothOptions);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const moveMouse = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastTime;
      
      // Calculate velocity for visual squash effect
      if (dt > 0) {
        velocityX.set((e.clientX - lastX) / dt * 100);
        velocityY.set((e.clientY - lastY) / dt * 100);
      }
      
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;

      // SET ABSOLUTE POSITION (No delay)
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Hover detection
      const target = e.target as HTMLElement;
      const isPointer = window.getComputedStyle(target).cursor === "pointer";
      setIsHovering(isPointer);
    };

    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, [mouseX, mouseY, velocityX, velocityY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2147483647] mix-blend-difference">
      {/* 1:1 PRIMARY CURSOR */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          scaleX,
          scaleY,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ 
          scale: { type: "spring", damping: 15, stiffness: 200 }
        }}
        className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center will-change-transform"
      >
        {/* Core Dot (Always perfectly at cursor tips) */}
        <motion.div 
          animate={{
            scale: isHovering ? 0.3 : 1,
            backgroundColor: "#fff",
          }}
          className="w-1.5 h-1.5 bg-white rounded-full"
        />
      </motion.div>
      
      {/* GLOW (Slightly lagging ghost element for premium depth) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
        className="absolute w-4 h-4 bg-white/20 blur-xl rounded-full opacity-50"
      />
    </div>
  );
}
