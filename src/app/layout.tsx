import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BackToTop } from "@/components/layout/BackToTop";
import { siteConfig, getSiteUrl } from "@/config/siteConfig";

const siteUrl = getSiteUrl();
const isPreview =
  process.env.VERCEL_ENV === "preview" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

// Resolve metadataBase: Use configured site domain/environment URL; in local development,
// fallback to localhost port to satisfy Next.js metadata resolution without polluting production.
const metadataBaseUrl = siteUrl
  ? siteUrl
  : process.env.NODE_ENV === "development"
  ? `http://localhost:${process.env.PORT || 3000}`
  : undefined;

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl ? new URL(metadataBaseUrl) : undefined,
  alternates: isPreview
    ? undefined
    : {
        canonical: "./",
      },
  title: {
    default: `${siteConfig.name} | Architecture & Interior Design Studio | Aloor, Thrissur`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.architect }],
  creator: siteConfig.architect,
  publisher: siteConfig.brandName,
  keywords: [
    "George Concepts",
    "Jispin George",
    "Architect Jispin George",
    "Architect in Aloor",
    "Architect in Thrissur",
    "Architecture Firm Kerala",
    "Residential Architecture Thrissur",
    "Commercial Architecture Kerala",
    "Interior Designers Thrissur",
    "Turnkey Construction Thrissur",
    "Turnkey Services Kerala",
    "George Concepts Design Studio",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl || "/",
    siteName: siteConfig.brandName,
    title: `${siteConfig.name} | Architecture & Interior Design Studio | Aloor, Thrissur`,
    description: siteConfig.socialDescription,
    images: [
      {
        url: siteConfig.socialPreviewImage,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `${siteConfig.brandName} — Architect ${siteConfig.architect} | Aloor, Thrissur, Kerala`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Architecture & Interior Design Studio | Aloor, Thrissur`,
    description: siteConfig.socialDescription,
    images: [
      {
        url: siteConfig.socialPreviewImage,
        alt: `${siteConfig.brandName} — Architect ${siteConfig.architect} | Aloor, Thrissur, Kerala`,
      },
    ],
  },
  robots: isPreview
    ? {
        index: false,
        follow: false,
        nocache: true,
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
  icons: {
    icon: [
      { url: "/images/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-[#FAF9F5] text-[#1C2522] antialiased flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
