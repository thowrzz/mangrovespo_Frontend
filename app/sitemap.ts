/**
 * app/sitemap.ts
 * Generates a dynamic XML sitemap for MangroveSpot.
 * Fetches live activity IDs from the API so every activity page
 * gets its own sitemap entry. Falls back to homepage-only if the
 * API is unreachable at build time.
 *
 * Next.js reads this file at build/request time and serves
 * the result at /sitemap.xml automatically.
 */
import type { MetadataRoute } from "next"

const BASE_URL = "https://www.mangrovespot.in"

async function getActivityIds(): Promise<number[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://api.mangrovespot.in"}/api/v1/activities/`, {
      next: { revalidate: 3600 }, // re-fetch at most once per hour
    })
    if (!res.ok) return []
    const data = await res.json()
    // API returns either an array or { results: [] }
    const items: { id: number }[] = Array.isArray(data) ? data : (data.results ?? [])
    return items.map((a) => a.id)
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const activityIds = await getActivityIds()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/booking`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ]

  const activityRoutes: MetadataRoute.Sitemap = activityIds.map((id) => ({
    url: `${BASE_URL}/activities/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Blog post routes (static)
  const { getAllSlugs } = await import("@/lib/blog-data")
  const blogRoutes: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))

  return [...staticRoutes, ...activityRoutes, ...blogRoutes]
}
