"use client";

import React, { useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { PERSONAL_GALLERY } from "@/data/portfolio";
import { GalleryItem } from "@/types/portfolio";
import GalleryModal from "@/components/sections/GalleryModal";
import {
  MapPin,
  Calendar,
  Maximize2,
  Award,
  Sparkles,
  Camera,
} from "lucide-react";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

type GalleryFilter =
  | "All"
  | "Hackathons"
  | "Live Demos"
  | "Awards"
  | "Team Sprints"
  | "Builder";

const FILTER_CATEGORIES: GalleryFilter[] = [
  "All",
  "Hackathons",
  "Live Demos",
  "Awards",
  "Team Sprints",
  "Builder",
];

export default function PersonalGallerySection() {
  const [selectedFilter, setSelectedFilter] = useState<GalleryFilter>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems =
    selectedFilter === "All"
      ? PERSONAL_GALLERY
      : PERSONAL_GALLERY.filter((item) => item.category === selectedFilter);

  const openLightbox = (item: GalleryItem) => {
    setActiveItem(item);
    setIsModalOpen(true);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 relative">
      {/* Background cyber accent glow */}
      <div className="ambient-glow-cyan absolute -top-10 left-1/4 w-96 h-96 pointer-events-none opacity-20" />
      <div className="ambient-glow-violet absolute bottom-10 right-1/4 w-96 h-96 pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="Authentic Journey"
          title="Moments from the"
          titleHighlight="Builder Frontier"
          subtitle="Real snapshots from competitive hackathons, live judging demos at Cambridge Institute of Technology, late-night architecture sprints, and championship podiums."
        />

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {FILTER_CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? PERSONAL_GALLERY.length
                : PERSONAL_GALLERY.filter((i) => i.category === cat).length;
            const isActive = selectedFilter === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-[var(--accent-cyan)] to-[#38BDF8] text-[#090C12] shadow-md shadow-[var(--accent-cyan)]/20 font-bold"
                    : "glass-panel text-[var(--text-secondary)] hover:text-white border border-[var(--border-card)] hover:border-white/20"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                    isActive
                      ? "bg-black/20 text-[#090C12]"
                      : "bg-white/10 text-[var(--text-muted)]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid with 3D Tilt Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Tilt3DCard
              key={item.id}
              maxTilt={8}
              scale={1.02}
              onClick={() => openLightbox(item)}
              className="h-full cursor-pointer"
            >
              <div
                className="group glass-panel rounded-2xl overflow-hidden border border-[var(--border-card)] glass-panel-hover flex flex-col justify-between transition-all duration-300 h-full preserve-3d"
              >
                {/* Image Preview Container */}
                <div className="relative w-full h-56 overflow-hidden bg-black/40">
                  <Image
                    src={item.imagePath}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80" />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-black/60 backdrop-blur-md text-[var(--accent-cyan)] border border-white/10">
                      {item.category}
                    </span>
                    {item.highlightBadge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[var(--accent-violet)]/80 text-white backdrop-blur-md">
                        {item.highlightBadge}
                      </span>
                    )}
                  </div>

                  {/* Hover Maximize Button */}
                  <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-white/10 z-10">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Event Badge */}
                  {item.event && (
                    <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-cyan-300 truncate z-10">
                      {item.event}
                    </div>
                  )}
                </div>

                {/* Card Meta Body */}
                <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors line-clamp-1 mb-1.5 translate-z-10">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  {/* Location & Date Footer */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] translate-z-10">
                    {item.location ? (
                      <span className="flex items-center gap-1 truncate max-w-[190px]">
                        <MapPin className="w-3 h-3 text-[var(--accent-cyan)] flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </span>
                    ) : (
                      <span />
                    )}

                    {item.date && (
                      <span className="flex items-center gap-1 flex-shrink-0">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date.split("•")[0].trim()}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="glass-panel p-12 text-center rounded-2xl border border-[var(--border-card)]">
            <Camera className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-3 opacity-60" />
            <p className="text-sm font-mono text-[var(--text-muted)]">
              No moments in this category yet.
            </p>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <GalleryModal
        item={activeItem}
        items={filteredItems}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(item) => setActiveItem(item)}
      />
    </section>
  );
}
