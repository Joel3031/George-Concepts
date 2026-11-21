"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Maximize2, ArrowRight } from "lucide-react";
import { GalleryItem } from "@/types";
import { dataService } from "@/lib/services/dataService";
import { SectionHeading } from "../ui/SectionHeading";
import { Lightbox } from "../ui/Lightbox";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

export const GalleryPreview: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await dataService.getGallery();
        setItems(data.filter((g) => g.published));
      } catch (e) {
        console.error("Error loading gallery preview:", e);
      }
    }
    load();
  }, []);

  if (items.length === 0) return null;

  const displayItems = items.slice(0, 6);

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white border-t border-[#E5E2D9]" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="DESIGN INSPIRATION"
          title="Architectural & Interior Gallery"
          subtitle="A curated glimpse into custom joinery details, living room concepts, kitchen islands, and structural facades."
        />

        {/* Masonry / Grid: 2 columns on mobile (4 items), 3 columns on desktop (6 items) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {displayItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className={cn(
                "group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 cursor-pointer border border-[#E5E2D9] shadow-sm hover:shadow-xl transition-all duration-300 active:scale-[0.99]",
                idx >= 4 && "hidden lg:block"
              )}
            >
              <Image
                src={item.image_url}
                alt={`${item.title} — ${item.category} by George Concepts`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E]/90 via-[#0C3B2E]/30 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 p-2.5 sm:p-5 flex flex-col justify-end">
                <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-[#A2D157]">
                  {item.category}
                </span>
                <h4 className="text-xs sm:text-lg font-bold text-white mb-0.5 sm:mb-2 line-clamp-1">{item.title}</h4>
                <div className="hidden sm:inline-flex items-center text-xs font-semibold text-white/90">
                  <Maximize2 className="w-3.5 h-3.5 mr-1 text-[#76A035]" /> View Full Resolution
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery CTA */}
        <div className="text-center">
          <Button href="/gallery" variant="outline" size="lg" className="w-full sm:w-auto" icon={<ArrowRight className="w-4 h-4" />}>
            Explore Full Design Gallery
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        items={displayItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % displayItems.length : 0
          )
        }
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + displayItems.length) % displayItems.length
              : 0
          )
        }
      />
    </section>
  );
};
