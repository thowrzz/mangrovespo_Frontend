'use client'

import { CheckCircle, Shield, Award, TrendingDown } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Licensed Local Guides',
    description: 'Every session is led by a certified guide who has worked this waterway for years — not a seasonal hire.',
  },
  {
    icon: Shield,
    title: 'Life Jackets for Every Guest',
    description: 'ISI-approved life jackets for every participant. Children and non-swimmers are especially welcome.',
  },
  {
    icon: CheckCircle,
    title: 'Transparent, Fixed Pricing',
    description: 'Prices are published on this site. No negotiation needed, no on-arrival surprises, no hidden charges.',
  },
  {
    icon: TrendingDown,
    title: '25% Off When You Book Online',
    description: 'Walk-in visitors pay full price. Book through this site and save 25% on every activity — instantly confirmed.',
  },
]

export function WhyUsSection() {
  return (
    <section id="why-us" aria-label="Why choose MangroveSpot" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Makes MangroveSpot Different
          </h2>
          <p className="text-lg text-muted-foreground">
            Most activity providers in Kerala offer one or two experiences. We run six — from sunrise kayaking to ATV rides — with licensed guides, clear pricing, and a safety record that speaks for itself.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-xl bg-background hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center">
                  <div className="p-3 bg-accent/20 rounded-full">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
