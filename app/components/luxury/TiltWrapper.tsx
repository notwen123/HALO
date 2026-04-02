"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * @title TiltWrapper
 * @dev High-end 3D tilt effect reacting to mouse position.
 */
export function TiltWrapper({ children, className = "", strength = 20 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for high-end feel
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), { damping: 30, stiffness: 300 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), { damping: 30, stiffness: 300 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
