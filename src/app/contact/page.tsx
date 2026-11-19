import React from "react";
import { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Contact George Concepts | Architect in Aloor, Thrissur",
  description: `Contact architect ${siteConfig.architect} at ${siteConfig.brandName} in Aloor, Thrissur, Kerala. Inquire about residential, commercial, or interior design projects and schedule a site consultation.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact ${siteConfig.brandName} | Aloor, Thrissur`,
    description: `Connect with architect ${siteConfig.architect} for architectural planning, interior design, and turnkey construction in Aloor, Thrissur, Kerala.`,
    type: "website",
    locale: "en_IN",
  },
};

export default function ContactPage() {
  return (
    <main className="pt-24 sm:pt-28 pb-12 sm:pb-16">
      <ContactSection />
    </main>
  );
}
