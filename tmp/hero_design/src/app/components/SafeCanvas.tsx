import { ReactNode, useEffect, useState } from 'react';
import { Canvas, CanvasProps } from '@react-three/fiber';

interface SafeCanvasProps extends CanvasProps {
  children: ReactNode;
}

export function SafeCanvas({ children, ...props }: SafeCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay mounting to ensure React is fully initialized
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-black via-cyan-950/20 to-black">
        <div className="text-cyan-400/50 text-sm font-mono animate-pulse">
          Initializing 3D Engine...
        </div>
      </div>
    );
  }

  return <Canvas {...props}>{children}</Canvas>;
}
