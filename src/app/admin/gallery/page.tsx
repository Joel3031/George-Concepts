"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import { GalleryItem } from "@/types";
import { siteConfig } from "@/config/siteConfig";
import { dataService } from "@/lib/services/dataService";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    title: "",
    category: "Interiors",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "",
  });

  const loadGallery = async () => {
    try {
      const data = await dataService.getGallery();
      setGallery(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.image_url) return;

    await dataService.saveGalleryItem(newItem);
    setIsModalOpen(false);
    setNewItem({
      title: "",
      category: "Interiors",
      image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      description: "",
    });
    loadGallery();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete gallery photo?")) {
      await dataService.deleteGalleryItem(id);
      loadGallery();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E5E2D9]">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0C3B2E]">Gallery CMS</h1>
          <p className="text-sm text-[#636E6A] mt-1">Upload and organize design inspiration photos.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary" icon={<Plus className="w-4 h-4" />}>
          Add Photo
        </Button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-[#636E6A]">Loading gallery...</div>
      ) : gallery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white border border-[#E5E2D9] shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-stone-100">
                  <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase bg-[#0C3B2E] text-white rounded">
                    {item.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#0C3B2E] line-clamp-1">{item.title}</h4>
                {item.description && <p className="text-xs text-[#636E6A] line-clamp-1 mt-0.5">{item.description}</p>}
              </div>

              <div className="pt-3 mt-3 border-t border-[#E5E2D9] flex justify-end">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-[#636E6A]">No gallery photos found.</div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Gallery Photo">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Title *</label>
            <input
              type="text"
              required
              value={newItem.title || ""}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Category</label>
            <select
              value={newItem.category || "Interiors"}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
            >
              {siteConfig.galleryCategories.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Image URL *</label>
            <input
              type="url"
              required
              value={newItem.image_url || ""}
              onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Caption Description</label>
            <input
              type="text"
              value={newItem.description || ""}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Add Photo</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
