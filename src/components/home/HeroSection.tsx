import React from "react";
import Image from "next/image";
import { ArrowRight, Compass, Home, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#FAF9F5]">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#76A035]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Block (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left animate-fade-in">
            
            {/* Top Subtitle Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C3B2E]/5 border border-[#0C3B2E]/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#76A035]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0C3B2E]">
                Architecture • Interiors • Turnkey Construction
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0C3B2E] tracking-tight leading-[1.12] mb-6">
              Designing Spaces. <br className="hidden sm:inline" />
              <span className="text-[#76A035]">Building Dreams.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[#636E6A] font-normal leading-relaxed max-w-2xl mb-8">
              From initial architectural planning and interior design through structural execution and final key handover — we create thoughtfully crafted residential sanctuaries.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
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
                <Compass className="w-5 h-5 text-[#76A035]" />
                <span className="text-xs font-bold text-[#0C3B2E] uppercase tracking-wider">
                  3D Planning
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Home className="w-5 h-5 text-[#76A035]" />
                <span className="text-xs font-bold text-[#0C3B2E] uppercase tracking-wider">
                  Turnkey Build
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#76A035]" />
                <span className="text-xs font-bold text-[#0C3B2E] uppercase tracking-wider">
                  End-to-End
                </span>
              </div>
            </div>

          </div>

          {/* Right Visual Image Composition (5 Cols) */}
          <div className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#E5E2D9]">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              alt="George Concepts Residential Architecture & Interior Design"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover animate-slow-zoom"
            />
            {/* Dark Gradient Glass Card overlay at bottom */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-nav-dark text-white shadow-xl border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#A2D157]">
                  Featured Project
                </p>
                <h4 className="text-sm font-bold text-white">Modern Minimal Residence</h4>
              </div>
              <span className="text-xs px-2.5 py-1 bg-white/20 rounded-md font-semibold text-white">
                Kochi
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
