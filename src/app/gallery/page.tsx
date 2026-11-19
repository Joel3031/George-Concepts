import React from "react";
import { Metadata } from "next";
import { siteConfig, getSiteUrl } from "@/config/siteConfig";
import { GalleryClient } from "./GalleryClient";

export const metadata: Metadata = {
  title: "Architectural & Interior Design Gallery | Visual Showcase",
  description: `Explore high-resolution photography of residential villas, living spaces, bespoke modular kitchens, and custom joinery by ${siteConfig.brandName} in Thrissur, Kerala.`,
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: `Architectural & Interior Gallery | ${siteConfig.brandName}`,
    description: `High-resolution photographs of luxury living spaces, bespoke kitchens, bedrooms, and structural facades in Kerala by architect ${siteConfig.architect}.`,
    type: "website",
    locale: "en_IN",
  },
};

export default function GalleryPage() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "George Concepts Architectural & Interior Gallery",
    description: `High-resolution photographs of residential architecture, commercial spaces, and custom interiors by architect ${siteConfig.architect}.`,
    url: siteUrl ? `${siteUrl}/gallery` : "/gallery",
    creator: {
      "@type": "Person",
      name: siteConfig.architect,
      jobTitle: siteConfig.architectTitle,
    },
    publisher: {
      "@type": "ArchitectureFirm",
      name: siteConfig.brandName,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryClient />
    </>
  );
}
