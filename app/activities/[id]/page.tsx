
// "use client"

// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import {
//   ArrowLeft, Clock, Users, IndianRupee,
//   CheckCircle, Loader2, CalendarDays, Star
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { api, ActivityDetail } from "@/lib/api"
// import { BookingModal } from "@/components/booking-modal"

// const FALLBACK_IMAGES: Record<string, string> = {
//   "Kayaking": "/Mangrove-Kayaking.jpg",
//   "Coracle Ride": "/Coracle-Ride.jpg",
//   "Country Boat Ride": "/Country-Boat.png",
//   "Bamboo Rafting": "/Country-Boat.png",
//   "Zip Line": "/combo.png",
//   "ATV Ride": "/ATV-Ride.jpg",
//   "Archery": "/arch.jpg",
//   "Fishing": "/stand.jpg",
//   "Nature Walk": "/Mangrove-Kayaking.jpg",
//   "Mud Activities": "/rain1.jpg",
//   "Tug of War": "/student-offer.jpg",
//   "Cultural Performance": "/combo.png",
// }

// const CATEGORY_LABELS: Record<string, string> = {
//   water:     "🚣 Water Activity",
//   thrill:    "⚡ Thrill Activity",
//   skill:     "🎯 Skill Activity",
//   land:      "🌿 Land Activity",
//   group_fun: "👥 Group Activity",
//   cultural:  "🎭 Cultural Experience",
// }

// export default function ActivityDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const [activity, setActivity] = useState<ActivityDetail | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(false)
//   const [bookingOpen, setBookingOpen] = useState(false)

//   // useParams() returns string | string[] — normalise to a plain string
//   const rawId = params?.id
//   const id = Array.isArray(rawId) ? rawId[0] : rawId

//   useEffect(() => {
//     if (!id) return
//     const numericId = Number(id)
//     if (isNaN(numericId)) { setError(true); setLoading(false); return }

//     api.activities.detail(numericId)
//       .then(setActivity)
//       .catch(() => setError(true))
//       .finally(() => setLoading(false))
//   }, [id])

//   if (loading) return (
//     <div className="min-h-screen bg-background flex items-center justify-center">
//       <Loader2 className="animate-spin text-accent mr-2" size={32} />
//       <span className="text-muted-foreground">Loading activity...</span>
//     </div>
//   )

//   if (error || !activity) return (
//     <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
//       <p className="text-muted-foreground text-lg">Activity not found.</p>
//       <Button onClick={() => router.push("/")} variant="outline">
//         ← Back to Home
//       </Button>
//     </div>
//   )

//   const image = activity.image_url || FALLBACK_IMAGES[activity.name] || "/combo.png"
//   const price = parseFloat(activity.base_price)

//   return (
//     <main className="min-h-screen bg-background">

//       <div className="relative w-full h-[50vh] md:h-[65vh]">
//         <Image src={image} alt={activity.name} fill priority className="object-cover" />
//         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

//         <button
//           onClick={() => router.back()}
//           className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm transition-all text-sm font-medium"
//         >
//           <ArrowLeft size={16} />
//           Back
//         </button>

//         <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
//           {activity.is_popular && (
//             <Badge className="bg-accent text-accent-foreground px-3 py-1">
//               <Star size={12} className="mr-1" fill="currentColor" />
//               Most Popular
//             </Badge>
//           )}
//           {activity.requires_prebooking && (
//             <Badge className="bg-blue-600 text-white px-3 py-1">
//               Pre-book Only
//             </Badge>
//           )}
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-10">
//           <Badge variant="outline" className="text-accent border-accent/50 mb-3 text-xs">
//             {CATEGORY_LABELS[activity.category] || activity.category}
//           </Badge>
//           <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
//             {activity.name}
//           </h1>
//           <p className="text-white/70 text-base md:text-lg mt-2">{activity.tagline}</p>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

//         <div className="md:col-span-2 flex flex-col gap-10">
//           <section>
//             <h2 className="text-xl font-bold text-white mb-3">About This Activity</h2>
//             <p className="text-muted-foreground leading-relaxed text-[15px]">
//               {activity.description}
//             </p>
//           </section>

//           {activity.slots && activity.slots.length > 0 && (
//             <section>
//               <h2 className="text-xl font-bold text-white mb-3">Available Time Slots</h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {activity.slots.map(slot => (
//                   <div
//                     key={slot.id}
//                     className="bg-card border border-border rounded-xl p-4 text-center hover:border-accent/50 transition-colors"
//                   >
//                     <p className="text-accent font-bold text-lg">{slot.time}</p>
//                     <p className="text-white text-sm mt-1 font-medium">{slot.label}</p>
//                     <p className="text-muted-foreground text-xs mt-1">
//                       Up to {slot.capacity} persons
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}

//           {activity.rules_text && (
//             <section>
//               <h2 className="text-xl font-bold text-white mb-3">Rules & Safety Guidelines</h2>
//               <ul className="flex flex-col gap-3">
//                 {activity.rules_text
//                   .split(".")
//                   .filter(r => r.trim().length > 3)
//                   .map((rule, i) => (
//                     <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
//                       <CheckCircle size={16} className="text-accent mt-0.5 shrink-0" />
//                       <span>{rule.trim()}.</span>
//                     </li>
//                   ))}
//               </ul>
//             </section>
//           )}
//         </div>

//         <div className="md:col-span-1">
//           <div className="sticky top-6 bg-card border border-border rounded-2xl p-6 flex flex-col gap-5 shadow-xl">
//             <div>
//               <p className="text-muted-foreground text-sm">Starting from</p>
//               <div className="flex items-baseline gap-1 mt-1">
//                 <IndianRupee size={20} className="text-accent mb-1" />
//                 <span className="text-4xl font-bold text-accent">
//                   {price.toLocaleString()}
//                 </span>
//               </div>
//               <p className="text-xs text-muted-foreground mt-1">
//                 {activity.pricing_type === "per_person" ? "per person" : "per group"}
//               </p>
//             </div>

//             <hr className="border-border" />

//             <div className="flex flex-col gap-3 text-sm">
//               <div className="flex items-center gap-3 text-muted-foreground">
//                 <Clock size={15} className="text-accent shrink-0" />
//                 <span>Duration: <span className="text-white font-medium">{activity.duration}</span></span>
//               </div>
//               <div className="flex items-center gap-3 text-muted-foreground">
//                 <Users size={15} className="text-accent shrink-0" />
//                 <span>{activity.min_persons}–{activity.max_persons} persons</span>
//               </div>
//               <div className="flex items-center gap-3 text-muted-foreground">
//                 <CalendarDays size={15} className="text-accent shrink-0" />
//                 <span>Open: 6:30 AM – 5:00 PM</span>
//               </div>
//             </div>

//             <hr className="border-border" />

//             <Button
//               onClick={() => setBookingOpen(true)}
//               className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base py-6"
//             >
//               Book Now
//             </Button>

//             <p className="text-xs text-muted-foreground text-center">
//               Secure payment via Razorpay.<br />
//               Confirmation sent to your email.
//             </p>
//           </div>
//         </div>
//       </div>

//       <BookingModal
//         activity={activity}
//         open={bookingOpen}
//         onClose={() => setBookingOpen(false)}
//       />
//     </main>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import {
  ArrowLeft, Clock, Users, IndianRupee,
  CheckCircle, Loader2, CalendarDays, Star, ShieldCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { api, ActivityDetail } from "@/lib/api"
import { BookingModal } from "@/components/booking-modal"

const FALLBACK_IMAGES: Record<string, string> = {
  "Kayaking": "/Mangrove-Kayaking.jpg",
  "Coracle Ride": "/Coracle-Ride.jpg",
  "Country Boat Ride": "/Country-Boat.png",
  "Bamboo Rafting": "/Country-Boat.png",
  "Zip Line": "/combo.png",
  "ATV Ride": "/ATV-Ride.jpg",
  "Archery": "/arch.jpg",
  "Fishing": "/stand.jpg",
  "Nature Walk": "/Mangrove-Kayaking.jpg",
  "Mud Activities": "/rain1.jpg",
  "Tug of War": "/student-offer.jpg",
  "Cultural Performance": "/combo.png",
}

const CATEGORY_LABELS: Record<string, string> = {
  water: "🚣 Water Activity",
  thrill: "⚡ Thrill Activity",
  skill: "🎯 Skill Activity",
  land: "🌿 Land Activity",
  group_fun: "👥 Group Activity",
  cultural: "🎭 Cultural Experience",
}

export default function ActivityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activity, setActivity] = useState<ActivityDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  const rawId = params?.id
  const id = Array.isArray(rawId) ? rawId[0] : rawId

  useEffect(() => {
    if (!id) return
    const numericId = Number(id)
    if (isNaN(numericId)) {
      setError(true)
      setLoading(false)
      return
    }

    api.activities.detail(numericId)
      .then(setActivity)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="animate-spin text-accent mr-2" size={32} />
      <span className="text-muted-foreground">Loading activity...</span>
    </div>
  )

  if (error || !activity) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground text-lg">Activity not found.</p>
      <Button onClick={() => router.push("/")} variant="outline">
        ← Back to Home
      </Button>
    </div>
  )

  const image = activity.image_url || FALLBACK_IMAGES[activity.name] || "/combo.png"
  const price = parseFloat(activity.base_price)
  const childPrice = activity.child_price ? parseFloat(activity.child_price) : null

  return (
    <main className="min-h-screen bg-background">
      <div className="relative w-full h-[50vh] md:h-[65vh]">
        <Image
          src={image}
          alt={activity.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm transition-all text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
          {activity.is_popular && (
            <Badge className="bg-accent text-accent-foreground px-3 py-1">
              <Star size={12} className="mr-1" fill="currentColor" />
              Most Popular
            </Badge>
          )}
          {activity.requires_prebooking && (
            <Badge className="bg-blue-600 text-white px-3 py-1">
              Pre-book Only
            </Badge>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-10">
          <Badge
            variant="outline"
            className="text-accent border-accent/50 mb-3 text-xs"
          >
            {CATEGORY_LABELS[activity.category] || activity.category}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {activity.name}
          </h1>
          <p className="text-white/70 text-base md:text-lg mt-2">
            {activity.tagline}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-10">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              About This Activity
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              {activity.description}
            </p>
          </section>

          {activity.rules && activity.rules.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={18} className="text-accent shrink-0" />
                <h2 className="text-xl font-bold text-white">
                  Rules & Safety Guidelines
                </h2>
              </div>

              <ul className="flex flex-col gap-3">
                {activity.rules.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 bg-card border border-border rounded-xl px-4 py-3"
                  >
                    <CheckCircle
                      size={15}
                      className="text-accent mt-0.5 shrink-0"
                    />
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      {item.rule}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-6 bg-card border border-border rounded-2xl p-6 flex flex-col gap-5 shadow-xl">
            <div>
              <p className="text-muted-foreground text-sm">Starting from</p>
              <div className="flex items-baseline gap-1 mt-1">
                <IndianRupee size={20} className="text-accent mb-1" />
                <span className="text-4xl font-bold text-accent">
                  {price.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {activity.pricing_type === "per_person" ? "per adult" : "per group"}
              </p>

              {childPrice !== null && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Children:{" "}
                  <span className="text-white font-medium">
                    ₹{childPrice.toLocaleString()} per child
                  </span>
                </p>
              )}
            </div>

            <hr className="border-border" />

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock size={15} className="text-accent shrink-0" />
                <span>
                  Duration:{" "}
                  <span className="text-white font-medium">
                    {activity.duration}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Users size={15} className="text-accent shrink-0" />
                <span>
                  {activity.min_persons}–{activity.max_persons} persons
                </span>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <CalendarDays size={15} className="text-accent shrink-0" />
                <span>Open: 6:30 AM – 5:00 PM</span>
              </div>
            </div>

            <hr className="border-border" />

            <Button
              onClick={() => setBookingOpen(true)}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base py-6"
            >
              Book with 50% Advance
            </Button>

            <div className="bg-accent/10 border border-accent/20 rounded-xl px-4 py-3 flex flex-col gap-1">
              <p className="text-accent text-xs font-semibold text-center">
                💳 Pay only 50% now
              </p>
              <p className="text-muted-foreground text-xs text-center leading-relaxed">
                Remaining 50% collected at arrival.
                <br />
                Secure payment via Razorpay.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        activity={activity}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </main>
  )
}