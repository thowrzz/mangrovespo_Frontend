import type { Metadata } from "next"

/**
 * My Bookings page metadata.
 * Marked noindex — this is a private authenticated user page and
 * should not appear in search results.
 */
export const metadata: Metadata = {
  title: "My Bookings – MangroveSpot",
  description: "View and manage your MangroveSpot activity bookings.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function MyBookingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
