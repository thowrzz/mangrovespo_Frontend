import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  FileText,
  LifeBuoy,
  Users2,
  CreditCard,
  CloudSun,
  ShieldAlert,
  Ban,
  ArrowLeft,
} from "lucide-react"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms & Conditions | MangroveSpot Adventures",
  description:
    "Review the Terms and Conditions for booking and participating in kayaking, boating, and eco-adventures at MangroveSpot.",
  alternates: { canonical: "https://www.mangrovespot.in/terms-and-conditions" },
  openGraph: {
    title: "Terms & Conditions | MangroveSpot Adventures",
    description: "Important safety, eligibility, booking, and operational rules for MangroveSpot guests.",
    url: "https://www.mangrovespot.in/terms-and-conditions",
  },
}

export default function TermsAndConditionsPage() {
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
            <FileText size={14} />
            <span>User Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Please read these terms carefully before confirming your reservation. By booking or participating in any activity at Mangrove Spot, you agree to comply with these rules.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-6">
        {/* Term 1: Safety First */}
        <section className="bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-3 hover:border-accent/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
              <LifeBuoy size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-accent tracking-wide uppercase">Rule 1</span>
              <h2 className="text-lg sm:text-xl font-bold text-white">Safety First</h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed pl-1 sm:pl-13">
            Life jackets must be worn at all times during boating and water activities. All guests must strictly follow instructions given by our certified crew, guides, and safety personnel.
          </p>
        </section>

        {/* Term 2: Eligibility */}
        <section className="bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-3 hover:border-accent/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Users2 size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-400 tracking-wide uppercase">Rule 2</span>
              <h2 className="text-lg sm:text-xl font-bold text-white">Eligibility &amp; Health Disclosure</h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed pl-1 sm:pl-13">
            Children under 10 years of age must be accompanied by an adult at all times. Guests with serious health issues (including heart conditions, severe mobility impairments, or advanced pregnancy) must disclose them before booking and check with their physician.
          </p>
        </section>

        {/* Term 3: Booking */}
        <section className="bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-3 hover:border-accent/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <CreditCard size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">Rule 3</span>
              <h2 className="text-lg sm:text-xl font-bold text-white">Booking &amp; Advance Payment</h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed pl-1 sm:pl-13">
            An advance payment (50% online) is required to confirm your reservation and lock in your boat and guide slot. The remaining balance (50%) is payable at arrival via UPI, cash, or card.
          </p>
        </section>

        {/* Term 4: Weather Policy */}
        <section className="bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-3 hover:border-accent/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <CloudSun size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-400 tracking-wide uppercase">Rule 4</span>
              <h2 className="text-lg sm:text-xl font-bold text-white">Weather Policy</h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed pl-1 sm:pl-13">
            Trips and water sports are subject to safe water and weather conditions. We reserve the right to delay, adjust the route, or reschedule sessions in the interest of guest safety.
          </p>
        </section>

        {/* Term 5: Liability */}
        <section className="bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-3 hover:border-accent/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-wide uppercase">Rule 5</span>
              <h2 className="text-lg sm:text-xl font-bold text-white">Liability Disclaimer</h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed pl-1 sm:pl-13">
            Mangrove Spot is not responsible for personal injury, loss of personal belongings, damage to electronics, or events beyond our reasonable control. Guests are advised to keep valuables and non-waterproof items safe.
          </p>
        </section>

        {/* Term 6: Conduct */}
        <section className="bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-3 hover:border-accent/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <Ban size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-400 tracking-wide uppercase">Rule 6</span>
              <h2 className="text-lg sm:text-xl font-bold text-white">Guest Conduct</h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed pl-1 sm:pl-13">
            Alcohol, narcotics/drugs, and disruptive or unsafe behavior are strictly prohibited on all boats, waterways, and premises. We reserve the right to refuse boarding or terminate a session without refund if conduct poses a risk to others.
          </p>
        </section>

        {/* Bottom Notice */}
        <div className="bg-accent/5 border border-accent/20 rounded-2xl p-5 text-xs text-muted-foreground leading-relaxed">
          For cancellations or changes, please also review our{" "}
          <Link href="/cancellation-policy" className="text-accent underline font-semibold">
            Cancellation &amp; Refund Policy
          </Link>
          {" "}and{" "}
          <Link href="/privacy-policy" className="text-accent underline font-semibold">
            Privacy Policy
          </Link>
          .
        </div>

        {/* Quick Links */}
        <div className="pt-4 flex flex-wrap justify-between items-center gap-4 text-xs text-muted-foreground border-t border-border">
          <div className="flex gap-4">
            <Link href="/cancellation-policy" className="hover:text-accent underline transition">
              Cancellation Policy
            </Link>
            <Link href="/privacy-policy" className="hover:text-accent underline transition">
              Privacy Policy
            </Link>
            <Link href="/faqs" className="hover:text-accent underline transition">
              FAQs
            </Link>
          </div>
          <Link href="/booking" className="text-accent font-semibold hover:underline">
            Proceed to Booking →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
