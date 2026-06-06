import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { CalendarDays, MapPin, Clock, Shield, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ATV Ride near Varkala | Mangrove Spot Adventure Park, Kollam',
  description:
    'ATV rides near Varkala at Mangrove Spot. Off-road adventure on maintained tracks near Paravur Lake. Book online & save 25%. Open daily.',
  keywords: [
    'ATV ride near varkala',
    'ATV varkala',
    'quad bike near varkala',
    'adventure activities varkala',
    'ATV ride kollam',
    'off road adventure kerala',
    'adventure park near varkala',
  ],
  openGraph: {
    title: 'ATV Ride near Varkala | Mangrove Spot Adventure Park, Kollam',
    description:
      'ATV rides near Varkala at Mangrove Spot. Off-road adventure on maintained tracks near Paravur Lake. Book online & save 25%.',
    url: 'https://www.mangrovespot.in/atv-ride-varkala',
    type: 'website',
    images: [{ url: 'https://www.mangrovespot.in/og-image.jpg', alt: 'ATV Ride near Varkala at Mangrove Spot, Kollam' }],
  },
  alternates: { canonical: 'https://www.mangrovespot.in/atv-ride-varkala' },
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['TouristAttraction', 'LocalBusiness'],
      name: 'Mangrove Spot',
      description: 'ATV rides near Varkala at Mangrove Spot adventure park. Off-road adventure on safe, maintained tracks near Paravur Lake, Kollam.',
      url: 'https://www.mangrovespot.in/atv-ride-varkala',
      telephone: '+919496141619',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Nedungolam',
        addressLocality: 'Paravur',
        addressRegion: 'Kollam, Kerala',
        postalCode: '691334',
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 8.843046, longitude: 76.678608 },
      openingHours: 'Mo-Su 06:30-18:30',
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '5332' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is there an ATV ride near Varkala?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Mangrove Spot offers ATV rides on safe, maintained off-road tracks at Nedungolam, Paravur — just 30 km from Varkala (40 minutes by road). It is the nearest ATV adventure experience for tourists staying in Varkala.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the ATV ride price near Varkala?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ATV ride pricing at Mangrove Spot is competitive. Pre-booking online saves you 25% off the walk-in rate. Visit our booking page for current pricing and packages.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is ATV safe for first-timers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Mangrove Spot\'s ATV track is designed for beginners. The track is controlled, maintained, and not high-speed. Instructors provide a safety briefing and accompany first-time riders. Helmets and safety gear are provided.',
          },
        },
      ],
    },
  ],
}

const faqs = [
  {
    q: 'Is there an ATV ride near Varkala?',
    a: 'Yes! Mangrove Spot offers ATV rides on safe, maintained off-road tracks at Nedungolam, Paravur — just 30 km from Varkala (40 minutes by road). It is the nearest ATV adventure experience for tourists staying in Varkala.',
  },
  {
    q: 'What is the ATV ride price near Varkala?',
    a: 'ATV ride pricing at Mangrove Spot is competitive. Pre-booking online saves you 25% off the walk-in rate. Visit our booking page for current pricing and combo packages.',
  },
  {
    q: 'Is ATV safe for first-timers?',
    a: "Yes. Mangrove Spot's ATV track is designed for beginners. The track is controlled, maintained, and not high-speed. Instructors provide a safety briefing and accompany first-time riders. Helmets and safety gear are provided.",
  },
]

export default function AtvRideVarkalaPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-orange-950 via-background to-background pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-400 to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors">
            ← Back to Home
          </Link>
          <span className="inline-block text-xs font-bold tracking-widest text-orange-400 uppercase bg-orange-400/10 px-3 py-1 rounded-full mb-4">
            🏍️ ATV Ride near Varkala
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            ATV Ride near Varkala —{' '}
            <span className="text-orange-400">Mangrove Spot, Nedungolam</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Conquer maintained off-road tracks on powerful ATVs at Mangrove Spot Adventure Park —
            just 30 km from Varkala Beach. Suitable for beginners and thrill-seekers alike.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { icon: MapPin, text: '30 km from Varkala' },
              { icon: Clock, text: 'Flexible ride duration' },
              { icon: Shield, text: 'Safety gear included' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-sm text-muted-foreground">
                <Icon size={13} className="text-orange-400" />
                {text}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105"
            >
              <CalendarDays size={18} />
              Book ATV Now – Save 25%
            </Link>
            <a
              href="https://wa.me/917561001268"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-border hover:border-orange-500/50 text-foreground font-semibold px-8 py-4 rounded-full text-base transition-all"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── ATV Experience ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">The ATV Ride Experience</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Mangrove Spot&apos;s ATV track at Nedungolam is built for off-road excitement in a safe,
            controlled environment. Riders navigate a purpose-built course with natural terrain
            features — dirt tracks, turns, and undulations — set amidst the scenic Paravur
            backwater landscape, just 30 km from Varkala.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Whether you&apos;re a first-time rider or an experienced adventurer, our instructors tailor the
            session to your comfort level. Before you start, you receive a full safety briefing,
            helmet, and gear. The track is regularly maintained for consistent performance and safety.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Safe, Maintained Track', desc: 'Purpose-built off-road course with regular maintenance. Designed for beginners without compromising excitement for experienced riders.' },
              { title: 'Powerful ATVs', desc: 'Well-maintained all-terrain vehicles suitable for different rider sizes. Instructor support available throughout your ride.' },
              { title: 'Safety Gear Provided', desc: 'Helmets and safety equipment provided to every rider. Your safety is our priority — no exceptions.' },
              { title: 'Scenic Backwater Setting', desc: 'The track is set within the natural landscape of Paravur near the mangrove zone — a unique backdrop for an off-road adventure.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Age / Requirements ── */}
      <section className="py-12 px-4 bg-card/30 border-y border-border/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-5">Age &amp; Requirements</h2>
          <ul className="space-y-3">
            {[
              '✅ Minimum age: 12 years (accompanied by adult)',
              '✅ No prior riding experience needed',
              '✅ Helmet and safety gear provided on-site',
              '✅ Instructors present throughout the session',
              '⚠️ Riders must follow track rules and instructor guidance',
              '⚠️ Not suitable for children below 12 years (try kayaking or coracle instead)',
            ].map((item) => (
              <li key={item} className="text-muted-foreground text-sm flex items-start gap-2">
                <span className="mt-0.5">{item.slice(0, 2)}</span>
                <span>{item.slice(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Combo Offers ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Combo Packages</h2>
          <p className="text-muted-foreground mb-8">
            Combine your ATV ride with water activities for the ultimate half-day adventure
            at Mangrove Spot. Popular combos near Varkala:
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: 'ATV + Kayaking', desc: 'Off-road thrills followed by a calm mangrove kayaking session. The perfect contrast — adrenaline and serenity.' },
              { title: 'ATV + Boat Ride', desc: 'Ride the ATV track and then cruise the backwaters on a traditional country boat or coracle.' },
              { title: 'Full Adventure Pack', desc: 'ATV + Kayaking + Coracle Ride — the complete Mangrove Spot experience in one half-day.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-gradient-to-b from-card to-background border border-border rounded-2xl p-6 text-center">
                <h3 className="text-white font-bold mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{desc}</p>
                <Link href="/booking" className="text-primary text-sm font-semibold hover:underline">
                  Book this combo →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Distance ── */}
      <section className="py-12 px-4 bg-card/30 border-y border-border/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-5">Distance from Varkala &amp; Nearby Cities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { from: 'Varkala Beach', km: '30 km', time: '~40 min' },
              { from: 'Kollam City', km: '28 km', time: '~35 min' },
              { from: 'Thiruvananthapuram', km: '65 km', time: '~75 min' },
              { from: 'Alappuzha', km: '85 km', time: '~100 min' },
            ].map(({ from, km, time }) => (
              <div key={from} className="bg-background border border-border rounded-xl p-4 text-center">
                <p className="text-muted-foreground text-xs mb-1">From {from}</p>
                <p className="text-orange-400 font-bold text-xl">{km}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{time} by road</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pricing &amp; Booking</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Pre-book online to lock your slot and save 25% off the walk-in rate. Pay 50% upfront — the remainder at the venue.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105"
            >
              <CalendarDays size={18} />
              Book ATV Ride Now
            </Link>
            <Link href="/" className="inline-flex items-center justify-center gap-2 border border-border hover:border-orange-500/50 text-foreground font-semibold px-8 py-4 rounded-full text-base transition-all">
              All Activities
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 bg-card/30 border-t border-border/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-background border border-border rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between gap-3 cursor-pointer px-6 py-4 text-white font-semibold text-sm md:text-base select-none list-none hover:bg-card/50 transition-colors">
                  {q}
                  <ChevronDown size={16} className="text-muted-foreground shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-5 pt-2">
                  <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Internal Links ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">More Adventures near Varkala</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/kayaking-varkala" className="bg-card border border-border hover:border-primary/40 text-foreground px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
              Kayaking near Varkala →
            </Link>
            <Link href="/water-sports-varkala" className="bg-card border border-border hover:border-primary/40 text-foreground px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
              All Water Sports near Varkala →
            </Link>
            <Link href="/booking" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              Book Now →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
