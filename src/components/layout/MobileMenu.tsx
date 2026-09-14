"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Phone, MessageSquare, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { Button } from "../ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Studio", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-[#FAF9F5] h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-fade-in border-l border-[#E5E2D9] z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E5E2D9]">
            <Link href="/" onClick={onClose} className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.svg"
                  alt="George Concepts Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-[0.15em] text-[#76A035]">
                  CONCEPTS
                </span>
                <span className="text-[10px] font-bold tracking-[0.15em] text-[#0C3B2E]">
                  DESIGN STUDIO
                </span>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#0C3B2E] hover:bg-[#E5E2D9]/60 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="py-3 px-4 rounded-xl text-base font-semibold text-[#0C3B2E] hover:bg-[#0C3B2E] hover:text-white transition-all duration-200 flex items-center justify-between group"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom CTA Block */}
        <div className="pt-6 border-t border-[#E5E2D9] flex flex-col gap-4">
          <Button
            href="/contact"
            variant="primary"
            className="w-full justify-center"
            onClick={onClose}
          >
            Start Your Project
          </Button>

          <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold text-[#0C3B2E]">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="p-3 bg-white rounded-lg border border-[#E5E2D9] flex items-center justify-center gap-1.5 hover:border-[#76A035] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#76A035]" />
              <span>Call Studio</span>
            </a>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                siteConfig.contact.whatsappWelcomeMsg
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#76A035] text-white rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#688E2D] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          <p className="text-[11px] text-center text-[#636E6A] mt-2">
            © {new Date().getFullYear()} George Concepts Design Studio
          </p>
        </div>
      </div>
    </div>
  );
};
