import React from "react";
import { PenTool, HardHat, Award, Headset } from "lucide-react";

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: <PenTool className="w-6 h-6 text-[#76A035]" />,
      title: "Thoughtful Design",
      desc: "Tailored architectural floor plans, spatial optimization, and bespoke interior aesthetics.",
    },
    {
      icon: <HardHat className="w-6 h-6 text-[#76A035]" />,
      title: "Turnkey Execution",
      desc: "Single-source responsibility handling site engineering, masonry, joinery, and fit-outs.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#76A035]" />,
      title: "Uncompromising Quality",
      desc: "Strict material standards for steel, teak wood, porcelain tiles, and plumbing fixtures.",
    },
    {
      icon: <Headset className="w-6 h-6 text-[#76A035]" />,
      title: "Client Collaboration",
      desc: "Transparent progress reports, scheduled milestone walkthroughs, and clear communication.",
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Statement Box */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0C3B2E] leading-snug">
            &ldquo;From the first architectural sketch to the final key handover, we bring design thinking and site execution together under one roof.&rdquo;
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-[#FAF9F5] border border-[#E5E2D9] hover:border-[#76A035] transition-all duration-300 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-lg bg-white border border-[#E5E2D9] flex items-center justify-center mb-4 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0C3B2E] mb-2">{item.title}</h3>
              <p className="text-sm text-[#636E6A] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
