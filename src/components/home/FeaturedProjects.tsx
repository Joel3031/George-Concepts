"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Project, ProjectCategory } from "@/types";
import { siteConfig } from "@/config/siteConfig";
import { dataService } from "@/lib/services/dataService";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../ui/ProjectCard";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

export const FeaturedProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await dataService.getProjects();
        setProjects(data.filter((p) => p.published));
      } catch (e) {
        console.error("Error loading projects:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === (activeCategory as ProjectCategory));

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="PORTFOLIO"
          title="Featured Projects"
          subtitle="Explore our recent residential architectures, interior spaces, renovations, and turnkey executions."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mb-8 sm:mb-12">
          {siteConfig.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none min-h-[40px] sm:min-h-[44px]",
                activeCategory === cat.id
                  ? "bg-[#0C3B2E] text-white shadow-md"
                  : "bg-[#FAF9F5] text-[#0C3B2E] hover:bg-[#E5E2D9] border border-[#E5E2D9]"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="aspect-[4/3] bg-stone-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          /* Projects Grid: 4 items on mobile for compact scanning, 6 on desktop/tablet */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-14">
            {filteredProjects.slice(0, 6).map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                className={cn(idx >= 4 && "hidden md:flex")}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[#636E6A]">
            No projects found in this category.
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center">
          <Button href="/projects" variant="outline" size="lg" className="w-full sm:w-auto" icon={<ArrowRight className="w-4 h-4" />}>
            View Entire Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
};
