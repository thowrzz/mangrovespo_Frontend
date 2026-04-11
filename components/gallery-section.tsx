'use client'
import Image from 'next/image'
// const galleryImages = [
//   {
//     id: 1,
//     src: '/gallery/gallery-1.jpg',
//     alt: 'Kayaking group in mangrove forest',
//   },
//   {
//     id: 2,
//     src: '/gallery/gallery-2.jpg',
//     alt: 'Water reflection in mangrove area',
//   },
//   {
//     id: 3,
//     src: '/gallery/gallery-3.jpg',
//     alt: 'Happy adventurers on paddleboards',
//   },
//   {
//     id: 4,
//     src: '/gallery/gallery-4.jpg',
//     alt: 'Mangrove forest canopy',
//   },
//   {
//     id: 5,
//     src: '/gallery/gallery-5.jpg',
//     alt: 'Sunset over tropical waterway',
//   },
//   {
//     id: 6,
//     src: '/gallery/gallery-6.jpg',
//     alt: 'Professional guide with tourists',
//   },
// ]
const galleryImages = [
  {
    id: 1,
    src: '/con1.png',
    alt: 'Kayaking in Kerala mangrove backwaters',
  },
  {
    id: 2,
    src: '/ATV-Ride.jpg',
    alt: 'Traditional Kerala country boat in backwaters',
  },
  {
    id: 3,
    src: '/BumperSofaRide1.jpg',
    alt: 'Backwater cruise surrounded by coconut trees',
  },
  {
    id: 4,
    src: '/arch.jpg',
    alt: 'Sunrise over Kerala tropical waterway',
  },
  {
    id: 5,
    src: '/stand.jpg',
    alt: 'Coracle ride experience in calm waters',
  },
  {
    id: 6,
    src: '/hq.png',
    alt: 'ATV off-road adventure near riverside',
  },
]


export function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Adventure Gallery
          </h2>
          <p className="text-lg text-muted-foreground">
            Glimpses of unforgettable moments in paradise
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-lg h-64"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
