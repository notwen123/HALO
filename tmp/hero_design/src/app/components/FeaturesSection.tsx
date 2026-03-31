import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AuditLogViewer } from './AuditLogViewer';
import { TechStackAssembly } from './TechStackAssembly';
import { Database, FileCheck, GitBranch, Shield } from 'lucide-react';

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black py-24 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Section header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 mb-6">
            PROOF OF AGENT
          </h2>
          <p className="text-xl text-cyan-100/70 max-w-3xl mx-auto">
            Every action is transparent, traceable, and immutable. Watch the agent work in real-time.
          </p>
        </motion.div>

        {/* Key features grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-4 gap-4 mb-12"
        >
          {[
            {
              icon: Shield,
              label: 'Real-time Protection',
              value: '<5ms',
            },
            {
              icon: Database,
              label: 'On-chain Logs',
              value: '100%',
            },
            {
              icon: FileCheck,
              label: 'Audit Trail',
              value: 'Immutable',
            },
            {
              icon: GitBranch,
              label: 'Multi-chain',
              value: 'EVM+',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-purple-600/20 rounded-lg blur-lg group-hover:blur-xl transition-all" />
              <div className="relative bg-black/60 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm text-center">
                <feature.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-2xl font-black text-cyan-300 mb-1">
                  {feature.value}
                </div>
                <div className="text-xs text-gray-400 font-mono">{feature.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main demos - side by side */}
        <div className="grid grid-cols-2 gap-6">
          {/* Audit log */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AuditLogViewer />
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TechStackAssembly />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-mono text-lg tracking-wider shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all"
          >
            DEPLOY YOUR HALO AGENT
          </motion.button>
          <p className="text-sm text-gray-500 mt-4 font-mono">
            Join the waitlist • Early access Q2 2026
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
