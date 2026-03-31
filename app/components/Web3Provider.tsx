"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as React from "react";

const flowEvmTestnet = {
  id: 747,
  name: "Flow EVM Testnet",
  nativeCurrency: { name: "Flow", symbol: "FLOW", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.evm.nodes.onflow.org"] },
  },
  blockExplorers: {
    default: { name: "FlowScan", url: "https://747.evmscan.io" },
  },
  testnet: true,
};

const config = getDefaultConfig({
  appName: "HALO",
  projectId: "YOUR_PROJECT_ID", // Replace with real one if needed
  chains: [flowEvmTestnet, mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: "#d3bbff", // Stitch Primary
            accentColorForeground: "#131313",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
