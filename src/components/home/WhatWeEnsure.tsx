import React from "react";
import { Check } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

export const WhatWeEnsure: React.FC = () => {
  const items = [
    { title: "Clear Architectural Planning", desc: "Detailed 3D blueprints and floor maps with no hidden surprises." },
    { title: "Functional Design First", desc: "Interiors optimized for your daily routine, storage, and natural light." },
    { title: "Quality Execution Standards", desc: "Rigorous material checks for concrete, timber, joinery, and plumbing." },
    { title: "Meticulous Attention to Detail", desc: "Clean alignments, concealed wiring, shadow gaps, and smooth finishes." },
    { title: "Client Collaboration", desc: "Regular site progress walkthroughs and milestone updates." },
    { title: "Professional Site Supervision", desc: "Experienced engineers supervising tradesmen continuously." },
    { title: "Timely Stage Updates", desc: "Transparent milestone tracking throughout execution." },
    { title: "Finished-Space Excellence", desc: "A pristine, move-in-ready home delivered upon final key handover." },
  ];

  return (
    <section className="py-20 bg-white border-t border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="OUR PROMISE"
          title="What We Ensure"
          subtitle="We focus on operational rigor, material integrity, and transparent client updates across every project."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#FAF9F5] border border-[#E5E2D9] hover:border-[#76A035] transition-colors duration-300 flex flex-col"
            >
              <div className="w-8 h-8 rounded-full bg-[#76A035] text-white flex items-center justify-center mb-4 shrink-0 shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#0C3B2E] mb-2">{item.title}</h3>
              <p className="text-xs text-[#636E6A] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
