import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export function ServerNodes({ activeSection }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.1;
    }
  });

  const isUpgraded = activeSection >= 4;

  return (
    <group position={[-3.5, -0.2, -1]}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <group ref={groupRef}>
          {/* Main Server Tower Rack Frame */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.2, 2.6, 1.2]} />
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.9}
              roughness={0.3}
              wireframe={false}
            />
          </mesh>

          {/* Wireframe outer outline */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.25, 2.65, 1.25]} />
            <meshBasicMaterial color={isUpgraded ? '#10b981' : '#0284c7'} wireframe transparent opacity={0.4} />
          </mesh>

          {/* Server Blades / Slots */}
          {[-0.9, -0.45, 0, 0.45, 0.9].map((y, idx) => (
            <group key={idx} position={[0, y, 0.61]}>
              {/* Blade Plate */}
              <mesh>
                <planeGeometry args={[1.0, 0.35]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} />
              </mesh>
              {/* Blinking LEDs */}
              <mesh position={[-0.35, 0, 0.01]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color={idx % 2 === 0 ? '#38bdf8' : '#10b981'} />
              </mesh>
              <mesh position={[-0.2, 0, 0.01]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color="#38bdf8" />
              </mesh>
            </group>
          ))}
        </group>
      </Float>
    </group>
  );
}
