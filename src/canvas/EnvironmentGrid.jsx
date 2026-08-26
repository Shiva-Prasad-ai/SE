import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function EnvironmentGrid({ activeSection }) {
  const gridRef = useRef();

  useFrame((state, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
    }
  });

  const isAdaptiveSection = activeSection === 3;
  const isUpgraded = activeSection >= 4;

  const gridColor = isAdaptiveSection 
    ? '#f59e0b' 
    : isUpgraded 
      ? '#10b981' 
      : '#0284c7';

  return (
    <group position={[0, -2.5, 0]}>
      {/* Floor Grid */}
      <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40, 40, 40]} />
        <meshBasicMaterial
          color={gridColor}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Sub-grid plane glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#020617" />
      </mesh>
    </group>
  );
}
