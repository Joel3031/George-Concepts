import React from "react";
import {
  MessageSquare,
  DraftingCompass,
  Palette,
  HardHat,
  Sparkles,
  Key,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { SectionHeading } from "../ui/SectionHeading";

// Dedicated architectural icons for each consecutive phase
const stepIcons = [
  MessageSquare,   // 01. Initial Consultation
  DraftingCompass, // 02. Architectural Planning
  Palette,         // 03. Interior & Detailed Design
  HardHat,         // 04. Site Execution
  Sparkles,        // 05. Refinement & Finishing
  Key,             // 06. Key Handover
];

export const ProcessTimeline: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#07251D] text-white relative overflow-hidden" id="process">
      {/* Background Subtle Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#76A035_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="OUR METHODOLOGY"
          title="From Concept to Handover"
          subtitle="A structured 6-phase journey ensuring complete clarity, architectural precision, and timely site execution."
          dark
        />

        {/* ========================================================= */}
        {/* 1. DESKTOP CONNECTED HORIZONTAL JOURNEY (lg:block)        */}
        {/* Continuous 6-stage progressive timeline with flow arrows  */}
        {/* ========================================================= */}
        <div className="hidden lg:block w-full pt-4 pb-2">
          <div className="grid grid-cols-6 gap-4 xl:gap-6 relative items-stretch">
            {siteConfig.processSteps.map((step, idx) => {
              const Icon = stepIcons[idx];
              const isLast = idx === siteConfig.processSteps.length - 1;

              return (
                <div key={step.step} className="relative flex flex-col h-full group">
                  {/* Top Node & Interconnecting Line */}
                  <div className="relative flex items-center justify-center mb-6 shrink-0">
                    {/* Connecting line to the next node with directional arrow */}
                    {!isLast && (
                      <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-white/20 z-0 flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5 text-[#76A035] -translate-y-1/2 absolute left-1/2 -translate-x-1/2" />
                      </div>
                    )}

                    {/* Circular Visual Node Anchor */}
                    <div className="relative z-10 w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-[#07251D] border-2 border-[#76A035] text-[#A2D157] flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:border-[#A2D157] transition-all duration-300">
                      <Icon className="w-5 h-5 xl:w-6 xl:h-6 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Stage Details (Equal-height flex column) */}
                  <div className="flex flex-col flex-1 text-left">
                    {/* 1. Phase Label */}
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A2D157] block mb-1.5 shrink-0">
                      Phase {step.step}
                    </span>

                    {/* 2. Phase Title (Consistent minimum height across single & multi-line titles) */}
                    <h3 className="text-base font-bold text-white tracking-tight mb-2 leading-snug group-hover:text-[#A2D157] transition-colors duration-200 min-h-[3rem] flex items-start shrink-0">
                      {step.title}
                    </h3>

                    {/* 3. Phase Description (Flex-1 absorbs vertical height differences) */}
                    <p className="text-xs text-stone-300 leading-relaxed font-normal flex-1">
                      {step.desc}
                    </p>

                    {/* 4. Milestone Indicator (Uniformly aligned on a common baseline) */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-stone-400 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#76A035]" />
                      <span>Phase {step.step} Milestone</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MOBILE & TABLET VERTICAL JOURNEY (< lg)                */}
        {/* Continuous architectural rail linking all 6 phases        */}
        {/* ========================================================= */}
        <div className="block lg:hidden w-full max-w-xl mx-auto relative pt-2">
          {/* Continuous Vertical Rail connecting all nodes */}
          <div className="absolute left-5 sm:left-6 top-5 bottom-8 w-[1px] bg-white/20" />

          <div className="space-y-0">
            {siteConfig.processSteps.map((step, idx) => {
              const Icon = stepIcons[idx];

              return (
                <div
                  key={step.step}
                  className="relative flex items-start gap-3.5 sm:gap-5 pb-5 sm:pb-7 last:pb-0 group"
                >
                  {/* Visual Node on the Rail */}
                  <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#07251D] border-2 border-[#76A035] text-[#A2D157] flex items-center justify-center shrink-0 shadow-md">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                  </div>

                  {/* Content Block */}
                  <div className="flex-1 pt-0.5">
                    <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#A2D157] block mb-1">
                      Phase {step.step}
                    </span>

                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-1">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
