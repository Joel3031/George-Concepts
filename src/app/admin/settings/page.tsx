import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { CheckCircle2, AlertTriangle, Key, Phone, Mail, MapPin } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-[#E5E2D9]">
        <h1 className="text-3xl font-extrabold text-[#0C3B2E]">Site Settings & Integration</h1>
        <p className="text-sm text-[#636E6A] mt-1">
          System connectivity, environment variables, and business contact information.
        </p>
      </div>

      {/* Supabase Integration Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Key className="w-6 h-6 text-[#76A035]" />
            <div>
              <h3 className="text-lg font-bold text-[#0C3B2E]">Supabase Database & Storage Connection</h3>
              <p className="text-xs text-[#636E6A]">Cloud SQL database & image storage bucket configuration.</p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isSupabaseConfigured
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {isSupabaseConfigured ? "Supabase Live Connected" : "Local Mock Fallback Mode Active"}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E2D9] text-xs space-y-2 font-mono text-[#0C3B2E]">
          <p>NEXT_PUBLIC_SUPABASE_URL={process.env.NEXT_PUBLIC_SUPABASE_URL || "(Not configured in .env.local)"}</p>
          <p>NEXT_PUBLIC_SUPABASE_ANON_KEY={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "●●●●●●●●●●●●" : "(Not configured in .env.local)"}</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold">Note for Production Deployment:</h4>
              <p className="mt-1 leading-relaxed">
                Currently running in zero-config local seed store mode. To connect to live Supabase backend, create a `.env.local` file with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` and execute `supabase/schema.sql` in your Supabase SQL editor.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Business Information Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-[#0C3B2E] border-b border-[#E5E2D9] pb-3">
          Configured Business Contact Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E2D9] flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#76A035]" />
            <div>
              <span className="text-[#636E6A] block text-[10px] uppercase font-bold">Phone Number</span>
              <span className="font-semibold text-[#0C3B2E]">{siteConfig.contact.phone}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E2D9] flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#76A035]" />
            <div>
              <span className="text-[#636E6A] block text-[10px] uppercase font-bold">Email Address</span>
              <span className="font-semibold text-[#0C3B2E]">{siteConfig.contact.email}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E2D9] flex items-center gap-3 sm:col-span-2">
            <MapPin className="w-5 h-5 text-[#76A035] shrink-0" />
            <div>
              <span className="text-[#636E6A] block text-[10px] uppercase font-bold">Studio Address</span>
              <span className="font-semibold text-[#0C3B2E]">{siteConfig.contact.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
