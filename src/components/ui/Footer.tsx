"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Heart, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--border-card)] bg-[var(--bg-primary)] py-12 text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--border-card)]">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="#"
              className="text-lg font-display font-bold text-[var(--text-primary)] flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 flex items-center justify-center font-mono text-xs font-bold text-[var(--accent-cyan)]">
                BK
              </div>
              <span>Bishnu Kumar Sardar</span>
            </Link>
            <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
              Full-Stack Developer • AI Web Apps • UI/UX Designer
            </p>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--accent-cyan)] text-slate-300 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--accent-cyan)] text-slate-300 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {PERSONAL_INFO.leetcode && (
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--accent-cyan)] text-slate-300 hover:text-white transition-colors"
                aria-label="LeetCode Profile"
              >
                <LeetcodeIcon className="w-4 h-4" />
              </a>
            )}

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--accent-cyan)] text-slate-300 hover:text-white transition-colors"
              aria-label="Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-[var(--accent-cyan)] transition-colors ml-2"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs font-mono text-[var(--text-muted)]">
          <p>
            © 2026 Bishnu Kumar Sardar. Built with Next.js, Three.js & Tailwind CSS.
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">
              Cambridge Institute of Technology, Bangalore
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
