"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  ArrowDown,
  FileText,
  Mail,
  Sparkles,
  ExternalLink,
  Code2,
  Terminal,
  Trophy,
  Volume2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolio";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

// Dynamically import 3D Canvas Scene with SSR disabled to guarantee zero hydration errors
const Hero3DScene = dynamic(() => import("@/components/3d/Hero3DScene"), {
  ssr: false,
});

export default function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [profileImgError, setProfileImgError] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const roles = PERSONAL_INFO.titles;
    const currentFullRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullRole.substring(0, displayText.length + 1));
        if (displayText.length === currentFullRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentFullRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 3D WebGL Background Scene */}
      <Hero3DScene />

      {/* Ambient Radial Lighting Overlays */}
      <div className="ambient-glow-cyan absolute -top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] pointer-events-none" />
      <div className="ambient-glow-violet absolute top-1/3 -right-20 w-96 h-96 pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border border-[var(--border-card)] bg-[var(--bg-secondary)]/90 backdrop-blur-md mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[var(--text-secondary)] font-medium">
                {PERSONAL_INFO.statusText}
              </span>
            </div>

            {/* Main Greeting and Name */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-[var(--text-primary)] leading-[1.08] mb-4">
              Hi, I&apos;m{" "}
              <span className="gradient-text relative inline-block">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Dynamic Typewriter Role */}
            <div className="h-10 sm:h-12 flex items-center mb-6">
              <span className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-[var(--text-secondary)]">
                {displayText}
                <span className="inline-block w-0.5 h-6 sm:h-8 ml-1 bg-[var(--accent-cyan)] animate-pulse align-middle" />
              </span>
            </div>

            {/* Tagline & Editorial Mission */}
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-8">
              &ldquo;{PERSONAL_INFO.tagline}&rdquo;
            </p>

            {/* Key Academic & Achievement Badges */}
            <div className="flex flex-wrap gap-2.5 mb-10 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)]/80 border border-white/5 text-[var(--accent-cyan)]">
                <Trophy className="w-3.5 h-3.5" />
                <span>1st Prize AIdeastorm &apos;26</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)]/80 border border-white/5 text-[var(--accent-violet)]">
                <Code2 className="w-3.5 h-3.5" />
                <span>CGPA 8.80 | Cambridge Inst. Tech</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)]/80 border border-white/5 text-emerald-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>14+ Shipped Products</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#090B10] bg-gradient-to-r from-[var(--accent-cyan)] to-[#38BDF8] hover:brightness-110 shadow-lg shadow-[var(--accent-cyan)]/25 transition-all font-mono"
              >
                <span>Explore Featured Work</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[var(--text-primary)] glass-panel glass-panel-hover border border-[var(--border-card)] font-mono"
                title="Opens Google Drive resume (with local /public/resume-bishnu-kumar-sardar.pdf fallback)"
              >
                <FileText className="w-4 h-4 text-[var(--accent-cyan)]" />
                <span>Download Resume</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("play-portfolio-voice-intro"));
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-[var(--accent-cyan)] glass-panel glass-panel-hover border border-[var(--accent-cyan)]/40 hover:border-[var(--accent-cyan)] shadow-md shadow-[var(--accent-cyan)]/15 transition-all font-mono cursor-pointer"
                title="Listen to Bishnu's 30-second AI Voice Introduction"
              >
                <Volume2 className="w-4 h-4 text-[var(--accent-cyan)] animate-pulse" />
                <span>AI Voice Intro</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Quick Social Verification Links */}
            <div className="flex items-center gap-5 mt-10 pt-6 border-t border-[var(--border-card)] w-full">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Connect
              </span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              {PERSONAL_INFO.leetcode && (
                <a
                  href={PERSONAL_INFO.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                  aria-label="LeetCode Profile"
                >
                  <LeetcodeIcon className="w-5 h-5" />
                </a>
              )}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                aria-label="Direct Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Column: Creative Interactive 3D Profile Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-72 sm:w-80 group perspective-1000">
              
              {/* Animated Outer Gradient Glow Ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[var(--accent-cyan)] via-[#38BDF8] to-[var(--accent-violet)] opacity-30 blur-xl group-hover:opacity-75 transition duration-700 animate-pulse-glow" />

              <Tilt3DCard maxTilt={15} scale={1.03} className="w-full">
                {/* Profile Card Body with 3D preserve depth */}
                <div className="relative rounded-2xl glass-panel p-5 overflow-hidden border border-white/10 preserve-3d shadow-2xl">
                  {/* Photo Holder */}
                  <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gradient-to-br from-[#121828] to-[#0A0D14] flex items-center justify-center border border-white/5 translate-z-10 shadow-inner">
                    {!profileImgError ? (
                      <Image
                        src={PERSONAL_INFO.profileImage}
                        alt={PERSONAL_INFO.name}
                        fill
                        sizes="320px"
                        className="object-cover object-top transition duration-700 group-hover:scale-105"
                        onError={() => setProfileImgError(true)}
                        priority
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00F5D4]/20 to-[#8B5CF6]/30 border border-white/10 flex items-center justify-center mb-4">
                          <Sparkles className="w-10 h-10 text-[var(--accent-cyan)]" />
                        </div>
                        <span className="font-display font-bold text-lg text-white">
                          Bishnu Kumar Sardar
                        </span>
                        <span className="text-xs font-mono text-[var(--accent-cyan)] mt-1">
                          B.E. ISE • CGPA 8.80
                        </span>
                      </div>
                    )}

                    {/* Corner Visual Indicator floating in 3D space */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-black/75 backdrop-blur-md text-[var(--accent-cyan)] border border-white/15 translate-z-30 shadow-lg">
                      CIT BANGALORE
                    </div>
                  </div>

                  {/* Sub-card Telemetry Information floating in 3D */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] translate-z-20">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 font-medium">Open to Roles</span>
                    </div>
                    <span className="text-[var(--text-muted)]">2024–2028</span>
                  </div>
                </div>
              </Tilt3DCard>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
