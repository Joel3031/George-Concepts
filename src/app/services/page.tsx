import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CallToAction } from "@/components/home/CallToAction";

export const metadata: Metadata = {
  title: "Architecture, Interior Design & Turnkey Services | Thrissur",
  description: `Comprehensive architectural and interior services in Aloor, Thrissur by architect ${siteConfig.architect}. Residential architecture, commercial projects, bespoke interior design, and turnkey site execution.`,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Architectural & Interior Design Services | ${siteConfig.name} Thrissur`,
    description: `Residential architecture, commercial building design, and turnkey interior solutions in Aloor, Thrissur, Kerala by architect ${siteConfig.architect}.`,
    type: "website",
    locale: "en_IN",
  },
};

export default function ServicesPage() {
  return (
    <main className="pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Header */}
      <section className="bg-[#FAF9F5] py-10 sm:py-16 border-b border-[#E5E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="OUR CORE SERVICES"
            title="End-to-End Design & Build Capabilities"
            subtitle="Explore our comprehensive architectural, interior, renovation, and turnkey construction solutions."
          />
        </div>
      </section>

      {/* Services Breakdown Grid */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-16">
            {siteConfig.services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                shortDesc={service.shortDesc}
                icon={service.icon}
              />
            ))}
          </div>

          {/* Detailed Explanations */}
          <div className="space-y-6 sm:space-y-12 pt-8 sm:pt-12 border-t border-[#E5E2D9]">
            {siteConfig.services.map((service, idx) => (
              <div
                key={service.id}
                id={service.id}
                className="p-5 sm:p-8 md:p-10 rounded-2xl bg-[#FAF9F5] border border-[#E5E2D9] scroll-mt-28 flex flex-col md:flex-row gap-5 sm:gap-6 items-start justify-between"
              >
                <div className="max-w-3xl">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#76A035] mb-1.5 sm:mb-2 block">
                    0{idx + 1} Vertical
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0C3B2E] mb-2 sm:mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#636E6A] leading-relaxed">
                    {service.fullDesc}
                  </p>
                </div>
                <div className="shrink-0 w-full sm:w-auto pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0C3B2E] hover:text-[#76A035] transition-colors group py-2"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-4 h-4 text-[#76A035] transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <CallToAction />
    </main>
  );
}
