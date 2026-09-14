"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit3, Trash2, Eye, EyeOff, Star, Check } from "lucide-react";
import { Project, ProjectCategory } from "@/types";
import { dataService } from "@/lib/services/dataService";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  const loadProjects = async () => {
    try {
      const data = await dataService.getProjects();
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject({
      title: "",
      slug: "",
      category: "Interior",
      location: "Kochi, Kerala",
      short_description: "",
      description: "",
      cover_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      year: "2026",
      client_name: "Private Client",
      area: "3,500 sq.ft",
      featured: false,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.cover_image) return;

    await dataService.saveProject(editingProject);
    setIsModalOpen(false);
    loadProjects();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await dataService.deleteProject(id);
      loadProjects();
    }
  };

  const handleTogglePublish = async (project: Project) => {
    await dataService.saveProject({ ...project, published: !project.published });
    loadProjects();
  };

  const handleToggleFeatured = async (project: Project) => {
    await dataService.saveProject({ ...project, featured: !project.featured });
    loadProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E5E2D9]">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0C3B2E]">Projects CMS</h1>
          <p className="text-sm text-[#636E6A] mt-1">Manage your portfolio projects, categories, and image links.</p>
        </div>
        <Button onClick={handleOpenCreate} variant="primary" icon={<Plus className="w-4 h-4" />}>
          Add New Project
        </Button>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="py-12 text-center text-[#636E6A]">Loading projects...</div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-stone-100">
                  <Image src={project.cover_image} alt={project.title} fill className="object-cover" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#0C3B2E] text-white rounded-md">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#76A035] text-white rounded-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> Featured
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#0C3B2E] mb-1">{project.title}</h3>
                <p className="text-xs text-[#76A035] font-semibold mb-2">{project.location} • {project.area}</p>
                <p className="text-xs text-[#636E6A] line-clamp-2 leading-relaxed mb-4">{project.short_description}</p>
              </div>

              <div className="pt-4 border-t border-[#E5E2D9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePublish(project)}
                    className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      project.published ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {project.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span>{project.published ? "Published" : "Draft"}</span>
                  </button>

                  <button
                    onClick={() => handleToggleFeatured(project)}
                    className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                      project.featured ? "bg-amber-50 text-amber-700" : "bg-stone-100 text-stone-400"
                    }`}
                    title="Toggle Featured on Homepage"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-2 rounded-lg bg-stone-100 hover:bg-[#0C3B2E] hover:text-white text-[#0C3B2E] transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-[#636E6A]">No projects available.</div>
      )}

      {/* Edit / Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject?.id ? "Edit Portfolio Project" : "Create New Project"}
      >
        {editingProject && (
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={editingProject.title || ""}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Category</label>
                <select
                  value={editingProject.category || "Interior"}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })
                  }
                  className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
                >
                  <option value="Interior">Interior Design</option>
                  <option value="Turnkey">Turnkey Construction</option>
                  <option value="Renovation">Renovation</option>
                  <option value="Planning">Architectural Planning</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Location</label>
                <input
                  type="text"
                  value={editingProject.location || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Cover Image URL *</label>
              <input
                type="url"
                required
                value={editingProject.cover_image || ""}
                onChange={(e) => setEditingProject({ ...editingProject, cover_image: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Short Description</label>
              <input
                type="text"
                value={editingProject.short_description || ""}
                onChange={(e) => setEditingProject({ ...editingProject, short_description: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Full Detailed Overview</label>
              <textarea
                rows={4}
                value={editingProject.description || ""}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Before Image URL (Optional)</label>
                <input
                  type="url"
                  value={editingProject.before_image || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, before_image: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-[#0C3B2E] mb-1">After Image URL (Optional)</label>
                <input
                  type="url"
                  value={editingProject.after_image || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, after_image: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Project
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
