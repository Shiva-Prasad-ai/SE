import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function DatabaseNodes({ activeSection }) {
  const groupRef = useRef();
  const ringPulseRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (ringPulseRef.current) {
      ringPulseRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  const isAdapted = activeSection >= 3; // Adaptive Maintenance update

  return (
    <group position={[3.5, 0, -1]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef}>
          {/* Cylinder Stack 1 */}
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.4, 32]} />
            <meshStandardMaterial
              color={isAdapted ? '#06b6d4' : '#334155'}
              metalness={0.8}
              roughness={0.2}
              emissive={isAdapted ? '#06b6d4' : '#0f172a'}
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.4, 32]} />
            <meshStandardMaterial
              color={isAdapted ? '#06b6d4' : '#334155'}
              metalness={0.8}
              roughness={0.2}
              emissive={isAdapted ? '#06b6d4' : '#0f172a'}
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.4, 32]} />
            <meshStandardMaterial
              color={isAdapted ? '#06b6d4' : '#334155'}
              metalness={0.8}
              roughness={0.2}
              emissive={isAdapted ? '#06b6d4' : '#0f172a'}
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Database Light Indicator Rings */}
          <mesh ref={ringPulseRef} position={[0, 0.3, 0]}>
            <torusGeometry args={[0.72, 0.02, 16, 32]} />
            <meshBasicMaterial color={isAdapted ? '#38bdf8' : '#94a3b8'} />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <torusGeometry args={[0.72, 0.02, 16, 32]} />
            <meshBasicMaterial color={isAdapted ? '#38bdf8' : '#94a3b8'} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
