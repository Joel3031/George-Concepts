"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Image as ImageIcon,
  Sliders,
  MessageSquareQuote,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  onLogout?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout, isOpen = false, onClose }) => {
  const pathname = usePathname();

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (onClose) onClose();
  }, [pathname]);

  const links = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Projects CMS", href: "/admin/projects", icon: <Briefcase className="w-5 h-5" /> },
    { label: "Gallery CMS", href: "/admin/gallery", icon: <ImageIcon className="w-5 h-5" /> },
    { label: "Before & After", href: "/admin/before-after", icon: <Sliders className="w-5 h-5" /> },
    { label: "Testimonials", href: "/admin/testimonials", icon: <MessageSquareQuote className="w-5 h-5" /> },
    { label: "Client Enquiries", href: "/admin/contacts", icon: <Inbox className="w-5 h-5" /> },
    { label: "Site Settings", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar element: Fixed drawer on mobile, static aside on desktop */}
      <aside
        className={cn(
          "w-64 bg-[#07251D] text-white flex flex-col justify-between p-6 border-r border-[#0C3B2E] shrink-0 z-50 transition-transform duration-300 ease-in-out",
          "fixed inset-y-0 left-0 h-full lg:static lg:h-auto lg:min-h-screen lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-800 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                <Image src="/images/logo-white.svg" alt="Logo" fill className="object-contain" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm tracking-wider text-[#A2D157]">ADMIN CMS</h2>
                <p className="text-[10px] text-stone-400">George Concepts</p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {links.map((link) => {
              const isActive =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 min-h-[44px]",
                    isActive
                      ? "bg-[#76A035] text-white shadow-md font-bold"
                      : "text-stone-300 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-stone-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-stone-300 transition-colors min-h-[40px]"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors min-h-[40px]"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
