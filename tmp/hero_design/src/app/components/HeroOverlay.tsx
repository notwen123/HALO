import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Lock, Activity } from 'lucide-react';

export function HeroOverlay() {
  const [isProtectionEnabled, setIsProtectionEnabled] = useState(true);
  const [threatLog, setThreatLog] = useState<string[]>([]);

  const threats = [
    'Neutralized: Front-running attack on USDC pool',
    'Deflected: Flash loan exploit attempt',
    'Blocked: Unauthorized withdrawal transaction',
    'Rebalanced: Portfolio optimization complete',
    'Protected: MEV sandwich attack prevented',
    'Secured: Smart contract vulnerability patched',
  ];

  useEffect(() => {
    if (!isProtectionEnabled) return;

    const interval = setInterval(() => {
      const randomThreat = threats[Math.floor(Math.random() * threats.length)];
      setThreatLog(prev => [randomThreat, ...prev].slice(0, 5));
    }, 3000);

    return () => clearInterval(interval);
  }, [isProtectionEnabled]);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8">
      {/* Top badge */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-8 flex items-center gap-3 px-6 py-3 rounded-full bg-cyan-500/20 border border-cyan-400/50 backdrop-blur-md pointer-events-auto"
      >
        <Shield className="w-6 h-6 text-cyan-400 animate-pulse" />
        <span className="font-mono text-cyan-300 tracking-wider">
          ACTIVE PROTECTION
        </span>
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      </motion.div>

      {/* Threat log */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-32 left-8 w-96 pointer-events-auto"
      >
        <div className="bg-black/80 border border-cyan-400/30 rounded-lg p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-cyan-400/30">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-cyan-300 tracking-wider">
              THREAT LOG
            </span>
          </div>
          <div className="space-y-2 font-mono text-xs">
            <AnimatePresence mode="popLayout">
              {threatLog.map((threat, i) => (
                <motion.div
                  key={`${threat}-${i}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 - i * 0.15 }}
                  exit={{ x: 20, opacity: 0 }}
                  className="text-green-400"
                >
                  <span className="text-cyan-400">{'>'}</span> {threat}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main CTA */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, type: 'spring' }}
        className="flex flex-col items-center gap-8 pointer-events-auto"
      >
        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-center tracking-tight">
          GUARDIAN AWAKENS
        </h1>

        <p className="text-xl text-cyan-100/80 max-w-2xl text-center">
          Autonomous AI protection for your digital assets. Real-time threat detection,
          instant response, immutable audit trails.
        </p>

        {/* The toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsProtectionEnabled(!isProtectionEnabled)}
          className={`
            relative px-12 py-6 rounded-full font-mono text-xl tracking-wider
            transition-all duration-300 overflow-hidden
            ${isProtectionEnabled
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_40px_#00ffff]'
              : 'bg-gray-800 text-gray-400 border border-gray-600'
            }
          `}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={false}
            animate={{
              scale: isProtectionEnabled ? [1, 1.5, 1] : 1,
              opacity: isProtectionEnabled ? [0.5, 0, 0.5] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div className="relative flex items-center gap-4">
            {isProtectionEnabled ? (
              <>
                <Zap className="w-6 h-6" />
                <span>PROTECTION ENABLED</span>
                <Lock className="w-6 h-6" />
              </>
            ) : (
              <>
                <span>ENABLE AUTONOMOUS PROTECTION</span>
              </>
            )}
          </div>
        </motion.button>

        {/* Stats */}
        <div className="flex gap-8 mt-4">
          {[
            { label: 'Threats Neutralized', value: '1,247' },
            { label: 'Assets Protected', value: '$42.3M' },
            { label: 'Uptime', value: '99.99%' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-black text-cyan-400">{stat.value}</div>
              <div className="text-xs text-cyan-300/60 font-mono mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-cyan-400/60 text-xs font-mono tracking-wider">
          SCROLL TO EXPLORE
        </span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
      </motion.div>
    </div>
  );
}
