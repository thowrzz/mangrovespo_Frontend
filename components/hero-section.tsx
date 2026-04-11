'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, MessageCircle, Instagram,CalendarDays  } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showCallPopup, setShowCallPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const router = useRouter()  // ← add this

  const phoneNumbers = [
    "9496141619",
    "7561001268",
    "7510301168",
    "7510301438",
  ]

  const whatsappNumber = "917561001268"

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
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
    if (showCallPopup) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCallPopup])

  /* ================= WHATSAPP ================= */
  const handleWhatsApp = () => {
    const message = `Hello Mangrove Spot Adventures 🌿

I would like to make a booking.

Please share more details.`

    const encodedMessage = encodeURIComponent(message)

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    )
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
          <div
            ref={popupRef}
            className="bg-background w-full max-w-sm rounded-2xl p-6 shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Contact Numbers
              </h3>
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          {/* ===== LOGO ===== */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Mangrove Spot Logo"
              width={45}
              height={45}
              priority
            />
<Image
  src="/text.svg"
  alt="Mangrove Spot Logo"
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
                className="block w-full text-left text-white hover:text-accent"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/bg1.png"
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="space-y-6 max-w-3xl">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              Explore the Mangrove Spot Adventures
            </h1>

            <p className="text-lg sm:text-xl text-gray-200">
              Kayaking • Country Boat Ride • Stand Up Paddle • Coracle Ride • ATV Ride • High Speed Engine Boat Ride
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">

            <Button
  size="lg"
  onClick={() => router.push('/booking')}
  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-8"
>
  <CalendarDays className="mr-2" size={18} />
  Book Now
</Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowCallPopup(true)}
                className="border-white text-white hover:bg-white hover:text-black rounded-full px-8"
              >
                <Phone className="mr-2" size={18} />
                Call Now
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* Instagram */}
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
