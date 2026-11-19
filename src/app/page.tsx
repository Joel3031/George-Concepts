import { Metadata } from "next";
import { siteConfig, getSiteUrl } from "@/config/siteConfig";
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
  title: `${siteConfig.name} | Architecture, Interior Design & Turnkey Services | Aloor, Thrissur`,
  description: siteConfig.description,
  keywords: [
    "George Concepts",
    "Jispin George",
    "Architect Jispin George",
    "Architect in Aloor",
    "Architect in Thrissur",
    "Architecture Firm Thrissur",
    "Residential Architecture Kerala",
    "Commercial Architecture Kerala",
    "Interior Design Thrissur",
    "Turnkey Construction Thrissur",
    "Turnkey Services Kerala",
    "Home Renovation Thrissur",
    "Kerala Architecture Studio",
  ],
  openGraph: {
    title: `${siteConfig.name} | Architecture, Interior Design & Turnkey Services | Aloor, Thrissur`,
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.brandName,
    images: [
      {
        url: siteConfig.socialPreviewImage,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `${siteConfig.brandName} — Architect ${siteConfig.architect} | Aloor, Thrissur, Kerala`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Architecture, Interior Design & Turnkey Services | Aloor, Thrissur`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.socialPreviewImage,
        alt: `${siteConfig.brandName} — Architect ${siteConfig.architect} | Aloor, Thrissur, Kerala`,
      },
    ],
  },
};

export default function HomePage() {
  const siteUrl = getSiteUrl();

  // Validated Schema.org Graph for ArchitectureFirm, LocalBusiness & Architect Jispin George
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ArchitectureFirm", "ProfessionalService", "LocalBusiness"],
        "@id": siteUrl ? `${siteUrl}/#organization` : "#organization",
        name: siteConfig.brandName,
        alternateName: siteConfig.name,
        url: siteUrl || "/",
        logo: siteUrl ? `${siteUrl}/images/logo.svg` : "/images/logo.svg",
        image: siteUrl ? `${siteUrl}${siteConfig.socialPreviewImage}` : siteConfig.socialPreviewImage,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.locality,
          addressRegion: siteConfig.location.state,
          addressCountry: siteConfig.location.countryCode,
        },
        areaServed: [
          {
            "@type": "Place",
            name: "Aloor",
          },
          {
            "@type": "City",
            name: "Thrissur",
          },
          {
            "@type": "AdministrativeArea",
            name: "Kerala",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Architectural, Interior & Turnkey Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Residential Architecture",
                description: "Architectural design, floor plans, and spatial planning for private residences and villas.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Commercial Architecture",
                description: "Modern commercial retail spaces, office complexes, and architectural building design.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Interior Design",
                description: "Bespoke interior planning, material curation, custom joinery, and spatial styling.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Turnkey Services",
                description: "End-to-end residential project coordination, architectural planning, and site execution from design through completion.",
              },
            },
          ],
        },
        sameAs: [siteConfig.social.instagram],
      },
      {
        "@type": "Person",
        "@id": siteUrl ? `${siteUrl}/#architect` : "#architect",
        name: siteConfig.architect,
        jobTitle: "Architect",
        worksFor: {
          "@id": siteUrl ? `${siteUrl}/#organization` : "#organization",
        },
        description: `Architect at ${siteConfig.brandName}, providing residential architecture, commercial architecture, interior design, and turnkey services in Aloor, Thrissur, Kerala.`,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.locality,
          addressRegion: siteConfig.location.state,
          addressCountry: siteConfig.location.countryCode,
        },
        knowsAbout: [
          "Residential Architecture",
          "Commercial Architecture",
          "Interior Design",
          "Turnkey Construction",
        ],
      },
    ],
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
