import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AttackVector {
  id: number;
  startPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  progress: number;
  deflected: boolean;
  deflectionTime: number;
}

interface Asset {
  position: THREE.Vector3;
  icon: string;
  color: string;
}

export function AttackVisualization() {
  const [attacks, setAttacks] = useState<AttackVector[]>([]);
  const attackIdRef = useRef(0);

  // Crypto assets orbiting the HALO
  const assets: Asset[] = useMemo(() => [
    { position: new THREE.Vector3(4, 2, 0), icon: 'BTC', color: '#f7931a' },
    { position: new THREE.Vector3(-3, 2.5, 2), icon: 'ETH', color: '#627eea' },
    { position: new THREE.Vector3(2, -2, 3), icon: 'USDC', color: '#2775ca' },
    { position: new THREE.Vector3(-4, -1, -2), icon: 'SOL', color: '#14f195' },
  ], []);

  // Spawn attack vectors periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const targetAsset = assets[Math.floor(Math.random() * assets.length)];
      const angle = Math.random() * Math.PI * 2;
      const distance = 15;

      const newAttack: AttackVector = {
        id: attackIdRef.current++,
        startPos: new THREE.Vector3(
          Math.cos(angle) * distance,
          (Math.random() - 0.5) * 10,
          Math.sin(angle) * distance
        ),
        targetPos: targetAsset.position.clone(),
        progress: 0,
        deflected: false,
        deflectionTime: 0,
      };

      setAttacks(prev => [...prev, newAttack]);
    }, 2000);

    return () => clearInterval(interval);
  }, [assets]);

  // Animate attack vectors
  useFrame((state, delta) => {
    setAttacks(prev => {
      return prev
        .map(attack => {
          if (!attack.deflected && attack.progress < 0.8) {
            // Move toward target
            return { ...attack, progress: attack.progress + delta * 0.3 };
          } else if (!attack.deflected) {
            // Trigger deflection
            return { ...attack, deflected: true, deflectionTime: 0 };
          } else if (attack.deflectionTime < 1) {
            // Animate deflection
            return { ...attack, deflectionTime: attack.deflectionTime + delta * 2 };
          }
          return attack;
        })
        .filter(attack => attack.deflectionTime < 1);
    });
  });

  return (
    <group>
      {/* Render crypto assets */}
      {assets.map((asset, i) => (
        <group key={i} position={asset.position}>
          {/* Asset sphere */}
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color={asset.color}
              emissive={asset.color}
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* Orbit ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.4, 0.02, 8, 32]} />
            <meshBasicMaterial color={asset.color} transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Render attack vectors */}
      {attacks.map(attack => {
        const currentPos = new THREE.Vector3().lerpVectors(
          attack.startPos,
          attack.targetPos,
          attack.progress
        );

        if (attack.deflected) {
          // Deflection effect - turn green and scatter
          const deflectionAngle = Math.random() * Math.PI * 2;
          const deflectionDist = attack.deflectionTime * 5;
          currentPos.x += Math.cos(deflectionAngle) * deflectionDist;
          currentPos.z += Math.sin(deflectionAngle) * deflectionDist;
          currentPos.y += attack.deflectionTime * 2;
        }

        return (
          <group key={attack.id}>
            {/* Attack beam */}
            <mesh position={currentPos}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial
                color={attack.deflected ? '#00ff00' : '#ff3300'}
                transparent
                opacity={attack.deflected ? 1 - attack.deflectionTime : 1}
              />
            </mesh>

            {/* Trail effect */}
            {!attack.deflected && (
              <mesh position={currentPos}>
                <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
                <meshBasicMaterial color="#ff3300" transparent opacity={0.6} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Background data river */}
      <DataRiver />
    </group>
  );
}

function DataRiver() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ffff"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}
