"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    siteConfig.contact.whatsappWelcomeMsg
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with George Concepts on WhatsApp"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-6 sm:right-6 z-40 group flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white min-w-[48px] min-h-[48px] p-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
        WhatsApp Inquiry
      </span>
      {/* Pulse Beacon */}
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
      </span>
    </a>
  );
};
