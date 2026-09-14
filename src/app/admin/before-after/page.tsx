"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import { BeforeAfterItem } from "@/types";
import { dataService } from "@/lib/services/dataService";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AdminBeforeAfterPage() {
  const [items, setItems] = useState<BeforeAfterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<BeforeAfterItem>>({
    title: "",
    category: "Renovation",
    before_image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    after_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "",
  });

  const loadItems = async () => {
    try {
      const data = await dataService.getBeforeAfter();
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.before_image || !newItem.after_image) return;

    await dataService.saveBeforeAfter(newItem);
    setIsModalOpen(false);
    loadItems();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete Before/After slider item?")) {
      await dataService.deleteBeforeAfter(id);
      loadItems();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E5E2D9]">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0C3B2E]">Before & After CMS</h1>
          <p className="text-sm text-[#636E6A] mt-1">Manage interactive renovation comparison sliders.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary" icon={<Plus className="w-4 h-4" />}>
          Add Comparison Pair
        </Button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-[#636E6A]">Loading sliders...</div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#0C3B2E]">{item.title}</h3>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#E5E2D9]">
                  <Image src={item.before_image} alt="Before" fill className="object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold uppercase bg-stone-900 text-white rounded">
                    BEFORE
                  </span>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#E5E2D9]">
                  <Image src={item.after_image} alt="After" fill className="object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold uppercase bg-[#0C3B2E] text-white rounded">
                    AFTER
                  </span>
                </div>
              </div>

              {item.description && <p className="text-xs text-[#636E6A] leading-relaxed">{item.description}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-[#636E6A]">No comparison pairs configured.</div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Before & After Comparison">
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
            <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Before Image URL *</label>
            <input
              type="url"
              required
              value={newItem.before_image || ""}
              onChange={(e) => setNewItem({ ...newItem, before_image: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#0C3B2E] mb-1">After Image URL *</label>
            <input
              type="url"
              required
              value={newItem.after_image || ""}
              onChange={(e) => setNewItem({ ...newItem, after_image: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#0C3B2E] mb-1">Description</label>
            <textarea
              rows={3}
              value={newItem.description || ""}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-[#E5E2D9] text-sm resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Pair</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
