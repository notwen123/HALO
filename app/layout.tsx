import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "./components/Web3Provider";
import { ConnectKitButton } from "connectkit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HALO — Autonomous Private Guardian",
  description: "Your Digital Assets. Guarded by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen relative`}>
        <div className="bg-grid fixed inset-0 z-0" />
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary opacity-[0.05] blur-[120px] rounded-full z-0" />
        <div className="fixed bottom-[0%] right-[-5%] w-[30%] h-[30%] bg-accent opacity-[0.05] blur-[100px] rounded-full z-0" />
        
        <Web3Provider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <header className="flex h-20 items-center justify-between px-8 glass mx-8 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary glow flex items-center justify-center">
                  <span className="text-background font-bold text-xl">H</span>
                </div>
                <h1 className="text-xl font-bold tracking-tighter text-glow">HALO <span className="text-primary opacity-50 font-normal">GUARDIAN</span></h1>
              </div>
              <div id="connect-wallet-container">
                <ConnectKitButton />
              </div>
            </header>
            <main className="flex-1 px-8 py-8">
              {children}
            </main>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
