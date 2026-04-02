"use client";

import { FloatingIsland } from "./components/luxury/FloatingIsland";
import { MagneticButton } from "./components/luxury/MagneticButton";
import { ParallaxWrapper } from "./components/luxury/ParallaxWrapper";
import { TiltWrapper } from "./components/luxury/TiltWrapper";
import { IntelligenceSection } from "./components/stitch/IntelligenceSection";
import { BentoGrid } from "./components/stitch/BentoGrid";
import { PrivacySection } from "./components/stitch/PrivacySection";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";

/**
 * @title HALO_ULTRA_PREMIUM_LANDING
 * @dev The pinnacle of high-end UI: Buttery smooth transitions and Siri-inspired typography.
 */
export default function BillionDollarLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Redirect to dashboard once wallet connects
  useEffect(() => {
    if (isConnected) router.push("/dapp/vault");
  }, [isConnected, router]);

  const handleInitialize = () => {
    if (isConnected) {
      router.push("/dapp/vault");
    } else {
      openConnectModal?.();
    }
  };

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative bg-background text-foreground selection:bg-primary/10 selection:text-primary font-sans">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF00A0] via-[#7000FF] to-[#00A0FF] z-[100] origin-left" style={{ scaleX }} />

      <FloatingIsland />
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
         
         <div className="relative z-10 text-center px-12 flex flex-col items-center justify-center gap-12 w-full max-w-7xl">
            <ParallaxWrapper offset={160}>
               <TiltWrapper strength={40}>
                  <motion.h1 
                    initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-billion tracking-tighter leading-none uppercase text-siri drop-shadow-[0_20px_40px_rgba(255,0,160,0.2)]"
                  >
                    HALO
                  </motion.h1>
               </TiltWrapper>
            </ParallaxWrapper>

            <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 1 }}
               className="text-2xl md:text-3xl font-extrabold text-black/60 max-w-2xl mx-auto leading-tight tracking-tight uppercase"
            >
               Autonomous security for your billion-dollar investment.
            </motion.p>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1, duration: 1 }}
               className="flex flex-col sm:flex-row items-center justify-center gap-16 pt-4"
            >
               <MagneticButton strength={40} onClick={handleInitialize}>
                  <span className="flex items-center gap-6">
                    INITIALIZE <ArrowRight className="w-10 h-10 group-hover:translate-x-3 transition-transform" />
                  </span>
               </MagneticButton>
            </motion.div>
         </div>
         
      </section>

      {/* 2. THE INTELLIGENCE SECTION */}
      <section className="relative z-20 py-40">
         <IntelligenceSection />
      </section>

      {/* 3. BENTO GRID */}
      <section className="relative z-20 bg-surface py-40 px-12 overflow-hidden border-y border-black/5">
         <BentoGrid />
      </section>

      {/* 4. PRIVACY SECTION */}
      <section className="relative z-20 py-40">
         <PrivacySection />
      </section>

      {/* 5. THE VAULT (Final CTA) */}
      <section className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-12 border-t border-black/5 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto space-y-32">
            <ParallaxWrapper offset={-100}>
               <TiltWrapper strength={30}>
                  <h2 className="text-[6rem] md:text-[14rem] font-extrabold tracking-tighter leading-[0.8] uppercase text-black">
                     PROTECT YOUR<br />
                     <span className="text-siri">FUTURE.</span>
                  </h2>
               </TiltWrapper>
            </ParallaxWrapper>

            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="flex flex-col items-center gap-12"
            >
               <MagneticButton strength={60} className="scale-125" onClick={handleInitialize}>
                  <span className="flex items-center gap-4">
                    START ONBOARDING <ArrowUpRight className="w-8 h-8" />
                  </span>
               </MagneticButton>
            </motion.div>
         </div>
      </section>

      {/* 6. STUDIO-GRADE FOOTER (BRIGHT THEME) */}
      <footer className="relative z-20 py-48 px-16 border-t border-black/5 bg-white text-black overflow-hidden group/footer">
         {/* Massive Backdrop Text - Stylish Outline, Bottom Aligned, Subtle Parallax */}
         <div className="absolute inset-x-0 bottom-0 flex items-end justify-center z-0 pointer-events-none select-none overflow-hidden h-full">
            <ParallaxWrapper offset={-50}>
               <h1 className="text-[35vw] font-black tracking-tighter uppercase leading-[0.7] translate-y-[10%] select-none pointer-events-none italic"
                   style={{ 
                     color: "rgba(0,0,0,0.06)",
                     WebkitTextStroke: "0px",
                     opacity: 1
                   }}
               >
                  HALO
               </h1>
            </ParallaxWrapper>
         </div>

         <div className="max-w-screen-2xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-32 mb-32">
               {/* Left Section: Logo & Copyright */}
               <div className="md:col-span-4 space-y-12">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-2xl">H</div>
                     <h2 className="text-4xl font-black tracking-tighter uppercase">HALO</h2>
                  </div>
                  <p className="text-black/30 text-xl font-bold leading-relaxed tracking-tight max-w-sm">
                     © copyright HALOnow 2026. All rights reserved.
                  </p>
               </div>

               {/* Right Section: Link Columns */}
               <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-20">
                  <div className="space-y-8">
                     <h4 className="text-black/10 font-bold tracking-[0.4em] text-sm uppercase">PAGES</h4>
                     <ul className="space-y-4 text-black/50 font-bold text-lg uppercase tracking-tight">
                        <li className="hover:text-primary transition-colors cursor-pointer">All Products</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">Studio</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">Clients</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">Pricing</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">Blog</li>
                     </ul>
                  </div>

                  <div className="space-y-8">
                     <h4 className="text-black/10 font-bold tracking-[0.4em] text-sm uppercase">SOCIALS</h4>
                     <ul className="space-y-4 text-black/50 font-bold text-lg uppercase tracking-tight">
                        <li className="hover:text-primary transition-colors cursor-pointer">Facebook</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">Instagram</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">Twitter</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">LinkedIn</li>
                     </ul>
                  </div>

                  <div className="space-y-8">
                     <h4 className="text-black/10 font-bold tracking-[0.4em] text-sm uppercase">LEGAL</h4>
                     <ul className="space-y-4 text-black/50 font-bold text-lg uppercase tracking-tight">
                        <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">Cookie Policy</li>
                     </ul>
                  </div>

                  <div className="space-y-8">
                     <h4 className="text-black/10 font-bold tracking-[0.4em] text-sm uppercase">REGISTER</h4>
                     <ul className="space-y-4 text-black/50 font-bold text-lg uppercase tracking-tight">
                        <li className="hover:text-primary transition-colors cursor-pointer">Sign Up</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">Login</li>
                        <li className="hover:text-primary transition-colors cursor-pointer">Forgot Password</li>
                     </ul>
                  </div>
               </div>
            </div>
            
         </div>
      </footer>
    </div>
  );
}
