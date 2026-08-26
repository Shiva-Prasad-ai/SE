import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function NetworkConnections({ activeSection }) {
  const particlesRef = useRef();

  // Create connection curves
  const curves = useMemo(() => {
    return [
      // Core to Database
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.8, 1.2, -0.5),
        new THREE.Vector3(3.5, 0, -1)
      ),
      // Core to Server
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-1.8, 1.2, -0.5),
        new THREE.Vector3(-3.5, -0.2, -1)
      ),
      // Database to Server connection back-link
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(3.5, -0.5, -1),
        new THREE.Vector3(0, -2.2, -2),
        new THREE.Vector3(-3.5, -0.5, -1)
      )
    ];
  }, []);

  // Particle positions along curves
  const particleCount = 45;
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      data.push({
        curveIndex: i % curves.length,
        progress: Math.random(),
        speed: 0.2 + Math.random() * 0.4
      });
    }
    return data;
  }, [curves]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    particleData.forEach((p, i) => {
      p.progress += delta * p.speed;
      if (p.progress > 1) p.progress = 0;

      const curve = curves[p.curveIndex];
      const point = curve.getPoint(p.progress);
      dummy.position.copy(point);
      dummy.scale.setScalar(0.08);
      dummy.updateMatrix();
      particlesRef.current.setMatrixAt(i, dummy.matrix);
    });

    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  const isError = activeSection === 2;
  const lineMaterialColor = isError ? '#f43f5e' : '#06b6d4';

  return (
    <group>
      {/* Curved Tubing Conduits */}
      {curves.map((curve, idx) => {
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={idx} geometry={geometry}>
            <lineBasicMaterial color={lineMaterialColor} transparent opacity={0.4} />
          </line>
        );
      })}

      {/* Traveling Instanced Data Particles */}
      <instancedMesh ref={particlesRef} args={[null, null, particleCount]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={isError ? '#fb7185' : '#38bdf8'} />
      </instancedMesh>
    </group>
  );
}
