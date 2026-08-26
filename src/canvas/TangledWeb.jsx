import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export function TangledWeb({ activeSection }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  // Generate chaotic tangled wires
  const wires = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 20; i++) {
      const p1 = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      );
      const p2 = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      );
      const points = [p1, p2];
      lines.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return lines;
  }, []);

  if (activeSection !== 8) return null; // Active on Section 09 (Challenges)

  const tags = [
    "Legacy Code",
    "Technical Debt",
    "No Documentation",
    "Fragile Dependencies",
    "Security CVEs",
    "Original Dev Left"
  ];

  return (
    <group ref={groupRef}>
      {/* Tangled Wire Net */}
      {wires.map((geo, idx) => (
        <line key={idx} geometry={geo}>
          <lineBasicMaterial color={idx % 2 === 0 ? "#f43f5e" : "#f59e0b"} transparent opacity={0.6} linewidth={2} />
        </line>
      ))}

      {/* Floating Warning Badges */}
      {tags.map((tag, idx) => {
        const x = Math.sin(idx) * 2.8;
        const y = Math.cos(idx * 1.5) * 2.2;
        const z = Math.sin(idx * 2) * 2.2;
        return (
          <Html key={idx} position={[x, y, z]} center distanceFactor={7}>
            <div className="bg-rose-950/95 border border-rose-500/70 text-rose-200 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold shadow-lg shadow-rose-950/80 backdrop-blur-sm whitespace-nowrap animate-pulse">
              ⚠️ {tag}
            </div>
          </Html>
        );
      })}
    </group>
  );
}
