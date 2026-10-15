"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, MapPin, Calendar, ExternalLink, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { GalleryItem } from "@/types/portfolio";

interface GalleryModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export default function GalleryModal({
  item,
  items,
  isOpen,
  onClose,
  onSelect,
}: GalleryModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !item) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, item, items]);

  if (!isOpen || !item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelect(items[currentIndex - 1]);
    } else {
      onSelect(items[items.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onSelect(items[currentIndex + 1]);
    } else {
      onSelect(items[0]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0D111A] border border-[var(--border-card)] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#090C12]">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20">
              {item.category}
            </span>
            {item.highlightBadge && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[var(--accent-violet)]/10 text-[var(--accent-violet)] border border-[var(--accent-violet)]/20">
                <Award className="w-3 h-3" />
                {item.highlightBadge}
              </span>
            )}
            <span className="text-xs font-mono text-[var(--text-muted)]">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={item.imagePath}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
              title="Open full-resolution image"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Image Viewport */}
        <div className="relative flex-1 min-h-[320px] max-h-[60vh] bg-black/40 flex items-center justify-center overflow-hidden p-2">
          <div className="relative w-full h-full min-h-[300px]">
            <Image
              src={item.imagePath}
              alt={item.title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />
          </div>

          {/* Nav buttons */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 transition-colors shadow-lg"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 transition-colors shadow-lg"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Modal Footer / Meta */}
        <div className="p-5 border-t border-white/10 bg-[#090C12] space-y-2">
          <h3 className="text-lg font-bold font-display text-[var(--text-primary)]">
            {item.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
            {item.location && (
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                {item.location}
              </span>
            )}
            {item.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </span>
            )}
            {item.event && (
              <span className="text-[var(--accent-violet)]">
                • {item.event}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-1">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
