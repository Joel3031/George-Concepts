"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/types";

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onClose, onNext, onPrev]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const current = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-stone-900/80 text-white hover:bg-[#76A035] transition-colors duration-300 focus:outline-none"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      {items.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/80 text-white hover:bg-[#76A035] transition-colors duration-300 focus:outline-none"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Display */}
      <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center">
        <div className="relative w-full h-[65vh] rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={current.image_url}
            alt={current.title}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption Bar */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <div className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#76A035] bg-[#0C3B2E] rounded-md mb-2">
            {current.category}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{current.title}</h3>
          {current.description && (
            <p className="text-sm text-stone-300">{current.description}</p>
          )}
          <span className="text-xs text-stone-500 mt-2 block">
            {currentIndex + 1} of {items.length}
          </span>
        </div>
      </div>

      {/* Next Button */}
      {items.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/80 text-white hover:bg-[#76A035] transition-colors duration-300 focus:outline-none"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
