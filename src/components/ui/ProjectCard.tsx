import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
  priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className,
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#E5E2D9] shadow-sm hover:shadow-xl transition-all duration-500",
        className
      )}
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <Image
          src={project.cover_image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Category Pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#0C3B2E]/90 text-white backdrop-blur-md rounded-full shadow-md">
            {project.category}
          </span>
        </div>

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-white bg-[#76A035] px-4 py-2 rounded-lg shadow-lg">
            View Case Study <ArrowUpRight className="ml-1 w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Content Block */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-1.5 text-xs text-[#76A035] font-semibold uppercase tracking-wider mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>{project.location}</span>
          {project.year && <span className="text-[#636E6A] font-normal">• {project.year}</span>}
        </div>

        <h3 className="text-xl font-bold text-[#0C3B2E] group-hover:text-[#5B8A3C] transition-colors duration-300 line-clamp-1 mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-[#636E6A] line-clamp-2 leading-relaxed flex-grow mb-4">
          {project.short_description}
        </p>

        {/* Bottom Link */}
        <div className="pt-4 border-t border-[#E5E2D9] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#0C3B2E] group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
            Explore Project Details
          </span>
          <div className="w-8 h-8 rounded-full bg-[#FAF9F5] group-hover:bg-[#0C3B2E] group-hover:text-white text-[#0C3B2E] flex items-center justify-center transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Click Target Overlay */}
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-20">
        <span className="sr-only">View {project.title}</span>
      </Link>
    </div>
  );
};
