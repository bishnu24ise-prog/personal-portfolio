"use client";

import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { EDUCATION_DATA } from "@/data/portfolio";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export default function EducationSection() {
  return (
    <section id="education" className="py-20 lg:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Academic Background"
          title="Educational Foundation &"
          titleHighlight="Scholastic Honors"
          subtitle="A consistent trajectory of academic distinction, algorithmic foundation, and systems engineering."
        />

        {/* Education Cards */}
        <div className="space-y-8">
          {EDUCATION_DATA.map((edu, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] glass-panel-hover relative overflow-hidden"
            >
              {/* Accent highlight strip on first item (Degree) */}
              {idx === 0 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-cyan)] via-[#38BDF8] to-[var(--accent-violet)]" />
              )}

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[var(--accent-cyan)]">
                    <GraduationCap className="w-4 h-4" />
                    <span>{idx === 0 ? "Undergraduate Degree" : "Secondary & Higher Secondary"}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)]">
                    {edu.degree}
                  </h3>

                  <div className="text-sm sm:text-base font-semibold text-slate-200 mt-1">
                    {edu.institution}
                  </div>

                  <div className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                    {edu.period}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl text-xs font-mono font-bold bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/25">
                    <Award className="w-3.5 h-3.5" />
                    {edu.score}
                  </span>
                </div>
              </div>

              {/* Coursework & Distinctions */}
              <div className="mt-6 pt-5 border-t border-white/5">
                <h4 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  Highlights & Rigor
                </h4>
                <div className="space-y-2">
                  {edu.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
