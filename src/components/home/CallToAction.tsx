import React from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { Button } from "../ui/Button";

export const CallToAction: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#0C3B2E] text-white relative overflow-hidden">
      {/* Subtle Architectural Grid Accent */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#76A035]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[#A2D157] mb-2.5 sm:mb-3 inline-block">
          READY TO BUILD?
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 max-w-3xl mx-auto leading-tight">
          Have a Space in Mind? <br />
          <span className="text-[#A2D157]">Let&apos;s Bring Your Vision to Life.</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-stone-200 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
          Whether you need architectural planning, custom interior design, renovation, or end-to-end turnkey residential construction, our studio is ready to assist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <Button href="/contact" variant="accent" size="lg" className="w-full sm:w-auto" icon={<ArrowRight className="w-5 h-5" />}>
            Start Your Project
          </Button>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
              siteConfig.contact.whatsappWelcomeMsg
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold tracking-wide text-white bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 rounded-lg transition-all duration-300"
          >
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#A2D157]" />
            Talk on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
