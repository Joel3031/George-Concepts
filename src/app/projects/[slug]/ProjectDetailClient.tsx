"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Layers,
  User,
  ArrowLeft,
  Maximize2,
  ExternalLink,
  Compass,
  FileText,
  ChevronDown,
} from "lucide-react";
import { Project, GalleryItem } from "@/types";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Lightbox } from "@/components/ui/Lightbox";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ProjectDetailClientProps {
  project: Project;
}

function getImageAspectRatio(img: { image_url: string; aspect_ratio?: string; orientation?: string }): string {
  if (img.aspect_ratio) return img.aspect_ratio;
  // 1500 x 2500 tall portrait vanity units (render-15, render-18, render-26)
  if (
    img.image_url.includes("render-15-") ||
    img.image_url.includes("render-18-") ||
    img.image_url.includes("render-26-")
  ) {
    return "3 / 5";
  }
  // 1500 x 2143 vertical renders (render-10, render-11, render-12, render-28, render-29)
  if (
    img.image_url.includes("render-10-") ||
    img.image_url.includes("render-11-") ||
    img.image_url.includes("render-12-") ||
    img.image_url.includes("render-28-") ||
    img.image_url.includes("render-29-")
  ) {
    return "1500 / 2143";
  }
  // 1500 x 1875 portrait renders (render-09, render-20, render-21, render-27)
  if (
    img.image_url.includes("render-09-") ||
    img.image_url.includes("render-20-") ||
    img.image_url.includes("render-21-") ||
    img.image_url.includes("render-27-")
  ) {
    return "4 / 5";
  }
  // 1500 x 1000 foyer landscape (render-01)
  if (img.image_url.includes("render-01-")) {
    return "3 / 2";
  }
  // General fallback by orientation
  if (img.orientation === "portrait") return "3 / 4";
  return "1500 / 1364";
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flatten all gallery images (whether from gallery_sections or gallery_images) for the Lightbox
  const allGalleryItems: GalleryItem[] = useMemo(() => {
    if (project.gallery_sections && project.gallery_sections.length > 0) {
      const items: GalleryItem[] = [];
      project.gallery_sections.forEach((sec) => {
        sec.images.forEach((img) => {
          items.push({
            id: img.id,
            image_url: img.image_url,
            title: img.caption || `${project.title} — ${sec.title}`,
            category: sec.title,
            description: sec.description,
            high_res_url: img.high_res_url,
            published: true,
          });
        });
      });
      return items;
    }

    return (project.gallery_images || []).map((img, i) => ({
      id: img.id || `img-${i}`,
      image_url: img.image_url,
      title: img.caption || project.title,
      category: project.category,
      high_res_url: img.high_res_url,
      published: true,
    }));
  }, [project]);

  // Helper to open lightbox at a specific image URL
  const openLightboxByUrl = (url: string) => {
    const idx = allGalleryItems.findIndex((item) => item.image_url === url);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const hasSections = Boolean(project.gallery_sections && project.gallery_sections.length > 0);

  return (
    <main className="pt-24 sm:pt-28 pb-14 sm:pb-24">
      {/* Navigation Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <Link
          href="/projects"
          className="inline-flex items-center text-xs font-semibold text-[#76A035] hover:text-[#0C3B2E] transition-colors py-1"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to All Projects
        </Link>
      </div>

      {/* Hero Banner Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-[#E5E2D9]">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E]/90 via-[#0C3B2E]/30 to-transparent p-4 sm:p-8 lg:p-12 flex items-end">
            <div>
              <span className="px-2.5 py-0.5 sm:px-3.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-[#76A035] text-white rounded-md mb-2 sm:mb-3 inline-block shadow-md">
                {project.category}
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Bar & Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Metadata Sidebar (4 Cols) */}
          <div className="lg:col-span-4 p-5 sm:p-6 lg:p-8 rounded-2xl bg-[#FAF9F5] border border-[#E5E2D9] h-fit space-y-5 sm:space-y-6">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#76A035] border-b border-[#E5E2D9] pb-3 sm:pb-4">
              Project Specification
            </h3>

            <div className="space-y-3.5 sm:space-y-4 text-sm text-[#1C2522]">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#76A035] shrink-0" />
                <div>
                  <span className="text-[11px] sm:text-xs text-[#636E6A] block">Location</span>
                  <span className="font-semibold text-xs sm:text-sm">{project.location}</span>
                </div>
              </div>

              {project.year && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#76A035] shrink-0" />
                  <div>
                    <span className="text-[11px] sm:text-xs text-[#636E6A] block">Completion Year</span>
                    <span className="font-semibold text-xs sm:text-sm">{project.year}</span>
                  </div>
                </div>
              )}

              {project.area && (
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#76A035] shrink-0" />
                  <div>
                    <span className="text-[11px] sm:text-xs text-[#636E6A] block">Built-up Area</span>
                    <span className="font-semibold text-xs sm:text-sm">{project.area}</span>
                  </div>
                </div>
              )}

              {project.client_name && (
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#76A035] shrink-0" />
                  <div>
                    <span className="text-[11px] sm:text-xs text-[#636E6A] block">Client / Context</span>
                    <span className="font-semibold text-xs sm:text-sm">{project.client_name}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Services Involved Badges */}
            {project.services_involved && project.services_involved.length > 0 && (
              <div className="pt-3.5 sm:pt-4 border-t border-[#E5E2D9]">
                <span className="text-[11px] sm:text-xs text-[#636E6A] block mb-2">Services Involved</span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.services_involved.map((svc) => (
                    <span
                      key={svc}
                      className="px-2.5 py-1 rounded-md bg-white border border-[#E5E2D9] text-[11px] sm:text-xs font-semibold text-[#0C3B2E]"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Detailed Overview (8 Cols) */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0C3B2E]">Project Overview</h2>
            <p className="text-base sm:text-lg font-medium text-[#1C2522] leading-relaxed">
              {project.short_description}
            </p>
            <div className="text-sm sm:text-base text-[#636E6A] leading-relaxed space-y-4 whitespace-pre-line">
              <p>{project.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Before / After Renovation Slider if available */}
      {project.before_image && project.after_image && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0C3B2E] mb-4 sm:mb-6">Transformation Showcase</h3>
          <BeforeAfterSlider
            beforeImage={project.before_image}
            afterImage={project.after_image}
            title={`${project.title} — Before & After`}
            description="Drag slider handle to compare original structure vs completed residence."
          />
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTIONED ARCHITECTURAL PRESENTATION (HARSHAM & EXPANDED) */}
      {/* ======================================================== */}
      {hasSections ? (
        <div className="space-y-16 sm:space-y-24">
          {/* Quick-Jump Section Anchor Pills */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-[#E5E2D9]">
              {project.gallery_sections!.map((sec, sIdx) => (
                <a
                  key={sec.id}
                  href={`#section-${sec.id}`}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-wide bg-[#FAF9F5] text-[#0C3B2E] hover:bg-[#0C3B2E] hover:text-white border border-[#E5E2D9] transition-all whitespace-nowrap shadow-sm shrink-0"
                >
                  <span className="text-[#76A035] mr-1.5 font-mono">0{sIdx + 1}</span>
                  {sec.title}
                </a>
              ))}
            </div>
          </div>

          {/* Iterate through sections */}
          {project.gallery_sections!.map((section, sIdx) => {
            const isBlueprints = section.id === "blueprints";
            const isExterior = section.id === "exterior";
            const isKitchen = section.id === "kitchens";
            const isBedrooms = section.id === "bedrooms";

            return (
              <section
                key={section.id}
                id={`section-${section.id}`}
                className={cn(
                  "scroll-mt-32 sm:scroll-mt-36 lg:scroll-mt-40",
                  isBlueprints ? "bg-[#FAF9F5] py-14 sm:py-20 border-y border-[#E5E2D9]" : ""
                )}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Section Editorial Header */}
                  <div className="max-w-3xl mb-8 sm:mb-12">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-[#0C3B2E] text-white rounded">
                        Section 0{sIdx + 1}
                      </span>
                      {section.subtitle && (
                        <span className="text-xs sm:text-sm font-semibold text-[#76A035] tracking-wide">
                          {section.subtitle}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0C3B2E] tracking-tight mb-2 sm:mb-3">
                      {section.title}
                    </h3>
                    {section.description && (
                      <p className="text-sm sm:text-base text-[#636E6A] leading-relaxed">
                        {section.description}
                      </p>
                    )}
                  </div>

                  {/* ------------------------------------------------ */}
                  {/* SECTION 01: EXTERIOR ARCHITECTURE */}
                  {/* ------------------------------------------------ */}
                  {isExterior && (
                    <div className="space-y-6">
                      {/* Hero Exterior Visualization — Large Panoramic Presentation */}
                      {section.images[0] && (
                        <div
                          onClick={() => openLightboxByUrl(section.images[0].image_url)}
                          className="group relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-2xl overflow-hidden bg-stone-100 cursor-pointer border border-[#E5E2D9] shadow-md hover:shadow-2xl transition-all duration-500"
                        >
                          <Image
                            src={section.images[0].image_url}
                            alt={section.images[0].caption || project.title}
                            fill
                            sizes="100vw"
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 p-5 sm:p-8 flex flex-col justify-end">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#A2D157] mb-1">
                              Master Exterior Facade
                            </span>
                            <h4 className="text-lg sm:text-2xl font-bold text-white mb-2">
                              {section.images[0].caption}
                            </h4>
                            <div className="inline-flex items-center text-xs font-semibold text-white/90">
                              <Maximize2 className="w-4 h-4 mr-1.5 text-[#76A035]" /> Click to inspect high-resolution render
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Presentation Sheet / Title Card if available */}
                      {section.images[1] && (
                        <div
                          onClick={() => openLightboxByUrl(section.images[1].image_url)}
                          className="group relative w-full max-w-2xl mx-auto aspect-[16/10] rounded-xl overflow-hidden bg-white cursor-pointer border border-[#E5E2D9] shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                          <Image
                            src={section.images[1].image_url}
                            alt={section.images[1].caption || project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-6 flex items-end">
                            <span className="text-xs font-semibold text-white">
                              {section.images[1].caption}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ------------------------------------------------ */}
                  {/* SECTION 06: ARCHITECTURAL BLUEPRINTS & PLANS */}
                  {/* ------------------------------------------------ */}
                  {isBlueprints && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {section.images.map((img) => (
                          <div
                            key={img.id}
                            className="bg-white rounded-2xl border border-[#E5E2D9] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                          >
                            {/* Blueprint View Area */}
                            <div
                              onClick={() => openLightboxByUrl(img.image_url)}
                              className="group relative w-full aspect-[3500/2473] bg-[#FCFBF8] cursor-pointer border-b border-[#E5E2D9] overflow-hidden flex items-center justify-center p-2"
                              title="Click to inspect blueprint in lightbox"
                            >
                              <Image
                                src={img.image_url}
                                alt={img.caption || "Architectural Drawing"}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-[#0C3B2E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#0C3B2E] text-xs font-bold shadow-lg">
                                  <Maximize2 className="w-4 h-4 text-[#76A035]" /> Inspect Blueprint Detail
                                </span>
                              </div>
                            </div>

                            {/* Blueprint Details & Action Bar */}
                            <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Compass className="w-3.5 h-3.5 text-[#76A035] shrink-0" />
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#76A035]">
                                    Architectural CAD Document
                                  </span>
                                </div>
                                <h4 className="text-sm sm:text-base font-bold text-[#0C3B2E] leading-snug">
                                  {img.caption}
                                </h4>
                              </div>

                              {img.high_res_url && (
                                <a
                                  href={img.high_res_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FAF9F5] hover:bg-[#0C3B2E] text-[#0C3B2E] hover:text-white border border-[#E5E2D9] text-xs font-semibold transition-all shrink-0 shadow-sm"
                                  title="Open 3500px Lossless Master PNG in New Tab"
                                >
                                  <ExternalLink className="w-3.5 h-3.5 text-[#76A035]" />
                                  <span>Original PNG</span>
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------------ */}
                  {/* SECTIONS: LIVING, DINING, KITCHENS, BEDROOMS */}
                  {/* ------------------------------------------------ */}
                  {!isExterior && !isBlueprints && (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
                      {section.images.map((img) => {
                        const aspectRatio = getImageAspectRatio(img);

                        return (
                          <div
                            key={img.id}
                            className="break-inside-avoid mb-4 sm:mb-6 w-full block"
                          >
                            <div
                              onClick={() => openLightboxByUrl(img.image_url)}
                              style={{ aspectRatio }}
                              className="group relative w-full rounded-xl overflow-hidden bg-stone-100 cursor-pointer border border-[#E5E2D9] shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                              <Image
                                src={img.image_url}
                                alt={img.caption || project.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-5 flex flex-col justify-end">
                                <p className="text-xs sm:text-sm font-semibold text-white leading-snug mb-1.5">
                                  {img.caption}
                                </p>
                                <div className="inline-flex items-center text-[11px] font-semibold text-white/80">
                                  <Maximize2 className="w-3 h-3 mr-1 text-[#76A035]" /> View in Lightbox
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        /* ======================================================== */
        /* STANDARD FLAT GALLERY (FALLBACK FOR EXISTING PROJECTS)   */
        /* ======================================================== */
        project.gallery_images &&
        project.gallery_images.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0C3B2E] mb-4 sm:mb-6">
              Gallery Showcase
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {project.gallery_images.map((img, idx) => (
                <div
                  key={img.id || idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 cursor-pointer border border-[#E5E2D9] shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <Image
                    src={img.image_url}
                    alt={img.caption || project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Maximize2 className="w-6 h-6 text-[#A2D157]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      {/* Lightbox Modal */}
      {allGalleryItems.length > 0 && (
        <Lightbox
          items={allGalleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % allGalleryItems.length : 0
            )
          }
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null
                ? (prev - 1 + allGalleryItems.length) % allGalleryItems.length
                : 0
            )
          }
        />
      )}

      {/* Contact CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center pt-12 sm:pt-16 border-t border-[#E5E2D9] mt-16 sm:mt-24">
        <h3 className="text-xl sm:text-2xl font-bold text-[#0C3B2E] mb-2">
          Inspired by this project?
        </h3>
        <p className="text-xs sm:text-sm text-[#636E6A] mb-5 sm:mb-6">
          Let us discuss how we can execute a similar vision for your plot or home.
        </p>
        <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
          Start Your Consultation
        </Button>
      </div>
    </main>
  );
}
