"use client";

import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { PERSONAL_INFO } from "@/data/portfolio";
import {
  Code2,
  Cpu,
  Layers,
  Palette,
  Sparkles,
  BookOpen,
  MapPin,
  GraduationCap,
  Terminal,
  CheckCircle2,
} from "lucide-react";

const STRENGTH_CARDS = [
  {
    icon: <Code2 className="w-6 h-6 text-[var(--accent-cyan)]" />,
    title: "Full-Stack Architecture",
    description:
      "Engineering resilient systems using Next.js 14/16, React 18/19, Node.js, Express, and MongoDB Atlas. Focused on typed contracts, server actions, and micro-render optimization.",
    tags: ["MERN", "Next.js", "REST APIs", "Prisma"],
  },
  {
    icon: <Cpu className="w-6 h-6 text-violet-400" />,
    title: "AI Systems & Grounded Agents",
    description:
      "Building practical AI products with Gemini Vision, Claude API, Groq LPU, and LangChain. Implementing anti-hallucination guardrails, deterministic logic, and vector embeddings.",
    tags: ["Gemini 1.5", "Claude 3.5", "MediaPipe", "RAG"],
  },
  {
    icon: <Layers className="w-6 h-6 text-emerald-400" />,
    title: "Interactive 3D & Spatial Web",
    description:
      "Translating complex data into 60 FPS navigable 3D experiences with Three.js and React Three Fiber—from procedural terrain heightmaps to AST code-complexity cities.",
    tags: ["Three.js", "R3F", "GLSL Shaders", "Procedural Mesh"],
  },
  {
    icon: <Palette className="w-6 h-6 text-pink-400" />,
    title: "UI/UX & Deep Accessibility",
    description:
      "Designing inclusive software for deaf, mute, and visually impaired users. Combining Figma precision, tactile feedback, screen-reader navigation, and rich micro-animations.",
    tags: ["WCAG AA", "Figma", "Web Speech API", "Design Systems"],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Engineering Philosophy"
          title="Bridging Theoretical CS with"
          titleHighlight="Impactful Reality"
          subtitle="An Information Science engineer at Cambridge Institute of Technology turning frontier tech into production tools."
        />

        {/* Story & Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-[var(--border-card)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--accent-cyan)] uppercase">
                <Sparkles className="w-4 h-4" />
                <span>The Story</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)] mb-4">
                Shipping real-world software that solves urgent problems.
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                <p>
                  I am an Information Science and Engineering student at{" "}
                  <strong className="text-[var(--text-primary)]">
                    Cambridge Institute of Technology, Bangalore
                  </strong>{" "}
                  (B.E. ISE, CGPA 8.80, 2024–2028). My development journey isn&apos;t just about writing code—it&apos;s about building systems that dismantle barriers.
                </p>

                <p>
                  From engineering <strong className="text-[var(--text-primary)]">UnifyTalk</strong> (a 6-phase accessibility platform winning 1st Prize at AIdeastorm) to pioneering <strong className="text-[var(--text-primary)]">CropIQ 2.0</strong> for 140M Indian farming families in 9 vernacular languages, I thrive on tackling tough engineering challenges with speed and aesthetic excellence.
                </p>

                <p>
                  With <strong className="text-[var(--text-primary)]">7 internships</strong> completed across full-stack development, application engineering, and visual design, I bring real-world discipline, zero-dependency performance awareness, and strong collaborative ownership to every team I join.
                </p>
              </div>
            </div>

            {/* Quick Highlights Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-[var(--border-card)]">
              <div>
                <span className="text-2xl font-bold font-display text-[var(--text-primary)]">
                  8.80
                </span>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  Academic CGPA
                </p>
              </div>
              <div>
                <span className="text-2xl font-bold font-display text-[var(--accent-cyan)]">
                  7
                </span>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  Industry Internships
                </p>
              </div>
              <div>
                <span className="text-2xl font-bold font-display text-emerald-400">
                  14+
                </span>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  Shipped Projects
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Telemetry & Status Terminal */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] flex flex-col justify-between font-mono text-xs">
            {/* Terminal Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-[var(--text-muted)]">
                  bishnu@devbox:~
                </span>
              </div>

              {/* Developer Telemetry Items */}
              <div className="mt-5 space-y-4 text-[var(--text-secondary)]">
                <div>
                  <span className="text-[var(--accent-cyan)] font-semibold">$ identity --status</span>
                  <p className="mt-1 text-slate-300">
                    Bishnu Kumar Sardar • Full-Stack & AI Builder
                  </p>
                </div>

                <div>
                  <span className="text-violet-400 font-semibold">$ education --current</span>
                  <div className="mt-1 space-y-1 text-slate-300">
                    <p className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                      Cambridge Institute of Technology, Bangalore
                    </p>
                    <p className="flex items-center gap-1.5 text-[var(--text-muted)]">
                      <MapPin className="w-3.5 h-3.5" />
                      Karnataka, India (2024 – 2028)
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-emerald-400 font-semibold">$ exploring --frontier</span>
                  <div className="mt-1 space-y-1 text-slate-300">
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Artificial Intelligence & Deep Learning
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Autonomous Multi-Agent Systems
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Spatial Computing & 3D Shaders
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-pink-400 font-semibold">$ contact --verified</span>
                  <p className="mt-1 text-slate-300">
                    bishnusardar235@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Status Indicator */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Summer 2026/2027
              </span>
              <span className="text-[var(--text-muted)]">Bangalore, IN</span>
            </div>
          </div>

        </div>

        {/* "What I Excel At" 4 Pillar Cards */}
        <div>
          <div className="mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-violet)]" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--accent-violet)] font-semibold">
              Core Technical Competencies
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STRENGTH_CARDS.map((card, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-2xl border border-[var(--border-card)] glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10 mb-4">
                    {card.icon}
                  </div>
                  <h4 className="text-lg font-bold font-display text-[var(--text-primary)] mb-2">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-[var(--text-muted)] border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
