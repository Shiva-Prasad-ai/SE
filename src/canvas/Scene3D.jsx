import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { CameraController } from './CameraController';
import { Ecosystem3D } from './Ecosystem3D';
import { BugGlitch } from './BugGlitch';
import { EnvironmentGrid } from './EnvironmentGrid';
import { UpgradePolish } from './UpgradePolish';
import { SecurityShield } from './SecurityShield';
import { BranchingDiagram } from './BranchingDiagram';
import { ProcessLoop } from './ProcessLoop';
import { TangledWeb } from './TangledWeb';
import { FullLifecycleRing } from './FullLifecycleRing';
import { AnimatedBackground3D } from './AnimatedBackground3D';

export function Scene3D({ activeSection, scrollProgress }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-slate-950">
      <Canvas
        camera={{ position: [0, 2.5, 14], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 12, 38]} />

        {/* Technical Lighting */}
        <ambientLight intensity={0.75} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#f8fafc" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />
        <pointLight position={[0, 0, 0]} intensity={3} color="#f59e0b" distance={16} />

        {/* Ambient Stars */}
        <Stars radius={50} depth={50} count={1200} factor={3} saturation={0} fade speed={1} />

        {/* 3D Ecosystem & Section Elements */}
        <Suspense fallback={null}>
          <CameraController activeSection={activeSection} scrollProgress={scrollProgress} />
          <AnimatedBackground3D activeSection={activeSection} />
          <Ecosystem3D activeSection={activeSection} />
          <BugGlitch activeSection={activeSection} />
          <EnvironmentGrid activeSection={activeSection} />
          <UpgradePolish activeSection={activeSection} />
          <SecurityShield activeSection={activeSection} />
          <BranchingDiagram activeSection={activeSection} />
          <ProcessLoop activeSection={activeSection} />
          <TangledWeb activeSection={activeSection} />
          <FullLifecycleRing activeSection={activeSection} />
        </Suspense>
      </Canvas>
    </div>
  );
}
