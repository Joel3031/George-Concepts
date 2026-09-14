"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, Image as ImageIcon, MessageSquareQuote, Inbox, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { dataService } from "@/lib/services/dataService";
import { Project, GalleryItem, Testimonial, ContactSubmission } from "@/types";

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [p, g, t, c] = await Promise.all([
          dataService.getProjects(),
          dataService.getGallery(),
          dataService.getTestimonials(),
          dataService.getContactSubmissions(),
        ]);
        setProjects(p);
        setGallery(g);
        setTestimonials(t);
        setContacts(c);
      } catch (e) {
        console.error("Dashboard data load error:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const newEnquiriesCount = contacts.filter((c) => c.status === "new").length;

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E5E2D9]">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0C3B2E]">Dashboard Overview</h1>
          <p className="text-sm text-[#636E6A] mt-1">
            Welcome to George Concepts Design Studio Content Management System.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#76A035]/15 text-[#0C3B2E] text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-[#76A035]" /> System Online
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#636E6A]">Total Projects</p>
            <h3 className="text-3xl font-extrabold text-[#0C3B2E] mt-2">{projects.length}</h3>
            <p className="text-[11px] text-[#76A035] font-semibold mt-1">
              {projects.filter((p) => p.published).length} Published
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF9F5] text-[#0C3B2E] flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#636E6A]">Gallery Items</p>
            <h3 className="text-3xl font-extrabold text-[#0C3B2E] mt-2">{gallery.length}</h3>
            <p className="text-[11px] text-[#76A035] font-semibold mt-1">High-Res Photos</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF9F5] text-[#0C3B2E] flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#636E6A]">Client Reviews</p>
            <h3 className="text-3xl font-extrabold text-[#0C3B2E] mt-2">{testimonials.length}</h3>
            <p className="text-[11px] text-[#76A035] font-semibold mt-1">Published Reviews</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF9F5] text-[#0C3B2E] flex items-center justify-center">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#636E6A]">Lead Enquiries</p>
            <h3 className="text-3xl font-extrabold text-[#0C3B2E] mt-2">{contacts.length}</h3>
            <p className="text-[11px] text-amber-600 font-bold mt-1">
              {newEnquiriesCount} New Unread
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF9F5] text-[#0C3B2E] flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recent Enquiries Table Preview */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#0C3B2E]">Recent Customer Consultations</h3>
            <p className="text-xs text-[#636E6A]">Submitted lead inquiries from website visitors.</p>
          </div>
          <Link
            href="/admin/contacts"
            className="text-xs font-bold text-[#76A035] hover:text-[#0C3B2E] inline-flex items-center gap-1"
          >
            View All Inbox <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {contacts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1C2522]">
              <thead className="bg-[#FAF9F5] uppercase text-[10px] tracking-wider text-[#636E6A] border-b border-[#E5E2D9]">
                <tr>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Project Type</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2D9]">
                {contacts.slice(0, 5).map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF9F5]">
                    <td className="py-3 px-4 font-semibold text-[#0C3B2E]">{c.name}</td>
                    <td className="py-3 px-4 font-mono">{c.phone}</td>
                    <td className="py-3 px-4">{c.project_type}</td>
                    <td className="py-3 px-4">{c.location}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          c.status === "new"
                            ? "bg-amber-100 text-amber-800"
                            : c.status === "contacted"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-stone-200 text-stone-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-[#636E6A] italic py-4">No customer inquiries submitted yet.</p>
        )}
      </div>
    </div>
  );
}
