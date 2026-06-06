/**
 * JsonLd.tsx
 * Renders structured data (JSON-LD) for MangroveSpot.
 * Targets: LocalBusiness, TouristAttraction, FAQPage schema types.
 * No UI rendered — only a <script> tag for search engines.
 */
export function JsonLd() {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'LocalBusiness'],
    name: 'Mangrove Spot',
    description:
      'Kayaking, ATV rides, coracle rides, backwater tours and water sports near Varkala and Paravur Lake, Kollam, Kerala.',
    url: 'https://www.mangrovespot.in',
    logo: 'https://www.mangrovespot.in/logo.png',
    image: 'https://www.mangrovespot.in/og-image.jpg',
    telephone: ['+919496141619', '+917561001268', '+917510301168', '+917510301438'],
    email: 'mangrovespotcare@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nedungolam',
      addressLocality: 'Paravur',
      addressRegion: 'Kollam, Kerala',
      postalCode: '691334',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 8.843046,
      longitude: 76.678608,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '06:30',
        closes: '18:30',
      },
    ],
    openingHours: 'Mo-Su 06:30-18:30',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card',
    sameAs: [
      'https://instagram.com/mangrovespot',
      'https://www.google.com/maps/place/Mangrove+Spot/@8.843046,76.678608,17z',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '5332',
      bestRating: '5',
    },
    hasMap: 'https://maps.google.com/?q=Mangrove+Spot+Kerala',
    touristType: ['Adventure tourists', 'Family tourists', 'Nature tourists'],
    areaServed: ['Varkala', 'Kollam', 'Paravur', 'Thiruvananthapuram', 'Nedungolam'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'MangroveSpot Activities',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Mangrove Kayaking' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Coracle Ride' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Country Boat Ride' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Stand-Up Paddleboarding' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'ATV Ride' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'High-Speed Engine Boat Ride' },
        },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where exactly is MangroveSpot located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MangroveSpot is at Nedungolam, Paravur, Kollam, Kerala — PIN 691334. About 30 km from Kollam city centre and 45 km from Varkala. Parking is available on-site.',
        },
      },
      {
        '@type': 'Question',
        name: 'What activities are available at MangroveSpot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We run six activity types: Kayaking, Coracle Ride, Country Boat Ride, Stand-Up Paddleboarding (SUP), ATV Ride, and High-Speed Engine Boat Ride. Combo packages are also available.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are MangroveSpot opening hours?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MangroveSpot is open every day from 6:30 AM to 6:30 PM. Last entry for activities is 5:00 PM. We operate on public holidays and weekends.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to pre-book or can I walk in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Walk-ins are welcome when slots are available. However, online pre-booking gives you a confirmed slot and a 25% discount on every activity. Walk-in visitors pay the full rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the online booking payment work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You pay 50% of the activity cost during online booking to secure your slot. The remaining 50% is paid on the day of your visit at MangroveSpot. We accept UPI, cards, and net banking.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it safe? Are life jackets provided?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. ISI-approved life jackets are provided to every participant before entering the water, including children. All water-based activities are led by trained and licensed guides.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is MangroveSpot suitable for families with children?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We regularly host families with children from age 5 upward. Coracle and country boat rides are especially suitable for younger children. No swimming ability or prior experience required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I visit MangroveSpot during monsoon season?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We operate year-round. During monsoon (June–September), the mangroves are lush green and particularly vivid. If the waterway is unsafe due to heavy rain, we reschedule or provide a full refund.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you accommodate school and college groups?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. MangroveSpot regularly hosts school nature trips and college excursions. We have handled groups of 50+ participants. Contact us on WhatsApp or call to discuss group pricing and scheduling.',
        },
      },
      {
        '@type': 'Question',
        name: 'How far is MangroveSpot from Kollam, Varkala, and Thiruvananthapuram?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MangroveSpot is approximately 30 km from Kollam city (35–40 min drive), 30 km from Varkala (40 min), and 65 km from Thiruvananthapuram (75 min). It is a viable half-day trip from any of these locations.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
