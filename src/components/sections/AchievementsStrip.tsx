"use client";

import React from "react";
import { Trophy, Medal, Globe, Award, Zap, ArrowUpRight } from "lucide-react";
import { HEADLINE_ACHIEVEMENTS } from "@/data/portfolio";
import CountUp from "@/components/ui/CountUp";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

export default function AchievementsStrip() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Trophy":
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case "Medal":
        return <Medal className="w-5 h-5 text-cyan-400" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-violet-400" />;
      case "Award":
        return <Award className="w-5 h-5 text-emerald-400" />;
      case "Zap":
      default:
        return <Zap className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section id="achievements" className="relative py-12 border-y border-[var(--border-card)] bg-[var(--bg-secondary)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip Header Label */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--accent-cyan)] font-semibold">
              Headline Honors & Competitive Distinctions
            </h3>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-[var(--text-muted)]">
            Verified Records • 2024–2026
          </span>
        </div>

        {/* 5 Distinct Achievement Cards with 3D Tilt Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {HEADLINE_ACHIEVEMENTS.map((item) => (
            <Tilt3DCard key={item.id} maxTilt={10} scale={1.03} className="h-full">
              <div
                className="group relative p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between border border-[var(--border-card)] transition-all duration-300 h-full preserve-3d"
              >
                {/* Subtle Ambient Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between mb-3 translate-z-10">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {getIcon(item.iconName)}
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--text-secondary)]">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Main Metric Count-Up */}
                <div className="my-2 translate-z-20">
                  <div className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[var(--text-primary)]">
                    <CountUp value={item.statNumber || item.title} />
                  </div>
                  <div className="text-xs font-mono text-[var(--accent-cyan)] mt-0.5">
                    {item.statLabel || item.event}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="mt-2 pt-2 border-t border-white/5 translate-z-10">
                  <h4 className="text-xs font-semibold text-[var(--text-primary)] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>

      </div>
    </section>
  );
}
