import React, { useEffect, useState, useRef } from 'react';
import { ThemeColors } from '../types';
import { ThreeCanvas } from './ThreeCanvas';

interface BackgroundDecorProps {
  theme: ThemeColors;
  show3D?: boolean;
}

export const BackgroundDecor: React.FC<BackgroundDecorProps> = ({ theme, show3D = true }) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const targetPos = useRef({ x: -1000, y: -1000 });
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isHovering) setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth spring interpolation for the spotlight
    const updateMotion = () => {
      setMousePos((prev) => {
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      animFrame.current = requestAnimationFrame(updateMotion);
    };

    animFrame.current = requestAnimationFrame(updateMotion);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrame.current);
    };
  }, [isHovering]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Deep Atmospheric Base Tone */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ backgroundColor: theme.bg }}
      />

      {/* 2. Primary Top-Center Overhead Stage Light (Cinematic Hero Spotlight) */}
      <div
        className="absolute -top-[160px] left-1/2 -translate-x-1/2 w-[1200px] h-[680px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 opacity-60"
        style={{
          background: `radial-gradient(ellipse at center, ${theme.primary} 0%, ${theme.secondary} 45%, transparent 75%)`,
        }}
      />

      {/* 3. Floating Aurora Orb (Right - Secondary Color) */}
      <div
        className="absolute top-[35%] -right-[15%] w-[800px] h-[800px] rounded-full blur-[160px] pointer-events-none animate-ambient-1 transition-all duration-1000 opacity-40"
        style={{
          background: `radial-gradient(circle, ${theme.secondary} 0%, transparent 70%)`,
        }}
      />

      {/* 4. Floating Aurora Orb (Left - Accent / Bio Tone) */}
      <div
        className="absolute top-[65%] -left-[12%] w-[750px] h-[750px] rounded-full blur-[150px] pointer-events-none animate-ambient-2 transition-all duration-1000 opacity-35"
        style={{
          background: `radial-gradient(circle, ${theme.accent} 0%, transparent 70%)`,
        }}
      />

      {/* 5. Interactive Cursor Spotlight (Tracks user mouse with soft luminescence) */}
      {isHovering && (
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[80px] pointer-events-none transition-opacity duration-300"
          style={{
            transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
            background: `radial-gradient(circle, ${theme.primary}18 0%, transparent 70%)`,
            opacity: 0.8,
          }}
        />
      )}

      {/* 6. 3D Neural Network / Holographic Brain Canvas */}
      {show3D && (
        <div className="absolute inset-0 pointer-events-auto opacity-75 mix-blend-screen transition-opacity duration-700">
          <ThreeCanvas theme={theme} />
        </div>
      )}

      {/* 7. Precision Micro-Dot Matrix Overlay with Radial Mask */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(${theme.primary}40 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 45%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 45%, black 20%, transparent 85%)',
        }}
      />

      {/* 8. Fine Engineering Cyber Grid with Soft Edge Dissolve */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `linear-gradient(to right, ${theme.border} 1px, transparent 1px), linear-gradient(to bottom, ${theme.border} 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 25%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 25%, transparent 90%)',
        }}
      />

      {/* 9. Perimeter Cinematic Vignette (Locks contrast and centers attention) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.65) 100%)',
        }}
      />
    </div>
  );
};
