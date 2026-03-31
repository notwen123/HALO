import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { SafeCanvas } from './SafeCanvas';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AuditEvent {
  timestamp: number;
  type: 'threat_detected' | 'funds_moved' | 'threat_neutralized';
  description: string;
  txHash: string;
  position: { x: number; y: number; z: number };
}

const mockEvents: AuditEvent[] = [
  {
    timestamp: 0,
    type: 'threat_detected',
    description: 'Flash loan attack detected on USDC pool',
    txHash: '0x7a3f8b...',
    position: { x: -3, y: 1, z: 0 },
  },
  {
    timestamp: 0.2,
    type: 'funds_moved',
    description: 'Front-running drain: Moving 42,000 USDC to safety',
    txHash: '0x9c2e1a...',
    position: { x: 0, y: 0, z: 0 },
  },
  {
    timestamp: 0.4,
    type: 'threat_neutralized',
    description: 'Attack neutralized. Funds secured. Log written to Filecoin',
    txHash: '0x4f7b3c...',
    position: { x: 3, y: -1, z: 0 },
  },
];

export function AuditLogViewer() {
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (playbackTime >= 1) {
      setPlaybackTime(0);
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaybackTime(parseFloat(e.target.value));
    setIsPlaying(false);
  };

  const currentEvent = mockEvents.find(
    (event, i) =>
      playbackTime >= event.timestamp &&
      (i === mockEvents.length - 1 || playbackTime < mockEvents[i + 1].timestamp)
  );

  return (
    <div className="relative bg-black/80 border border-cyan-400/30 rounded-lg overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cyan-400/30">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-cyan-400" />
          <h3 className="font-mono text-cyan-300 tracking-wider">
            BLACK BOX AUDIT PLAYBACK
          </h3>
        </div>
        <div className="text-xs font-mono text-cyan-400">
          {(playbackTime * 100).toFixed(0)}% Complete
        </div>
      </div>

      {/* 3D Visualization */}
      <div className="h-64 bg-black relative">
        <SafeCanvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AuditPlayback playbackTime={playbackTime} events={mockEvents} />
        </SafeCanvas>
      </div>

      {/* Event details */}
      <div className="p-4 bg-black/60">
        {currentEvent && (
          <motion.div
            key={currentEvent.timestamp}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <div className="flex items-start gap-3">
              {currentEvent.type === 'threat_detected' && (
                <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
              )}
              {currentEvent.type === 'funds_moved' && (
                <Play className="w-5 h-5 text-yellow-500 mt-1" />
              )}
              {currentEvent.type === 'threat_neutralized' && (
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              )}
              <div className="flex-1">
                <p className="text-sm text-cyan-100">{currentEvent.description}</p>
                <p className="text-xs text-gray-500 font-mono mt-1">
                  TX: {currentEvent.txHash}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Playback controls */}
      <div className="p-4 bg-black/40 border-t border-cyan-400/30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPlaybackTime(0)}
            className="p-2 rounded hover:bg-cyan-500/20 transition-colors"
          >
            <SkipBack className="w-4 h-4 text-cyan-400" />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-2 rounded hover:bg-cyan-500/20 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-cyan-400" />
            ) : (
              <Play className="w-4 h-4 text-cyan-400" />
            )}
          </button>
          <button
            onClick={() => setPlaybackTime(1)}
            className="p-2 rounded hover:bg-cyan-500/20 transition-colors"
          >
            <SkipForward className="w-4 h-4 text-cyan-400" />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={playbackTime}
            onChange={handleScrub}
            className="flex-1 h-1 bg-cyan-900/30 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400
              [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_#00ffff]"
          />
        </div>
      </div>

      {/* Auto-play */}
      {isPlaying && (
        <AutoPlayback
          playbackTime={playbackTime}
          setPlaybackTime={setPlaybackTime}
          setIsPlaying={setIsPlaying}
        />
      )}
    </div>
  );
}

function AutoPlayback({
  playbackTime,
  setPlaybackTime,
  setIsPlaying,
}: {
  playbackTime: number;
  setPlaybackTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
}) {
  useFrame((_, delta) => {
    const newTime = playbackTime + delta * 0.2;
    if (newTime >= 1) {
      setPlaybackTime(1);
      setIsPlaying(false);
    } else {
      setPlaybackTime(newTime);
    }
  });
  return null;
}

function AuditPlayback({
  playbackTime,
  events,
}: {
  playbackTime: number;
  events: AuditEvent[];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center node (HALO) */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Event nodes */}
      {events.map((event, i) => {
        const isActive = playbackTime >= event.timestamp;
        const progress = Math.min(
          1,
          Math.max(0, (playbackTime - event.timestamp) * 5)
        );

        return (
          <group key={i}>
            {/* Connection line */}
            {isActive && (
              <mesh
                position={[
                  event.position.x * (progress / 2),
                  event.position.y * (progress / 2),
                  event.position.z * (progress / 2),
                ]}
              >
                <cylinderGeometry args={[0.02, 0.02, progress * 2, 8]} />
                <meshBasicMaterial color="#00ffff" />
              </mesh>
            )}

            {/* Event node */}
            {isActive && (
              <mesh
                position={[
                  event.position.x * progress,
                  event.position.y * progress,
                  event.position.z * progress,
                ]}
              >
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                  color={
                    event.type === 'threat_detected'
                      ? '#ff3300'
                      : event.type === 'funds_moved'
                      ? '#ffaa00'
                      : '#00ff00'
                  }
                  emissive={
                    event.type === 'threat_detected'
                      ? '#ff3300'
                      : event.type === 'funds_moved'
                      ? '#ffaa00'
                      : '#00ff00'
                  }
                  emissiveIntensity={2}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
