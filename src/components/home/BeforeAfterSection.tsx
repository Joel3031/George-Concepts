"use client";

import React, { useState, useEffect } from "react";
import { BeforeAfterItem } from "@/types";
import { dataService } from "@/lib/services/dataService";
import { SectionHeading } from "../ui/SectionHeading";
import { BeforeAfterSlider } from "../ui/BeforeAfterSlider";
import { cn } from "@/lib/utils";

export const BeforeAfterSection: React.FC = () => {
  const [items, setItems] = useState<BeforeAfterItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await dataService.getBeforeAfter();
        setItems(data.filter((b) => b.published));
      } catch (e) {
        console.error("Error loading before/after:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || items.length === 0) return null;

  const current = items[activeIndex];

  return (
    <section className="py-24 bg-[#FAF9F5] border-t border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="TRANSFORMATIONS"
          title="Before & After"
          subtitle="Renovation projects require deep architectural insight. Drag the handle below to see how we reimagine existing structures into high-end modern living spaces."
        />

        {/* Tab Selection if multiple items */}
        {items.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {items.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300",
                  activeIndex === idx
                    ? "bg-[#0C3B2E] text-white shadow-md"
                    : "bg-white text-[#0C3B2E] hover:bg-[#E5E2D9] border border-[#E5E2D9]"
                )}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}

        {/* Slider Box */}
        <div className="max-w-5xl mx-auto">
          <BeforeAfterSlider
            beforeImage={current.before_image}
            afterImage={current.after_image}
            title={current.title}
            description={current.description}
          />
        </div>
      </div>
    </section>
  );
};
