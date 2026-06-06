/**
 * varkala-distance-section.tsx
 * Location/Distance section targeting Varkala keyword rankings.
 * Placed after the map section on the homepage.
 */

import Link from 'next/link'

const distanceData = [
  { emoji: '📍', from: 'Varkala Beach', km: '30 km', time: '40 min' },
  { emoji: '📍', from: 'Kollam City', km: '28 km', time: '35 min' },
  { emoji: '📍', from: 'Thiruvananthapuram', km: '65 km', time: '75 min' },
  { emoji: '📍', from: 'Alappuzha', km: '85 km', time: '100 min' },
]

export function VarkalaDistanceSection() {
  return (
    <section
      aria-label="Distance from Varkala to MangroveSpot"
      className="py-16 px-4 bg-card/30 border-y border-border/50"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3 bg-primary/10 px-3 py-1 rounded-full">
            Plan Your Visit
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Far is MangroveSpot from Varkala?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            MangroveSpot is located at Nedungolam, Paravur — just{' '}
            <strong className="text-foreground">30 km from Varkala</strong> (approx. 40 minutes by road).
            It is the closest mangrove kayaking and water sports destination for tourists staying in Varkala.
          </p>
        </div>

        {/* Distance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {distanceData.map(({ emoji, from, km, time }) => (
            <div
              key={from}
              className="bg-background border border-border rounded-2xl p-5 text-center hover:border-primary/40 transition-colors"
            >
              <span className="text-2xl mb-2 block">{emoji}</span>
              <p className="text-foreground font-semibold text-sm mb-1">From {from}</p>
              <p className="text-primary font-bold text-xl">{km}</p>
              <p className="text-muted-foreground text-xs mt-0.5">~{time} drive</p>
            </div>
          ))}
        </div>

        {/* Summary text */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
            Ideal for a day trip or half-day excursion from Varkala, Kollam, or Thiruvananthapuram.{' '}
            <span className="text-foreground font-medium">Ample parking available on-site.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/kayaking-varkala"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full text-sm transition-all hover:scale-105 active:scale-100"
            >
              Kayaking near Varkala →
            </Link>
            <Link
              href="/water-sports-varkala"
              className="inline-flex items-center justify-center gap-2 border border-primary/40 hover:border-primary text-foreground hover:text-primary font-semibold px-6 py-3 rounded-full text-sm transition-all"
            >
              All Water Sports →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
