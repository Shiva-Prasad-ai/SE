import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export function AnimatedBackground({ activeSection }) {
  // Load background textures
  const [archTexture, particleTexture, flowTexture] = useLoader(THREE.TextureLoader, [
    '/assets/bg_architecture.png',
    '/assets/bg_particles.png',
    '/assets/bg_flowchart.png'
  ]);

  const archPlaneRef = useRef();
  const particlePlaneRef = useRef();
  const flowPlaneRef = useRef();
  const floatingCodePanelsRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Floating motion for Architecture Backdrop (Sections 0-2)
    if (archPlaneRef.current) {
      archPlaneRef.current.position.y = Math.sin(time * 0.6) * 0.2;
      archPlaneRef.current.rotation.z = Math.sin(time * 0.3) * 0.02;
    }

    // Holographic beam projection movement for Particles Backdrop (Sections 3-5)
    if (particlePlaneRef.current) {
      particlePlaneRef.current.position.y = Math.cos(time * 0.8) * 0.25;
      particlePlaneRef.current.rotation.y = -0.3 + Math.sin(time * 0.4) * 0.05;
    }

    // Isometric flow grid rotation for Flowchart Backdrop (Sections 6-8)
    if (flowPlaneRef.current) {
      flowPlaneRef.current.rotation.z = time * 0.03;
      flowPlaneRef.current.position.y = Math.sin(time * 0.5) * 0.15;
    }

    // Code Panels floating wobble
    if (floatingCodePanelsRef.current) {
      floatingCodePanelsRef.current.rotation.y = Math.sin(time * 0.4) * 0.08;
    }
  });

  // Calculate opacities based on activeSection
  const isArchActive = activeSection <= 2 || activeSection === 9;
  const isParticleActive = activeSection >= 3 && activeSection <= 5;
  const isFlowActive = activeSection >= 6 && activeSection <= 8;

  return (
    <group position={[0, 0, -8]}>
      
      {/* BACKGROUND 1: Isometric Layered Architecture (Sections 0-2 & 10) */}
      <mesh 
        ref={archPlaneRef} 
        position={[0, 0.5, -4]} 
        scale={[18, 10, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={archTexture}
          transparent
          opacity={isArchActive ? 0.35 : 0.05}
          depthWrite={false}
        />
      </mesh>

      {/* BACKGROUND 2: Dark Holographic Particles & Beams (Sections 3-5) */}
      <mesh 
        ref={particlePlaneRef} 
        position={[2, 0, -3]} 
        rotation={[0.1, -0.3, 0]}
        scale={[16, 12, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={particleTexture}
          transparent
          opacity={isParticleActive ? 0.5 : activeSection === 9 ? 0.25 : 0.05}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* BACKGROUND 3: Dark Orange Flowchart Network (Sections 6-8) */}
      <mesh 
        ref={flowPlaneRef} 
        position={[-1, -1, -2]} 
        rotation={[-0.4, 0.2, 0]}
        scale={[17, 11, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={flowTexture}
          transparent
          opacity={isFlowActive ? 0.45 : activeSection === 9 ? 0.25 : 0.05}
          depthWrite={false}
        />
      </mesh>

      {/* Floating Holographic Angled Code Screens (Depth FX) */}
      <group ref={floatingCodePanelsRef}>
        <mesh position={[-6, 2, 1]} rotation={[0.2, 0.4, -0.1]} scale={[4, 2.5, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={archTexture}
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh position={[6, -1, 1]} rotation={[-0.2, -0.4, 0.1]} scale={[4.5, 3, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={flowTexture}
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

    </group>
  );
}
