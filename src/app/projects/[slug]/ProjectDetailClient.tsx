"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Layers, User, ArrowLeft, Maximize2 } from "lucide-react";
import { Project } from "@/types";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Lightbox } from "@/components/ui/Lightbox";
import { Button } from "@/components/ui/Button";

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems = (project.gallery_images || []).map((img, i) => ({
    id: img.id || `img-${i}`,
    image_url: img.image_url,
    title: img.caption || project.title,
    category: project.category,
    published: true,
  }));

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
            <div className="text-sm sm:text-base text-[#636E6A] leading-relaxed space-y-4">
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

      {/* Project Image Gallery */}
      {project.gallery_images && project.gallery_images.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0C3B2E] mb-4 sm:mb-6">Gallery Showcase</h3>
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
      )}

      {/* Lightbox Modal */}
      {galleryItems.length > 0 && (
        <Lightbox
          items={galleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % galleryItems.length : 0
            )
          }
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null
                ? (prev - 1 + galleryItems.length) % galleryItems.length
                : 0
            )
          }
        />
      )}

      {/* Contact CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center pt-8 border-t border-[#E5E2D9]">
        <h3 className="text-xl sm:text-2xl font-bold text-[#0C3B2E] mb-2">Inspired by this project?</h3>
        <p className="text-xs sm:text-sm text-[#636E6A] mb-5 sm:mb-6">Let us discuss how we can execute a similar vision for your plot or home.</p>
        <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">Start Your Consultation</Button>
      </div>
    </main>
  );
}

