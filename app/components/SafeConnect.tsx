"use client";

import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

/**
 * @title SafeConnect
 * @dev A wrapper for ConnectButton that only renders on the client to avoid 
 * SSR-related crashes with wagmi hooks.
 */
export function SafeConnect() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-zinc-600 animate-pulse uppercase tracking-widest">
        CONNECTING...
      </div>
    );
  }

  return <ConnectButton />;
}
