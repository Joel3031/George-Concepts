import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 bg-[#FAF9F5]">
      <span className="text-6xl sm:text-7xl font-extrabold text-[#76A035] mb-4">404</span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0C3B2E] mb-3">
        Page Not Found
      </h1>
      <p className="text-base text-[#636E6A] max-w-md mb-8">
        The architectural page or case study you are looking for does not exist or may have been moved.
      </p>

      <div className="flex gap-4">
        <Button href="/" variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
          Return to Home
        </Button>
        <Button href="/projects" variant="outline">
          View Projects
        </Button>
      </div>
    </main>
  );
}
