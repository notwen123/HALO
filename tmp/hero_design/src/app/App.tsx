import { Suspense } from 'react';
import { HeroScene } from './components/HeroScene';
import { HeroOverlay } from './components/HeroOverlay';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden">
      {/* Hero Section - Full viewport with 3D scene */}
      <section className="relative h-screen w-full">
        {/* 3D Background */}
        <div className="absolute inset-0">
          <ErrorBoundary
            fallback={
              <div className="w-full h-full bg-gradient-to-b from-black via-cyan-950/20 to-black flex items-center justify-center">
                <div className="text-cyan-400/50 text-sm font-mono">Loading 3D Experience...</div>
              </div>
            }
          >
            <Suspense
              fallback={
                <div className="w-full h-full bg-gradient-to-b from-black via-cyan-950/20 to-black flex items-center justify-center">
                  <div className="text-cyan-400/50 text-sm font-mono">Initializing HALO...</div>
                </div>
              }
            >
              <HeroScene />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* UI Overlay */}
        <HeroOverlay />
      </section>

      {/* Problem Section - Dark glitching cityscape */}
      <ProblemSection />

      {/* Solution Section - HALO appears as savior */}
      <SolutionSection />

      {/* Features Section - Interactive demos */}
      <FeaturesSection />

      {/* Footer */}
      <footer className="relative bg-black border-t border-cyan-400/30 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                HALO PROTOCOL
              </h3>
              <p className="text-sm text-gray-500">
                Autonomous AI protection for the decentralized future.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-mono text-cyan-300 mb-4 tracking-wider">PROTOCOL</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Whitepaper</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">GitHub</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Audit Reports</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-mono text-cyan-300 mb-4 tracking-wider">COMMUNITY</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Discord</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Twitter</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Forum</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Blog</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-cyan-400/20 flex items-center justify-between">
            <p className="text-xs text-gray-600 font-mono">
              © 2026 HALO Protocol. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 font-mono">
              Built on Flow • ERC-8004 • Storacha • Filecoin
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}