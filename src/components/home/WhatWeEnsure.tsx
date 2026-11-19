import React from "react";
import { Check } from "lucide-react";

export const WhatWeEnsure: React.FC = () => {
  const commitments = [
    {
      title: "Clear Architectural Planning",
      desc: "Detailed 3D blueprints and floor maps with no hidden surprises.",
    },
    {
      title: "Functional Design First",
      desc: "Interiors optimized for your daily routine, storage, and natural light.",
    },
    {
      title: "Quality Execution Standards",
      desc: "Rigorous material checks for concrete, timber, joinery, and plumbing.",
    },
    {
      title: "Meticulous Attention to Detail",
      desc: "Clean alignments, concealed wiring, shadow gaps, and smooth finishes.",
    },
    {
      title: "Client Collaboration",
      desc: "Regular site progress walkthroughs and milestone updates.",
    },
    {
      title: "Professional Site Supervision",
      desc: "Experienced engineers supervising tradesmen continuously.",
    },
    {
      title: "Timely Stage Updates",
      desc: "Transparent milestone tracking throughout execution.",
    },
    {
      title: "Finished-Space Excellence",
      desc: "A pristine, move-in-ready home delivered upon final key handover.",
    },
  ];

  // Split into two balanced sets of 4 for the 2-column desktop charter
  const firstCol = commitments.slice(0, 4);
  const secondCol = commitments.slice(4, 8);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="mb-10 sm:mb-14 lg:mb-16">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="w-6 sm:w-8 h-[1px] bg-[#76A035]" />
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#76A035]">
              Our Promise
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#E5E2D9]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0C3B2E] tracking-tight leading-[1.2]">
              What We Ensure
            </h2>
            <p className="max-w-lg text-xs sm:text-sm text-[#636E6A] leading-relaxed font-normal">
              We focus on operational rigor, material integrity, and transparent client updates across every project.
            </p>
          </div>
        </div>

        {/* 2-Column Open Quality Commitments Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Column 1 (Commitments 01 – 04) */}
          <div className="md:pr-8 lg:pr-14 md:border-r border-[#E5E2D9]">
            {firstCol.map((item, idx) => (
              <div
                key={idx}
                className="py-5 sm:py-6 border-b border-[#E5E2D9] first:pt-0 last:border-b md:last:border-b-0 flex items-start gap-3.5 sm:gap-4 group"
              >
                <div className="pt-1 shrink-0">
                  <Check className="w-4 h-4 text-[#76A035] stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0C3B2E] tracking-tight mb-1 group-hover:text-[#76A035] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#636E6A] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 (Commitments 05 – 08) */}
          <div className="md:pl-8 lg:pl-14">
            {secondCol.map((item, idx) => (
              <div
                key={idx}
                className="py-5 sm:py-6 border-b border-[#E5E2D9] md:first:pt-0 last:border-b-0 flex items-start gap-3.5 sm:gap-4 group"
              >
                <div className="pt-1 shrink-0">
                  <Check className="w-4 h-4 text-[#76A035] stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0C3B2E] tracking-tight mb-1 group-hover:text-[#76A035] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#636E6A] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
