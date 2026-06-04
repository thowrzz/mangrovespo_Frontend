/**
 * app/manifest.ts
 * Web App Manifest for MangroveSpot.
 * Makes the site installable on Android/iOS home screens with the
 * correct name, icon, and brand colours. Also improves PWA signals
 * which Google uses as a ranking quality factor.
 *
 * Served automatically at /manifest.webmanifest by Next.js.
 */
import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MangroveSpot Adventures",
    short_name: "MangroveSpot",
    description:
      "Mangrove kayaking, coracle rides, country boat tours, ATV & SUP in Kollam, Kerala. Book online and save 25%.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#16a34a",
    orientation: "portrait",
    lang: "en-IN",
    categories: ["travel", "sports", "lifestyle"],
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/og-image.jpg",
        sizes: "1200x630",
        type: "image/jpeg",
      },
    ],
  }
}
