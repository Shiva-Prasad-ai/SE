import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AnimatedBackground3D({ activeSection }) {
  const particlesRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const gridFloorRef = useRef();

  // Create 180 centered procedural background particles
  const particleCount = 180;
  const [particlePositions, particleSpeeds] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22; // Centered X spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18; // Centered Y spread
      positions[i * 3 + 2] = -4 - Math.random() * 12; // Z depth
      speeds[i] = 0.15 + Math.random() * 0.35;
    }
    return [positions, speeds];
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Animate centered background particles floating
    if (particlesRef.current) {
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3 + 1] += delta * particleSpeeds[i];
        if (particlePositions[i * 3 + 1] > 10) {
          particlePositions[i * 3 + 1] = -10;
        }

        dummy.position.set(
          particlePositions[i * 3] + Math.sin(time * 0.8 + i) * 0.2,
          particlePositions[i * 3 + 1],
          particlePositions[i * 3 + 2]
        );
        dummy.scale.setScalar(0.07 + Math.sin(time * 1.5 + i) * 0.02);
        dummy.updateMatrix();
        particlesRef.current.setMatrixAt(i, dummy.matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }

    // Animate orbital background energy rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.1;
      ring1Ref.current.rotation.y = time * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.12;
      ring2Ref.current.rotation.x = time * 0.08;
    }

    // Moving centered cyber grid floor
    if (gridFloorRef.current) {
      gridFloorRef.current.position.z = (time * 0.6) % 2;
    }
  });

  const primaryColor = "#f59e0b"; // Golden Amber #F59E0B

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Centered Floating Data Particles */}
      <instancedMesh ref={particlesRef} args={[null, null, particleCount]}>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshBasicMaterial color={primaryColor} transparent opacity={0.55} />
      </instancedMesh>

      {/* 2. Centered Orbital Background Ring 1 */}
      <group ref={ring1Ref} position={[0, 0, -10]}>
        <mesh>
          <torusGeometry args={[9, 0.03, 16, 100]} />
          <meshBasicMaterial color={primaryColor} transparent opacity={0.25} wireframe />
        </mesh>
      </group>

      {/* 3. Centered Orbital Background Ring 2 */}
      <group ref={ring2Ref} position={[0, 0, -12]}>
        <mesh>
          <torusGeometry args={[12, 0.025, 16, 100]} />
          <meshBasicMaterial color={primaryColor} transparent opacity={0.18} wireframe />
        </mesh>
      </group>

      {/* 4. Centered Moving Cyber Grid Floor */}
      <group position={[0, -4.5, 0]}>
        <mesh ref={gridFloorRef} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[40, 40, 30, 30]} />
          <meshBasicMaterial color={primaryColor} wireframe transparent opacity={0.12} />
        </mesh>
      </group>
    </group>
  );
}
