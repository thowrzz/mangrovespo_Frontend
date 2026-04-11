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

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MangroveSpot Adventures",
  description: "Premium eco-adventure experiences in the mangroves of Kerala",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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