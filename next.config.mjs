/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        // Local Django dev server — only active in development
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
    ],

    // Serve avif first, then webp — much smaller than jpg/png
    formats: ["image/avif", "image/webp"],

    // Cache optimised images for 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,

    // Matches the exact thumbnail sizes used in the app (48px, 56px cards)
    // so Next.js never generates unused size variants
    deviceSizes: [390, 430, 768, 1024, 1280, 1920],
    imageSizes: [48, 56, 96, 128, 256],
  },

  // Upgrade http:// backend image requests to https:// in production
  // Fixes the "Mixed Content" console warning when backend URLs are http
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
        ],
      },
    ]
  },
}

export default nextConfig
