"use client";

import React, { useEffect } from "react";
import { Project } from "@/types/portfolio";
import {
  X,
  ExternalLink,
  Trophy,
  Users,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import ProjectImageFallback from "@/components/ui/ProjectImageFallback";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel bg-[var(--bg-secondary)] border border-[var(--border-card-hover)] p-6 sm:p-8 shadow-2xl text-[var(--text-primary)] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {project.awardBadge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
              <Trophy className="w-3.5 h-3.5" />
              <span>{project.awardBadge}</span>
            </div>
          )}
          {project.category.map((cat) => (
            <span
              key={cat}
              className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/5 text-[var(--accent-cyan)] border border-white/10"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Title & Tagline */}
        <h3
          id="project-modal-title"
          className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[var(--text-primary)] mb-2"
        >
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-[var(--accent-cyan)] font-mono mb-6">
          {project.tagline}
        </p>

        {/* Visual Preview / Fallback Header */}
        <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-8 border border-white/10">
          <ProjectImageFallback
            src={`/images/projects/${project.slug}-1.png`}
            alt={project.title}
            slug={project.slug}
            title={project.title}
            accentColor={project.accentColor}
            category={project.category}
          />
        </div>

        {/* Team & My Role Line */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[var(--accent-cyan)]" />
            <span className="text-[var(--text-muted)]">My Role:</span>
            <strong className="text-slate-200">{project.role}</strong>
          </div>
          {project.team && (
            <div className="text-[var(--text-muted)] sm:text-right">
              Team: <span className="text-slate-300">{project.team}</span>
            </div>
          )}
        </div>

        {/* Case Study Grid: Problem -> Solution -> Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Problem */}
          <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20">
            <div className="text-xs font-mono text-rose-400 uppercase font-bold tracking-wider mb-2 flex items-center gap-1.5">
              <span>01. The Problem</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
            <div className="text-xs font-mono text-[var(--accent-cyan)] uppercase font-bold tracking-wider mb-2 flex items-center gap-1.5">
              <span>02. The Architecture</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Impact */}
          <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
            <div className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider mb-2 flex items-center gap-1.5">
              <span>03. The Impact</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.impact || "Delivered a verifiable, high-performance solution solving end-user friction."}
            </p>
          </div>
        </div>

        {/* Architecture Diagram if available */}
        {project.architectureDiagram && (
          <div className="mb-8 p-5 rounded-2xl bg-[#090b10] border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-cyan-400">
              <Terminal className="w-4 h-4" />
              <span>System Flow Architecture</span>
            </div>
            <div className="font-mono text-xs text-slate-300 bg-black/40 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap leading-relaxed border border-white/5">
              {project.architectureDiagram}
            </div>
          </div>
        )}

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3">
              Key Engineering Differentiators
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-secondary)] p-2.5 rounded-xl bg-white/5 border border-white/5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="mb-8">
          <h4 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3">
            Technologies & APIs
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 text-slate-200 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* TODO Note if applicable */}
        {project.todoNote && (
          <div className="mb-8 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300">
            {project.todoNote}
          </div>
        )}

        {/* Footer CTAs: Live & GitHub */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border-card)]">
          <div className="flex items-center gap-3">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold text-[#090B10] bg-[var(--accent-cyan)] hover:brightness-110 shadow-md shadow-[var(--accent-cyan)]/20 transition-all"
              >
                <span>Launch Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold text-slate-200 glass-panel glass-panel-hover border border-white/10 transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.links.backend && (
              <a
                href={project.links.backend}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Backend Repo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-[var(--text-muted)] hover:text-white transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
