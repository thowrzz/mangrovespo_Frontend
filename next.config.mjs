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

  async redirects() {
    return [
      {
        source: "/blog/family-safety-guide",
        destination: "/blog/mangrovespot-families-children-kollam",
        permanent: true,
      },
      {
        source: "/blog/monsoon-kayaking-guide",
        destination: "/blog/monsoon-kayaking-kerala-mangroves",
        permanent: true,
      },
      {
        source: "/blog/first-time-kayaking-guide",
        destination: "/blog/first-time-kayaking-kerala-guide",
        permanent: true,
      },
      {
        source: "/blog/school-nature-trips",
        destination: "/blog/school-nature-trips-kerala-mangroves",
        permanent: true,
      },
      {
        source: "/blog/best-things-to-do-near-varkala",
        destination: "/blog/things-to-do-near-varkala",
        permanent: true,
      },
      {
        source: "/activities",
        destination: "/",
        permanent: true,
      },
      {
        source: "/activities/",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
