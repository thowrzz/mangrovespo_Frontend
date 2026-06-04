import type { Metadata } from "next"

/**
 * Booking page metadata.
 * The page itself is 'use client' so metadata must live in this
 * route-level layout — Next.js App Router picks this up automatically.
 */
export const metadata: Metadata = {
  title: "Book Activities – MangroveSpot, Nedungolam, Kollam",
  description:
    "Book mangrove kayaking, coracle rides, ATV & more at MangroveSpot. Choose your activity, date & time. Pay 50% now, 50% at the venue. Instant confirmation.",
  openGraph: {
    title: "Book Activities – MangroveSpot, Nedungolam, Kollam, Kerala",
    description:
      "Choose from 6 mangrove adventures. Pay 50% online, rest at arrival. Instant booking confirmation.",
    url: "https://www.mangrovespot.in/booking",
    images: [{ url: "https://www.mangrovespot.in/og-image.jpg", alt: "Book activities at MangroveSpot" }],
  },
  alternates: {
    canonical: "https://www.mangrovespot.in/booking",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
