"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Maximize2, User, Layers, ArrowLeft } from "lucide-react";
import { Project } from "@/types";
import { dataService } from "@/lib/services/dataService";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Lightbox } from "@/components/ui/Lightbox";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await dataService.getProjectBySlug(resolvedParams.slug);
        setProject(data);
      } catch (e) {
        console.error("Error loading project detail:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-4">
        <div className="h-96 bg-stone-100 rounded-2xl animate-pulse" />
      </main>
    );
  }

  if (!project) {
    return (
      <main className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold text-[#0C3B2E]">Project Not Found</h2>
        <p className="text-sm text-[#636E6A] mt-2 mb-6">The requested case study could not be located.</p>
        <Button href="/projects" variant="primary">Back to Portfolio</Button>
      </main>
    );
  }

  const galleryItems = (project.gallery_images || []).map((img, i) => ({
    id: img.id || `img-${i}`,
    image_url: img.image_url,
    title: img.caption || project.title,
    category: project.category,
    published: true,
  }));

  return (
    <main className="pt-28 pb-24">
      {/* Navigation Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          href="/projects"
          className="inline-flex items-center text-xs font-semibold text-[#76A035] hover:text-[#0C3B2E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to All Projects
        </Link>
      </div>

      {/* Hero Banner Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-[#E5E2D9]">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E]/90 via-transparent to-transparent p-6 sm:p-12 flex items-end">
            <div>
              <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-widest bg-[#76A035] text-white rounded-md mb-3 inline-block shadow-md">
                {project.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Bar & Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Metadata Sidebar (4 Cols) */}
          <div className="lg:col-span-4 p-8 rounded-2xl bg-[#FAF9F5] border border-[#E5E2D9] h-fit space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#76A035] border-b border-[#E5E2D9] pb-4">
              Project Specification
            </h3>

            <div className="space-y-4 text-sm text-[#1C2522]">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#76A035] shrink-0" />
                <div>
                  <span className="text-xs text-[#636E6A] block">Location</span>
                  <span className="font-semibold">{project.location}</span>
                </div>
              </div>

              {project.year && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#76A035] shrink-0" />
                  <div>
                    <span className="text-xs text-[#636E6A] block">Completion Year</span>
                    <span className="font-semibold">{project.year}</span>
                  </div>
                </div>
              )}

              {project.area && (
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-[#76A035] shrink-0" />
                  <div>
                    <span className="text-xs text-[#636E6A] block">Built-up Area</span>
                    <span className="font-semibold">{project.area}</span>
                  </div>
                </div>
              )}

              {project.client_name && (
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#76A035] shrink-0" />
                  <div>
                    <span className="text-xs text-[#636E6A] block">Client / Context</span>
                    <span className="font-semibold">{project.client_name}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Services Involved Badges */}
            {project.services_involved && project.services_involved.length > 0 && (
              <div className="pt-4 border-t border-[#E5E2D9]">
                <span className="text-xs text-[#636E6A] block mb-2">Services Involved</span>
                <div className="flex flex-wrap gap-2">
                  {project.services_involved.map((svc) => (
                    <span
                      key={svc}
                      className="px-3 py-1 rounded-md bg-white border border-[#E5E2D9] text-xs font-semibold text-[#0C3B2E]"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Detailed Overview (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold text-[#0C3B2E]">Project Overview</h2>
            <p className="text-lg font-medium text-[#1C2522] leading-relaxed">
              {project.short_description}
            </p>
            <div className="text-base text-[#636E6A] leading-relaxed space-y-4">
              <p>{project.description}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Before / After Renovation Slider if available */}
      {project.before_image && project.after_image && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h3 className="text-2xl font-bold text-[#0C3B2E] mb-6">Transformation Showcase</h3>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h3 className="text-2xl font-bold text-[#0C3B2E] mb-6">Gallery Showcase</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <h3 className="text-2xl font-bold text-[#0C3B2E] mb-2">Inspired by this project?</h3>
        <p className="text-sm text-[#636E6A] mb-6">Let us discuss how we can execute a similar vision for your plot or home.</p>
        <Button href="/contact" variant="primary" size="lg">Start Your Consultation</Button>
      </div>
    </main>
  );
}
