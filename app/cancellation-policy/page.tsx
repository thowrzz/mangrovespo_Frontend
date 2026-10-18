import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  RotateCcw,
  CheckCircle2,
  Clock,
  CloudRain,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | MangroveSpot Adventures",
  description:
    "Review MangroveSpot's cancellation and refund guidelines. Clear terms: 100% refund for 72+ hours, 50% for 48–72 hours, and free weather rescheduling.",
  alternates: { canonical: "https://www.mangrovespot.in/cancellation-policy" },
  openGraph: {
    title: "Cancellation & Refund Policy | MangroveSpot Adventures",
    description: "Clear and fair cancellation terms for all MangroveSpot kayaking and adventure bookings.",
    url: "https://www.mangrovespot.in/cancellation-policy",
  },
}

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            <RotateCcw size={14} />
            <span>Customer Friendly</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Cancellation &amp; Refund Policy
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            We understand plans can change. Here is a clear breakdown of our cancellation timelines, refund percentages, and weather rescheduling terms.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-8">
        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 72+ Hours */}
          <div className="bg-card border border-emerald-500/30 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-emerald-500/5 transition-all">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                <CheckCircle2 size={13} />
                <span>Full Refund</span>
              </div>
              <p className="text-3xl font-extrabold text-white">100%</p>
              <h2 className="text-base font-semibold text-white">72+ Hours Before</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cancel at least 72 hours prior to your scheduled activity start time to receive a full 100% refund of your advance payment.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 text-xs text-emerald-400 font-medium">
              Zero cancellation fee
            </div>
          </div>

          {/* 48-72 Hours */}
          <div className="bg-card border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-amber-500/5 transition-all">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                <Clock size={13} />
                <span>Partial Refund</span>
              </div>
              <p className="text-3xl font-extrabold text-white">50%</p>
              <h2 className="text-base font-semibold text-white">48 – 72 Hours Before</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cancellations made between 48 and 72 hours before the booked activity start time are eligible for a 50% refund.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 text-xs text-amber-400 font-medium">
              50% retained for slot reservation
            </div>
          </div>

          {/* 0-48 Hours / No Show */}
          <div className="bg-card border border-rose-500/30 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-rose-500/5 transition-all">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full">
                <AlertCircle size={13} />
                <span>No Refund</span>
              </div>
              <p className="text-3xl font-extrabold text-white">0%</p>
              <h2 className="text-base font-semibold text-white">0 – 48 Hours / No Show</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cancellations within 48 hours of scheduled activity or non-arrival (no-show) are non-refundable as boats and guides are dedicated.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 text-xs text-rose-400 font-medium">
              Non-refundable
            </div>
          </div>
        </div>

        {/* Weather / Force Majeure Card */}
        <section className="bg-gradient-to-r from-blue-950/30 to-card border border-blue-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <CloudRain size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Weather / Force Majeure Policy</h2>
              <p className="text-xs text-blue-300">Guest safety is always our first priority</p>
            </div>
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            Light rain does not stop our boating adventures — the mangroves are often most enchanting in a gentle drizzle. However, in the event of extreme weather warnings, high winds, heavy thunderstorms, or other force majeure conditions that make waterways unsafe:
          </p>
          <div className="bg-background/60 border border-border/60 rounded-xl p-4 text-sm text-white/90 space-y-2">
            <p className="font-semibold text-accent flex items-center gap-2">
              <CheckCircle2 size={16} /> Free Rescheduling
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We offer free rescheduling to another date or suitable time slot, subject to availability. You can choose any upcoming date without any rebooking penalty.
            </p>
          </div>
        </section>

        {/* How to cancel or request refund */}
        <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
              <HelpCircle size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">How to Cancel or Reschedule</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To request a cancellation or date change, please reach out to our team with your <strong>Booking Reference Number</strong> (provided in your confirmation SMS/email) via any of the channels below:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <a
              href="https://wa.me/917561001268?text=Hello%20MangroveSpot%2C%20I%20would%20like%20to%20inquire%20about%20my%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-background border border-border hover:border-green-500/50 hover:bg-green-500/5 transition-all text-sm group"
            >
              <MessageCircle size={18} className="text-green-400 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-white font-medium">WhatsApp</p>
                <p className="text-xs text-muted-foreground">+91 7561001268</p>
              </div>
            </a>

            <a
              href="tel:9496141619"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-background border border-border hover:border-accent/50 hover:bg-accent/5 transition-all text-sm group"
            >
              <Phone size={18} className="text-accent group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-white font-medium">Phone Call</p>
                <p className="text-xs text-muted-foreground">9496141619 / 7561001268</p>
              </div>
            </a>

            <a
              href="mailto:mangrovespotcare@gmail.com"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-background border border-border hover:border-accent/50 hover:bg-accent/5 transition-all text-sm group"
            >
              <Mail size={18} className="text-accent group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-white font-medium">Email Desk</p>
                <p className="text-xs text-muted-foreground">mangrovespotcare@gmail.com</p>
              </div>
            </a>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            * Refunds are processed via our payment gateway partner to your original source account (UPI / card / net banking) within 5–7 banking days.
          </p>
        </section>

        {/* Quick Navigation Footer */}
        <div className="pt-4 flex flex-wrap justify-between items-center gap-4 text-xs text-muted-foreground border-t border-border">
          <div className="flex gap-4">
            <Link href="/terms-and-conditions" className="hover:text-accent underline transition">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-accent underline transition">
              Privacy Policy
            </Link>
            <Link href="/faqs" className="hover:text-accent underline transition">
              FAQs
            </Link>
          </div>
          <Link href="/booking" className="text-accent font-semibold hover:underline">
            Book an Activity →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
