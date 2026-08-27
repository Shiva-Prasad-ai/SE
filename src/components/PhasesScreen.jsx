import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function PhasesScreen({ onGoToCaseStudy }) {
  const mountRef = useRef(null);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [activeModalPhase, setActiveModalPhase] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalPhase(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Exact Regular Hexagon Coordinates (Pointy-top Hexagon: 0°, 60°, 120°, 180°, 240°, 300°)
  const phases = [
    {
      id: 'identification',
      title: 'Problem Identification',
      icon: 'search',
      badge: 'Phase 1',
      description: 'The initial phase involves receiving modification requests from users or system logs. It requires classifying the problem as corrective, adaptive, or perfective maintenance.',
      activities: [
        'User defect report logging',
        'System log analysis & monitoring',
        'Severity classification (Bug vs Feature)',
        'Initial triage & prioritization'
      ],
      output: 'Maintenance Request Ticket & Priority Assignment',
      top: '10%',
      left: '50%'
    },
    {
      id: 'assessment',
      title: 'Problem Assessment',
      icon: 'assessment',
      badge: 'Phase 2',
      description: 'Once the problem is identified, the development team investigates it. They determine: What is causing the problem? Which components are affected?',
      activities: [
        'Root cause investigation',
        'Component dependency analysis',
        'Cost and effort estimation',
        'Risk & side-effect assessment'
      ],
      output: 'Impact Assessment Report & Resource Allocation.',
      top: '30%',
      left: '84.6%'
    },
    {
      id: 'designing',
      title: 'Designing',
      icon: 'design_services',
      badge: 'Phase 3',
      description: 'After understanding the problem, developers design a technical solution. This determines how the software will be modified. It may involve: Designing changes to existing modules, Creating new components.',
      activities: [
        'Architecture & module redesign',
        'Database schema modifications',
        'API contract updates',
        'Test case design'
      ],
      output: 'Revised Technical Design Document & Test Specs.',
      top: '70%',
      left: '84.6%'
    },
    {
      id: 'execution',
      title: 'Execution Phase',
      icon: 'integration_instructions',
      badge: 'Phase 4',
      description: 'The actual implementation of the designed solution. Engineers write code, modify existing structures, and ensure the new logic aligns with system constraints.',
      activities: [
        'Code refactoring & bug fixing',
        'New logic implementation',
        'Version control branching & commits',
        'Peer code review'
      ],
      output: 'Updated Source Code & Code Review Approval.',
      top: '90%',
      left: '50%'
    },
    {
      id: 'testing',
      title: 'Testing',
      icon: 'bug_report',
      badge: 'Phase 5',
      description: 'Rigorous evaluation of the modified system. This includes unit testing, integration testing, and regression testing to ensure no existing functionality was broken.',
      activities: [
        'Automated unit & integration test run',
        'Regression testing execution',
        'Security & performance check',
        'Bug verification'
      ],
      output: 'Test Report & QA Approval.',
      top: '70%',
      left: '15.4%'
    },
    {
      id: 'acceptance',
      title: 'Acceptance Test',
      icon: 'fact_check',
      badge: 'Phase 6',
      description: 'Final validation by stakeholders or users. The system is reviewed to confirm that the original problem was resolved satisfactorily before deployment.',
      activities: [
        'User Acceptance Testing (UAT)',
        'Staging environment validation',
        'Stakeholder review & approval',
        'Production release deployment'
      ],
      output: 'Final UAT Approval & Production Release Note.',
      top: '30%',
      left: '15.4%'
    }
  ];

  // 3D Canvas Background Animation (Centered Orbit Ring & Purple Spheres)
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff6f3d, 2.5, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8071c9, 2.0, 50);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Tilted Primary Ring (#ff6f3d)
    const geometry = new THREE.TorusGeometry(3.3, 0.11, 32, 120);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff6f3d,
      emissive: 0xe05524,
      emissiveIntensity: 0.45,
      shininess: 100
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = Math.PI / 2.3;
    ring.rotation.y = -0.15;
    scene.add(ring);

    // Orbiting Purple Spheres (#8071c9)
    const nodesCount = 6;
    const spheres = [];
    const sizes = [0.32, 0.22, 0.28, 0.35, 0.24, 0.28];

    for (let i = 0; i < nodesCount; i++) {
      const nodeGeom = new THREE.SphereGeometry(sizes[i], 32, 32);
      const nodeMat = new THREE.MeshPhongMaterial({
        color: 0x8071c9,
        emissive: 0x6655b3,
        emissiveIntensity: 0.6,
        shininess: 90
      });
      const sphere = new THREE.Mesh(nodeGeom, nodeMat);

      const angle = (i / nodesCount) * Math.PI * 2;
      sphere.position.x = Math.cos(angle) * 3.3;
      sphere.position.z = Math.sin(angle) * 3.3;

      ring.add(sphere);
      spheres.push(sphere);
    }

    // Additional floating ambient particles
    const particleGeom = new THREE.SphereGeometry(0.14, 16, 16);
    const particleMat = new THREE.MeshPhongMaterial({
      color: 0x8071c9,
      emissive: 0x8071c9,
      emissiveIntensity: 0.7
    });

    const ambientParticles = [];
    for (let j = 0; j < 5; j++) {
      const p = new THREE.Mesh(particleGeom, particleMat);
      p.position.set(
        (Math.random() - 0.5) * 4.5,
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 4.5
      );
      scene.add(p);
      ambientParticles.push(p);
    }

    camera.position.z = 7.0;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous ring rotation
      ring.rotation.z += 0.007;

      // Pulse ambient particles
      ambientParticles.forEach((p, idx) => {
        p.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.003;
      });

      // Mouse tilt reaction
      const targetRotationY = mouseX * 0.35;
      const targetRotationX = mouseY * 0.35;

      ring.rotation.x += (targetRotationX + Math.PI / 2.3 - ring.rotation.x) * 0.05;
      ring.rotation.y += (targetRotationY - 0.15 - ring.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 520;
      const newHeight = container.clientHeight || 520;
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
      renderer.dispose();
    };
  }, []);

  const handleCardClick = (phase) => {
    setSelectedPhase(phase.id);
    setActiveModalPhase(phase);
  };

  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-[48px] py-10 md:py-16 space-y-16">
      {/* Header Section */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-display text-[40px] md:text-[52px] leading-[1.1] text-[#2b241f] font-bold">
          Maintenance Phases
        </h1>
        <p className="font-body-lg text-[18px] text-[#595147] leading-relaxed">
          Explore the cyclical process of software maintenance. Click on any phase card or node to expand it into full screen view.
        </p>
      </header>

      {/* Hexagonal Connected Orbit Visualization Area */}
      <section className="relative w-full flex flex-col items-center justify-center mb-16">
        <div className="relative w-full max-w-[520px] aspect-square mx-auto flex items-center justify-center">
          
          {/* SVG Dotted Connecting Line Hexagon Outline */}
          <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
            <polygon
              points="250,50 423.2,150 423.2,350 250,450 76.8,350 76.8,150"
              fill="rgba(255, 111, 61, 0.02)"
              stroke="#ff6f3d"
              strokeWidth="2.5"
              strokeDasharray="8 5"
              strokeOpacity="0.65"
            />
            <polygon
              points="250,50 423.2,150 423.2,350 250,450 76.8,350 76.8,150"
              fill="none"
              stroke="#8071c9"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
          </svg>

          {/* 3D WebGL Canvas Layer (Prominent 3D Tilted Ring & Orbiting Purple Spheres) */}
          <div
            ref={mountRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[2] opacity-100 overflow-hidden"
          />

          {/* Hexagonal Interactive Phase Nodes */}
          {phases.map((phase) => {
            const isSelected = selectedPhase === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => handleCardClick(phase)}
                style={{ top: phase.top, left: phase.left }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-center w-36 cursor-pointer z-20 transition-all duration-300 group hover:scale-110 ${
                  isSelected ? 'scale-110' : ''
                }`}
              >
                <div className={`w-16 h-16 rounded-full bg-[#ffffff] shadow-lg flex items-center justify-center border transition-all ${
                  isSelected
                    ? 'border-[#ff6f3d] ring-4 ring-[#ff6f3d]/25 text-[#ff6f3d]'
                    : 'border-[#dbd2c3] group-hover:border-[#ff6f3d] text-[#2b241f] group-hover:text-[#ff6f3d]'
                }`}>
                  <span className="material-symbols-outlined text-[32px]">{phase.icon}</span>
                </div>

                <span className={`font-label-md text-[13px] font-semibold px-3 py-1 rounded-md shadow-md transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#ff6f3d] text-white'
                    : 'bg-[#ffffff] text-[#2b241f] border border-[#dbd2c3] group-hover:border-[#ff6f3d]'
                }`}>
                  {phase.title}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Detailed Explanations Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phases.map((phase) => {
          const isSelected = selectedPhase === phase.id;
          return (
            <div
              key={phase.id}
              id={`phase-card-${phase.id}`}
              onClick={() => handleCardClick(phase)}
              className={`bg-[#ffffff] p-6 rounded-xl border shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1 ${
                isSelected
                  ? 'border-[#ff6f3d] ring-2 ring-[#ff6f3d] bg-[#f3ecdb]/30'
                  : 'border-[#dbd2c3] hover:border-[#ff6f3d] hover:shadow-lg'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f3ecdb] group-hover:bg-[#ffece4] flex items-center justify-center text-[#ff6f3d] transition-colors">
                    <span className="material-symbols-outlined text-[24px]">{phase.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-[18px] text-[#2b241f] font-semibold group-hover:text-[#ff6f3d] transition-colors">
                    {phase.title}
                  </h3>
                </div>
                <p className="font-body-md text-[15px] text-[#595147] leading-relaxed">
                  {phase.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f3ecdb] text-[13px] text-[#8071c9] font-medium flex items-center justify-between">
                <span>Click to Expand Card</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  open_in_full
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Screen-Fitting Fullscreen Blurred Modal Overlay */}
      {activeModalPhase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#2b241f]/60 backdrop-blur-md transition-all duration-300 animate-fadeIn cursor-pointer"
          onClick={() => setActiveModalPhase(null)}
        >
          <div
            className="bg-[#ffffff] border border-[#dbd2c3] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative space-y-6 cursor-default transition-all transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar: Badge & Close Button */}
            <div className="flex items-center justify-between">
              <span className="bg-[#ffece4] text-[#ff6f3d] px-4 py-1.5 rounded-full font-label-md text-[14px] font-bold border border-[#ff6f3d]/20">
                {activeModalPhase.badge}
              </span>
              <button
                onClick={() => setActiveModalPhase(null)}
                className="w-10 h-10 rounded-full bg-[#f3ecdb] hover:bg-[#e6dfcd] text-[#2b241f] flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close card"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Header: Large Icon & Title */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#ff6f3d] text-white flex items-center justify-center shadow-lg shrink-0">
                <span className="material-symbols-outlined text-[36px]">{activeModalPhase.icon}</span>
              </div>
              <div>
                <h2 className="font-display text-[28px] sm:text-[36px] font-bold text-[#2b241f] leading-tight">
                  {activeModalPhase.title}
                </h2>
                <span className="text-[14px] font-label-md text-[#8071c9] font-medium">
                  Software Maintenance Lifecycle Phase
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-body-lg text-[18px] sm:text-[20px] text-[#595147] leading-relaxed">
              {activeModalPhase.description}
            </p>

            {/* Additional Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#fcfaf7] border border-[#e6dfcd] rounded-xl p-5 space-y-2">
                <h4 className="font-label-md text-[13px] uppercase tracking-wider text-[#ff6f3d] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">checklist</span>
                  Key Activities
                </h4>
                <ul className="space-y-2 text-[15px] text-[#595147] font-medium">
                  {activeModalPhase.activities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#ff6f3d] font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#fcfaf7] border border-[#e6dfcd] rounded-xl p-5 space-y-2">
                <h4 className="font-label-md text-[13px] uppercase tracking-wider text-[#8071c9] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">task</span>
                  Phase Deliverable
                </h4>
                <p className="text-[15px] text-[#595147] font-medium leading-relaxed">
                  {activeModalPhase.output}
                </p>
              </div>
            </div>

            {/* Footer hint */}
            <div className="text-center text-[13px] text-[#8a8073] pt-4 border-t border-[#f3ecdb]">
              Click outside card or press Esc to close
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default PhasesScreen;

