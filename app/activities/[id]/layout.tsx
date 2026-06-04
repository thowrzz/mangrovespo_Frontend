import type { Metadata } from "next"

/**
 * Activity detail page layout.
 * Provides generic fallback SEO metadata for /activities/[id].
 * The page is 'use client' and fetches activity data dynamically,
 * so a fully dynamic generateMetadata is not feasible here without
 * a server component wrapper. This layout provides the baseline
 * open graph and canonical signal; the actual title updates
 * client-side via document.title in the page component.
 *
 * For full per-activity dynamic metadata, refactor the page to a
 * server component with a client sub-component for interactivity.
 */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const defaultMetadata: Metadata = {
    title: "Activity Details – MangroveSpot, Nedungolam, Kollam, Kerala",
    description: "Explore mangrove kayaking, coracle rides, ATV, country boat tours and more at MangroveSpot, Nedungolam, Paravur, Kollam. Book online and save 25%.",
    openGraph: {
      siteName: "MangroveSpot Adventures",
      images: [
        {
          url: "https://www.mangrovespot.in/og-image.jpg",
          alt: "MangroveSpot – Mangrove Adventures in Kollam, Kerala",
        },
      ],
    },
    alternates: {
      canonical: `https://www.mangrovespot.in/activities/${id}`,
    },
  }

  try {
    const numericId = Number(id)
    if (!isNaN(numericId)) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      const res = await fetch(`${baseUrl}/api/v1/activities/${numericId}/`, {
        next: { revalidate: 3600 } // cache for 1 hour
      })
      if (res.ok) {
        const activity = await res.json()
        return {
          title: `${activity.name} in Kollam, Kerala – MangroveSpot`,
          description: `Book ${activity.name} at MangroveSpot, Nedungolam, Paravur, Kollam. ${activity.tagline}. Pre-book online and save 25%. Open daily 6:30 AM–6:30 PM.`,
          openGraph: {
            title: `${activity.name} – MangroveSpot, Kollam Kerala`,
            description: activity.tagline,
            url: `https://www.mangrovespot.in/activities/${id}`,
            images: [
              {
                url: activity.image_url || "https://www.mangrovespot.in/og-image.jpg",
                alt: `${activity.name} at MangroveSpot, Paravur, Kollam, Kerala`,
              },
            ],
          },
          alternates: {
            canonical: `https://www.mangrovespot.in/activities/${id}`,
          },
          robots: {
            index: true,
            follow: true,
          },
        }
      }
    }
  } catch (e) {
    // Graceful fallback during build or if API is unreachable
  }

  return defaultMetadata
}

export async function generateStaticParams() {
  const fallbackIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "12", "13", "14", "15"]
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.mangrovespot.in"
    const res = await fetch(`${baseUrl}/api/v1/activities/`, {
      next: { revalidate: 3600 }
    })
    if (res.ok) {
      const data = await res.json()
      const items: { id: number }[] = Array.isArray(data) ? data : (data.results ?? [])
      if (items.length > 0) {
        return items.map((a) => ({ id: String(a.id) }))
      }
    }
  } catch (e) {
    // Ignore error, return fallback known IDs
  }
  return fallbackIds.map((id) => ({ id }))
}

export default function ActivityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
