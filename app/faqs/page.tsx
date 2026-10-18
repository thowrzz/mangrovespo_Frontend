"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  ArrowLeft,
  ChevronDown,
} from "lucide-react"
import { Footer } from "@/components/footer"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: "Activities" | "Safety & Rules" | "Booking & Payment" | "Visit & Logistics"
}

const FAQ_LIST: FAQItem[] = [
  {
    id: "q1",
    category: "Activities",
    question: "What types of boating do you offer?",
    answer:
      "We offer canoe tours, mangrove kayaking, motorboat rides, and traditional Kerala country boat cruises. In addition, we have coracle rides, stand-up paddleboarding (SUP), and ATV rides.",
  },
  {
    id: "q2",
    category: "Safety & Rules",
    question: "Is it safe?",
    answer:
      "Yes, all trips include certified life jackets, trained and licensed local guides, and comprehensive safety briefings before entering the water. Our calm waterways are safe for beginners and non-swimmers alike.",
  },
  {
    id: "q3",
    category: "Safety & Rules",
    question: "Can children join?",
    answer:
      "Yes, children are very welcome with adult supervision. Certified child-sized life jackets are provided for all young participants.",
  },
  {
    id: "q4",
    category: "Visit & Logistics",
    question: "What should I bring?",
    answer:
      "We recommend comfortable lightweight clothes, sun protection (sunscreen, hat, sunglasses), a change of clothes if you wish, and a bottle of drinking water.",
  },
  {
    id: "q5",
    category: "Booking & Payment",
    question: "Do you allow walk-in bookings?",
    answer:
      "Walk-in bookings are limited based on on-site slot availability. We strongly recommend advance online booking through our website to secure your preferred slot and enjoy advance booking benefits.",
  },
  {
    id: "q6",
    category: "Safety & Rules",
    question: "What happens if it rains?",
    answer:
      "Light rain doesn't stop trips — the mangrove waterways are often most scenic in a soft drizzle. However, in case of unsafe weather or severe thunderstorms, we reschedule to another date at no extra cost.",
  },
  {
    id: "q7",
    category: "Activities",
    question: "Do you arrange food with the tours?",
    answer:
      "Yes, authentic traditional Kerala meals and snacks can be arranged and added to your package on prior request.",
  },
  {
    id: "q8",
    category: "Safety & Rules",
    question: "Is alcohol allowed on the boat?",
    answer:
      "No. For safety reasons and in compliance with water safety regulations, alcohol, narcotics, and drugs are strictly prohibited on all boats and premises.",
  },
  {
    id: "q9",
    category: "Activities",
    question: "Can we fish during the trip?",
    answer:
      "Yes, fishing rods and equipment can be arranged as an add-on experience upon request.",
  },
  {
    id: "q10",
    category: "Visit & Logistics",
    question: "What's the best season to visit Munroe Island & Paravur backwaters?",
    answer:
      "October to March is ideal for cool weather and bird watching. However, canoe and kayak rides through the lush canopy canals during the monsoon season (June to September) are also deeply magical and green.",
  },
  {
    id: "q11",
    category: "Activities",
    question: "Do you offer special group bookings?",
    answer:
      "Yes, we arrange corporate outings, school and college trips, and large family gatherings with custom itineraries and coordinated slot allocations.",
  },
  {
    id: "q13",
    category: "Visit & Logistics",
    question: "Are pets allowed?",
    answer:
      "Small pets may be allowed on private boat trips, but prior approval from our management team is required.",
  },
  {
    id: "q14",
    category: "Visit & Logistics",
    question: "Do you provide parking?",
    answer:
      "Yes, free and secure parking is available on-site at our boating club entry point.",
  },
  {
    id: "q15",
    category: "Booking & Payment",
    question: "How do I pay?",
    answer:
      "We accept all major payment modes including UPI (GPay, PhonePe, Paytm), Net Banking, Credit/Debit cards, bank transfer, and cash at arrival.",
  },
]

export default function FAQsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ q1: true, q2: true })

  const categories = ["All", "Activities", "Safety & Rules", "Booking & Payment", "Visit & Logistics"]

  const filteredFaqs = FAQ_LIST.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch =
      search.trim() === "" ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_LIST.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Mangrove Spot" width={36} height={36} priority />
            <Image src="/text.svg" alt="Mangrove Spot" width={120} height={40} priority />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-card/80 to-background border-b border-border/40 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Everything you need to know about our boating tours, safety protocols, parking, group bookings, and payment methods.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto pt-2 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions (e.g. safety, rain, payment)..."
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full space-y-6">
        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-accent text-white shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-white hover:border-accent/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs list */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item) => {
              const isOpen = !!openIds[item.id]
              return (
                <div
                  key={item.id}
                  className={`bg-card border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen ? "border-accent/40 shadow-sm" : "border-border hover:border-border/80"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-accent/10 text-accent shrink-0">
                        {item.category}
                      </span>
                      <span className="text-white font-semibold text-sm sm:text-base">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-muted-foreground shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                      {item.answer}
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No matching questions found for &ldquo;{search}&rdquo;. Try another term or contact us directly.
            </div>
          )}
        </div>

        {/* Have more questions card */}
        <div className="mt-8 bg-gradient-to-r from-card to-card/60 border border-accent/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">Still have questions?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Our team is available 7 days a week from 6:30 AM to 6:30 PM.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/917561001268?text=Hi%2C%20I%20have%20a%20question%20about%20MangroveSpot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-xs sm:text-sm transition-all"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
            <a
              href="tel:9496141619"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border hover:border-accent/40 text-white font-semibold text-xs sm:text-sm transition-all"
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="pt-4 flex flex-wrap justify-between items-center gap-4 text-xs text-muted-foreground border-t border-border">
          <div className="flex gap-4">
            <Link href="/terms-and-conditions" className="hover:text-accent underline transition">
              Terms &amp; Conditions
            </Link>
            <Link href="/cancellation-policy" className="hover:text-accent underline transition">
              Cancellation Policy
            </Link>
            <Link href="/privacy-policy" className="hover:text-accent underline transition">
              Privacy Policy
            </Link>
          </div>
          <Link href="/booking" className="text-accent font-semibold hover:underline">
            Book Online &amp; Save 25% →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
