'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'


export function OfferPopup() {
  const [isVisible, setIsVisible] = useState(false)

  /* Show popup after 1.5s on every page load / refresh */
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleBookNow = () => {
    handleClose()
    window.open('https://wa.me/917561001268?text=Hi%2C%20I%20want%20to%20book%20the%20World%20Mangrove%20Day%20Kayaking%20offer!', '_blank')
  }

  if (!isVisible) return null

  return (
    /* Backdrop – click outside to close */
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={handleClose}
    >
      {/* Card wrapper – stops backdrop click from bubbling */}
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── CLOSE BUTTON (always visible, top-right) ── */}
        <button
          onClick={handleClose}
          aria-label="Close offer"
          className="absolute top-2.5 right-2.5 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* ── POSTER IMAGE ── */}
        {/* Save your poster as /public/world-mangrove-day.jpg */}
        <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="./MD3.jpeg"
            alt="World Mangrove Day – Special 100rs Kayaking offer on July 26"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── BOOK NOW BUTTON (overlaid at the bottom) ── */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <button
            onClick={handleBookNow}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-green-900 shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
              boxShadow: '0 4px 18px rgba(34,197,94,0.5)',
            }}
          >
            🌿 Book Your Spot Now
          </button>
          <button
            onClick={handleClose}
            className="w-full mt-2 py-1.5 text-white/70 text-xs font-medium hover:text-white transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
