"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

/**
 * @title SmoothScroll
 * @dev High-performance smooth scrolling wrapper using Lenis.
 * Optimized for "Billion Dollar" buttery-smooth feel.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{
        // 0.1 lerp provides a more responsive yet buttery feel than 0.05
        lerp: 0.1, 
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.5,
        infinite: false,
        // High precision for 120Hz+ displays
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      }}
    >
      {children}
    </ReactLenis>
  );
}
