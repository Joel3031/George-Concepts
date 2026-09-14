import React from "react";
import Link from "next/link";
import { LayoutGrid, Home, Hammer, Compass, MessageSquareCheck, Maximize2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-7 h-7" />,
  Home: <Home className="w-7 h-7" />,
  Hammer: <Hammer className="w-7 h-7" />,
  Compass: <Compass className="w-7 h-7" />,
  MessageSquareCheck: <MessageSquareCheck className="w-7 h-7" />,
  Maximize2: <Maximize2 className="w-7 h-7" />,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  shortDesc,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col p-8 bg-white rounded-xl border border-[#E5E2D9] shadow-sm hover:shadow-xl hover:border-[#76A035]/40 hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      {/* Icon Badge */}
      <div className="w-14 h-14 rounded-xl bg-[#FAF9F5] group-hover:bg-[#0C3B2E] text-[#0C3B2E] group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300 shadow-inner">
        {iconMap[icon] || <Home className="w-7 h-7" />}
      </div>

      <h3 className="text-xl font-bold text-[#0C3B2E] mb-3 group-hover:text-[#5B8A3C] transition-colors duration-300">
        {title}
      </h3>

      <p className="text-sm text-[#636E6A] leading-relaxed flex-grow mb-6">
        {shortDesc}
      </p>

      <div className="pt-4 border-t border-[#E5E2D9]/60 flex items-center text-xs font-bold uppercase tracking-wider text-[#76A035] group-hover:text-[#0C3B2E] transition-colors duration-300">
        <span>Learn More</span>
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
      </div>

      <Link href={`/services#${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">Learn more about {title}</span>
      </Link>
    </div>
  );
};
