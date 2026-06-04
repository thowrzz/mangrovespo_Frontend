'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function CtaSection() {
  const router = useRouter()

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          Plan Your Mangrove Visit &mdash; We&apos;ll Sort the Rest
        </h2>

        <p className="text-lg text-primary-foreground/90 mb-8">
          Choose your activity, book online in under 2 minutes, and pay just 50% now.<br />
          The balance is settled when you arrive at Nedungolam, Paravur.<br />
          Open every day, 6:30 AM to 6:30 PM.
        </p>

        <Button
          size="lg"
          onClick={() => router.push('/booking')}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-12 text-lg"
        >
          Book a Slot &mdash; Takes 2 Minutes
        </Button>
      </div>
    </section>
  )
}
