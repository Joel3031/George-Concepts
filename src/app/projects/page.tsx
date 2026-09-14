"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Project, ProjectCategory } from "@/types";
import { siteConfig } from "@/config/siteConfig";
import { dataService } from "@/lib/services/dataService";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await dataService.getProjects();
        setProjects(data.filter((p) => p.published));
      } catch (e) {
        console.error("Error loading projects page:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === (activeCategory as ProjectCategory);
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.short_description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-28 pb-16">
      {/* Header */}
      <section className="bg-[#FAF9F5] py-16 border-b border-[#E5E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="PROJECT PORTFOLIO"
            title="Completed Residential Spaces"
            subtitle="Explore our architectural planning, interior styling, home renovations, and turnkey construction projects."
          />

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#636E6A]" />
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#E5E2D9] bg-white text-xs text-[#1C2522] focus:outline-none focus:ring-2 focus:ring-[#76A035]"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {siteConfig.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 focus:outline-none",
                    activeCategory === cat.id
                      ? "bg-[#0C3B2E] text-white shadow-md"
                      : "bg-white text-[#0C3B2E] hover:bg-[#E5E2D9] border border-[#E5E2D9]"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="aspect-[4/3] bg-stone-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#636E6A]">
              <p className="text-lg font-semibold text-[#0C3B2E]">No matching projects found</p>
              <p className="text-sm mt-1">Try clearing your search query or selecting a different category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
