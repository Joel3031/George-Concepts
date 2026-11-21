"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "../ui/Button";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer to update active nav indicator on homepage
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["hero", "services", "projects", "about", "gallery", "contact"];
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("hero");
        return;
      }

      const scrollPosition = window.scrollY + 130;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Handle initial page load or cross-route navigation with hash
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  }, [pathname]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (pathname === "/" && href.startsWith("/#")) {
        e.preventDefault();
        const targetId = href.replace("/#", "");
        if (targetId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
          setActiveSection("hero");
        } else {
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", href);
            setActiveSection(targetId);
          }
        }
      }
    },
    [pathname]
  );

  const navItems = [
    { label: "Home", href: "/#hero" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/#projects" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "glass-nav py-2 sm:py-2.5 lg:py-3.5 shadow-xs border-b border-[#E5E2D9]"
            : "glass-nav lg:bg-transparent lg:backdrop-blur-none border-b border-[#E5E2D9]/80 lg:border-transparent py-2 sm:py-2.5 lg:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/");
                setActiveSection("hero");
              }
            }}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 transition-transform group-hover:scale-105">
              <Image
                src="/images/logo.svg"
                alt="George Concepts Design Studio Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-[0.16em] sm:tracking-[0.18em] text-[#76A035] leading-tight group-hover:text-[#5B8A3C] transition-colors">
                CONCEPTS
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] sm:tracking-[0.16em] text-[#0C3B2E] leading-tight">
                DESIGN STUDIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const sectionId = item.href.replace("/#", "");
              const isActive =
                pathname === "/"
                  ? activeSection === sectionId
                  : pathname.startsWith("/" + sectionId);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "text-sm font-semibold tracking-wide transition-all duration-200 relative py-1",
                    isActive
                      ? "text-[#76A035]"
                      : "text-[#0C3B2E] hover:text-[#76A035]"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#76A035] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              href="/#contact"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "/#contact")}
            >
              Start Your Project
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-[#0C3B2E] hover:bg-[#E5E2D9]/60 focus:outline-none transition-colors active:scale-95"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
};
