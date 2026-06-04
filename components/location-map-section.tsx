export function LocationMapSection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            How to Reach MangroveSpot, Nedungolam
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We’re at Nedungolam, Paravur, Kollam — about 30 km from Kollam city and 45 km from Varkala.<br />
            Parking available on-site. Nearest landmark: Nedungolam bridge.
          </p>
        </div>

        {/* Map Embed */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-border w-full h-[400px] md:h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.3920004229813!2d76.67860757477827!3d8.843046791211048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05e5acef2dd06d%3A0x18ed01d46c82251a!2sMangrove%20Spot!5e0!3m2!1sen!2sin!4v1780131874002!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location"
          />
        </div>

        {/* Address / CTA below map */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          {/* Left: address + rating */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
              MangroveSpot – Nedungolam, Paravur, Kollam, Kerala 691334
            </p>

            {/* Rating badge */}
            <a
              href="https://www.google.com/maps/place/Mangrove+Spot/@8.843046,76.678608,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Google coloured G */}
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {/* Stars */}
              <span className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="h-3 w-3 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </span>
              <span className="text-xs font-semibold text-gray-700">4.9</span>
              <span className="text-xs text-gray-400">(5K+)</span>
            </a>
          </div>

          {/* Right: Get Directions */}
          <a
            href="https://maps.google.com/?q=Mangrove+Spot+Kerala+India"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
          >
            Open in Google Maps →
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}