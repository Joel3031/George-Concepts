import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-8 sm:mb-12 md:mb-16", alignmentClasses[align], className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 mb-2.5 sm:mb-3">
          <span className="w-6 sm:w-8 h-[2px] bg-[#76A035]" />
          <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.16em] sm:tracking-[0.25em] font-bold text-[#76A035]">
            {badge}
          </span>
          {align === "center" && <span className="w-6 sm:w-8 h-[2px] bg-[#76A035]" />}
        </div>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.18] sm:leading-[1.15]",
          dark ? "text-white" : "text-[#0C3B2E]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal",
            dark ? "text-stone-300" : "text-[#636E6A]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
