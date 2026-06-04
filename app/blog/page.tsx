import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/lib/blog-data"
import { Footer } from "@/components/footer"
import { CalendarDays, Clock, ArrowRight, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog – Mangrove Travel Guides & Tips | MangroveSpot, Kollam",
  description:
    "Expert guides on mangrove kayaking, Kerala backwater travel, best season to visit, family tips, and school excursions. Written by the MangroveSpot team, Nedungolam, Paravur, Kollam.",
  openGraph: {
    title: "Blog – Mangrove Travel Guides | MangroveSpot, Kollam Kerala",
    description:
      "Guides on kayaking season, Kollam day trips, family visits, monsoon travel, and school excursions to the Nedungolam mangroves.",
    url: "https://www.mangrovespot.in/blog",
    images: [{ url: "https://www.mangrovespot.in/og-image.jpg" }],
  },
  alternates: { canonical: "https://www.mangrovespot.in/blog" },
}

const categoryColors: Record<string, string> = {
  emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  blue:    "bg-blue-500/15 text-blue-400 border-blue-500/30",
  orange:  "bg-orange-500/15 text-orange-400 border-orange-500/30",
  cyan:    "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  violet:  "bg-violet-500/15 text-violet-400 border-violet-500/30",
  green:   "bg-green-500/15 text-green-400 border-green-500/30",
}

export default function BlogListPage() {
  const [featured, ...rest] = blogPosts

  return (
    <div className="min-h-screen bg-background">

      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="border-b border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mb-6"
          >
            ← Back to MangroveSpot
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-primary/20 border border-primary/30">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              MangroveSpot Blog
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mangrove Travel Guides & Local Tips
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Practical guides on kayaking Kerala&apos;s mangroves, planning a Kollam day trip,
            visiting with family, and everything else you want to know before you arrive.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">

        {/* ── Featured Post ──────────────────────────────────── */}
        <section aria-label="Featured blog post" className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
            Featured Guide
          </p>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border bg-card hover:border-border/60 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20">
              <div className="relative h-64 lg:h-auto min-h-[280px]">
                <Image
                  src={featured.coverImage}
                  alt={featured.coverAlt}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span
                  className={`inline-flex self-start text-xs font-semibold border px-3 py-1 rounded-full mb-4 ${
                    categoryColors[featured.categoryColor] ?? categoryColors.green
                  }`}
                >
                  {featured.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug group-hover:text-accent transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={12} />
                      {new Date(featured.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {featured.readTime} read
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-accent text-sm font-semibold group-hover:gap-2 transition-all">
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ── All Posts Grid ─────────────────────────────────── */}
        <section aria-label="All blog posts">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            All Guides
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-border/60 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span
                    className={`absolute top-3 left-3 text-[11px] font-bold border px-2.5 py-1 rounded-full ${
                      categoryColors[post.categoryColor] ?? categoryColors.green
                    }`}
                  >
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {post.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays size={11} />
                        {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                          month: "short", year: "numeric",
                        })}
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ─────────────────────────────────────── */}
        <section
          aria-label="Book a mangrove adventure"
          className="mt-20 rounded-2xl bg-primary/10 border border-primary/20 p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Experience the Mangroves?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Kayaking, coracle rides, country boat tours & more — at Nedungolam, Paravur, Kollam.
            Open daily 6:30 AM – 6:30 PM. Pre-book online and save 25%.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105 active:scale-100"
          >
            <CalendarDays size={18} />
            Book a Slot – Takes 2 Minutes
          </Link>
        </section>

      </main>

      <Footer />
    </div>
  )
}
