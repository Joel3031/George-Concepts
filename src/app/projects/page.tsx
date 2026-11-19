import React from "react";
import { Metadata } from "next";
import { siteConfig, getSiteUrl } from "@/config/siteConfig";
import { ProjectsClient } from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Architecture & Interior Portfolio | Completed Projects",
  description: `Browse completed residential architecture, commercial projects, and bespoke interior styling by ${siteConfig.brandName} and architect ${siteConfig.architect} across Thrissur and Kerala.`,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Architecture & Interior Portfolio | ${siteConfig.brandName}`,
    description: `Explore our residential villas, commercial architecture, and turnkey interior designs across Thrissur and Kerala by architect ${siteConfig.architect}.`,
    type: "website",
    locale: "en_IN",
  },
};

export default function ProjectsPage() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Architectural & Interior Design Portfolio",
    description: `Portfolio of completed residential and commercial projects by architect ${siteConfig.architect} at ${siteConfig.brandName}, Aloor, Thrissur.`,
    url: siteUrl ? `${siteUrl}/projects` : "/projects",
    provider: {
      "@type": "ArchitectureFirm",
      name: siteConfig.brandName,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.locality,
        addressRegion: siteConfig.location.state,
        addressCountry: siteConfig.location.countryCode,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsClient />
    </>
  );
}
