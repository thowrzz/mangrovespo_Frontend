'use client'

import { Star } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Arun Menon',
    location: 'Thiruvananthapuram',
    rating: 5,
    text: 'Came with my family on a Sunday morning. The kayaking through the mangrove canal was about 45 minutes and well-managed. Guide explained the tree species and pointed out birds we would have missed. Life jackets were provided without being asked. Will return.',
  },
  {
    id: 2,
    name: 'Divya R.',
    location: 'Bangalore',
    rating: 5,
    text: 'Pre-booked online the night before, got the 25% discount, and everything was exactly as described. The coracle ride was the highlight — stable, peaceful, and very different from anything else we have done in Kerala.',
  },
  {
    id: 3,
    name: 'Thomas Varghese',
    location: 'Kochi',
    rating: 5,
    text: 'Organised a group of 14 people here. The team handled it well — split into two boats, started on time, no waiting around. Pricing was clear and there were no add-on charges at the venue. Would recommend to anyone doing a day trip from Kollam.',
  },
  {
    id: 4,
    name: 'Yasmin K.',
    location: 'Dubai (visiting Kerala)',
    rating: 5,
    text: 'We went for the ATV and country boat combo. The ATV track is well-maintained and safe. Country boat felt very authentic — not a tourist boat, an actual traditional vessel. The staff were helpful and spoke English. Solid experience.',
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" aria-label="Guest reviews of MangroveSpot" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Guests Say About MangroveSpot
          </h2>
          <p className="text-lg text-muted-foreground">
            4.9 stars on Google · 5,000+ verified reviews · Nedungolam, Paravur, Kollam
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-background p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-2 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-foreground mb-4 leading-relaxed">
                &quot;{review.text}&quot;
              </p>

              {/* Reviewer Name */}
              <p className="font-semibold text-accent">— {review.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{review.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
