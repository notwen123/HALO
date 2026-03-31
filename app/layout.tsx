import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "./components/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HALO | Global Autonomous Guardian",
  description: "Secure your Flow EVM assets with the power of Autonomous Intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen relative overflow-x-hidden`}>
        <div className="bg-grid fixed inset-0 z-0" />
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary opacity-[0.05] blur-[120px] rounded-full z-0" />
        <div className="fixed bottom-[0%] right-[-5%] w-[30%] h-[30%] bg-accent opacity-[0.05] blur-[100px] rounded-full z-0" />
        
        <ClientProviders>
          <div className="relative z-10 flex flex-col min-h-screen">
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
