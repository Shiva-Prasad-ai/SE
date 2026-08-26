import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sectionsData } from '../data/presentationData';

export function CameraController({ activeSection, scrollProgress }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 2, 14));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const targetConfig = sectionsData[activeSection]?.cameraConfig || sectionsData[0].cameraConfig;

    const targetPos = new THREE.Vector3(...targetConfig.position);
    const targetLookAt = new THREE.Vector3(...targetConfig.target);

    // Smooth lerp camera position and lookAt target
    currentPos.current.lerp(targetPos, delta * 2.5);
    currentTarget.current.lerp(targetLookAt, delta * 2.5);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);

    if (camera.fov !== targetConfig.fov) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetConfig.fov, delta * 2);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
