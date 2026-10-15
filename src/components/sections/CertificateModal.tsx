"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, Award, ExternalLink, ShieldCheck, Download } from "lucide-react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  issuer: string;
  imagePath: string;
  badge?: string;
  caption?: string;
}

export default function CertificateModal({
  isOpen,
  onClose,
  title,
  issuer,
  imagePath,
  badge,
  caption,
}: CertificateModalProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl glass-panel bg-[var(--bg-secondary)] border border-[var(--border-card-hover)] p-6 sm:p-8 shadow-2xl text-[var(--text-primary)] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close certificate modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Information */}
        <div className="flex items-center gap-2 mb-3">
          <span className="p-1.5 rounded-lg bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20">
            <Award className="w-4 h-4" />
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-cyan)]">
            Verified Credential & Honors
          </span>
        </div>

        <h3
          id="cert-modal-title"
          className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)] mb-1"
        >
          {title}
        </h3>
        <p className="text-xs sm:text-sm font-mono text-[var(--text-secondary)] mb-6">
          Issued by: <span className="text-slate-200">{issuer}</span>
        </p>

        {/* Certificate Preview Frame */}
        <div className="relative w-full h-80 sm:h-[480px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0b0e17] via-[#101524] to-[#07090f] border border-white/10 flex items-center justify-center mb-6">
          {imagePath.toLowerCase().endsWith(".pdf") ? (
            <iframe
              src={`${imagePath}#toolbar=0`}
              title={title}
              className="w-full h-full rounded-2xl border-0 bg-white"
            />
          ) : !imgError ? (
            <Image
              src={imagePath}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-contain p-2 sm:p-4"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 max-w-md">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00F5D4]/10 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center mb-4">
                <ShieldCheck className="w-10 h-10 text-[var(--accent-cyan)]" />
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">
                Official Credential On File
              </h4>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                {caption || "Verified institutional certificate recognized under official academic and industry evaluators."}
              </p>
              <span className="mt-4 inline-block px-3 py-1 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-emerald-400">
                Path: {imagePath}
              </span>
            </div>
          )}
        </div>

        {/* Footer Details */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Authenticated Credential</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={imagePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-[#090B10] bg-[var(--accent-cyan)] hover:brightness-110 shadow-sm transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Original</span>
            </a>
            <a
              href={imagePath}
              download
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/5 border border-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
