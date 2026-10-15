"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Terminal, Sparkles, Layers, Cpu, Box, ShieldCheck, Compass, Globe } from "lucide-react";

interface ProjectImageProps {
  src?: string;
  alt: string;
  slug: string;
  title: string;
  accentColor?: string;
  category?: string[];
  className?: string;
}

export default function ProjectImageFallback({
  src,
  alt,
  slug,
  title,
  accentColor = "#00F5D4",
  category = [],
  className = "",
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);

  // Return custom futuristic icon based on slug/category
  const getIcon = () => {
    if (slug.includes("unify")) return <ShieldCheck className="w-10 h-10 text-[var(--accent-cyan)]" />;
    if (slug.includes("crop")) return <Sparkles className="w-10 h-10 text-emerald-400" />;
    if (slug.includes("devmap")) return <Layers className="w-10 h-10 text-violet-400" />;
    if (slug.includes("topo")) return <Compass className="w-10 h-10 text-cyan-400" />;
    if (slug.includes("awaz")) return <Globe className="w-10 h-10 text-purple-400" />;
    if (slug.includes("receipt")) return <ShieldCheck className="w-10 h-10 text-pink-400" />;
    return <Cpu className="w-10 h-10 text-sky-400" />;
  };

  if (src && !hasError) {
    return (
      <div className={`relative overflow-hidden group/img w-full h-full ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
          onError={() => setHasError(true)}
          priority={slug === "unifytalk"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />
      </div>
    );
  }

  // Visual Futuristic Geometric Mesh UI Fallback
  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-6 overflow-hidden bg-gradient-to-br from-[#0c101a] via-[#121828] to-[#0a0d14] border border-white/5 ${className}`}
      style={{
        boxShadow: `inset 0 0 40px -10px ${accentColor}15`,
      }}
    >
      {/* Background Cyber Grid Lines */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      {/* Decorative Glow Orb */}
      <div
        className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* Top Header Strip */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="uppercase tracking-wider opacity-80">PROJ_{slug.toUpperCase().slice(0, 8)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          <span className="text-[10px] uppercase font-semibold text-slate-300">
            {category[0] || "PROTOTYPE"}
          </span>
        </div>
      </div>

      {/* Center Icon & Monogram */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-6">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md mb-3 transition-transform duration-500 hover:scale-110"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${accentColor}25, transparent 80%)`,
          }}
        >
          {getIcon()}
        </div>
        <p className="text-sm font-display font-semibold text-slate-200 tracking-wide text-center">
          {title}
        </p>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400">
        <span className="opacity-70">Interactive Build</span>
        <span className="flex items-center gap-1 text-[10px]" style={{ color: accentColor }}>
          <Box className="w-3 h-3" />
          SHIPPED
        </span>
      </div>
    </div>
  );
}
