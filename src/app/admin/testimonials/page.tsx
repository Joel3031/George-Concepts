"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Star } from "lucide-react";
import { Testimonial } from "@/types";
import { dataService } from "@/lib/services/dataService";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<Testimonial>>({
    client_name: "",
    location: "Kochi, Kerala",
    project_type: "Interior Design",
    rating: 5,
    testimonial: "",
  });

  const loadTestimonials = async () => {
    try {
      const data = await dataService.getTestimonials();
      setTestimonials(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.client_name || !newItem.testimonial) return;

    await dataService.saveTestimonial(newItem);
    setIsModalOpen(false);
    loadTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete client testimonial?")) {
      await dataService.deleteTestimonial(id);
      loadTestimonials();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E5E2D9]">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0C3B2E]">Testimonials CMS</h1>
          <p className="text-sm text-[#636E6A] mt-1">Manage customer reviews and client stories.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary" icon={<Plus className="w-4 h-4" />}>
          Add Testimonial
        </Button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-[#636E6A]">Loading reviews...</div>
      ) : testimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="p-4 sm:p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-bold text-[#0C3B2E]">{t.client_name}</h4>
                  <div className="flex text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#76A035] font-semibold mb-3">{t.project_type} • {t.location}</p>
                <p className="text-xs text-[#1C2522] italic leading-relaxed mb-4">&ldquo;{t.testimonial}&rdquo;</p>
              </div>

              <div className="pt-3 border-t border-[#E5E2D9] flex justify-end">
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                  aria-label="Delete testimonial"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-[#636E6A]">No testimonials added yet.</div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Client Testimonial">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Client Name *</label>
            <input
              type="text"
              required
              value={newItem.client_name || ""}
              onChange={(e) => setNewItem({ ...newItem, client_name: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-base sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Location</label>
              <input
                type="text"
                value={newItem.location || ""}
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-base sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Project Type</label>
              <input
                type="text"
                value={newItem.project_type || ""}
                onChange={(e) => setNewItem({ ...newItem, project_type: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-base sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Testimonial Review *</label>
            <textarea
              rows={4}
              required
              value={newItem.testimonial || ""}
              onChange={(e) => setNewItem({ ...newItem, testimonial: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-base sm:text-sm resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Testimonial</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
