import { useState, useEffect } from 'react';
import { SafeCanvas } from './SafeCanvas';
import { HaloSphere } from './HaloSphere';
import { AttackVisualization } from './AttackVisualization';

export function HeroScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-b from-black via-cyan-950/20 to-black">
      <SafeCanvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 30]} />

        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ffff" />

        <HaloSphere mousePosition={mousePosition} />
        <AttackVisualization />
      </SafeCanvas>
    </div>
  );
}
