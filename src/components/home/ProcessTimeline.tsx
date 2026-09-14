import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { SectionHeading } from "../ui/SectionHeading";

export const ProcessTimeline: React.FC = () => {
  return (
    <section className="py-24 bg-[#07251D] text-white relative overflow-hidden" id="process">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#76A035_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="OUR METHODOLOGY"
          title="From Concept to Handover"
          subtitle="A structured 6-phase journey ensuring complete clarity, architectural precision, and timely site execution."
          dark
        />

        {/* Timeline Grid (6 Steps) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.processSteps.map((step) => (
            <div
              key={step.step}
              className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#76A035] hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-extrabold text-[#A2D157] group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </span>
                  <span className="w-10 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-[#A2D157] transition-all duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-stone-300 leading-relaxed">{step.desc}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-xs font-semibold text-[#A2D157] uppercase tracking-wider">
                Phase {step.step} Milestone
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
