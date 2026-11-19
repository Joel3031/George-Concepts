import React from "react";
import { Quote, Star } from "lucide-react";
import { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between p-5 sm:p-6 lg:p-8 bg-white rounded-2xl border border-[#E5E2D9] shadow-sm hover:shadow-xl transition-all duration-300 relative",
        className
      )}
    >
      <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#76A035]/30 mb-3 sm:mb-4" />

      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-3 sm:mb-4 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4 fill-current",
              i < testimonial.rating ? "text-amber-400" : "text-stone-300"
            )}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-sm sm:text-base text-[#1C2522] italic leading-relaxed flex-grow mb-4 sm:mb-6">
        &ldquo;{testimonial.testimonial}&rdquo;
      </p>

      {/* Client Info */}
      <div className="pt-3.5 sm:pt-4 border-t border-[#E5E2D9]">
        <h4 className="text-sm sm:text-base font-bold text-[#0C3B2E]">{testimonial.client_name}</h4>
        <p className="text-xs text-[#76A035] font-semibold tracking-wide">
          {testimonial.project_type} • {testimonial.location}
        </p>
      </div>
    </div>
  );
};
