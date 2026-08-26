import React, { useState, useEffect, useRef } from 'react';
import { sectionsData } from '../data/presentationData';
import { Scene3D } from '../canvas/Scene3D';
import { Navigation } from './Navigation';
import { SectionNavigator } from './SectionNavigator';
import { PresenterInfoModal } from './PresenterInfoModal';
import { SystemStatusHUD } from './SystemStatusHUD';
import { LifecycleTimeline } from './LifecycleTimeline';
import { UIOverlay } from './UIOverlay';

export function Presentation() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPresenterMode, setIsPresenterMode] = useState(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  // Student Details State
  const [studentData, setStudentData] = useState({
    name: "Rakshitha M R",
    usn: "1MS21CS001",
    classSection: "Computer Science — 6th Sem",
    teamMembers: "Self / Individual Presentation"
  });

  const scrollContainerRef = useRef(null);

  // Handle scroll event to update active section index & scroll progress
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const totalScrollable = scrollHeight - clientHeight;
      if (totalScrollable <= 0) return;

      const progress = scrollTop / totalScrollable;
      setScrollProgress(progress);

      const sectionHeight = totalScrollable / (sectionsData.length - 1);
      const rawSection = Math.round(scrollTop / sectionHeight);
      const clampedSection = Math.min(Math.max(rawSection, 0), sectionsData.length - 1);

      setActiveSection(clampedSection);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation listener (Arrow Up / Arrow Down / Space / ESC / Home / End)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isNavigatorOpen || isStudentModalOpen) {
        if (e.key === 'Escape') {
          setIsNavigatorOpen(false);
          setIsStudentModalOpen(false);
        }
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        navigateToSection(activeSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        navigateToSection(activeSection - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        navigateToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        navigateToSection(sectionsData.length - 1);
      } else if (e.key === 'Escape') {
        setIsPresenterMode(false);
      } else if (e.key === 'p' || e.key === 'P') {
        setIsPresenterMode((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isNavigatorOpen, isStudentModalOpen]);

  // Programmatically scroll to section index
  const navigateToSection = (targetIndex) => {
    const clampedIndex = Math.min(Math.max(targetIndex, 0), sectionsData.length - 1);
    const container = scrollContainerRef.current;
    if (!container) return;

    const sectionHeight = (container.scrollHeight - container.clientHeight) / (sectionsData.length - 1);
    container.scrollTo({
      top: clampedIndex * sectionHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#090d16] text-white select-none">
      
      {/* 3D Ecosystem Background Canvas */}
      <Scene3D activeSection={activeSection} scrollProgress={scrollProgress} />

      {/* Top Glassmorphic Navigation */}
      <Navigation
        activeSection={activeSection}
        onNavigate={navigateToSection}
        isPresenterMode={isPresenterMode}
        togglePresenterMode={() => setIsPresenterMode(!isPresenterMode)}
        toggleNavigator={() => setIsNavigatorOpen(true)}
        toggleStudentModal={() => setIsStudentModalOpen(true)}
      />

      {/* Real-time System Status Telemetry HUD */}
      <SystemStatusHUD
        activeSection={activeSection}
        isPresenterMode={isPresenterMode}
      />

      {/* Lifecycle Stage Progress Bar */}
      <LifecycleTimeline
        activeSection={activeSection}
        isPresenterMode={isPresenterMode}
      />

      {/* Centered Presentation Slide Content Overlay */}
      <UIOverlay
        activeSection={activeSection}
        onNavigate={navigateToSection}
        isPresenterMode={isPresenterMode}
        studentData={studentData}
        openStudentModal={() => setIsStudentModalOpen(true)}
      />

      {/* Section Jump Drawer Modal */}
      <SectionNavigator
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
        activeSection={activeSection}
        onSelectSection={navigateToSection}
      />

      {/* Presenter Details & Speaker Notes Modal */}
      <PresenterInfoModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        studentData={studentData}
        onSave={setStudentData}
        activeSection={activeSection}
      />

      {/* Scroll Proxy Container (enables vertical scroll progression) */}
      <div
        ref={scrollContainerRef}
        className="absolute inset-0 z-20 overflow-y-auto pointer-events-auto snap-y snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {sectionsData.map((sec) => (
          <div
            key={sec.id}
            className="w-full h-screen snap-start flex-shrink-0"
          />
        ))}
      </div>

    </div>
  );
}
