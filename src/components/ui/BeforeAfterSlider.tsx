"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
  description?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  title,
  description,
  className,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep track of container width for perfect pixel registration
  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let position = (x / rect.width) * 100;

      if (position < 0) position = 0;
      if (position > 100) position = 100;

      setSliderPosition(position);
    },
    []
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleEnd = () => setIsDragging(false);

  return (
    <div className={cn("w-full flex flex-col", className)}>
      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-[#E5E2D9] select-none cursor-ew-resize [container-type:inline-size]"
        style={{ touchAction: "pan-y" }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
      >
        {/* AFTER IMAGE (Background / Full Base) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt="After Renovation"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* AFTER BADGE */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 pointer-events-none">
            <span className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-[#0C3B2E] text-white rounded-md shadow-lg border border-[#76A035]/30">
              AFTER
            </span>
          </div>
        </div>

        {/* BEFORE IMAGE (Clipped Layer on Top - pinned to full container width) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="relative h-full w-[100cqw] max-w-none"
            style={{ width: containerWidth ? `${containerWidth}px` : "100cqw" }}
          >
            <Image
              src={beforeImage}
              alt="Before Renovation"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          {/* BEFORE BADGE */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
            <span className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-stone-900/90 text-white rounded-md shadow-lg backdrop-blur-md">
              BEFORE
            </span>
          </div>
        </div>

        {/* DIVIDER HANDLE BAR */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_12px_rgba(0,0,0,0.6)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0C3B2E] text-white border-2 border-white shadow-2xl flex items-center justify-center transition-transform active:scale-110"
            aria-label="Comparison slider handle"
            role="slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <GripVertical className="w-5 h-5 text-[#76A035]" />
          </div>
        </div>
      </div>

      {/* Title & Description Below Slider */}
      {(title || description) && (
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2 px-1 sm:px-2">
          {title && <h4 className="text-base sm:text-lg font-bold text-[#0C3B2E]">{title}</h4>}
          {description && (
            <p className="text-xs sm:text-sm text-[#636E6A] max-w-xl">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};
