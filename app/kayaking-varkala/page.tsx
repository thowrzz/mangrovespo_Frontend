import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { CalendarDays, MapPin, Clock, Shield, Users, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kayaking near Varkala | Mangrove Spot — Paravur Lake, Kollam',
  description:
    'Best kayaking near Varkala at Mangrove Spot, Paravur Lake. 30 km from Varkala. Book online & save 25%. 4.9★ rated. Open daily.',
  keywords: [
    'kayaking near varkala',
    'kayaking varkala',
    'mangrove kayaking varkala',
    'paravur lake kayaking',
    'water sports near varkala',
    'adventure activities varkala',
    'kayaking kollam',
    'mangrove kayaking kerala',
  ],
  openGraph: {
    title: 'Kayaking near Varkala | Mangrove Spot — Paravur Lake, Kollam',
    description:
      'Best kayaking near Varkala at Mangrove Spot, Paravur Lake. 30 km from Varkala. Book online & save 25%. 4.9★ rated.',
    url: 'https://www.mangrovespot.in/kayaking-varkala',
    type: 'website',
    images: [{ url: 'https://www.mangrovespot.in/Mangrove-Kayaking.jpg', alt: 'Kayaking near Varkala at Mangrove Spot, Paravur Lake, Kollam' }],
  },
  alternates: { canonical: 'https://www.mangrovespot.in/kayaking-varkala' },
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['TouristAttraction', 'LocalBusiness'],
      '@id': 'https://www.mangrovespot.in/#business',
      name: 'Mangrove Spot',
      description: 'Kayaking near Varkala at Paravur Lake. The best mangrove kayaking destination 30 km from Varkala, Kerala.',
      url: 'https://www.mangrovespot.in/kayaking-varkala',
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
          name: 'Is there kayaking near Varkala?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Mangrove Spot at Nedungolam, Paravur is the nearest mangrove kayaking destination from Varkala — just 30 km away (approximately 40 minutes by road). It offers guided kayaking through pristine mangrove canals on Paravur Lake.',
          },
        },
        {
          '@type': 'Question',
          name: 'How far is Mangrove Spot from Varkala?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mangrove Spot is located 30 km from Varkala Beach, approximately a 40-minute drive via Paravur Road. It is the closest mangrove kayaking destination for tourists staying in Varkala.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the price for kayaking near Varkala?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Kayaking at Mangrove Spot is competitively priced. Pre-booking online saves you 25% off the walk-in rate. Visit our booking page for current pricing.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is kayaking safe for beginners near Varkala?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. Mangrove Spot\'s kayaking route runs through calm mangrove canals with no current or waves. ISI-approved life jackets are provided, and certified guides accompany every session. No prior experience needed.',
          },
        },
      ],
    },
  ],
}

const faqs = [
  {
    q: 'Is there kayaking near Varkala?',
    a: 'Yes! Mangrove Spot at Nedungolam, Paravur is the nearest mangrove kayaking destination from Varkala — just 30 km away (approximately 40 minutes by road). It offers guided kayaking through pristine mangrove canals on Paravur Lake.',
  },
  {
    q: 'How far is Mangrove Spot from Varkala?',
    a: 'Mangrove Spot is located 30 km from Varkala Beach, approximately a 40-minute drive via Paravur Road. It is the closest mangrove kayaking destination for tourists staying in Varkala.',
  },
  {
    q: 'What is the price for kayaking near Varkala?',
    a: 'Kayaking at Mangrove Spot is competitively priced. Pre-booking online saves you 25% off the walk-in rate. Visit our booking page for current pricing and available slots.',
  },
  {
    q: 'Is kayaking safe for beginners near Varkala?',
    a: "Absolutely. Mangrove Spot's kayaking route runs through calm mangrove canals with no current or waves. ISI-approved life jackets are provided to every participant, and certified guides accompany every session. No prior experience or swimming ability is required.",
  },
]

export default function KayakingVarkalaPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Hero Banner ── */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-background to-background pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-400 to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            ← Back to Home
          </Link>
          <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full mb-4">
            🌿 Kayaking near Varkala
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Kayaking near Varkala —{' '}
            <span className="text-primary">Mangrove Spot, Paravur Lake</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            The closest mangrove kayaking experience from Varkala. Paddle through ancient mangrove
            canals on Paravur Lake, guided by certified experts. Just 30 km from Varkala Beach.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { icon: MapPin, text: '30 km from Varkala' },
              { icon: Clock, text: '45-min guided session' },
              { icon: Shield, text: 'Life jackets provided' },
              { icon: Users, text: 'All skill levels' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-sm text-muted-foreground"
              >
                <Icon size={13} className="text-primary" />
                {text}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105 active:scale-100"
            >
              <CalendarDays size={18} />
              Book Now – Save 25% Online
            </Link>
            <a
              href="https://wa.me/917561001268"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-border hover:border-primary/50 text-foreground font-semibold px-8 py-4 rounded-full text-base transition-all"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Why Mangrove Spot is Best Kayaking near Varkala ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            Why Mangrove Spot is the Best Kayaking near Varkala
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: 'Closest to Varkala',
                desc: 'Just 30 km from Varkala Beach — about 40 minutes by road. Perfect for a morning excursion or day trip without long travel time.',
              },
              {
                title: 'Pristine Mangrove Canals',
                desc: 'Paddle through dense mangrove tunnels on Paravur Lake, a protected backwater ecosystem teeming with birdlife and unique flora.',
              },
              {
                title: '4.9★ Rated on Google',
                desc: 'Over 5,300 verified reviews from families, couples, and adventure groups. Consistently rated the top water activity near Varkala and Kollam.',
              },
              {
                title: 'Certified Guides Only',
                desc: 'Every session is led by trained, licensed guides who know the mangrove route intimately. Safe, educational, and genuinely memorable.',
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
              >
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience Details ── */}
      <section className="py-16 px-4 bg-card/30 border-y border-border/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            What the Kayaking Experience Includes
          </h2>
          <div className="space-y-5">
            {[
              {
                num: '01',
                title: 'Guided Mangrove Canal Route',
                desc: 'Your certified guide leads the group through approximately 2 km of mangrove waterways — from the main jetty into narrow, canopy-covered canal sections and back. The route takes about 45 minutes.',
              },
              {
                num: '02',
                title: 'Safety Briefing & Equipment',
                desc: 'Before entering the water, every participant receives an ISI-approved life jacket and a 5–10 minute briefing covering paddle technique and safety. No swimming ability required.',
              },
              {
                num: '03',
                title: 'Expert Nature Narration',
                desc: 'Your guide explains the mangrove ecosystem — the species of trees, the role of the roots, the birds you\'ll spot (kingfishers, herons, egrets), and the ecology of Paravur Lake.',
              },
              {
                num: '04',
                title: 'Calm, Beginner-Friendly Waters',
                desc: 'The canals at Nedungolam have no tidal current, no waves, and no ocean swell. The water is sheltered by dense mangrove canopy — perfect for first-time kayakers of all ages.',
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="flex gap-5 items-start">
                <span className="text-3xl font-black text-primary/30 leading-none shrink-0 w-12 text-right">
                  {num}
                </span>
                <div>
                  <h3 className="text-white font-bold mb-1">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Distance from Varkala ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            Distance from Varkala &amp; Nearby Cities
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { from: 'Varkala Beach', km: '30 km', time: '~40 min' },
              { from: 'Kollam City', km: '28 km', time: '~35 min' },
              { from: 'Thiruvananthapuram', km: '65 km', time: '~75 min' },
              { from: 'Alappuzha', km: '85 km', time: '~100 min' },
            ].map(({ from, km, time }) => (
              <div
                key={from}
                className="bg-card border border-border rounded-2xl p-4 text-center"
              >
                <p className="text-muted-foreground text-xs mb-1">From {from}</p>
                <p className="text-primary font-bold text-2xl">{km}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{time} by road</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Mangrove Spot is conveniently accessible from Varkala, Kollam, and Thiruvananthapuram.
            Ample parking is available on-site. The site is open daily from 6:30 AM to 6:30 PM —
            ideal for an early morning excursion before Varkala beach time.
          </p>
        </div>
      </section>

      {/* ── Pricing & Booking ── */}
      <section className="py-16 px-4 bg-primary/5 border-y border-primary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pricing &amp; Booking</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Pre-book online and save 25% off the walk-in rate. Pay 50% now to confirm your slot —
            the remaining 50% is paid at the venue on the day of your visit.
          </p>
          <div className="inline-flex items-center gap-3 bg-background border border-border rounded-2xl px-6 py-4 mb-8">
            <span className="text-2xl font-black text-primary">Save 25%</span>
            <span className="text-muted-foreground text-sm">when you pre-book online</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105"
            >
              <CalendarDays size={18} />
              Book Kayaking Now
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-border hover:border-primary/50 text-foreground font-semibold px-8 py-4 rounded-full text-base transition-all"
            >
              Explore All Activities
            </Link>
          </div>
        </div>
      </section>

      {/* ── Safety ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Safety First</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '🦺', title: 'ISI-Approved Life Jackets', desc: 'Every participant wears an ISI-certified life jacket before entering the water. Non-negotiable, no exceptions.' },
              { icon: '👨‍🏫', title: 'Certified Guides', desc: 'All guides are trained and licensed. They accompany every group on the water throughout the session.' },
              { icon: '🌊', title: 'Calm, Protected Waters', desc: 'The mangrove canals at Paravur Lake are sheltered from wind and current — the safest kayaking environment in Kerala.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Google Map ── */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-5">Find Us — Mangrove Spot Location</h2>
          <div className="rounded-2xl overflow-hidden border border-border h-72">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.3920004229813!2d76.67860757477827!3d8.843046791211048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05e5acef2dd06d%3A0x18ed01d46c82251a!2sMangrove%20Spot!5e0!3m2!1sen!2sin!4v1780131874002!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mangrove Spot Location — Kayaking near Varkala"
            />
          </div>
          <p className="text-muted-foreground text-sm mt-3 text-center">
            📍 Mangrove Spot, Nedungolam, Paravur, Kollam, Kerala 691334 — 30 km from Varkala
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 bg-card/30 border-t border-border/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-background border border-border rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-3 cursor-pointer px-6 py-4 text-white font-semibold text-sm md:text-base select-none list-none hover:bg-card/50 transition-colors">
                  {q}
                  <ChevronDown
                    size={16}
                    className="text-muted-foreground shrink-0 group-open:rotate-180 transition-transform"
                  />
                </summary>
                <div className="px-6 pb-5 pt-2">
                  <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Internal Links CTA ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            More Adventures near Varkala at Mangrove Spot
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Combine kayaking with other activities for a complete half-day experience.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/atv-ride-varkala" className="bg-card border border-border hover:border-primary/40 text-foreground px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
              ATV Ride near Varkala →
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
