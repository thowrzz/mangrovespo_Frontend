'use client'

import { Compass, ExternalLink, Sparkles, MapPin, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SisterVenturesSection() {
  return (
    <section id="sister-ventures" aria-label="Our Sister Ventures" className="py-20 bg-background relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-card/40 border border-border/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-400">
                <Sparkles size={12} className="animate-pulse" />
                <span>Our Premium Sister Concern</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Discover <span className="text-accent">Mangrove Moments</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Looking for another perspective of the Paravur Backwaters? Experience premium eco-adventures with **Mangrove Moments**. Specializing in guided sunset and sunrise tours, their sessions take you through stunning canopy-covered mangrove forest canals just 20 minutes from Varkala Cliff.
              </p>

              {/* Feature bullet list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Guided Sunrise & Sunset Kayaking',
                  'Stand Up Paddleboarding (SUP)',
                  'Eco-Friendly Backwater Tours',
                  'Varkala Hotel Pickup & Drop Service',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-white/90">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Card Column */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center">
              <div className="bg-card border border-border/60 p-6 md:p-8 rounded-2xl w-full text-center space-y-6 hover:shadow-2xl hover:border-primary/30 transition-all duration-300">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full text-primary">
                    <Compass size={40} className="animate-spin-slow" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Mangrove Moments</h3>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin size={12} className="text-primary" />
                    <span>Paravur Lake, Varkala, Kerala</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Explore available slots, view customized kayaking packages, and book online for dynamic eco-sports.
                </p>

                <div className="pt-2">
                  <a
                    href="https://www.mangrovemoments.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full"
                  >
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all text-base">
                      Visit mangrovemoments.com
                      <ExternalLink size={16} />
                    </Button>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
