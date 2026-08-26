import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';

export function BugGlitch({ activeSection }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Violent glitch vibration effect
      meshRef.current.rotation.x += delta * 4;
      meshRef.current.rotation.y += delta * 6;
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 25) * 0.15;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 20) * 0.15;
    }
  });

  if (activeSection !== 2) return null; // Only active during Corrective Maintenance section

  return (
    <group position={[0, 0, 0]}>
      <Float speed={5} rotationIntensity={2} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshBasicMaterial color="#f43f5e" wireframe opacity={0.8} transparent />
        </mesh>

        {/* Floating 3D Error Hologram Badge */}
        <Html position={[0, 1.6, 0]} center distanceFactor={8}>
          <div className="bg-rose-950/90 border border-rose-500 text-rose-200 px-3 py-1.5 rounded-lg shadow-lg shadow-rose-950/50 backdrop-blur-md flex items-center gap-2 text-xs font-mono font-bold animate-pulse whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            ERROR — Transaction Failed
          </div>
        </Html>
      </Float>
    </group>
  );
}
