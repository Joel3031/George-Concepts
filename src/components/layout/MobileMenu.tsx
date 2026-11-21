"use client";

import React, { useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Phone, MessageSquare, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeSection = "hero",
}) => {
  const pathname = usePathname();

  // Lock body scroll and listen for Escape key when menu is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      onClose();
      document.body.style.overflow = "";

      if (pathname === "/" && href.startsWith("/#")) {
        e.preventDefault();
        const targetId = href.replace("/#", "");
        if (targetId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
        } else {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", href);
          }
        }
      }
    },
    [onClose, pathname]
  );

  if (!isOpen) return null;

  const navLinks = [
    { label: "Home", href: "/#hero" },
    { label: "About Studio", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/#projects" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact Us", href: "/#contact" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden flex"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <div className="relative ml-auto w-[85vw] max-w-sm bg-[#FAF9F5] h-full shadow-2xl flex flex-col justify-between p-5 sm:p-6 overflow-y-auto border-l border-[#E5E2D9] z-10 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#E5E2D9]">
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, "/#hero")}
              className="flex items-center gap-2.5 sm:gap-3"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10">
                <Image
                  src="/images/logo.svg"
                  alt="George Concepts Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-[0.16em] text-[#76A035]">
                  CONCEPTS
                </span>
                <span className="text-[10px] font-bold tracking-[0.14em] text-[#0C3B2E]">
                  DESIGN STUDIO
                </span>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full text-[#0C3B2E] hover:bg-[#E5E2D9]/60 active:scale-95 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 sm:mt-8 flex flex-col gap-1.5 sm:gap-2">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("/#", "");
              const isActive =
                pathname === "/"
                  ? activeSection === sectionId
                  : pathname.startsWith("/" + sectionId);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    "min-h-[48px] py-3 px-4 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-between group",
                    isActive
                      ? "bg-[#0C3B2E] text-white shadow-sm"
                      : "text-[#0C3B2E] hover:bg-[#0C3B2E]/10"
                  )}
                >
                  <span>{link.label}</span>
                  <ArrowRight
                    className={cn(
                      "w-4 h-4 transition-all",
                      isActive
                        ? "text-[#A2D157] translate-x-1"
                        : "opacity-40 group-hover:opacity-100 group-hover:translate-x-1 text-[#0C3B2E]"
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom CTA Block */}
        <div className="pt-5 sm:pt-6 border-t border-[#E5E2D9] flex flex-col gap-3.5 sm:gap-4 mt-6">
          <Button
            href="/#contact"
            variant="primary"
            className="w-full justify-center min-h-[46px]"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, "/#contact")}
          >
            Start Your Project
          </Button>

          <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold text-[#0C3B2E]">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="p-3 min-h-[44px] bg-white rounded-lg border border-[#E5E2D9] flex items-center justify-center gap-1.5 hover:border-[#76A035] active:scale-95 transition-colors"
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
              className="p-3 min-h-[44px] bg-[#76A035] text-white rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#688E2D] active:scale-95 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          <p className="text-[11px] text-center text-[#636E6A] mt-1">
            © {new Date().getFullYear()} George Concepts Design Studio
          </p>
        </div>
      </div>
    </div>
  );
};
