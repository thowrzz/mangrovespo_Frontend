import { HeroSection } from '@/components/hero-section'
import { ActivitiesSection } from '@/components/activities-section'
import { WhyUsSection } from '@/components/why-us-section'
import { GallerySection } from '@/components/gallery-section'
import { ReviewsSection } from '@/components/reviews-section'
import { CtaSection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { MobileBottomBar } from '@/components/mobile-bottom-bar'

export default function Home() {
  return (
    <main className="bg-background">
      <HeroSection />
       <ActivitiesSection /> 
      <WhyUsSection />
       <GallerySection /> 
      <ReviewsSection />
      <CtaSection />
      <Footer />
      <MobileBottomBar />
    </main>
  )
}
