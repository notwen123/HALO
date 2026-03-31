"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

/**
 * @title SmoothScroll
 * @dev High-performance smooth scrolling wrapper using Lenis.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.05,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
