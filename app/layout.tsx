// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
// import { CartProvider } from "@/lib/cart-context"
// import { Toaster } from "sonner"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "MangroveSpot Adventures",
//   description: "Premium eco-adventure experiences in the mangroves of Kerala",
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
//           <CartProvider>
//             {children}
//             <Toaster position="top-center" richColors />
//           </CartProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"   // ← add this import
import { Toaster } from "sonner"
import { JsonLd } from "@/components/JsonLd"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mangrovespot.in"),
  applicationName: "MangroveSpot Adventures",
  title: "Mangrove Spot | Kayaking, ATV Rides & Water Sports near Varkala & Kollam, Kerala",
  description:
    "Book kayaking, ATV rides, coracle rides, backwater tours & water sports at Mangrove Spot — near Varkala, Paravur Lake, Kollam. Open daily 6:30 AM–6:30 PM. 4.9★ on Google. Pre-book online & save 25%.",
  keywords: [
    "mangrove kayaking Kollam",
    "backwater tour Paravur Kerala",
    "coracle ride Kollam",
    "boat ride Nedungolam",
    "eco tourism Kollam Kerala",
    "mangrove tour Kerala",
    "things to do in Kollam",
    "adventure activities near Varkala",
    "kayaking near Thiruvananthapuram",
    "family boat ride Kerala",
    "kayaking varkala",
    "water sports varkala",
    "ATV ride near varkala",
    "adventure activities varkala",
    "kayaking paravur lake",
    "things to do near varkala",
    "backwater tour varkala",
  ],
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Mangrove Spot | Kayaking, ATV Rides & Water Sports near Varkala & Kollam, Kerala",
    description:
      "Book kayaking, ATV rides, coracle rides & water sports at Mangrove Spot — near Varkala, Paravur Lake, Kollam. Save 25% online. Open daily 6:30 AM–6:30 PM.",
    url: "https://www.mangrovespot.in",
    siteName: "MangroveSpot Adventures",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.mangrovespot.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mangrove kayaking at MangroveSpot, Nedungolam, Paravur, Kollam, Kerala — near Varkala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kayaking, ATV & Water Sports near Varkala | Mangrove Spot, Kollam",
    description:
      "Book kayaking, ATV rides, coracle & more near Varkala at Mangrove Spot, Paravur Lake, Kollam. Save 25% online. 4.9★ rated.",
    images: ["https://www.mangrovespot.in/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.mangrovespot.in",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Chrome / Android address-bar colour
  other: {
    "theme-color": "#16a34a",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "MangroveSpot",
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <JsonLd />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>           {/* ← wrap CartProvider with this */}
            <CartProvider>
              {children}
              <Toaster position="top-center" richColors />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}