import React from "react";
import { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Get a Consultation",
  description: "Get in touch with George Concepts Design Studio to discuss your residential architectural planning, interior design, renovation, or turnkey construction project.",
};

export default function ContactPage() {
  return (
    <main className="pt-28 pb-16">
      <ContactSection />
    </main>
  );
}
