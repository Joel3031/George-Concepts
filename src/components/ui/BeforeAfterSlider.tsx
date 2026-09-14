"use client";

import React, { useState, useRef, useCallback } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className={cn("w-full flex flex-col", className)}>
      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-[#E5E2D9] select-none cursor-ew-resize touch-none"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
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
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest bg-[#0C3B2E] text-white rounded-md shadow-lg border border-[#76A035]/30">
              AFTER
            </span>
          </div>
        </div>

        {/* BEFORE IMAGE (Clipped Layer on Top) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full min-w-[100%]">
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
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest bg-stone-900/90 text-white rounded-md shadow-lg backdrop-blur-md">
              BEFORE
            </span>
          </div>
        </div>

        {/* DIVIDER HANDLE BAR */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0C3B2E] text-white border-2 border-white shadow-2xl flex items-center justify-center transition-transform active:scale-110">
            <GripVertical className="w-5 h-5 text-[#76A035]" />
          </div>
        </div>
      </div>

      {/* Title & Description Below Slider */}
      {(title || description) && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-2">
          {title && <h4 className="text-lg font-bold text-[#0C3B2E]">{title}</h4>}
          {description && (
            <p className="text-sm text-[#636E6A] max-w-xl">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};
