import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Shield, Cpu, Database, Zap, Lock, Eye } from 'lucide-react';

export function SolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const haloY = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 0, 200]);
  const lightIntensity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7], [0, 1, 1, 0]);

  const features = [
    {
      icon: Zap,
      title: 'Autonomous Protection',
      description: 'AI-powered threat detection and response in microseconds, not minutes.',
    },
    {
      icon: Eye,
      title: 'Predictive Analysis',
      description: 'Machine learning models predict and prevent attacks before they happen.',
    },
    {
      icon: Lock,
      title: 'Front-Running Defense',
      description: 'Detect MEV attacks and automatically reorder transactions for protection.',
    },
    {
      icon: Database,
      title: 'Immutable Audit Trail',
      description: 'Every action logged on-chain with Filecoin for transparent accountability.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-blue-950/20 to-black overflow-hidden"
    >
      {/* HALO savior effect */}
      <motion.div
        style={{ y: haloY, opacity: lightIntensity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none"
      >
        <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-[100px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="w-48 h-48 text-cyan-400 animate-pulse" />
        </div>
      </motion.div>

      {/* Stabilizing light rays */}
      <motion.div
        style={{ opacity: lightIntensity }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-cyan-400/40 via-cyan-400/20 to-transparent origin-top"
            style={{
              transform: `rotate(${i * 45}deg)`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-8 py-24"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              textShadow: [
                '0 0 20px rgba(0, 255, 255, 0.5)',
                '0 0 40px rgba(0, 255, 255, 0.8)',
                '0 0 20px rgba(0, 255, 255, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-6">
              THE HALO PROTOCOL
            </h2>
          </motion.div>
          <p className="text-2xl text-cyan-100/80 max-w-3xl mx-auto">
            The first autonomous AI agent that protects your assets with
            millisecond response times and immutable transparency.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-lg blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-black/60 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-md hover:border-cyan-500/60 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-400/30">
                    <feature.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-cyan-300 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security primitive callout */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-md">
            <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span className="font-mono text-cyan-300 tracking-wider">
              Built on Flow • ERC-8004 • Storacha • Filecoin
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
