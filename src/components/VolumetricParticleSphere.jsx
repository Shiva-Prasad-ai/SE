import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function VolumetricParticleSphere({ maintenanceState = 'NORMAL' }) {
  const containerRef = useRef(null);
  const stateRef = useRef(maintenanceState);
  stateRef.current = maintenanceState;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Determine particle count based on screen width/device capability
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;
    const particleCount = width < 600 ? 2500 : 5000;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Create custom smooth circular particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);

    // Particle attributes
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    // Color definitions (Warm Ivory, Soft Cream, Light Warm Beige, Restrained Coral)
    const colorIvory = new THREE.Color('#fffdfa');
    const colorCream = new THREE.Color('#fdf7ed');
    const colorBeige = new THREE.Color('#e6dfcd');
    const colorCoral = new THREE.Color('#ff6f3d');
    const colorChampagne = new THREE.Color('#f3ecdb');

    const baseRadius = 2.4;

    for (let i = 0; i < particleCount; i++) {
      // Uniform 3D volumetric sphere distribution with organic density variation
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      // Radial distribution favoring mid-depth volume and organic surface noise
      const r = baseRadius * Math.pow(Math.random(), 0.45) * (0.85 + 0.3 * Math.sin(theta * 3) * Math.cos(phi * 2));

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Color selection (85% warm ivory/cream, 15% restrained coral/champagne)
      const randColor = Math.random();
      let selectedColor;
      if (randColor < 0.55) {
        selectedColor = colorIvory;
      } else if (randColor < 0.8) {
        selectedColor = colorCream;
      } else if (randColor < 0.92) {
        selectedColor = colorBeige;
      } else if (randColor < 0.97) {
        selectedColor = colorChampagne;
      } else {
        selectedColor = colorCoral;
      }

      colors[i * 3] = selectedColor.r;
      colors[i * 3 + 1] = selectedColor.g;
      colors[i * 3 + 2] = selectedColor.b;

      // Size variation
      scales[i] = 0.08 + Math.random() * 0.12;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.16,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 0.5;
      mouseY = (y / rect.height) * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth subtle mouse parallax
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      if (!prefersReducedMotion) {
        particleSystem.rotation.y = elapsedTime * 0.08 + targetX * 0.4;
        particleSystem.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1 + targetY * 0.4;
      } else {
        particleSystem.rotation.y = targetX * 0.2;
        particleSystem.rotation.x = targetY * 0.2;
      }

      // Dynamic Particle Volumetric Breathing & Maintenance State Adaptation
      const posArr = geometry.attributes.position.array;
      const currentState = stateRef.current;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        const phase = phases[i];
        let factor = 1.0;

        if (currentState === 'CORRECTIVE') {
          // Localized disturbance in top quadrant
          if (oy > 0.5) {
            factor = 1.0 + Math.sin(elapsedTime * 4 + phase) * 0.15;
          }
        } else if (currentState === 'ADAPTIVE') {
          // Dynamic swirling pulse
          factor = 1.0 + Math.sin(elapsedTime * 2 + ox * 2) * 0.08;
        } else if (currentState === 'PERFECTIVE') {
          // Smooth coherent volume
          factor = 1.0 + Math.sin(elapsedTime * 0.8 + phase) * 0.03;
        } else if (currentState === 'PREVENTIVE') {
          // Crystalline stabilization
          factor = 1.0 + Math.sin(elapsedTime * 0.4) * 0.01;
        } else {
          // NORMAL: Living breathing system
          factor = 1.0 + Math.sin(elapsedTime * 1.2 + phase) * 0.05;
        }

        posArr[i3] = ox * factor;
        posArr[i3 + 1] = oy * factor;
        posArr[i3 + 2] = oz * factor;
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 500;
      const newHeight = container.clientHeight || 500;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
      {/* Subtle Warm Background Glow */}
      <div className="absolute inset-0 bg-radial from-[#ffece4]/40 via-[#f3ecdb]/15 to-transparent rounded-full blur-3xl opacity-70 pointer-events-none" />
      
      {/* 3D Volumetric Particle Canvas Container */}
      <div ref={containerRef} className="w-full h-full relative z-10" />
    </div>
  );
}

export default VolumetricParticleSphere;
