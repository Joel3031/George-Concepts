import { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { WhatWeEnsure } from "@/components/home/WhatWeEnsure";
import { AboutPreview } from "@/components/home/AboutPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CallToAction } from "@/components/home/CallToAction";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Architecture, Interior Design & Turnkey Construction`,
  description: siteConfig.description,
  keywords: [
    "Interior Design",
    "Architecture Studio",
    "Architectural Planning",
    "Turnkey Construction",
    "Home Renovation",
    "Residential Construction",
    "Space Planning",
    "Architectural Consultation",
    "Kerala Architecture",
    "Kochi Interior Designer",
  ],
  openGraph: {
    title: `${siteConfig.name} | Architecture, Interior Design & Turnkey Construction`,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.brandName,
  },
};

export default function HomePage() {
  // Schema.org LocalBusiness & Organization JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArchitectureFirm",
    name: siteConfig.brandName,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Kochi",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    service: siteConfig.services.map((s) => s.title),
    sameAs: [siteConfig.social.instagram],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="w-full overflow-hidden">
        <HeroSection />
        <TrustSection />
        <ServicesSection />
        <FeaturedProjects />
        <BeforeAfterSection />
        <WhyChooseUs />
        <ProcessTimeline />
        <WhatWeEnsure />
        <AboutPreview />
        <GalleryPreview />
        <TestimonialsSection />
        <CallToAction />
        <ContactSection />
      </main>
    </>
  );
}
