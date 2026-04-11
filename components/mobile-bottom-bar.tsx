'use client'

import { useEffect, useState } from 'react'
import { Phone, MessageCircle, BookOpen, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MobileBottomBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [showNumbers, setShowNumbers] = useState(false)

  const phoneNumbers = [
    "9496141619",
    "7561001268",
    "7510301168",
    "7510301438",
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleBooking = () => {
    const phoneNumber = "917561001268"

    const message = `Hello Mangrove Spot Adventures 🌿

I would like to make a booking.

Please share more details.`

    const encodedMessage = encodeURIComponent(message)

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    )
  }

  if (!isVisible) return null

  return (
    <>
      {/* Call Numbers Popup */}
      {showNumbers && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
          onClick={() => setShowNumbers(false)}
        >
          <div
            className="bg-background w-full max-w-md rounded-t-2xl p-6 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Contact Numbers
              </h3>
              <button onClick={() => setShowNumbers(false)}>
                <X className="text-white" />
              </button>
            </div>

            <div className="space-y-3">
              {phoneNumbers.map((number, index) => (
                <a
                  key={index}
                  href={`tel:${number}`}
                  onClick={() => setShowNumbers(false)}
                  className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold transition active:scale-95"
                >
                  <Phone size={18} />
                  {number}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/30 backdrop-blur-md border-t border-white/10 shadow-lg md:hidden">
        <div className="grid grid-cols-3 gap-2 p-3 max-w-md mx-auto">

          {/* Call Button */}
          <Button
            size="sm"
            onClick={() => setShowNumbers(true)}
            className="w-full bg-primary/80 hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center justify-center gap-2 shadow-md transition active:scale-95"
          >
            <Phone size={18} />
            <span className="text-xs font-semibold">Call</span>
          </Button>

          {/* WhatsApp */}
          <a
            href="https://wa.me/917561001268"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 shadow-md transition active:scale-95"
            >
              <MessageCircle size={18} />
              <span className="text-xs font-semibold">WhatsApp</span>
            </Button>
          </a>

          {/* Book */}
          <Button
            size="sm"
            onClick={handleBooking}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg flex items-center justify-center gap-2 shadow-md transition active:scale-95"
          >
            <BookOpen size={18} />
            <span className="text-xs font-semibold">Book</span>
          </Button>

        </div>
      </div>
    </>
  )
}
