"use client";

import React from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  onLogout?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout }) => {
  const pathname = usePathname();

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
    <aside className="w-64 bg-[#07251D] text-white flex flex-col justify-between p-6 border-r border-[#0C3B2E] shrink-0 min-h-screen">
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-stone-800 mb-8">
          <div className="relative w-9 h-9">
            <Image src="/images/logo-white.svg" alt="Logo" fill className="object-contain" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm tracking-wider text-[#A2D157]">ADMIN CMS</h2>
            <p className="text-[10px] text-stone-400">George Concepts</p>
          </div>
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
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200",
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
          className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-stone-300 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
