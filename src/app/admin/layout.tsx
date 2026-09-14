"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

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
    <div className="flex min-h-screen bg-[#FAF9F5]">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-grow p-8 overflow-y-auto max-w-7xl">{children}</div>
    </div>
  );
}
