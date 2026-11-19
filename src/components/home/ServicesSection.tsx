import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#FAF9F5] border-t border-[#E5E2D9]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Layout: Introduction & Architectural Photo (5 Cols) vs. Directory (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Anchored Section Header, Architectural Image & Studio Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            
            {/* 1. Section Label */}
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-[1px] bg-[#76A035]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#76A035]">
                Our Capabilities
              </span>
            </div>

            {/* 2. Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0C3B2E] tracking-tight leading-[1.12] mb-4 sm:mb-5">
              What We Do
            </h2>

            {/* 3. Introductory Description */}
            <p className="text-sm sm:text-base text-[#636E6A] leading-relaxed max-w-lg font-normal">
              Comprehensive design, planning, renovation, and construction services structured to bring your vision to life seamlessly.
            </p>

            {/* 4. Architectural Photograph */}
            <div className="relative w-full aspect-[16/10] overflow-hidden my-6 sm:my-7 bg-[#E5E2D9]/30">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                alt="Contemporary Family Villa - Architecture and Turnkey Execution by George Concepts"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
            </div>

            {/* 5. Integrated Practice Subsection */}
            <div className="pt-6 sm:pt-7 border-t border-[#E5E2D9] space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0C3B2E] block">
                Integrated Practice
              </span>
              <p className="text-xs text-[#636E6A] leading-relaxed">
                Every architectural vertical is managed in-house — from regulatory drawings and 3D modeling to masonry, timber joinery, and interior handover.
              </p>
              
              {/* 6. Explore Full Service Specifications Link */}
              <div className="pt-1.5">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0C3B2E] hover:text-[#76A035] transition-colors group"
                >
                  <span>Explore Full Service Specifications</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#76A035]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Service Catalogue Directory (Unchanged) */}
          <div className="lg:col-span-7">
            <div className="border-t border-[#E5E2D9] divide-y divide-[#E5E2D9]">
              {siteConfig.services.map((service, idx) => (
                <Link
                  key={service.id}
                  href={`/services#${service.id}`}
                  className="group py-6 sm:py-7 lg:py-8 flex items-start justify-between gap-4 sm:gap-6 block transition-all duration-200 hover:pl-2"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Index Number */}
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#76A035] pt-1 shrink-0">
                      0{idx + 1}
                    </span>

                    {/* Service Content */}
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0C3B2E] tracking-tight group-hover:text-[#76A035] transition-colors duration-200">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#636E6A] leading-relaxed mt-2 max-w-xl font-normal">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Directional Indicator */}
                  <div className="shrink-0 pt-1 text-[#0C3B2E]/40 group-hover:text-[#76A035] transition-colors duration-200">
                    <div className="w-8 h-8 rounded-full border border-[#E5E2D9] group-hover:border-[#76A035] flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
