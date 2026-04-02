"use client";

import * as React from "react";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, lightTheme, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig, http, injected } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const flowEvmTestnet = {
  id: 545,
  name: "Flow EVM Testnet",
  nativeCurrency: { name: "Flow", symbol: "FLOW", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.evm.nodes.onflow.org"] },
  },
  blockExplorers: {
    default: { name: "FlowScan", url: "https://evm-testnet.flowscan.io" },
  },
  testnet: true,
} as const;

/**
 * @dev Use wagmi's injected() connector directly.
 * This calls window.ethereum.request immediately — no WalletConnect relay,
 * no deep-link, MetaMask popup fires instantly.
 */
const metaMaskWalletDef = () => ({
  id: "metamask",
  name: "MetaMask",
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  iconBackground: "#fff",
  downloadUrls: { browserExtension: "https://metamask.io/download/" },
  createConnector: () => injected({ target: "metaMask" }),
});

const injectedWalletDef = () => ({
  id: "injected",
  name: "Browser Wallet",
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  iconBackground: "#fff",
  downloadUrls: {},
  createConnector: () => injected(),
});

const connectors = connectorsForWallets(
  [{ groupName: "Browser Wallet", wallets: [metaMaskWalletDef, injectedWalletDef] }],
  {
    appName: "HALO",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "placeholder",
  }
);

const config = createConfig({
  connectors,
  chains: [flowEvmTestnet, mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
  transports: {
    [flowEvmTestnet.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#5c3cf3",
            accentColorForeground: "#ffffff",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
          modalSize="compact"
        >
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
