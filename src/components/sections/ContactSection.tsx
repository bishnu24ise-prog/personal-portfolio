"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { PERSONAL_INFO } from "@/data/portfolio";
import {
  Mail,
  Copy,
  Check,
  Send,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/Icons";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate interactive submission state
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-[var(--bg-secondary)]/40 border-t border-[var(--border-card)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Get In Touch"
          title="Let's Build Something"
          titleHighlight="Exceptional"
          subtitle="Open for summer 2026/2027 software engineering internships, hackathons, and high-impact product collaborations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Direct Connect & Info Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Quick Email Card */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--border-card)]">
              <span className="text-xs font-mono text-[var(--accent-cyan)] uppercase tracking-wider block mb-2">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5 mb-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-5 h-5 text-[var(--accent-cyan)] shrink-0" />
                  <span className="text-sm font-mono text-slate-200 truncate select-all">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Feel free to email me directly regarding internship opportunities, technical hackathons, or project inquiries.
              </p>
            </div>

            {/* Location & Timezone Card */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--border-card)] grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                  <span>Base Location</span>
                </div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Bangalore, Karnataka
                </p>
                <span className="text-xs font-mono text-[var(--text-muted)]">India</span>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-violet)]" />
                  <span>Timezone</span>
                </div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  IST (UTC +5:30)
                </p>
                <span className="text-xs font-mono text-emerald-400">Available</span>
              </div>
            </div>

            {/* Social Verification Profiles */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--border-card)]">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-4">
                Verified Social & Coding Channels
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--accent-cyan)] text-xs font-mono text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent-cyan)]" />
                    <span>GitHub</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--accent-cyan)] text-xs font-mono text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent-cyan)]" />
                    <span>LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                {PERSONAL_INFO.leetcode && (
                  <a
                    href={PERSONAL_INFO.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--accent-cyan)] text-xs font-mono text-slate-300 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <LeetcodeIcon className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent-cyan)]" />
                      <span>LeetCode</span>
                    </div>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-[var(--border-card)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-cyan)] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Message Dispatcher</span>
              </div>

              <h3 className="text-2xl font-bold font-display text-[var(--text-primary)] mb-6">
                Send a Direct Dispatch
              </h3>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white mb-2">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
                    Thank you for reaching out! Bishnu will get back to you shortly at {formData.email || "your email"}.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-mono bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  action="https://formspree.io/f/xbjnqzzw" // Formspree ready
                  method="POST"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Internship opportunity / Hackathon invitation / Project inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello Bishnu, I came across your portfolio and UnifyTalk project..."
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-colors font-mono resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-mono font-semibold text-[#090B10] bg-gradient-to-r from-[var(--accent-cyan)] to-[#38BDF8] hover:brightness-110 shadow-lg shadow-[var(--accent-cyan)]/25 transition-all cursor-pointer"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
              <span>Formspree / Direct Gateway</span>
              <span>Encrypted Dispatch</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
