import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });

      const target = e.target;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  const rotation = isHovered ? 135 : 45;
  const outerScale = isClicking ? 0.85 : isHovered ? 1.35 : 1.0;
  const innerScale = isClicking ? 0.75 : isHovered ? 1.25 : 1.0;

  return (
    <>
      {/* Outer Small Glowing Diamond Frame */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-5 h-5 border-2 border-[#ff6f3d] bg-[#ff6f3d]/20 rounded-[1px] shadow-[0_0_10px_rgba(255,111,61,0.5)] z-[9999] transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${outerScale})`,
          opacity: position.x < 0 ? 0 : 1
        }}
      />

      {/* Inner Small Diamond Core */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 bg-[#ff6f3d] rounded-[0.5px] shadow-[0_0_6px_#ff6f3d] z-[10000] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${innerScale})`,
          opacity: position.x < 0 ? 0 : 1
        }}
      />
    </>
  );
}

export default CustomCursor;
