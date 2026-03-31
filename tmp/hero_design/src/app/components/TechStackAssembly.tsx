import { useRef } from 'react';
import { SafeCanvas } from './SafeCanvas';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { motion, useInView } from 'motion/react';
import * as THREE from 'three';

interface TechComponent {
  name: string;
  color: string;
  position: [number, number, number];
  description: string;
}

const techStack: TechComponent[] = [
  {
    name: 'FLOW',
    color: '#00EF8B',
    position: [-3, 1, 0],
    description: 'High-performance blockchain with EVM equivalence',
  },
  {
    name: 'ERC-8004',
    color: '#627eea',
    position: [0, 0, 0],
    description: 'AI agent standard for autonomous operations',
  },
  {
    name: 'STORACHA',
    color: '#0090FF',
    position: [2, -1, -1],
    description: 'Decentralized storage for audit logs',
  },
  {
    name: 'FILECOIN',
    color: '#0090FF',
    position: [3, 1, 1],
    description: 'Immutable permanent storage layer',
  },
];

export function TechStackAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  return (
    <div ref={containerRef} className="relative h-[500px] bg-black/80 border border-cyan-400/30 rounded-lg overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 border-b border-cyan-400/30 bg-black/60 backdrop-blur-sm">
        <h3 className="font-mono text-cyan-300 tracking-wider">
          TECH STACK ASSEMBLY
        </h3>
        <div className="text-xs font-mono text-cyan-400">
          {isInView ? 'ACTIVE' : 'STANDBY'}
        </div>
      </div>

      {/* 3D Canvas */}
      <SafeCanvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <TechStack3D isVisible={isInView} components={techStack} />
      </SafeCanvas>

      {/* Component descriptions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 border-t border-cyan-400/30">
        <div className="grid grid-cols-2 gap-3">
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: i * 0.2 + 0.5 }}
              className="flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: tech.color }}
              />
              <div className="flex-1">
                <div className="text-xs font-mono text-cyan-300">{tech.name}</div>
                <div className="text-[10px] text-gray-500">{tech.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TechStack3D({
  isVisible,
  components,
}: {
  isVisible: boolean;
  components: TechComponent[];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const assemblageProgress = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Rotate the entire assembly
    groupRef.current.rotation.y += delta * 0.2;

    // Animate assembly
    if (isVisible && assemblageProgress.current < 1) {
      assemblageProgress.current = Math.min(1, assemblageProgress.current + delta * 0.5);
    } else if (!isVisible && assemblageProgress.current > 0) {
      assemblageProgress.current = Math.max(0, assemblageProgress.current - delta * 0.5);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Tech components */}
      {components.map((tech, i) => {
        const targetPos = tech.position;
        const startPos: [number, number, number] = [
          targetPos[0] * 3,
          targetPos[1] * 3,
          targetPos[2] * 3,
        ];
        const progress = Math.max(0, Math.min(1, assemblageProgress.current * 2 - i * 0.3));

        const currentPos: [number, number, number] = [
          startPos[0] + (targetPos[0] - startPos[0]) * progress,
          startPos[1] + (targetPos[1] - startPos[1]) * progress,
          startPos[2] + (targetPos[2] - startPos[2]) * progress,
        ];

        return (
          <group key={i} position={currentPos}>
            {/* Component node */}
            <TechNode color={tech.color} name={tech.name} scale={progress} />

            {/* Connection line to core */}
            {progress > 0.5 && (
              <ConnectionLine
                start={[0, 0, 0]}
                end={[-currentPos[0], -currentPos[1], -currentPos[2]]}
                color={tech.color}
                opacity={(progress - 0.5) * 2}
              />
            )}
          </group>
        );
      })}

      {/* Interconnecting lines between components */}
      {assemblageProgress.current > 0.7 &&
        components.map((tech1, i) =>
          components.slice(i + 1).map((tech2, j) => (
            <ConnectionLine
              key={`${i}-${j}`}
              start={tech1.position}
              end={tech2.position}
              color="#00ffff"
              opacity={(assemblageProgress.current - 0.7) * 2}
            />
          ))
        )}
    </group>
  );
}

function TechNode({
  color,
  name,
  scale,
}: {
  color: string;
  name: string;
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group>
      {/* Outer glow */}
      <mesh scale={scale}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1 * scale}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main shape - cube for tech nodes */}
      <mesh ref={meshRef} scale={scale}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Label */}
      {scale > 0.8 && (
        <Text
          position={[0, 1, 0]}
          fontSize={0.3}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      )}
    </group>
  );
}

function ConnectionLine({
  start,
  end,
  color,
  opacity,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  opacity: number;
}) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity * 0.4} />
    </line>
  );
}
