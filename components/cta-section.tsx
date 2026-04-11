'use client'

import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          Ready for Your Adventure?
        </h2>

        <p className="text-lg text-primary-foreground/90 mb-8">
          Join thousands of adventurers who have experienced the magic of Varkala's mangroves
        </p>

        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-12 text-lg"
        >
          Book Your Slot Now
        </Button>
      </div>
    </section>
  )
}
