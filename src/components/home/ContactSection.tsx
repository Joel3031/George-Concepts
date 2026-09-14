"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { dataService } from "@/lib/services/dataService";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    project_type: "Interior Design",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const projectOptions = [
    "Interior Design",
    "Turnkey Residential Construction",
    "Home Renovation & Restructuring",
    "Architectural Planning",
    "Architectural Consultation",
    "Interior Architecture / Space Planning",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg("Please complete all required fields (Name, Phone Number, and Message).");
      return;
    }

    setLoading(true);

    try {
      await dataService.submitContact(formData);
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        project_type: "Interior Design",
        location: "",
        message: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg("Unable to send inquiry at this moment. Please try again or reach out on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white border-t border-[#E5E2D9]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="GET IN TOUCH"
          title="Start Your Consultation"
          subtitle="Tell us about your project vision, timeline, and requirements. Our senior design team will reach out to guide you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Info Panel (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl bg-[#0C3B2E] text-white shadow-xl relative overflow-hidden">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A2D157] mb-2 block">
                DIRECT STUDIO CONTACT
              </span>
              <h3 className="text-2xl font-bold text-white mb-6">
                George Concepts Design Studio
              </h3>

              <div className="space-y-6 text-sm text-stone-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#A2D157]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Studio Address</h4>
                    <p className="mt-1 leading-snug">{siteConfig.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#A2D157]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone & Consultation</h4>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="mt-1 block hover:text-[#A2D157] transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#A2D157]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email Address</h4>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="mt-1 block hover:text-[#A2D157] transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-8 mt-8 border-t border-white/15">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-300 mb-4">
                Connect on Social Media
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#76A035] text-xs font-semibold text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg> Instagram
                </a>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                    siteConfig.contact.whatsappWelcomeMsg
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-xs font-semibold text-white transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Panel (7 Cols) */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-[#FAF9F5] border border-[#E5E2D9] shadow-sm">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#76A035] text-white flex items-center justify-center mb-6 shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0C3B2E] mb-2">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-sm text-[#636E6A] max-w-md mb-8">
                  Your project consultation request has been received. One of our lead architects will contact you within 24 business hours.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  size="md"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E2D9] bg-white text-sm text-[#1C2522] focus:outline-none focus:ring-2 focus:ring-[#76A035] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E2D9] bg-white text-sm text-[#1C2522] focus:outline-none focus:ring-2 focus:ring-[#76A035] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. anand@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E2D9] bg-white text-sm text-[#1C2522] focus:outline-none focus:ring-2 focus:ring-[#76A035] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-2">
                      Project Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kochi, Kerala"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E2D9] bg-white text-sm text-[#1C2522] focus:outline-none focus:ring-2 focus:ring-[#76A035] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-2">
                    Primary Service Required
                  </label>
                  <select
                    value={formData.project_type}
                    onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E2D9] bg-white text-sm text-[#1C2522] focus:outline-none focus:ring-2 focus:ring-[#76A035] transition-all"
                  >
                    {projectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-2">
                    Project Details / Vision *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your plot size, timeline, spatial preferences, or specific design goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E2D9] bg-white text-sm text-[#1C2522] focus:outline-none focus:ring-2 focus:ring-[#76A035] transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  icon={<Send className="w-4 h-4" />}
                >
                  {loading ? "Submitting Inquiry..." : "Submit Consultation Request"}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
