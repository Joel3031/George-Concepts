"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Calendar, CheckCircle } from "lucide-react";
import { ContactSubmission } from "@/types";
import { dataService } from "@/lib/services/dataService";
import { formatDate } from "@/lib/utils";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const loadContacts = async () => {
    try {
      const data = await dataService.getContactSubmissions();
      setContacts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleUpdateStatus = async (id: string, status: ContactSubmission["status"]) => {
    await dataService.updateContactStatus(id, status);
    loadContacts();
  };

  const filteredContacts =
    filter === "all" ? contacts : contacts.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E5E2D9]">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0C3B2E]">Client Enquiries Inbox</h1>
          <p className="text-sm text-[#636E6A] mt-1">Review and respond to incoming lead consultation requests.</p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
          {["all", "new", "read", "contacted", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap min-h-[38px] sm:min-h-0 flex items-center justify-center ${
                filter === st ? "bg-[#0C3B2E] text-white" : "bg-white border border-[#E5E2D9] text-[#0C3B2E]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-[#636E6A]">Loading inquiries...</div>
      ) : filteredContacts.length > 0 ? (
        <div className="space-y-4">
          {filteredContacts.map((c) => (
            <div
              key={c.id}
              className={`p-4 sm:p-6 rounded-2xl bg-white border shadow-sm transition-all ${
                c.status === "new" ? "border-amber-400 bg-amber-50/20" : "border-[#E5E2D9]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 pb-3 border-b border-[#E5E2D9]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h3 className="text-base sm:text-lg font-bold text-[#0C3B2E]">{c.name}</h3>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0C3B2E]/10 text-[#0C3B2E]">
                      {c.project_type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#636E6A] mt-1.5">
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-[#76A035]" /> {c.phone}
                    </span>
                    {c.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#76A035]" /> {c.email}
                      </span>
                    )}
                    {c.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#76A035]" /> {c.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#636E6A] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(c.created_at)}
                  </span>
                </div>
              </div>

              <div className="text-sm text-[#1C2522] leading-relaxed bg-[#FAF9F5] p-4 rounded-xl mb-4 border border-[#E5E2D9]">
                {c.message}
              </div>

              {/* Status Selector Actions */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-[#636E6A] uppercase tracking-wider">
                  Update Lead Status:
                </span>
                <div className="flex gap-2">
                  {(["new", "read", "contacted", "archived"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(c.id, status)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all ${
                        c.status === status
                          ? "bg-[#76A035] text-white shadow"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-[#636E6A]">No inquiries matching this filter.</div>
      )}
    </div>
  );
}
