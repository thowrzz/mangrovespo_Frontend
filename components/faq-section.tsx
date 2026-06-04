'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: "Where exactly is MangroveSpot located?",
    answer: "MangroveSpot is at Nedungolam, Paravur, Kollam, Kerala — PIN 691334. We are approximately 30 km from Kollam city centre and about 45 km from Varkala. The nearest landmark is the Nedungolam bridge. On-site parking is available. You can view our location on Google Maps and get directions directly through our map section below.",
  },
  {
    question: "What activities are available at MangroveSpot?",
    answer: "We currently run six activity types: Kayaking, Coracle Ride, Country Boat Ride, Stand-Up Paddleboarding (SUP), ATV Ride, and High-Speed Engine Boat Ride. Combo packages are also available. All activities operate on the Nedungolam backwaters and surrounding terrain.",
  },
  {
    question: "What are your opening hours?",
    answer: "MangroveSpot is open every day from 6:30 AM to 6:30 PM. Last entry for activities is 5:00 PM. We operate on public holidays and weekends.",
  },
  {
    question: "Do I need to pre-book, or can I walk in?",
    answer: "Walk-ins are welcome when slots are available. However, online pre-booking through our website gives you a confirmed slot and a 25% discount on every activity. Walk-in visitors pay the full rate.",
  },
  {
    question: "How does the online booking payment work?",
    answer: "You pay 50% of the activity cost during online booking. The remaining 50% is paid on the day of your visit at MangroveSpot. We accept UPI, cards, and net banking through our secure payment gateway.",
  },
  {
    question: "Is it safe? Are life jackets provided?",
    answer: "Yes. ISI-approved life jackets are provided to every participant before entering the water — including children. All water-based activities are led by trained and licensed guides who are familiar with the waterways. We have never had a safety incident in our operating history.",
  },
  {
    question: "Is MangroveSpot suitable for families with children?",
    answer: "Yes. We regularly host families with children from age 5 upward. The kayaking and coracle rides are calm and do not require swimming ability or prior experience. Our guides adjust the pace and route to suit the group. For very young children, we recommend the coracle ride or country boat ride.",
  },
  {
    question: "Can I visit during the monsoon season?",
    answer: "We operate year-round. During monsoon (June–September), the mangroves are lush green and the experience is particularly vivid. Activity scheduling depends on weather conditions — if the waterway is unsafe due to heavy rain, we reschedule or refund. The best time for birdwatching is October to March.",
  },
  {
    question: "Do you accommodate school and college groups?",
    answer: "Yes. MangroveSpot is a popular destination for school nature trips and college excursions. We have handled groups of 50+ participants. Group bookings get coordinated scheduling and priority slot allocation. Contact us on WhatsApp or call to discuss group pricing.",
  },
  {
    question: "How far is MangroveSpot from popular tourist spots in Kerala?",
    answer: "We are ~30 km from Kollam city (45–50 min drive), ~45 km from Varkala (~60 min drive), ~75 km from Thiruvananthapuram (~90 min drive), and ~90 km from Alappuzha (~2 hours). MangroveSpot is a viable half-day activity from any of these locations.",
  },
]

export function FaqSection() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }

  return (
    <section id="faq" aria-label="Frequently Asked Questions" className="py-20 bg-background border-t border-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about visiting MangroveSpot at Nedungolam, Paravur, Kollam.
          </p>
        </div>

        {/* Accordion List */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-card border border-border rounded-xl px-6 transition-all hover:border-accent/40"
            >
              <AccordionTrigger className="text-left text-white font-semibold text-base sm:text-lg hover:text-accent hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-base pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
