"use client";

import { useEffect, useState } from "react";
import { Web3Provider } from "./Web3Provider";

/**
 * @title ClientProviders
 * @dev Intermediary to ensure that browser-only providers (Web3) 
 * only mount on the client, preventing SSR hydration errors.
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
       <div className="min-h-screen bg-[#131313] flex items-center justify-center font-mono text-[10px] tracking-[0.5em] text-zinc-800 uppercase animate-pulse">
         INITIALIZING_HALO_OS...
       </div>
    );
  }

  return <Web3Provider>{children}</Web3Provider>;
}
