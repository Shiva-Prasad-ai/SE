import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function Ecosystem3D({ activeSection }) {
  const orbitingGroupRef = useRef();
  const appCoreRef = useRef();
  const userNodeRef = useRef();
  const serverGroupRef = useRef();
  const dbGroupRef = useRef();
  const apiPortalRef = useRef();
  const networkParticlesRef = useRef();

  // Create network connection curves between orbiting components
  const curves = useMemo(() => {
    return [
      // USER (0, 3.0, 0) -> APPLICATION (0, 0, 0)
      new THREE.LineCurve3(new THREE.Vector3(0, 2.8, 0), new THREE.Vector3(0, 1.2, 0)),
      // APPLICATION (0, 0, 0) -> SERVER (-3.0, -1.0, 0)
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-1.0, -0.4, 0),
        new THREE.Vector3(-2.0, -0.2, 0),
        new THREE.Vector3(-3.0, -0.8, 0)
      ),
      // APPLICATION (0, 0, 0) -> DATABASE (3.0, -1.0, 0)
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(1.0, -0.4, 0),
        new THREE.Vector3(2.0, -0.2, 0),
        new THREE.Vector3(3.0, -0.8, 0)
      ),
      // APPLICATION (0, 0, 0) -> API PORTAL (0, -2.8, 0)
      new THREE.LineCurve3(new THREE.Vector3(0, -1.2, 0), new THREE.Vector3(0, -2.4, 0)),
      // SERVER (-3.0, -1.0, 0) -> API PORTAL (0, -2.8, 0)
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-3.0, -1.2, 0),
        new THREE.Vector3(-1.6, -2.4, 0),
        new THREE.Vector3(-0.6, -2.8, 0)
      )
    ];
  }, []);

  // Traveling data particles along network connections
  const particleCount = 40;
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      data.push({
        curveIndex: i % curves.length,
        progress: Math.random(),
        speed: 0.25 + Math.random() * 0.35
      });
    }
    return data;
  }, [curves]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // CONTINUOUS REVOLVING / ORBITING MOTION AROUND CENTRAL CORE
    if (orbitingGroupRef.current) {
      orbitingGroupRef.current.rotation.y += delta * 0.2; // Revolving orbit
    }

    // Application Core Rotation (Counter-rotation for visual stability)
    if (appCoreRef.current) {
      appCoreRef.current.rotation.y -= delta * 0.3;
      appCoreRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }

    // Individual node rotations
    if (userNodeRef.current) {
      userNodeRef.current.rotation.y += delta * 0.4;
    }
    if (serverGroupRef.current) {
      serverGroupRef.current.rotation.y += delta * 0.2;
    }
    if (dbGroupRef.current) {
      dbGroupRef.current.rotation.y -= delta * 0.2;
    }
    if (apiPortalRef.current) {
      apiPortalRef.current.rotation.z += delta * 0.4;
    }

    // Move network particles along revolving curves
    if (networkParticlesRef.current) {
      particleData.forEach((p, i) => {
        p.progress += delta * p.speed;
        if (p.progress > 1) p.progress = 0;

        const curve = curves[p.curveIndex];
        const pt = curve.getPoint(p.progress);
        dummy.position.copy(pt);
        dummy.scale.setScalar(0.09);
        dummy.updateMatrix();
        networkParticlesRef.current.setMatrixAt(i, dummy.matrix);
      });
      networkParticlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const isDegraded = activeSection === 2;
  const isAdapting = activeSection === 3;
  const isUpgraded = activeSection === 4;

  const primaryAccent = isDegraded ? "#f43f5e" : isUpgraded ? "#10b981" : "#f59e0b";

  return (
    <group position={[0, 0, 0]}>
      
      {/* CENTRAL APPLICATION CORE (Stationary Center Anchor) */}
      <group position={[0, 0, 0]}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh ref={appCoreRef}>
            <boxGeometry args={[2.0, 2.0, 2.0]} />
            <meshPhysicalMaterial
              color={primaryAccent}
              transparent
              opacity={0.4}
              roughness={0.1}
              metalness={0.85}
              transmission={0.6}
              ior={1.5}
              thickness={1.2}
            />
          </mesh>

          {/* Inner Glowing Wobble Sphere */}
          <mesh>
            <sphereGeometry args={[0.8, 32, 32]} />
            <MeshWobbleMaterial
              color={primaryAccent}
              factor={isDegraded ? 0.8 : 0.25}
              speed={isDegraded ? 4 : 1.5}
              roughness={0.2}
              emissive={primaryAccent}
              emissiveIntensity={isDegraded ? 1.2 : 0.7}
            />
          </mesh>

          {/* Core Wireframe Frame */}
          <mesh>
            <boxGeometry args={[2.15, 2.15, 2.15]} />
            <meshBasicMaterial color={primaryAccent} wireframe transparent opacity={0.35} />
          </mesh>

          <Html position={[0, 1.5, 0]} center distanceFactor={8}>
            <div className="bg-[#0f172a]/95 border border-[#f59e0b]/60 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-lg tracking-wider whitespace-nowrap">
              APPLICATION CORE
            </div>
          </Html>
        </Float>
      </group>

      {/* REVOLVING ORBITING GROUP (User, Server, DB, API Gateway & Conduits revolve around Core) */}
      <group ref={orbitingGroupRef} position={[0, 0, 0]}>
        
        {/* 1. USER NODE (Orbiting Top) */}
        <group ref={userNodeRef} position={[0, 3.0, 0]}>
          <Float speed={2} floatIntensity={0.3}>
            <mesh>
              <sphereGeometry args={[0.45, 32, 32]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
            </mesh>
            <mesh>
              <torusGeometry args={[0.7, 0.02, 16, 32]} />
              <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
            </mesh>
            <Html position={[0, 0.8, 0]} center distanceFactor={8}>
              <div className="bg-[#0f172a]/95 border border-[#f59e0b]/50 px-2 py-0.5 rounded-md text-[10px] font-bold text-[#f59e0b] tracking-widest whitespace-nowrap">
                USER INTERFACE
              </div>
            </Html>
          </Float>
        </group>

        {/* 2. SERVER STACK (Orbiting Left) */}
        <group ref={serverGroupRef} position={[-3.0, -1.0, 0]}>
          <Float speed={1.2} floatIntensity={0.3}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.1, 2.0, 1.1]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.15, 2.05, 1.15]} />
              <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.35} />
            </mesh>

            {/* Blinking LEDs */}
            {[-0.6, -0.2, 0.2, 0.6].map((y, idx) => (
              <mesh key={idx} position={[-0.32, y, 0.56]}>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshBasicMaterial color={idx % 2 === 0 ? "#f59e0b" : "#10b981"} />
              </mesh>
            ))}

            <Html position={[0, 1.3, 0]} center distanceFactor={8}>
              <div className="bg-[#0f172a]/95 border border-[#f59e0b]/40 px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-200 whitespace-nowrap">
                SERVER STACK
              </div>
            </Html>
          </Float>
        </group>

        {/* 3. DATABASE STACK (Orbiting Right) */}
        <group ref={dbGroupRef} position={[3.0, -1.0, 0]}>
          <Float speed={1.3} floatIntensity={0.3}>
            {[-0.5, 0, 0.5].map((y, idx) => (
              <mesh key={idx} position={[0, y, 0]}>
                <cylinderGeometry args={[0.65, 0.65, 0.35, 32]} />
                <meshStandardMaterial
                  color={isAdapting ? "#06b6d4" : "#0f172a"}
                  metalness={0.8}
                  roughness={0.2}
                  emissive={isAdapting ? "#06b6d4" : "#f59e0b"}
                  emissiveIntensity={0.3}
                />
              </mesh>
            ))}

            <Html position={[0, 1.3, 0]} center distanceFactor={8}>
              <div className="bg-[#0f172a]/95 border border-[#f59e0b]/40 px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-200 whitespace-nowrap">
                DATABASE
              </div>
            </Html>
          </Float>
        </group>

        {/* 4. API PORTAL (Orbiting Bottom) */}
        <group position={[0, -2.8, 0]}>
          <Float speed={1.8} floatIntensity={0.3}>
            <mesh ref={apiPortalRef} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.0, 0.07, 16, 32]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
            </mesh>

            <Html position={[0, -0.8, 0]} center distanceFactor={8}>
              <div className="bg-[#0f172a]/95 border border-[#f59e0b]/40 px-2 py-0.5 rounded-md text-[10px] font-bold text-[#f59e0b] whitespace-nowrap">
                API GATEWAY
              </div>
            </Html>
          </Float>
        </group>

        {/* 5. REVOLVING NETWORK CONDUIT LINES */}
        {curves.map((curve, idx) => {
          const points = curve.getPoints(30);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <line key={idx} geometry={geometry}>
              <lineBasicMaterial color={primaryAccent} transparent opacity={0.45} />
            </line>
          );
        })}

        {/* 6. INSTANCED REVOLVING DATA PARTICLES */}
        <instancedMesh ref={networkParticlesRef} args={[null, null, particleCount]}>
          <sphereGeometry args={[0.45, 12, 12]} />
          <meshBasicMaterial color="#f59e0b" />
        </instancedMesh>

      </group>

    </group>
  );
}
