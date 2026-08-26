import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';

export function SecurityShield({ activeSection }) {
  const shieldRef = useRef();
  const scannerRef = useRef();

  useFrame((state, delta) => {
    if (shieldRef.current) {
      shieldRef.current.rotation.y += delta * 0.4;
    }
    if (scannerRef.current) {
      scannerRef.current.rotation.z += delta * 2;
    }
  });

  if (activeSection !== 5) return null; // Active on Section 06 (Preventive Maintenance)

  return (
    <group position={[0, 0, 0]}>
      {/* Geodesic Hex Shield Dome */}
      <mesh ref={shieldRef}>
        <sphereGeometry args={[2.8, 24, 24]} />
        <meshStandardMaterial
          color="#f59e0b"
          wireframe
          transparent
          opacity={0.35}
          emissive="#f59e0b"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Radar Scanner Sweep Plane */}
      <group ref={scannerRef}>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 2.7, 32]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.15} side={2} />
        </mesh>
      </group>

      {/* Scanning Hologram Badge */}
      <Float speed={4} floatIntensity={0.5}>
        <Html position={[0, 2.4, 0]} center distanceFactor={7}>
          <div className="bg-amber-950/90 border border-amber-500 text-amber-300 px-4 py-2 rounded-xl shadow-xl shadow-amber-950/60 backdrop-blur-md flex items-center gap-3 font-mono font-bold text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            PROACTIVE SCANNING & REFACTORING ACTIVE
          </div>
        </Html>
      </Float>
    </group>
  );
}
