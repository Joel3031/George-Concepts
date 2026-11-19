import { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/siteConfig";
import { initialProjects } from "@/lib/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

  // Do not expose sitemap index URLs on Vercel preview branch deployments
  if (isPreview) {
    return [];
  }

  const baseUrl = getSiteUrl();

  const staticRoutes = ["", "/about", "/services", "/projects", "/gallery", "/contact"].map(
    (route) => ({
      url: baseUrl ? `${baseUrl}${route}` : route,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1.0 : 0.8,
    })
  );

  const projectRoutes = initialProjects.map((p) => ({
    url: baseUrl ? `${baseUrl}/projects/${p.slug}` : `/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
