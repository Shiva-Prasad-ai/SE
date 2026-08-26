import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';

export function BranchingDiagram({ activeSection }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  if (activeSection !== 6) return null; // Active on Section 07 (The Four Types)

  const branches = [
    { title: "CORRECTIVE", color: "#f43f5e", pos: [-4, 1.5, -2], percent: "~20%", type: "Fix Faults" },
    { title: "ADAPTIVE", color: "#06b6d4", pos: [4, 1.5, -2], percent: "~25%", type: "Environment" },
    { title: "PERFECTIVE", color: "#10b981", pos: [-4, -1.5, 2], percent: "~50%", type: "Enhance UX" },
    { title: "PREVENTIVE", color: "#f59e0b", pos: [4, -1.5, 2], percent: "~5%", type: "Refactor" }
  ];

  return (
    <group ref={groupRef}>
      {branches.map((b, idx) => (
        <group key={idx}>
          {/* Branch Line Conduit */}
          <line>
            <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(...b.pos)
            ])} />
            <lineBasicMaterial attach="material" color={b.color} linewidth={3} transparent opacity={0.8} />
          </line>

          {/* Node Orb */}
          <mesh position={b.pos}>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial color={b.color} emissive={b.color} emissiveIntensity={0.8} />
          </mesh>

          {/* 3D Label Tag */}
          <Html position={b.pos} center distanceFactor={9}>
            <div 
              className="px-3 py-1.5 rounded-lg font-mono text-xs font-bold shadow-xl backdrop-blur-md border border-white/20 whitespace-nowrap text-white"
              style={{ backgroundColor: `${b.color}33`, borderColor: b.color }}
            >
              <div className="text-white text-sm font-extrabold">{b.title}</div>
              <div className="text-[10px] opacity-80">{b.type} · {b.percent}</div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

// Ensure THREE is available inside JSX inline initialization
import * as THREE from 'three';
