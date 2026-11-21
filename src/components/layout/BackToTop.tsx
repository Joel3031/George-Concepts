"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 400;

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "fixed z-40 group flex items-center justify-center rounded-full transition-all duration-300 active:scale-95 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0C3B2E] focus-visible:ring-offset-2",
        // Mobile positioning & dimensions (sits 12px above WhatsApp button)
        "right-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] w-12 h-12",
        // Desktop positioning & dimensions (centered horizontally above 56px WhatsApp button, 12px gap)
        "sm:right-7 sm:bottom-[5.75rem] sm:w-12 sm:h-12",
        // Architectural color palette
        "bg-[#FAF9F5]/95 backdrop-blur-sm text-[#0C3B2E] border border-[#E5E2D9] hover:bg-[#0C3B2E] hover:text-white hover:border-[#0C3B2E]",
        // Visibility transitions
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      )}
    >
      <ArrowUp
        className="w-5 h-5 text-current transition-transform duration-200 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </button>
  );
};
