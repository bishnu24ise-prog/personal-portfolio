"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CertificateModal from "@/components/sections/CertificateModal";
import { EXPERIENCES } from "@/data/portfolio";
import { Experience } from "@/types/portfolio";
import {
  Briefcase,
  Calendar,
  MapPin,
  Award,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileBadge,
} from "lucide-react";

export default function ExperienceSection() {
  const [activeCert, setActiveCert] = useState<{
    isOpen: boolean;
    title: string;
    issuer: string;
    imagePath: string;
    caption?: string;
  }>({
    isOpen: false,
    title: "",
    issuer: "",
    imagePath: "",
  });

  const handleOpenCert = (exp: Experience) => {
    setActiveCert({
      isOpen: true,
      title: exp.certificateTitle || `${exp.role} - ${exp.company}`,
      issuer: exp.company,
      imagePath: exp.certificateUrl || "/certificates/devstack-award.jpg",
      caption: exp.award || `Internship credential authenticated by ${exp.company}.`,
    });
  };

  return (
    <section id="experience" className="py-20 lg:py-28 relative bg-[var(--bg-secondary)]/30 border-t border-[var(--border-card)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Work History"
          title="Professional Experience &"
          titleHighlight="Internships"
          subtitle="6 industry internships bridging full-stack software development, AI systems, and government-certified visual design."
        />

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-[11px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-[var(--accent-cyan)] before:via-violet-500/50 before:to-transparent">
          
          {EXPERIENCES.map((exp, index) => (
            <div key={exp.id} className="relative group">
              
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[30px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-cyan)] flex items-center justify-center shadow-md shadow-[var(--accent-cyan)]/25 group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
              </div>

              {/* Experience Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] glass-panel-hover">
                
                {/* Top Role & Award Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)]">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-[var(--accent-cyan)] flex items-center gap-2 mt-0.5">
                      <span>{exp.company}</span>
                      <span className="text-[var(--text-muted)]">•</span>
                      <span className="text-xs font-mono text-[var(--text-secondary)] font-normal flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Period Pill */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                      <Calendar className="w-3 h-3 text-[var(--accent-cyan)]" />
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Outstanding Intern Award Highlight Banner */}
                {exp.award && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 rounded-xl bg-gradient-to-r from-amber-500/15 to-amber-600/5 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>{exp.award}</span>
                  </div>
                )}

                {/* Bullets List */}
                <ul className="space-y-2.5 mb-6">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* TODO Notice if pending supervisor metrics */}
                {exp.isTodo && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-300 mb-6">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Verified internship placement. Detailed supervisor milestones to be updated.</span>
                  </div>
                )}

                {/* Bottom Bar: Tech Stack & View Certificate Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack?.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-slate-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* View Certificate Modal Trigger */}
                  <button
                    onClick={() => handleOpenCert(exp)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/25 hover:bg-[var(--accent-cyan)]/20 transition-colors ml-auto sm:ml-0"
                  >
                    <FileBadge className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Certificate Viewer Modal */}
      <CertificateModal
        isOpen={activeCert.isOpen}
        onClose={() => setActiveCert((prev) => ({ ...prev, isOpen: false }))}
        title={activeCert.title}
        issuer={activeCert.issuer}
        imagePath={activeCert.imagePath}
        caption={activeCert.caption}
      />
    </section>
  );
}
