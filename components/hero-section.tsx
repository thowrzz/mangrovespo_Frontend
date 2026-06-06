'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, Instagram, CalendarDays, BookMarked } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showCallPopup, setShowCallPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { user } = useAuth()

  const phoneNumbers = [
    "9496141619",
    "7561001268",
    "7510301168",
    "7510301438",
  ]

  const whatsappNumber = "917561001268"

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* ================= CLOSE POPUP OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowCallPopup(false)
      }
    }
    if (showCallPopup) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCallPopup])

  /* ================= WHATSAPP ================= */
  const handleWhatsApp = () => {
    const message = `Hello MangroveSpot 🌿\n\nI'd like to know more about your activities and book a slot.\n\nLocation: Nedungolam, Paravur, Kollam, Kerala\n\nPlease share available dates and packages. Thank you!`
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const navItems = [
    { href: '#activities', label: 'Activities' },
    { href: '#why-us', label: 'Why Us' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#reviews', label: 'Reviews' },
  ]

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* ================= CALL POPUP ================= */}
      {showCallPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div ref={popupRef} className="bg-background w-full max-w-sm rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Contact Numbers</h3>
              <button onClick={() => setShowCallPopup(false)}>
                <X className="text-white" />
              </button>
            </div>
            <div className="space-y-3">
              {phoneNumbers.map((number) => (
                <a
                  key={number}
                  href={`tel:${number}`}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold transition"
                >
                  <Phone size={18} />
                  {number}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= NAVBAR ================= */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Mangrove Spot Adventures logo" width={45} height={45} priority />
            <Image
              src="/text.svg"
              alt="MangroveSpot – Mangrove Kayaking in Kollam Kerala"
              width={150}
              height={50}
              priority
              style={{ width: '150px', height: 'auto' }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-accent transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}

            {/* Blog link */}
            <Link
              href="/blog"
              className="text-white hover:text-accent transition-colors font-medium"
            >
              Blog
            </Link>

            {/* My Bookings — desktop, only when logged in */}
            {user && (
              <button
                onClick={() => router.push('/my-bookings')}
                className="flex items-center gap-1.5 text-accent hover:text-accent/70 transition-colors font-medium text-sm border border-accent/30 hover:border-accent/60 px-3 py-1.5 rounded-full"
              >
                <BookMarked size={14} />
                My Bookings
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 p-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-white hover:text-accent py-1"
              >
                {item.label}
              </button>
            ))}

            {/* Blog link — mobile */}
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-white hover:text-accent py-1 font-medium"
            >
              Blog
            </Link>

            {/* My Bookings — mobile, only when logged in */}
            {user && (
              <button
                onClick={() => { router.push('/my-bookings'); setMobileMenuOpen(false) }}
                className="flex items-center gap-2 w-full text-left text-accent hover:text-accent/70 font-semibold py-2 border-t border-border/40 mt-1 pt-3"
              >
                <BookMarked size={15} />
                My Bookings
              </button>
            )}
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section role="banner" aria-label="MangroveSpot hero – Mangrove Adventures in Kollam Kerala" className="relative h-screen w-full overflow-hidden">

        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
            poster="/bg1.png"
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              Mangrove Kayaking, ATV Rides &amp; Water Sports near Varkala &amp; Kollam, Kerala
            </h1>
            <p className="text-lg sm:text-xl text-gray-200">
              Kayaking · ATV Ride · Coracle Ride · Country Boat · SUP · Speed Boat<br />
              Near Varkala · Paravur Lake · Kollam | Open Daily 6:30 AM – 6:30 PM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                onClick={() => router.push('/booking')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-8"
              >
                <CalendarDays className="mr-2" size={18} />
                Book Now – Save 25% Online
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowCallPopup(true)}
                className="border-white text-white hover:bg-white hover:text-black rounded-full px-8"
              >
                <Phone className="mr-2" size={18} />
                Call to Ask a Question
              </Button>
            </div>
          </div>
        </div>
      </section>
{/* WhatsApp FAB */}
<button
  onClick={handleWhatsApp}
  className="fixed right-4 bottom-40 z-50 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-xl hover:scale-110 transition"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="w-6 h-6 fill-white"
  >
    <path d="M19.11 17.21c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.12-.41-2.13-1.3-.79-.71-1.32-1.58-1.47-1.85-.16-.27-.02-.41.12-.55.13-.13.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.45-.82-1.98-.22-.53-.44-.45-.6-.46h-.51c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22s.96 2.57 1.09 2.75c.13.18 1.88 2.87 4.56 4.03.64.27 1.14.43 1.53.55.64.2 1.22.17 1.68.1.51-.08 1.58-.64 1.8-1.25.22-.61.22-1.13.16-1.25-.07-.11-.25-.18-.52-.32zM16.01 3C8.83 3 3 8.82 3 16c0 2.54.74 5.02 2.13 7.15L3 29l5.99-2.08A12.93 12.93 0 0 0 16.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.1 0-4.16-.57-5.96-1.65l-.43-.25-3.56 1.24 1.17-3.47-.28-.45A10.63 10.63 0 0 1 5.33 16c0-5.88 4.79-10.67 10.68-10.67 2.85 0 5.53 1.11 7.54 3.12A10.6 10.6 0 0 1 26.67 16c0 5.88-4.79 10.67-10.66 10.67z" />
  </svg>
</button>


      {/* Instagram FAB */}
      <a
        href="https://instagram.com/mangrovespot"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-20 z-50 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-4 rounded-full shadow-xl hover:scale-110 transition"
      >
        <Instagram className="text-white w-6 h-6" />
      </a>
    </>
  )
}