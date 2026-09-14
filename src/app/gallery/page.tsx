"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { GalleryItem } from "@/types";
import { siteConfig } from "@/config/siteConfig";
import { dataService } from "@/lib/services/dataService";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await dataService.getGallery();
        setGallery(data.filter((g) => g.published));
      } catch (e) {
        console.error("Error loading gallery page:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? gallery
      : gallery.filter((g) => g.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <main className="pt-28 pb-20">
      {/* Header */}
      <section className="bg-[#FAF9F5] py-16 border-b border-[#E5E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="DESIGN PORTFOLIO"
            title="Architectural & Interior Gallery"
            subtitle="Browse high-resolution imagery showcasing living rooms, custom kitchens, bedrooms, joinery details, and structural facades."
          />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {siteConfig.galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 focus:outline-none",
                  activeCategory === cat
                    ? "bg-[#0C3B2E] text-white shadow-md"
                    : "bg-white text-[#0C3B2E] hover:bg-[#E5E2D9] border border-[#E5E2D9]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="aspect-[4/3] bg-stone-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 cursor-pointer border border-[#E5E2D9] shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#A2D157]">
                      {item.category}
                    </span>
                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                    <div className="inline-flex items-center text-xs font-semibold text-white/90">
                      <Maximize2 className="w-4 h-4 mr-1 text-[#76A035]" /> View High Resolution
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#636E6A]">
              No gallery images found in &quot;{activeCategory}&quot; category.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % filteredItems.length : 0
          )
        }
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + filteredItems.length) % filteredItems.length
              : 0
          )
        }
      />
    </main>
  );
}
