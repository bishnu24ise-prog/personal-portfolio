"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectImageFallback from "@/components/ui/ProjectImageFallback";
import ProjectModal from "@/components/sections/ProjectModal";
import {
  FEATURED_PROJECTS,
  MORE_PROJECTS,
  OPEN_SOURCE_SPOTLIGHT,
} from "@/data/portfolio";
import { Project, ProjectCategory } from "@/types/portfolio";
import {
  ExternalLink,
  Trophy,
  Users,
  ChevronDown,
  ChevronUp,
  GitPullRequest,
  Star,
  Eye,
  Layers,
  Sparkles,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "AI",
  "3D",
  "Accessibility",
  "Agri-Tech",
  "Web3",
  "Full-Stack",
  "Design",
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects by active category
  const filterList = (list: Project[]) => {
    if (activeCategory === "All") return list;
    return list.filter((p) => p.category.includes(activeCategory));
  };

  const filteredFeatured = filterList(FEATURED_PROJECTS);
  const filteredMore = filterList(MORE_PROJECTS);

  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Product Portfolio"
          title="Engineered for Impact:"
          titleHighlight="Featured Case Studies"
          subtitle="Explore shipped production applications across AI, accessibility, 3D computer graphics, and distributed systems."
        />

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-[var(--accent-cyan)] text-[#090B10] font-semibold shadow-md shadow-[var(--accent-cyan)]/25 scale-105"
                    : "bg-[var(--bg-secondary)]/80 text-[var(--text-secondary)] border border-[var(--border-card)] hover:text-[var(--text-primary)] hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 6 Featured Projects Grid (Large Case-Study Cards) */}
        <div className="space-y-12 mb-16">
          {filteredFeatured.map((project, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={project.id}
                className="group relative rounded-3xl glass-panel border border-[var(--border-card)] p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-[var(--border-card-hover)]"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Visual Preview / Fallback Card with 3D Tilt Motion */}
                  <Tilt3DCard
                    maxTilt={8}
                    scale={1.02}
                    className={`lg:col-span-6 w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/10 relative group-hover:shadow-2xl transition duration-500 cursor-pointer ${
                      isReversed ? "lg:order-2" : "lg:order-1"
                    }`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <ProjectImageFallback
                      src={`/images/projects/${project.slug}-1.png`}
                      alt={project.title}
                      slug={project.slug}
                      title={project.title}
                      accentColor={project.accentColor}
                      category={project.category}
                    />

                    {/* Quick view button on hover */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <span className="px-4 py-2 rounded-xl bg-white/10 text-white font-mono text-xs flex items-center gap-2 border border-white/20">
                        <Eye className="w-4 h-4 text-[var(--accent-cyan)]" />
                        Explore Case Study
                      </span>
                    </div>
                  </Tilt3DCard>

                  {/* Case Study Details Column */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-between ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {project.awardBadge && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            <Trophy className="w-3.5 h-3.5" />
                            <span>{project.awardBadge}</span>
                          </div>
                        )}
                        {project.category.map((cat) => (
                          <span
                            key={cat}
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 text-[var(--accent-cyan)] border border-white/10"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)] mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-[var(--accent-cyan)] mb-4">
                        {project.subtitle}
                      </p>

                      {/* Problem & Solution Snip */}
                      <div className="space-y-3 mb-5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        <p>
                          <strong className="text-rose-400 font-mono text-xs uppercase block mb-0.5">
                            Problem
                          </strong>
                          {project.problem}
                        </p>
                        <p>
                          <strong className="text-[var(--accent-cyan)] font-mono text-xs uppercase block mb-0.5">
                            Solution & Architecture
                          </strong>
                          {project.solution}
                        </p>
                      </div>

                      {/* Small Architecture Flow Preview if present */}
                      {project.architectureDiagram && (
                        <div className="p-3 mb-5 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-slate-300">
                          <span className="text-[var(--accent-cyan)] font-semibold block mb-1">
                            Architecture Pipeline:
                          </span>
                          <span className="text-slate-400 line-clamp-2">
                            {project.architectureDiagram}
                          </span>
                        </div>
                      )}

                      {/* Role & Team attribution */}
                      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-5">
                        <Users className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                        <span>{project.role}</span>
                        {project.team && (
                          <>
                            <span>•</span>
                            <span className="text-slate-400">{project.team}</span>
                          </>
                        )}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.stack.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-slate-300 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 6 && (
                          <span className="px-2 py-1 rounded-md text-[11px] font-mono text-[var(--text-muted)]">
                            +{project.stack.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Links & Modal Trigger */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-[#090B10] bg-[var(--accent-cyan)] hover:brightness-110 shadow-sm transition-all"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors ml-auto cursor-pointer"
                      >
                        <span>Deep Dive</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Toggle Button for More Projects */}
        <div className="text-center mb-16">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass-panel text-xs font-mono font-semibold text-[var(--accent-cyan)] border border-[var(--border-card)] hover:border-[var(--accent-cyan)] transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
          >
            {showAllProjects ? (
              <>
                <span>Hide Additional Projects</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Show All Projects ({MORE_PROJECTS.length} more builds)</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Compact Grid for More Projects */}
        {showAllProjects && (
          <div className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--accent-cyan)] font-semibold">
                Additional Production & Hackathon Builds
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMore.map((project) => (
                <Tilt3DCard key={project.id} maxTilt={8} scale={1.02} className="h-full">
                  <div
                    className="rounded-2xl glass-panel p-6 border border-[var(--border-card)] flex flex-col justify-between glass-panel-hover h-full preserve-3d"
                  >
                    <div>
                      {/* Top Monogram / Categories */}
                      <div className="flex items-center justify-between mb-4 translate-z-10">
                        <div className="flex flex-wrap gap-1">
                          {project.category.map((c) => (
                            <span
                              key={c}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[var(--accent-cyan)] border border-white/5"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          {project.id.toUpperCase().slice(0, 8)}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold font-display text-[var(--text-primary)] mb-1 translate-z-20">
                        {project.title}
                      </h4>
                      <p className="text-xs font-mono text-[var(--accent-cyan)] mb-3 translate-z-10">
                        {project.tagline}
                      </p>

                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                        {project.solution}
                      </p>

                      {project.todoNote && (
                        <p className="text-[11px] font-mono text-amber-300/80 mb-3 bg-amber-500/10 p-2 rounded-lg">
                          {project.todoNote}
                        </p>
                      )}

                      {/* Stack tags */}
                      <div className="flex flex-wrap gap-1 mb-5">
                        {project.stack.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 translate-z-10">
                      <div className="flex items-center gap-2">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-[var(--accent-cyan)] hover:underline"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-[var(--text-secondary)] hover:text-white"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>Code</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-cyan)]"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                </Tilt3DCard>
              ))}
            </div>
          </div>
        )}

        {/* Open Source Spotlight Card */}
        <div className="rounded-3xl glass-panel p-8 border border-[var(--accent-cyan)]/20 relative overflow-hidden bg-gradient-to-r from-[#090b10] via-[#0f1422] to-[#090b10]">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <GitPullRequest className="w-48 h-48 text-[var(--accent-cyan)]" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30 mb-3">
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>Open Source Initiative</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)] mb-2">
                {OPEN_SOURCE_SPOTLIGHT.title}
              </h3>
              <p className="text-sm font-mono text-[var(--accent-cyan)] mb-3">
                {OPEN_SOURCE_SPOTLIGHT.tagline}
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-4">
                {OPEN_SOURCE_SPOTLIGHT.description}
              </p>

              <div className="flex flex-wrap gap-2 text-xs font-mono text-[var(--text-muted)]">
                {OPEN_SOURCE_SPOTLIGHT.tech.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:items-start lg:items-end justify-center gap-3">
              <div className="text-xs font-mono text-emerald-400">
                {OPEN_SOURCE_SPOTLIGHT.contributions}
              </div>
              <a
                href={OPEN_SOURCE_SPOTLIGHT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-semibold text-[#090B10] bg-[var(--accent-cyan)] hover:brightness-110 shadow-md shadow-[var(--accent-cyan)]/25 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Contribute on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
