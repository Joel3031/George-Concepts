import React from "react";
import { cn } from "@/lib/utils";

export const TrustSection: React.FC = () => {
  const principles = [
    {
      number: "01",
      title: "Thoughtful Design",
      desc: "Tailored architectural floor plans, spatial optimization, and bespoke interior aesthetics.",
    },
    {
      number: "02",
      title: "Turnkey Execution",
      desc: "Single-source responsibility handling site engineering, masonry, joinery, and fit-outs.",
    },
    {
      number: "03",
      title: "Uncompromising Quality",
      desc: "Strict material standards for steel, teak wood, porcelain tiles, and plumbing fixtures.",
    },
    {
      number: "04",
      title: "Client Collaboration",
      desc: "Transparent progress reports, scheduled milestone walkthroughs, and clear communication.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white border-y border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Architectural Manifesto Statement */}
        <div className="max-w-4xl mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-6 sm:w-8 h-[1px] bg-[#76A035]" />
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#76A035]">
              Our Approach
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-[#0C3B2E] tracking-tight leading-[1.24] sm:leading-[1.2] text-balance">
            &ldquo;From the first architectural sketch to the final key handover, we bring design thinking and site execution together under one roof.&rdquo;
          </h2>
        </div>

        {/* 4 Architectural Principles — Open Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[#E5E2D9]">
          {principles.map((item, index) => {
            const isFirstCol = index % 2 === 0;
            const isTopRow = index < 2;

            return (
              <div
                key={item.number}
                className={cn(
                  "flex flex-col justify-between group",
                  // Mobile (< md): clean vertical stack with horizontal dividers
                  "py-6 sm:py-8 border-b border-[#E5E2D9] last:border-b-0",
                  // Tablet (md to lg, 2 columns):
                  "md:py-8 md:border-b-0",
                  isFirstCol ? "md:pr-8 md:border-r md:border-[#E5E2D9]" : "md:pl-8",
                  isTopRow ? "md:border-b md:border-[#E5E2D9] md:pb-8" : "md:pt-8",
                  // Desktop (lg+, 4 columns):
                  "lg:py-10 lg:border-b-0",
                  "lg:border-r lg:border-[#E5E2D9] last:lg:border-r-0",
                  index === 0
                    ? "lg:pr-8 lg:pl-0"
                    : index === 3
                    ? "lg:pl-8 lg:pr-0"
                    : "lg:px-8"
                )}
              >
                <div>
                  <span className="font-mono text-2xl sm:text-3xl font-light text-[#76A035] block mb-2.5 sm:mb-3">
                    {item.number}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0C3B2E] tracking-tight mb-2 sm:mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#636E6A] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
