import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export function ProcessLoop({ activeSection }) {
  const loopRef = useRef();

  useFrame((state, delta) => {
    if (loopRef.current) {
      loopRef.current.rotation.z += delta * 0.2;
    }
  });

  if (activeSection !== 7) return null; // Active on Section 08 (Process)

  const steps = [
    { num: "01", title: "Request" },
    { num: "02", title: "Analysis" },
    { num: "03", title: "Modify" },
    { num: "04", title: "Testing" },
    { num: "05", title: "Deploy" },
    { num: "06", title: "Monitor" },
    { num: "07", title: "Repeat Loop" }
  ];

  const radius = 4.2;

  return (
    <group position={[0, 0, 0]}>
      {/* Main Process Ring */}
      <mesh ref={loopRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[radius, 0.05, 16, 100]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.6} />
      </mesh>

      {/* Orbiting Step Nodes */}
      {steps.map((step, idx) => {
        const angle = (idx / steps.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * Math.cos(Math.PI / 4);
        const z = Math.sin(angle) * radius * Math.sin(Math.PI / 4);

        return (
          <group key={idx} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
            <Html center distanceFactor={8}>
              <div className="bg-slate-900/90 border border-cyan-500/40 text-cyan-300 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold shadow-lg backdrop-blur-sm whitespace-nowrap">
                <span className="text-cyan-400 mr-1">{step.num}.</span>{step.title}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
