import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ShieldCheck, Lock, UserCheck, EyeOff, Database, Mail, Phone, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | MangroveSpot Adventures",
  description:
    "Learn how MangroveSpot protects your personal information, booking details, and privacy. We value your trust and maintain strict data security.",
  alternates: { canonical: "https://www.mangrovespot.in/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | MangroveSpot Adventures",
    description: "MangroveSpot values your trust. This Privacy Policy explains how we handle your information.",
    url: "https://www.mangrovespot.in/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
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
            <ShieldCheck size={14} />
            <span>Official Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Mangrove Spot values your trust. This Privacy Policy explains how we collect, handle, and safeguard your personal information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-8">
        {/* Section 1 */}
        <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-accent/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
              <Database size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">1. Data We Collect</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            When you interact with our website or book an experience at Mangrove Spot, we may collect the following information:
          </p>
          <ul className="space-y-2.5 text-sm text-white/90 pl-2">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span><strong>Personal Identification:</strong> Name, contact number, and email address provided during booking.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span><strong>Payment Details:</strong> Processed securely and tokenized through our RBI-compliant payment gateway partners (e.g., Razorpay). We do not store raw debit/credit card numbers or CVV on our servers.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span><strong>Optional Preferences:</strong> Special requests, extra equipment requests, or dietary/timing preferences.</span>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-accent/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <UserCheck size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">2. How We Use It</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your information is used strictly to provide a seamless and secure adventure experience:
          </p>
          <ul className="space-y-2.5 text-sm text-white/90 pl-2">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <span>Confirming reservations and sending booking confirmations, reference codes, and schedule updates via email or SMS/WhatsApp.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <span>Improving our guest experience, boating logistics, and safety management.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <span>Sharing updates or promotional seasonal offers (only if you explicitly opt-in).</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-accent/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <EyeOff size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">3. Third-Party Sharing</h2>
          </div>
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 text-cyan-200 text-sm font-medium">
            🔒 We do NOT sell, rent, or trade your personal data to any third parties for advertising or marketing.
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Data is shared only with:
          </p>
          <ul className="space-y-2.5 text-sm text-white/90 pl-2">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><strong>Authorized Payment Gateways:</strong> To securely initiate and verify online transactions.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><strong>Direct Service Providers:</strong> Verified boat captains, certified guides, and ground staff strictly on a need-to-know basis for booking execution and guest safety.</span>
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-accent/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Lock size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">4. Security</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We use industry-standard 256-bit SSL (Secure Sockets Layer) encryption for all website communications and follow secure cloud storage protocols to protect against unauthorized access, loss, or alteration.
          </p>
        </section>

        {/* Section 5 */}
        <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-accent/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">5. Your Rights</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            You maintain full rights over your data. You may request correction or deletion of your personal data at any time by contacting our support desk.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <a
              href="mailto:mangrovespotcare@gmail.com"
              className="inline-flex items-center gap-1.5 text-accent hover:underline"
            >
              <Mail size={14} />
              mangrovespotcare@gmail.com
            </a>
            <a
              href="tel:9496141619"
              className="inline-flex items-center gap-1.5 text-accent hover:underline"
            >
              <Phone size={14} />
              +91 9496141619 / 7561001268
            </a>
          </div>
        </section>

        {/* Navigation Quick Links */}
        <div className="pt-4 flex flex-wrap justify-between items-center gap-4 text-xs text-muted-foreground border-t border-border">
          <div className="flex gap-4">
            <Link href="/terms-and-conditions" className="hover:text-accent underline transition">
              Terms &amp; Conditions
            </Link>
            <Link href="/cancellation-policy" className="hover:text-accent underline transition">
              Cancellation Policy
            </Link>
            <Link href="/faqs" className="hover:text-accent underline transition">
              FAQs
            </Link>
          </div>
          <Link href="/booking" className="text-accent font-semibold hover:underline">
            Go to Booking →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
