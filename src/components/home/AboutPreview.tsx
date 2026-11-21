import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";

export const AboutPreview: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#FAF9F5] border-t border-[#E5E2D9]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column Image (5 Cols) */}
          <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#E5E2D9]">
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
              alt="George Concepts Design Studio Vision"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E]/60 via-transparent to-transparent p-4 sm:p-8 flex items-end">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#A2D157] bg-[#0C3B2E]/80 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-md">
                George Concepts Design Studio
              </span>
            </div>
          </div>

          {/* Right Column Text (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <SectionHeading
              badge="ABOUT OUR STUDIO"
              title="Built around ideas. Shaped by design. Delivered through execution."
              subtitle="George Concepts is an architecture, interior design, and turnkey construction studio led by Jispin George, based in Aloor, Thrissur, Kerala."
              align="left"
              className="mb-4 sm:mb-6"
            />

            <div className="space-y-3.5 sm:space-y-4 text-sm sm:text-base text-[#636E6A] leading-relaxed mb-6">
              <p>
                We believe that great homes are born at the intersection of aesthetic clarity, structural engineering precision, and lifestyle customization. Rather than separating design from site construction, we integrate architectural planning, custom joinery, electrical systems, and finishing under single-source management.
              </p>
              <p>
                Whether you are constructing a new villa, remodeling a heritage family residence, or seeking interior spatial planning, our team ensures every detail aligns with your vision.
              </p>
            </div>

            {/* 3 Core Studio Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 mb-6 sm:mb-8 border-t border-[#E5E2D9]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0C3B2E] tracking-tight mb-0.5">Personalized Vision</span>
                <p className="text-[11px] text-[#636E6A] leading-relaxed">Tailored floor plans designed around how your family actually lives.</p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0C3B2E] tracking-tight mb-0.5">Material Rigor</span>
                <p className="text-[11px] text-[#636E6A] leading-relaxed">Rigorous grading for teak wood, steel, tiling, and joinery finishes.</p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0C3B2E] tracking-tight mb-0.5">Single Accountability</span>
                <p className="text-[11px] text-[#636E6A] leading-relaxed">Zero contractor finger-pointing from initial sketch to key handover.</p>
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <Button href="/about" variant="outline" size="md" className="w-full sm:w-auto" icon={<ArrowRight className="w-4 h-4" />}>
                Read Our Studio Story
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
