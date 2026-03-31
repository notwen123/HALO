"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { defineChain } from "viem";

export const flowEVMTestnet = defineChain({
  id: 545,
  name: 'Flow EVM Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Flow',
    symbol: 'FLOW',
  },
  rpcUrls: {
    default: { http: ['https://testnet.evm.nodes.onflow.org'] },
  },
  blockExplorers: {
    default: { name: 'Flowscan', url: 'https://evm-testnet.flowscan.io' },
  },
  testnet: true,
});

const config = createConfig(
  getDefaultConfig({
    chains: [flowEVMTestnet],
    transports: {
      [flowEVMTestnet.id]: http(),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    appName: "HALO Autonomous Private Guardian",
    appDescription: "Your Digital Assets. Guarded by AI.",
    appUrl: "https://halo-guardian.dev",
    appIcon: "https://halo-guardian.dev/logo.png",
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="dark">
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
