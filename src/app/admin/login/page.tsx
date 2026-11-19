"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@georgeconcepts.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple secure authentication check & session store
    if (email.trim().toLowerCase() === "admin@georgeconcepts.com" && password === "admin123") {
      localStorage.setItem("gc_admin_auth", "true");
      setTimeout(() => {
        router.push("/admin");
      }, 500);
    } else {
      setLoading(false);
      setError("Invalid admin credentials. (Demo: admin@georgeconcepts.com / admin123)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07251D] p-3 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 sm:p-8 border border-[#E5E2D9]">
        {/* Logo & Title */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4">
            <Image
              src="/images/logo.svg"
              alt="George Concepts Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0C3B2E]">Admin Portal</h1>
          <p className="text-xs text-[#636E6A] mt-1">George Concepts CMS Management</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-1.5 sm:mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E5E2D9] bg-[#FAF9F5] text-base sm:text-sm text-[#1C2522] focus:outline-none focus:ring-2 focus:ring-[#76A035]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-1.5 sm:mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E5E2D9] bg-[#FAF9F5] text-base sm:text-sm text-[#1C2522] focus:outline-none focus:ring-2 focus:ring-[#76A035]"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            size="lg"
            className="w-full justify-center mt-2"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E5E2D9] text-center text-xs text-[#636E6A]">
          <p>Demo Login Credentials:</p>
          <p className="font-mono text-[11px] text-[#0C3B2E] mt-1">
            Email: admin@georgeconcepts.com <br />
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  );
}
