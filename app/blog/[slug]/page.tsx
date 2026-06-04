import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { blogPosts, getBlogPost, getAllSlugs, type BlogSection } from "@/lib/blog-data"
import { Footer } from "@/components/footer"
import { CalendarDays, Clock, ArrowLeft, ArrowRight, Tag, Info, Lightbulb, AlertTriangle } from "lucide-react"

/* ─── Static params ─────────────────────────────────────────── */
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

/* ─── Dynamic metadata ──────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: "Post Not Found – MangroveSpot Blog" }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://www.mangrovespot.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: `https://www.mangrovespot.in${post.coverImage}`,
          alt: post.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
    alternates: {
      canonical: `https://www.mangrovespot.in/blog/${post.slug}`,
    },
  }
}

/* ─── Category colour map ───────────────────────────────────── */
const categoryColors: Record<string, string> = {
  emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  blue:    "bg-blue-500/15 text-blue-400 border-blue-500/30",
  orange:  "bg-orange-500/15 text-orange-400 border-orange-500/30",
  cyan:    "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  violet:  "bg-violet-500/15 text-violet-400 border-violet-500/30",
  green:   "bg-green-500/15 text-green-400 border-green-500/30",
}

/* ─── Content block renderer ────────────────────────────────── */
function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "h2":
      return (
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4 leading-snug">
          {section.text}
        </h2>
      )
    case "h3":
      return (
        <h3 className="text-xl font-bold text-white mt-8 mb-3">
          {section.text}
        </h3>
      )
    case "p":
      return (
        <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">
          {section.text}
        </p>
      )
    case "ul":
      return (
        <ul className="space-y-2 mb-6 ml-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )
    case "ol":
      return (
        <ol className="space-y-2 mb-6 ml-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
              <span className="mt-0.5 text-xs font-bold text-primary shrink-0 w-5 text-right">
                {i + 1}.
              </span>
              {item}
            </li>
          ))}
        </ol>
      )
    case "callout": {
      const icons = {
        tip:     { Icon: Lightbulb,     color: "emerald", bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" },
        info:    { Icon: Info,          color: "blue",    bg: "bg-blue-500/10 border-blue-500/20 text-blue-300" },
        warning: { Icon: AlertTriangle, color: "amber",   bg: "bg-amber-500/10 border-amber-500/20 text-amber-300" },
      }
      const { Icon, bg } = icons[section.calloutType ?? "info"]
      return (
        <div className={`flex items-start gap-3 rounded-xl border px-4 py-4 mb-6 ${bg}`}>
          <Icon size={16} className="mt-0.5 shrink-0" />
          <p className="text-sm leading-relaxed">{section.text}</p>
        </div>
      )
    }
    case "cta":
      return (
        <div className="my-10 rounded-2xl bg-primary/10 border border-primary/20 p-6 text-center">
          <p className="text-white font-semibold mb-4 text-base">
            Ready to visit MangroveSpot, Nedungolam, Kollam?
          </p>
          <Link
            href={section.ctaHref ?? "/booking"}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-7 py-3.5 rounded-full text-sm transition-all hover:scale-105 active:scale-100"
          >
            {section.ctaLabel ?? "Book Now"} <ArrowRight size={14} />
          </Link>
          <p className="text-xs text-muted-foreground mt-3">
            Pre-book online and save 25% · Pay 50% now, 50% at venue
          </p>
        </div>
      )
    case "divider":
      return <hr className="border-border my-8" />
    default:
      return null
  }
}

/* ─── Article JSON-LD schema ────────────────────────────────── */
function ArticleJsonLd({ post }: { post: ReturnType<typeof getBlogPost> }) {
  if (!post) return null
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `https://www.mangrovespot.in${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "MangroveSpot Adventures",
      url: "https://www.mangrovespot.in",
    },
    publisher: {
      "@type": "Organization",
      name: "MangroveSpot Adventures",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mangrovespot.in/logo.png",
      },
    },
    mainEntityOfPage: `https://www.mangrovespot.in/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/* ─── Page component ────────────────────────────────────────── */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  // Related posts (same category or any 2 others)
  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-background">
      <ArticleJsonLd post={post} />

      {/* ── Cover Image ─────────────────────────────────────── */}
      <div className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.coverAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Back link floated over image */}
        <div className="absolute top-6 left-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm transition-all"
          >
            <ArrowLeft size={14} /> All Guides
          </Link>
        </div>
      </div>

      {/* ── Article ─────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-4 pb-16 -mt-16 relative">

        {/* Meta bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className={`text-xs font-bold border px-3 py-1 rounded-full ${
              categoryColors[post.categoryColor] ?? categoryColors.green
            }`}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays size={12} />
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={12} /> {post.readTime} read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt lead */}
        <p className="text-base text-muted-foreground leading-relaxed mb-8 border-l-2 border-primary pl-4">
          {post.excerpt}
        </p>

        <hr className="border-border mb-8" />

        {/* Content blocks */}
        <div>
          {post.content.map((section, i) => (
            <RenderSection key={i} section={section} />
          ))}
        </div>

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <Tag size={13} className="text-muted-foreground" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author / credit */}
        <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
            <span className="text-lg">🌿</span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold">MangroveSpot Adventures</p>
            <p className="text-muted-foreground text-xs">
              Nedungolam, Paravur, Kollam, Kerala · Open daily 6:30 AM – 6:30 PM
            </p>
          </div>
        </div>
      </article>

      {/* ── Related Posts ────────────────────────────────────── */}
      {related.length > 0 && (
        <section
          aria-label="Related blog posts"
          className="max-w-6xl mx-auto px-4 pb-16"
        >
          <h2 className="text-xl font-bold text-white mb-6">More Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((rPost) => (
              <Link
                key={rPost.slug}
                href={`/blog/${rPost.slug}`}
                className="group flex gap-4 p-4 rounded-2xl border border-border bg-card hover:border-border/60 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={rPost.coverImage}
                    alt={rPost.coverAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${
                      categoryColors[rPost.categoryColor] ?? categoryColors.green
                    }`}
                  >
                    {rPost.category}
                  </span>
                  <p className="text-sm font-semibold text-white mt-1.5 leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                    {rPost.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock size={10} /> {rPost.readTime} read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section
        aria-label="Book MangroveSpot"
        className="max-w-6xl mx-auto px-4 pb-20"
      >
        <div className="rounded-2xl bg-primary/10 border border-primary/20 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Plan Your MangroveSpot Visit
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
            Kayaking · Coracle Ride · Country Boat · ATV · SUP<br />
            Nedungolam, Paravur, Kollam · Open daily 6:30 AM – 6:30 PM
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105 active:scale-100"
          >
            <CalendarDays size={18} />
            Book a Slot – Save 25% Online
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
