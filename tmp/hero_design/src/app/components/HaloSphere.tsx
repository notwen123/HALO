import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HaloSphereProps {
  mousePosition: { x: number; y: number };
}

export function HaloSphere({ mousePosition }: HaloSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shieldRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Create geodesic sphere geometry
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2, 2);
  }, []);

  // Pulsing animation
  useFrame(({ clock }) => {
    if (!meshRef.current || !glowRef.current) return;

    const time = clock.getElapsedTime();

    // Slow rotation
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;

    // Pulsing glow
    const pulse = Math.sin(time * 2) * 0.3 + 0.7;
    glowRef.current.scale.setScalar(1 + pulse * 0.1);

    // React to mouse
    const targetX = mousePosition.x * 0.3;
    const targetY = -mousePosition.y * 0.3;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
  });

  return (
    <group>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main HALO sphere */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={2}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.6}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh geometry={geometry} rotation={meshRef.current?.rotation}>
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Shield effect (triggered during attacks) */}
      <mesh ref={shieldRef}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshPhysicalMaterial
          color="#00ffff"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point lights for dramatic effect */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#00ffff" distance={10} />
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#0088ff" distance={8} />
    </group>
  );
}
