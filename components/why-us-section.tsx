'use client'

import { CheckCircle, Shield, Award, TrendingDown } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Expert Guides',
    description: 'Expert and licensed guides with years of experience',
  },
  {
    icon: Shield,
    title: 'Life Jackets Provided',
    description: 'Premium safety equipment for all adventurers',
  },
  {
    icon: CheckCircle,
    title: 'Safe & Secure',
    description: 'Highest safety standards and insurance coverage',
  },
  {
    icon: TrendingDown,
    title: 'Best Price Guarantee',
    description: 'Competitive pricing for premium experiences',
  },
]

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose MangroveSpot?
          </h2>
          <p className="text-lg text-muted-foreground">
            Premium eco-tourism experiences with unmatched quality
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
