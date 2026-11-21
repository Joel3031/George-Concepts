import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07251D] text-white pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-[#0C3B2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 sm:pb-16 border-b border-stone-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src="/images/logo-white.svg"
                  alt="George Concepts Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-[0.16em] sm:tracking-[0.18em] text-[#A2D157]">
                  CONCEPTS
                </span>
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] sm:tracking-[0.16em] text-white">
                  DESIGN STUDIO
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md">
              {siteConfig.description}
            </p>

            <div className="flex items-center gap-2.5 sm:gap-3 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-stone-800 hover:bg-[#76A035] active:scale-95 flex items-center justify-center transition-colors duration-300 text-white"
                aria-label="Instagram Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  siteConfig.contact.whatsappWelcomeMsg
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-stone-800 hover:bg-[#76A035] active:scale-95 flex items-center justify-center transition-colors duration-300 text-white"
                aria-label="WhatsApp Direct Chat"
              >
                <span className="font-bold text-xs">WA</span>
              </a>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="w-11 h-11 rounded-full bg-stone-800 hover:bg-[#76A035] active:scale-95 flex items-center justify-center transition-colors duration-300 text-white"
                aria-label="Call Studio"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="w-11 h-11 rounded-full bg-stone-800 hover:bg-[#76A035] active:scale-95 flex items-center justify-center transition-colors duration-300 text-white"
                aria-label="Email Studio"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#76A035]">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-stone-300">
              <li>
                <Link href="/" className="hover:text-[#76A035] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#76A035] transition-colors">
                  About Studio
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#76A035] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#76A035] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#76A035] transition-colors">
                  Design Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#76A035] transition-colors">
                  Get Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#76A035]">
              Core Services
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-stone-300">
              {siteConfig.services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="hover:text-[#76A035] transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Studio Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#76A035]">
              Studio Location
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#76A035] shrink-0 mt-1" />
                <span className="leading-tight">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#76A035] shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-[#76A035] transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#76A035] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#76A035] transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-semibold text-[#76A035] hover:text-white transition-colors"
                >
                  Follow on Instagram <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3 sm:gap-4 text-center sm:text-left">
          <p>© 2026 George Concepts Design Studio. All Rights Reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/contact" className="hover:text-white transition-colors py-1.5">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors py-1.5">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
