import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { CallToAction } from "@/components/home/CallToAction";

export const metadata: Metadata = {
  title: `About Architect ${siteConfig.architect} & Design Studio`,
  description: `Discover ${siteConfig.brandName} led by architect ${siteConfig.architect} in Aloor, Thrissur, Kerala. Learn about our architectural philosophy, residential design, and turnkey execution.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Architect ${siteConfig.architect} & Studio | ${siteConfig.name}`,
    description: `Discover ${siteConfig.brandName} led by architect ${siteConfig.architect} in Aloor, Thrissur, Kerala. Residential architecture and turnkey craftsmanship.`,
    type: "website",
    locale: "en_IN",
  },
};

export default function AboutPage() {
  return (
    <main className="pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Hero Header */}
      <section className="bg-[#FAF9F5] py-10 sm:py-16 border-b border-[#E5E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="ABOUT GEORGE CONCEPTS"
            title="Design Thinking Meets Precision Site Execution"
            subtitle="Transforming ideas into finished residential sanctuaries from concept to final key handover."
          />
        </div>
      </section>

      {/* Main Philosophy Section */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-[#E5E2D9]">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="George Concepts Studio Living Space"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-[#636E6A] leading-relaxed">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0C3B2E]">
                Our Architectural & Spatial Approach
              </h3>
              <p className="text-sm sm:text-base">
                At <strong>George Concepts Design Studio</strong>, we approach every residential build as a holistic creation. We believe that architecture and interior design are inseparable parts of modern living.
              </p>
              <p className="text-sm sm:text-base">
                Our multidisciplinary approach combines initial site feasibility studies, 3D structural blueprints, custom woodwork, lighting design, and single-source site engineering.
              </p>
              <p className="text-sm sm:text-base">
                By maintaining total control over both design and site execution, we eliminate communication gaps between architects and construction crews — ensuring your project is completed on time and within budget.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessTimeline />

      {/* CTA */}
      <CallToAction />
    </main>
  );
}
