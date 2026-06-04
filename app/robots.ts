/**
 * app/robots.ts
 * Generates robots.txt for MangroveSpot.
 * - Allows all crawlers on public pages
 * - Blocks /admin (private dashboard)
 * - Points to sitemap so Google can discover all URLs
 *
 * Served automatically at /robots.txt by Next.js.
 */
import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/my-bookings"],
      },
    ],
    sitemap: "https://www.mangrovespot.in/sitemap.xml",
    host: "https://www.mangrovespot.in",
  }
}
