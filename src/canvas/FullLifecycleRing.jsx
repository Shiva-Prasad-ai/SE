import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export function FullLifecycleRing({ activeSection }) {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.15;
    }
  });

  if (activeSection !== 9) return null; // Active on Section 10 (Conclusion)

  const milestones = ["BUILD", "DEPLOY", "USE", "MAINTAIN", "EVOLVE", "REPEAT"];
  const radius = 5.5;

  return (
    <group ref={ringRef} position={[0, 0, 0]}>
      {/* Outer Ring Conduit */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.04, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      {/* Orbiting Milestone Orbs */}
      {milestones.map((m, idx) => {
        const angle = (idx / milestones.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={idx} position={[x, 0, z]}>
            <mesh>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} />
            </mesh>
            <Html center distanceFactor={9}>
              <div className="bg-slate-950/95 border border-cyan-400 text-cyan-200 px-3 py-1 rounded-lg text-xs font-mono font-extrabold shadow-xl shadow-cyan-950/50 backdrop-blur-md whitespace-nowrap tracking-wider">
                {m}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
