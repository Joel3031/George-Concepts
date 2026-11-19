"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 45;

  // Body scroll lock
  useEffect(() => {
    if (currentIndex === null) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [currentIndex]);

  // Keyboard navigation
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

  // Touch swipe handling
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && items.length > 1) {
      onNext();
    }
    if (isRightSwipe && items.length > 1) {
      onPrev();
    }
  };

  if (currentIndex === null || !items[currentIndex]) return null;

  const current = items[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-8 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-stone-900/80 text-white hover:bg-[#76A035] active:scale-95 transition-colors duration-300 focus:outline-none"
        aria-label="Close Lightbox"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Desktop Prev Button */}
      {items.length > 1 && (
        <button
          onClick={onPrev}
          className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 min-w-[48px] min-h-[48px] items-center justify-center rounded-full bg-stone-900/80 text-white hover:bg-[#76A035] active:scale-95 transition-colors duration-300 focus:outline-none"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Display */}
      <div className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center justify-center">
        <div className="relative w-full h-[50vh] sm:h-[65vh] rounded-xl overflow-hidden shadow-2xl">
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
        <div className="mt-3 sm:mt-4 text-center max-w-2xl px-2 sm:px-4 max-h-[30vh] overflow-y-auto">
          <div className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#76A035] bg-[#0C3B2E] rounded-md mb-1.5 sm:mb-2">
            {current.category}
          </div>
          <h3 className="text-base sm:text-xl font-bold text-white mb-0.5 sm:mb-1">{current.title}</h3>
          {current.description && (
            <p className="text-xs sm:text-sm text-stone-300 line-clamp-2">{current.description}</p>
          )}

          {/* Mobile Bottom Navigation Controls */}
          {items.length > 1 && (
            <div className="flex sm:hidden items-center justify-center gap-6 mt-3">
              <button
                onClick={onPrev}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-stone-900/80 text-white active:bg-[#76A035] transition-colors"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs text-stone-400 font-mono">
                {currentIndex + 1} / {items.length}
              </span>
              <button
                onClick={onNext}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-stone-900/80 text-white active:bg-[#76A035] transition-colors"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          <span className="hidden sm:block text-xs text-stone-500 mt-2">
            {currentIndex + 1} of {items.length} (Use arrow keys or swipe to navigate)
          </span>
        </div>
      </div>

      {/* Desktop Next Button */}
      {items.length > 1 && (
        <button
          onClick={onNext}
          className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 min-w-[48px] min-h-[48px] items-center justify-center rounded-full bg-stone-900/80 text-white hover:bg-[#76A035] active:scale-95 transition-colors duration-300 focus:outline-none"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
