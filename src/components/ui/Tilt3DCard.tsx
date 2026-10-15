"use client";

import React, { useRef, useState, useEffect } from "react";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  onClick?: () => void;
}

export default function Tilt3DCard({
  children,
  className = "",
  maxTilt = 12,
  scale = 1.02,
  glare = true,
  onClick,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: "transform 0.1s ease-out",
      transformStyle: "preserve-3d",
    });

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlareStyle({
        opacity: 0.8,
        background: `radial-gradient(circle 280px at ${glareX}% ${glareY}%, rgba(0, 245, 212, 0.18), rgba(139, 92, 246, 0.08) 40%, transparent 80%)`,
        transition: "opacity 0.2s ease-out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (isReducedMotion) return;
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      transformStyle: "preserve-3d",
    });
    setGlareStyle({
      opacity: 0,
      transition: "opacity 0.5s ease-out",
    });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <div
          aria-hidden="true"
          style={glareStyle}
          className="absolute inset-0 rounded-inherit pointer-events-none rounded-[inherit] overflow-hidden z-20"
        />
      )}
    </div>
  );
}
