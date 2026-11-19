import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { dataService } from "@/lib/services/dataService";
import { siteConfig, getSiteUrl } from "@/config/siteConfig";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await dataService.getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await dataService.getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const siteUrl = getSiteUrl();
  const canonicalUrl = siteUrl ? `${siteUrl}/projects/${slug}` : `/projects/${slug}`;

  const title = `${project.title} | ${project.category} Architecture by ${siteConfig.name}`;
  const description =
    project.short_description ||
    `${project.title} — ${project.category} architecture and interior project in ${project.location} by architect ${siteConfig.architect}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    keywords: [
      project.title,
      project.category,
      project.location,
      "George Concepts",
      siteConfig.architect,
      "Architecture Project Kerala",
      "Interior Design Showcase Thrissur",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      images: [
        {
          url: project.cover_image,
          width: 1400,
          height: 933,
          alt: `${project.title} — ${project.category} in ${project.location}`,
        },
      ],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.cover_image],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await dataService.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const projectUrl = siteUrl ? `${siteUrl}/projects/${slug}` : `/projects/${slug}`;

  // Structured Data for the architectural project
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: project.title,
    headline: project.title,
    description: project.description || project.short_description,
    image: project.cover_image,
    url: projectUrl,
    creator: {
      "@type": "Person",
      name: siteConfig.architect,
      jobTitle: siteConfig.architectTitle,
      worksFor: {
        "@type": "ArchitectureFirm",
        name: siteConfig.brandName,
      },
    },
    contentLocation: {
      "@type": "Place",
      name: project.location,
    },
    dateCreated: project.year || undefined,
    genre: project.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
