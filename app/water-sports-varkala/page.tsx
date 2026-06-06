import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { CalendarDays, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Water Sports near Varkala | Kayaking, SUP, Speed Boat — Mangrove Spot',
  description:
    'All water sports near Varkala at one place — kayaking, SUP, speed boat, coracle ride & more at Mangrove Spot, Paravur. Book online.',
  keywords: [
    'water sports near varkala',
    'water sports varkala',
    'kayaking varkala',
    'sup varkala',
    'speed boat varkala',
    'coracle ride varkala',
    'adventure water sports kerala',
    'water activities near varkala kollam',
  ],
  openGraph: {
    title: 'Water Sports near Varkala | Kayaking, SUP, Speed Boat — Mangrove Spot',
    description:
      'All water sports near Varkala at one place — kayaking, SUP, speed boat, coracle ride & more at Mangrove Spot, Paravur. Book online.',
    url: 'https://www.mangrovespot.in/water-sports-varkala',
    type: 'website',
    images: [{ url: 'https://www.mangrovespot.in/og-image.jpg', alt: 'Water sports near Varkala at Mangrove Spot, Paravur Lake, Kollam' }],
  },
  alternates: { canonical: 'https://www.mangrovespot.in/water-sports-varkala' },
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['TouristAttraction', 'LocalBusiness'],
      name: 'Mangrove Spot',
      description: 'All water sports near Varkala at one location — kayaking, SUP, speed boat, coracle ride, country boat, and bumper sofa ride at Paravur Lake, Kollam.',
      url: 'https://www.mangrovespot.in/water-sports-varkala',
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
          name: 'What water sports are available near Varkala?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mangrove Spot, 30 km from Varkala, offers kayaking, stand-up paddleboarding (SUP), speed boat rides, coracle rides, country boat backwater tours, and bumper sofa rides — all in one location on Paravur Lake.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which is the best water sports place near Varkala?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mangrove Spot at Nedungolam, Paravur is the highest-rated water sports destination near Varkala, with a 4.9★ rating from over 5,300 reviews. It offers the widest range of activities — from calm mangrove kayaking to exciting speed boat rides.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is MangroveSpot better than beach water sports in Varkala?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mangrove Spot offers a completely different experience to beach water sports. Instead of ocean waves and currents, you explore calm, protected backwater canals and mangrove ecosystems. It is safer for families and children, more nature-immersive, and includes activities unavailable on the beach — like mangrove kayaking and coracle rides.',
          },
        },
      ],
    },
  ],
}

const activities = [
  {
    id: 'kayaking',
    emoji: '🛶',
    title: 'Mangrove Kayaking',
    desc: 'Paddle through ancient mangrove canals on Paravur Lake, guided by certified experts. The canopy closes overhead as you explore this pristine ecosystem — a unique experience unavailable anywhere else near Varkala.',
    duration: '45 min',
    price: 'Online price (save 25%)',
    suitable: 'All ages (8+ for independent kayaking)',
    highlight: 'Most Popular',
  },
  {
    id: 'sup',
    emoji: '🏄',
    title: 'Stand-Up Paddleboarding (SUP)',
    desc: 'Test your balance on a SUP board on the calm backwaters of Paravur Lake. Instructors guide first-timers through the basics — no experience needed. A great full-body workout with stunning water views.',
    duration: '30 min',
    price: 'Online price (save 25%)',
    suitable: 'Adults & teens (10+)',
    highlight: '',
  },
  {
    id: 'speedboat',
    emoji: '🚤',
    title: 'Speed Boat Ride',
    desc: 'Experience the thrill of high-speed cruising across Paravur Lake on a powerful motor boat. Perfect for adrenaline seekers — feel the wind, the spray, and the open water of one of Kerala\'s most beautiful backwaters.',
    duration: '20 min',
    price: 'Online price (save 25%)',
    suitable: 'All ages',
    highlight: '',
  },
  {
    id: 'coracle',
    emoji: '🪣',
    title: 'Coracle Ride',
    desc: 'Step into a traditional round coracle boat — a vessel used by Kerala\'s fishing communities for generations. Your guide spins and navigates this unique craft on the calm backwaters. Loved by families and children.',
    duration: '20 min',
    price: 'Online price (save 25%)',
    suitable: 'All ages (including children from 3+)',
    highlight: 'Great for Families',
  },
  {
    id: 'countryboat',
    emoji: '⛵',
    title: 'Country Boat / Backwater Tour',
    desc: 'Cruise the Paravur backwater channels on a traditional wooden country boat. This leisurely tour through coconut groves and mangrove edges offers a peaceful window into Kerala\'s backwater life — ideal for all ages.',
    duration: '30–40 min',
    price: 'Online price (save 25%)',
    suitable: 'All ages',
    highlight: '',
  },
  {
    id: 'bumper',
    emoji: '💺',
    title: 'Bumper Sofa Ride',
    desc: 'Grip the handles and hold on tight as the bumper sofa skims across Paravur Lake at speed, pulled by a motor boat. A fun, laughter-filled activity perfect for groups and families seeking a lighter thrill.',
    duration: '15 min',
    price: 'Online price (save 25%)',
    suitable: 'All ages',
    highlight: '',
  },
]

const comparisonData = [
  { activity: 'Kayaking', duration: '45 min', suitable: 'All ages (8+)' },
  { activity: 'SUP', duration: '30 min', suitable: 'Adults (10+)' },
  { activity: 'Speed Boat', duration: '20 min', suitable: 'All ages' },
  { activity: 'Coracle Ride', duration: '20 min', suitable: 'All ages (3+)' },
  { activity: 'Country Boat', duration: '30–40 min', suitable: 'All ages' },
  { activity: 'Bumper Sofa', duration: '15 min', suitable: 'All ages' },
]

const faqs = [
  {
    q: 'What water sports are available near Varkala?',
    a: 'Mangrove Spot, 30 km from Varkala, offers kayaking, stand-up paddleboarding (SUP), speed boat rides, coracle rides, country boat backwater tours, and bumper sofa rides — all in one location on Paravur Lake.',
  },
  {
    q: 'Which is the best water sports place near Varkala?',
    a: 'Mangrove Spot at Nedungolam, Paravur is the highest-rated water sports destination near Varkala, with a 4.9★ rating from over 5,300 reviews. It offers the widest range of activities — from calm mangrove kayaking to exciting speed boat rides.',
  },
  {
    q: 'Is MangroveSpot better than beach water sports in Varkala?',
    a: "Mangrove Spot offers a completely different experience to beach water sports. Instead of ocean waves and currents, you explore calm, protected backwater canals and mangrove ecosystems. It is safer for families and children, more nature-immersive, and includes activities unavailable on the beach — like mangrove kayaking and coracle rides.",
  },
]

export default function WaterSportsVarkalaPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-background to-background pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400 to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors">
            ← Back to Home
          </Link>
          <span className="inline-block text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 px-3 py-1 rounded-full mb-4">
            🌊 Water Sports near Varkala
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Water Sports near Varkala —{' '}
            <span className="text-blue-400">Mangrove Spot</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            All the water sports you could want — in one stunning location on Paravur Lake, just
            30 km from Varkala Beach. Kayaking, SUP, speed boat, coracle rides &amp; more.
            4.9★ rated. Open daily 6:30 AM–6:30 PM.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105"
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

      {/* ── Activities Grid ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-3">All Water Sports near Varkala</h2>
          <p className="text-muted-foreground mb-10">
            Every activity below is available at Mangrove Spot, Paravur Lake — 30 km / 40 min from Varkala.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map(({ id, emoji, title, desc, duration, price, suitable, highlight }) => (
              <div
                key={id}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors relative overflow-hidden"
              >
                {highlight && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full">
                    {highlight}
                  </span>
                )}
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-border pt-3 mt-2">
                  <span>⏱ {duration}</span>
                  <span>👥 {suitable}</span>
                  <span className="text-primary font-semibold">💰 {price}</span>
                </div>
                <Link href="/booking" className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold hover:underline">
                  Book this activity →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-16 px-4 bg-card/30 border-y border-border/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Activity Comparison</h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card/80 border-b border-border">
                  <th className="text-left px-5 py-4 text-white font-bold">Activity</th>
                  <th className="text-left px-5 py-4 text-white font-bold">Duration</th>
                  <th className="text-left px-5 py-4 text-white font-bold">Suitable For</th>
                  <th className="text-left px-5 py-4 text-white font-bold">Book</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map(({ activity, duration, suitable }, i) => (
                  <tr
                    key={activity}
                    className={`border-b border-border/50 hover:bg-card/50 transition-colors ${i === comparisonData.length - 1 ? 'border-b-0' : ''}`}
                  >
                    <td className="px-5 py-3.5 text-foreground font-medium">{activity}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{duration}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{suitable}</td>
                    <td className="px-5 py-3.5">
                      <Link href="/booking" className="text-primary font-semibold hover:underline text-xs">
                        Book →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-xs mt-3 text-center">
            * Pre-book online to save 25% on all activities. Pricing available on the booking page.
          </p>
        </div>
      </section>

      {/* ── Distance ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">How Far from Varkala?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { from: 'Varkala Beach', km: '30 km', time: '~40 min' },
              { from: 'Kollam City', km: '28 km', time: '~35 min' },
              { from: 'Thiruvananthapuram', km: '65 km', time: '~75 min' },
              { from: 'Alappuzha', km: '85 km', time: '~100 min' },
            ].map(({ from, km, time }) => (
              <div key={from} className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="text-muted-foreground text-xs mb-1">From {from}</p>
                <p className="text-blue-400 font-bold text-xl">{km}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{time} by road</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            Mangrove Spot is open daily 6:30 AM to 6:30 PM. Ample parking on-site. Perfect for a morning
            water sports excursion from Varkala, followed by an afternoon at Varkala Cliff Beach.
          </p>
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

      {/* ── Final CTA ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Book Your Water Sports Adventure near Varkala
          </h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-lg mx-auto">
            Pre-book online for 25% off. Open daily 6:30 AM – 6:30 PM.
            30 km from Varkala · Paravur Lake · Kollam, Kerala
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/booking" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105">
              <CalendarDays size={18} />
              Book Now – Save 25%
            </Link>
            <Link href="/kayaking-varkala" className="bg-card border border-border hover:border-primary/40 text-foreground px-5 py-4 rounded-full text-sm font-medium transition-colors">
              Kayaking near Varkala →
            </Link>
            <Link href="/atv-ride-varkala" className="bg-card border border-border hover:border-primary/40 text-foreground px-5 py-4 rounded-full text-sm font-medium transition-colors">
              ATV Ride near Varkala →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
