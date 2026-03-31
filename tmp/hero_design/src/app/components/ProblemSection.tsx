import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AlertTriangle, Bug, Skull, Zap } from 'lucide-react';

export function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  const threats = [
    {
      icon: Skull,
      title: 'Smart Contract Exploits',
      description: 'Reentrancy attacks, flash loans, and logic vulnerabilities drain billions annually.',
    },
    {
      icon: Bug,
      title: 'MEV Extraction',
      description: 'Front-running bots exploit transaction ordering to extract maximum value from users.',
    },
    {
      icon: AlertTriangle,
      title: 'Bridge Vulnerabilities',
      description: 'Cross-chain bridges are honeypots for attackers, with $2B+ stolen in 2024.',
    },
    {
      icon: Zap,
      title: 'Volatile Markets',
      description: 'Sudden market crashes can liquidate positions before manual intervention is possible.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Glitch effect background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black"
          style={{ opacity }}
        />
        <GlitchGrid scrollProgress={scrollYProgress} />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-8 py-24"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600 mb-6">
            THE DIGITAL ABYSS
          </h2>
          <p className="text-2xl text-red-300/80 max-w-3xl mx-auto">
            Traditional security is reactive. By the time you detect a threat,
            your assets are already gone.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {threats.map((threat, i) => (
            <motion.div
              key={i}
              initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-lg blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-black/80 border border-red-500/30 rounded-lg p-6 backdrop-blur-sm hover:border-red-500/60 transition-all">
                <threat.icon className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-red-300 mb-2">{threat.title}</h3>
                <p className="text-sm text-gray-400">{threat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Warning stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8 text-center"
        >
          {[
            { value: '$3.8B', label: 'Lost to Exploits in 2024' },
            { value: '127ms', label: 'Average Attack Detection Time' },
            { value: '0%', label: 'Recovery Rate Post-Breach' },
          ].map((stat, i) => (
            <div key={i} className="border-l-2 border-red-500/50 pl-6 text-left">
              <div className="text-4xl font-black text-red-500 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 font-mono">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function GlitchGrid({ scrollProgress }: { scrollProgress: any }) {
  const y = useTransform(scrollProgress, [0, 1], [0, -200]);

  return (
    <motion.div style={{ y }} className="absolute inset-0 opacity-20">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'glitch 5s infinite',
        }}
      />
    </motion.div>
  );
}
