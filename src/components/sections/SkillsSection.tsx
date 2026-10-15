"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { SKILL_GROUPS, CURRENTLY_EXPLORING } from "@/data/portfolio";
import {
  Code,
  Globe,
  Cpu,
  Smartphone,
  Wrench,
  Binary,
  Sparkles,
  Check,
  TrendingUp,
} from "lucide-react";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case "CS Core & System Design":
        return <Binary className="w-5 h-5 text-amber-400" />;
      case "Languages":
        return <Code className="w-5 h-5 text-[var(--accent-cyan)]" />;
      case "Web & Full-Stack":
        return <Globe className="w-5 h-5 text-emerald-400" />;
      case "AI & Web3":
        return <Cpu className="w-5 h-5 text-violet-400" />;
      case "Mobile & UI/UX Design":
        return <Smartphone className="w-5 h-5 text-pink-400" />;
      case "Developer Tools & Cloud":
      default:
        return <Wrench className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Technical Capabilities"
          title="Battle-Tested"
          titleHighlight="Tech Stack & Tooling"
          subtitle="Proficiency spanning systems programming, scalable web architecture, multi-modal AI agents, and 3D computer graphics."
        />

        {/* 5 Visual Categories Grid with 3D Tilt Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SKILL_GROUPS.map((group) => (
            <Tilt3DCard key={group.name} maxTilt={8} scale={1.02} className="h-full">
              <div
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--border-card)] glass-panel-hover flex flex-col justify-between h-full preserve-3d"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3 translate-z-10">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      {getCategoryIcon(group.name)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-display text-[var(--text-primary)]">
                        {group.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-2 mt-6 translate-z-10">
                    {group.skills.map((skill) => {
                      const isHovered = hoveredSkill === skill.name;
                      return (
                        <div
                          key={skill.name}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className={`group/pill relative px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-default border ${
                            isHovered
                              ? "bg-white/15 border-white/30 text-white shadow-md scale-105"
                              : "bg-white/5 border-white/5 text-slate-300 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            {skill.color && (
                              <span
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: skill.color }}
                              />
                            )}
                            <span>{skill.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Count Indicator */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] translate-z-10">
                  <span>{group.skills.length} core technologies</span>
                  <span className="text-[var(--accent-cyan)]">Active</span>
                </div>
              </div>
            </Tilt3DCard>
          ))}

          {/* "Currently Exploring" Spotlight Card */}
          <Tilt3DCard maxTilt={8} scale={1.02} className="h-full md:col-span-2 lg:col-span-1">
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--accent-cyan)]/30 bg-gradient-to-br from-[#090b10] via-[#0d1624] to-[#090b10] flex flex-col justify-between h-full preserve-3d">
              <div>
                <div className="flex items-center gap-3 mb-3 translate-z-10">
                  <div className="p-2.5 rounded-xl bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/25">
                    <TrendingUp className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-[var(--text-primary)]">
                      {CURRENTLY_EXPLORING.title}
                    </h3>
                    <p className="text-xs text-[var(--accent-cyan)] font-mono">
                      Next-Generation Frontiers
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] mt-4 leading-relaxed mb-6">
                  Active research and project-based exploration extending full-stack development into machine learning primitives and GPU computing:
                </p>

                <div className="space-y-2.5 translate-z-10">
                  {CURRENTLY_EXPLORING.topics.map((topic, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-slate-200"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[var(--accent-cyan)] shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-400 translate-z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Active Learning Cycle
                </span>
                <span className="text-[var(--text-muted)]">2026</span>
              </div>
            </div>
          </Tilt3DCard>
        </div>

      </div>
    </section>
  );
}
