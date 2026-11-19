"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check local session or auth status
    const isAuth = localStorage.getItem("gc_admin_auth") === "true";
    setAuthenticated(isAuth);

    if (!isAuth && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("gc_admin_auth");
    setAuthenticated(false);
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
        <div className="w-8 h-8 border-4 border-[#0C3B2E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FAF9F5]">
      {/* Mobile Admin Top Bar */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-[#07251D] text-white border-b border-[#0C3B2E] sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8">
            <Image src="/images/logo-white.svg" alt="Logo" fill className="object-contain" />
          </div>
          <div>
            <h2 className="font-extrabold text-xs tracking-wider text-[#A2D157]">ADMIN CMS</h2>
            <p className="text-[9px] text-stone-400">George Concepts</p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 active:scale-95 transition-colors"
          aria-label="Open CMS Navigation"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Admin Sidebar */}
      <AdminSidebar
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Content Area */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full">
        {children}
      </main>
    </div>
  );
}

