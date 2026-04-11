'use client'

import { Star } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Amit Kumar',
    rating: 5,
    text: 'Best kayaking experience of my life! The guides were professional and the mangroves were breathtaking.',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    rating: 5,
    text: 'Amazing adventure! Every moment felt special. Highly recommend for families and friends.',
  },
  {
    id: 3,
    name: 'Rajesh Patel',
    rating: 5,
    text: 'Worth every rupee. Safety was priority and the views were absolutely stunning.',
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    rating: 5,
    text: 'A slice of paradise! The coracle ride was unique and unforgettable. Perfect vacation.',
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Adventurers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Trusted by thousands of happy customers
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
