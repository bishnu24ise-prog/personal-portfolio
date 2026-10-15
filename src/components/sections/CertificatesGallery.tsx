"use client";

import React, { useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import CertificateModal from "@/components/sections/CertificateModal";
import { CERTIFICATES_GALLERY } from "@/data/portfolio";
import { CertificateItem } from "@/types/portfolio";
import {
  Award,
  Trophy,
  ShieldCheck,
  Calendar,
  Eye,
  FileText,
  FileCheck2,
} from "lucide-react";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

type CertCategory = "All" | "Award" | "Hackathon" | "Internship" | "Certification";

export default function CertificatesGallery() {
  const [activeFilter, setActiveFilter] = useState<CertCategory>("All");
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const filteredCerts =
    activeFilter === "All"
      ? CERTIFICATES_GALLERY
      : CERTIFICATES_GALLERY.filter((c) => c.category === activeFilter);

  const getBadgeIcon = (category: string) => {
    switch (category) {
      case "Award":
        return <Award className="w-3.5 h-3.5 text-amber-400" />;
      case "Hackathon":
        return <Trophy className="w-3.5 h-3.5 text-cyan-400" />;
      case "Internship":
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />;
      case "Certification":
      default:
        return <FileCheck2 className="w-3.5 h-3.5 text-violet-400" />;
    }
  };

  return (
    <section id="certificates" className="py-20 lg:py-28 relative bg-[var(--bg-secondary)]/20 border-t border-[var(--border-card)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Verified Credentials"
          title="Certificates &"
          titleHighlight="Honors Gallery"
          subtitle="Explore official industry certificates, hackathon rankings, and government-recognized internships."
        />

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {(["All", "Award", "Hackathon", "Internship", "Certification"] as CertCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? "bg-[var(--accent-cyan)] text-[#090B10] font-semibold shadow-md shadow-[var(--accent-cyan)]/25"
                  : "bg-white/5 text-[var(--text-secondary)] border border-white/5 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Masonry / Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => {
            const isPdf = cert.imagePath.toLowerCase().endsWith(".pdf");

            return (
              <Tilt3DCard
                key={cert.id}
                maxTilt={8}
                scale={1.02}
                onClick={() => setSelectedCert(cert)}
                className="h-full cursor-pointer"
              >
                <div
                  className="group rounded-2xl glass-panel p-6 border border-[var(--border-card)] glass-panel-hover flex flex-col justify-between h-full preserve-3d"
                >
                  <div>
                    {/* Top Strip */}
                    <div className="flex items-center justify-between mb-4 translate-z-10">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/5 text-slate-300">
                        {getBadgeIcon(cert.category)}
                        <span>{cert.badgeText || cert.category}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {cert.issueDate}
                      </span>
                    </div>

                    {/* Certificate Preview Frame */}
                    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-gradient-to-br from-[#0e1320] via-[#141b2d] to-[#0a0d15] border border-white/10 mb-5 group-hover:border-[var(--accent-cyan)]/40 transition-colors">
                      {!isPdf ? (
                        <Image
                          src={cert.imagePath}
                          alt={cert.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#0f1422] to-[#090b10]">
                          <div className="p-3 rounded-full bg-white/5 border border-white/10 mb-2 group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6 text-[var(--accent-cyan)]" />
                          </div>
                          <span className="text-xs font-mono font-semibold text-slate-200 line-clamp-1">
                            {cert.issuer}
                          </span>
                          <span className="text-[10px] font-mono text-[var(--accent-cyan)] mt-0.5">
                            PDF Document • Click to View
                          </span>
                        </div>
                      )}

                      {/* Gradient Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <span className="px-3 py-1.5 rounded-lg bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 border border-white/20">
                          <Eye className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                          Expand Lightbox
                        </span>
                      </div>
                    </div>

                    {/* Title & Caption */}
                    <h4 className="text-base font-bold font-display text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-cyan)] transition-colors leading-snug translate-z-10">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-2">
                      {cert.caption}
                    </p>
                  </div>

                  {/* Bottom Verification Line */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] translate-z-10">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified On Record
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform text-[var(--accent-cyan)]">
                      View →
                    </span>
                  </div>
                </div>
              </Tilt3DCard>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <CertificateModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title={selectedCert.title}
          issuer={selectedCert.issuer}
          imagePath={selectedCert.imagePath}
          badge={selectedCert.badgeText}
          caption={selectedCert.caption}
        />
      )}
    </section>
  );
}
