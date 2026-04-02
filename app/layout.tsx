import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "./components/ClientProviders";
import { SmoothScroll } from "./components/SmoothScroll";
import { CustomCursor } from "./components/luxury/CustomCursor";

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
        
        <ClientProviders>
          <CustomCursor />
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
