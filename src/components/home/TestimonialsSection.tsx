"use client";

import React, { useState, useEffect } from "react";
import { Testimonial } from "@/types";
import { dataService } from "@/lib/services/dataService";
import { SectionHeading } from "../ui/SectionHeading";
import { TestimonialCard } from "../ui/TestimonialCard";

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await dataService.getTestimonials();
        setTestimonials(data.filter((t) => t.published));
      } catch (e) {
        console.error("Error loading testimonials:", e);
      }
    }
    load();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-[#FAF9F5] border-t border-[#E5E2D9]" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="CLIENT EXPERIENCES"
          title="What Our Clients Say"
          subtitle="Read honest feedback from homeowners and property developers who partnered with George Concepts for architecture, interiors, and turnkey construction."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
};
