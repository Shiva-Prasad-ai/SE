import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial } from '@react-three/drei';

export function SystemCore({ activeSection, scrollProgress }) {
  const outerBoxRef = useRef();
  const innerCoreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    if (outerBoxRef.current) {
      outerBoxRef.current.rotation.y += delta * 0.3;
      outerBoxRef.current.rotation.x += delta * 0.1;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= delta * 0.6;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.x += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.5;
      ring2Ref.current.rotation.y += delta * 0.3;
    }
  });

  const isError = activeSection === 2;
  const coreColor = isError ? '#f43f5e' : '#f59e0b'; // Primary #F59E0B Gold

  return (
    <group position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Outer Holographic Box */}
        <mesh ref={outerBoxRef}>
          <boxGeometry args={[2.2, 2.2, 2.2]} />
          <meshPhysicalMaterial
            color={coreColor}
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.8}
            transmission={0.6}
            ior={1.5}
            thickness={1.2}
          />
        </mesh>

        {/* Outer Wireframe Cage */}
        <mesh>
          <boxGeometry args={[2.4, 2.4, 2.4]} />
          <meshBasicMaterial color={coreColor} wireframe transparent opacity={0.4} />
        </mesh>

        {/* Inner Glowing Core Sphere */}
        <mesh ref={innerCoreRef}>
          <sphereGeometry args={[0.85, 32, 32]} />
          <MeshWobbleMaterial
            color={coreColor}
            factor={isError ? 0.8 : 0.25}
            speed={isError ? 4 : 1.5}
            roughness={0.2}
            emissive={coreColor}
            emissiveIntensity={isError ? 1.2 : 0.7}
          />
        </mesh>

        {/* Orbital Ring 1 */}
        <group ref={ring1Ref}>
          <mesh>
            <torusGeometry args={[1.7, 0.02, 16, 100]} />
            <meshBasicMaterial color={coreColor} transparent opacity={0.7} />
          </mesh>
        </group>

        {/* Orbital Ring 2 */}
        <group ref={ring2Ref}>
          <mesh>
            <torusGeometry args={[1.9, 0.015, 16, 100]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.5} />
          </mesh>
        </group>

        {/* Center Light */}
        <pointLight color={coreColor} intensity={isError ? 4 : 3} distance={10} />
      </Float>
    </group>
  );
}
