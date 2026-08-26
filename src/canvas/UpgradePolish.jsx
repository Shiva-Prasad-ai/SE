import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';

export function UpgradePolish({ activeSection }) {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.2;
      ringRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
      ringRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
    }
  });

  if (activeSection !== 4) return null; // Active on Section 05 (Perfective Maintenance)

  return (
    <group position={[0, 0.2, 0]}>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Glowing Expansion Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.5, 0.03, 16, 100]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.8} />
        </mesh>

        {/* Version 2.0 Badge */}
        <Html position={[0, 2.2, 0]} center distanceFactor={7}>
          <div className="bg-emerald-950/90 border border-emerald-400 text-emerald-300 px-4 py-2 rounded-xl shadow-xl shadow-emerald-950/60 backdrop-blur-md flex items-center gap-3 font-mono font-extrabold text-sm tracking-wider">
            <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded text-xs">NEW</span>
            SYSTEM VERSION 2.0 — HIGH PERFORMANCE MODE
          </div>
        </Html>
      </Float>
    </group>
  );
}
