import React from "react";
import Image from "next/image";
import { ArrowRight, Compass, Home, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-[48px] sm:pt-[54px] lg:pt-28 pb-0 lg:pb-16 overflow-hidden bg-[#FAF9F5] lg:min-h-[92vh] lg:flex lg:items-center lg:justify-center">
      {/* Background Subtle Gradient Blobs (Desktop Only) */}
      <div className="hidden lg:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#76A035]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================= */}
      {/* 1. MOBILE HERO EXPERIENCE (< lg)                          */}
      {/* Visual-First Architectural Storytelling Canvas            */}
      {/* ========================================================= */}
      <div className="block lg:hidden w-full">
        {/* Edge-to-Edge Architectural Photography Frame */}
        <div className="relative w-full h-[74vh] min-h-[490px] max-h-[640px] overflow-hidden bg-[#07251D]">
          {/* Architectural Image */}
          <Image
            src="/Elevation01_expanded.png"
            alt="George Concepts Residential Architecture — Kerala Contemporary Elevation"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center animate-slow-zoom"
          />

          {/* Top Delicate Vignette */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 via-black/15 to-transparent pointer-events-none" />

          {/* Top Architectural Badge */}
          <div className="absolute top-3.5 left-4 z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#76A035] shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/95">
                Featured Architecture • Thrissur
              </span>
            </div>
          </div>

          {/* Bottom Dark Architectural Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07251D] via-[#07251D]/75 via-45% to-transparent flex flex-col justify-end p-5 pb-6 sm:p-7 z-10">

            {/* Compact Eyebrow Label */}
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A2D157] shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#A2D157]">
                Architecture • Interiors • Turnkey
              </span>
            </div>

            {/* Concise Overlay Headline */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.12] mb-4 drop-shadow-sm">
              Designing Spaces. <br />
              <span className="text-[#A2D157]">Building Dreams.</span>
            </h1>

            {/* Single Prominent Hero Call-to-Action */}
            <div className="w-full sm:w-auto pr-12 sm:pr-0">
              <Button
                href="/projects"
                variant="primary"
                size="md"
                className="w-full sm:w-auto justify-center bg-[#76A035] hover:bg-[#5B8A3C] text-white font-bold shadow-lg shadow-black/25 active:scale-[0.99]"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Our Projects
              </Button>
            </div>

          </div>
        </div>

        {/* Supporting Narrative & Service Badges Block (Immediately Below Hero) */}
        <div className="bg-[#FAF9F5] px-4 py-7 sm:py-9 border-b border-[#E5E2D9]">
          <div className="max-w-md mx-auto space-y-5">

            {/* Studio Narrative Copy */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#76A035] block mb-1">
                Our Practice & Craft
              </span>
              <p className="text-sm sm:text-base text-[#1C2522] leading-relaxed font-normal">
                From initial architectural planning and interior design through structural execution and final key handover — we create thoughtfully crafted residential sanctuaries.
              </p>
            </div>

            {/* 3 Key Service Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              <div className="p-3 rounded-xl bg-white border border-[#E5E2D9] shadow-2xs flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-lg bg-[#FAF9F5] text-[#76A035] flex items-center justify-center mb-1.5">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#0C3B2E] tracking-tight">3D Planning</span>
                <span className="text-[9px] text-[#636E6A]">Precision CAD</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E5E2D9] shadow-2xs flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-lg bg-[#FAF9F5] text-[#76A035] flex items-center justify-center mb-1.5">
                  <Home className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#0C3B2E] tracking-tight">Turnkey Build</span>
                <span className="text-[9px] text-[#636E6A]">Site Execution</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E5E2D9] shadow-2xs flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-lg bg-[#FAF9F5] text-[#76A035] flex items-center justify-center mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#0C3B2E] tracking-tight">End-to-End</span>
                <span className="text-[9px] text-[#636E6A]">Full Guarantee</span>
              </div>
            </div>

            {/* Secondary Action: Start Your Project */}
            <div>
              <Button
                href="/contact"
                variant="outline"
                size="md"
                className="w-full justify-center border-[#0C3B2E] text-[#0C3B2E] hover:bg-[#0C3B2E] hover:text-white"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start Your Project
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP HERO EXPERIENCE (lg:block)                     */}
      {/* 100% Preserved Desktop Layout & Geometry                  */}
      {/* ========================================================= */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-12 gap-8 items-center">

          {/* Left Text Block (7 Cols) */}
          <div className="col-span-7 flex flex-col items-start text-left animate-fade-in">

            {/* Top Subtitle Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C3B2E]/5 border border-[#0C3B2E]/10 mb-6 max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#76A035] shrink-0" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0C3B2E]">
                Architecture • Interiors • Turnkey Construction
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl xl:text-6xl font-extrabold text-[#0C3B2E] tracking-tight leading-[1.12] mb-6">
              Designing Spaces. <br />
              <span className="text-[#76A035]">Building Dreams.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg xl:text-xl text-[#636E6A] font-normal leading-relaxed max-w-2xl mb-8">
              From initial architectural planning and interior design through structural execution and final key handover — we create thoughtfully crafted residential sanctuaries.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 w-auto mb-10">
              <Button href="/projects" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Explore Our Projects
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Start Your Project
              </Button>
            </div>

            {/* Key Value Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5E2D9] w-full max-w-lg">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-[#76A035] shrink-0" />
                <span className="text-xs font-bold text-[#0C3B2E] uppercase tracking-wider">
                  3D Planning
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Home className="w-5 h-5 text-[#76A035] shrink-0" />
                <span className="text-xs font-bold text-[#0C3B2E] uppercase tracking-wider">
                  Turnkey Build
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#76A035] shrink-0" />
                <span className="text-xs font-bold text-[#0C3B2E] uppercase tracking-wider">
                  End-to-End
                </span>
              </div>
            </div>

          </div>

          {/* Right Visual Image Composition (5 Cols) */}
          <div className="col-span-5 relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#E5E2D9]">
            <Image
              src="/Elevation01_expanded.png"
              alt="George Concepts Residential Architecture — Kerala Contemporary Elevation"
              fill
              priority
              sizes="45vw"
              className="object-cover object-[25%_center] animate-slow-zoom"
            />
            {/* Dark Gradient Glass Card overlay at bottom */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-nav-dark text-white shadow-xl border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#A2D157]">
                  Featured Architecture
                </p>
                <h4 className="text-sm font-bold text-white">Residential Villa Design</h4>
              </div>
              <span className="text-xs px-2.5 py-1 bg-white/20 rounded-md font-semibold text-white">
                Kerala
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
