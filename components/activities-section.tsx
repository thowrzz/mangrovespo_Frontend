// "use client"

// import Image from "next/image"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Clock, Loader2, Info } from "lucide-react"
// import { useActivities } from "@/hooks/useActivities"
// import { useCart } from "@/lib/cart-context"
// import { Activity } from "@/lib/api"
// import { toast } from "sonner"

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

// export function ActivitiesSection() {
//   const { activities, loading, error } = useActivities()
//   const { addItem } = useCart()
//   const router = useRouter()

//   const getImage = (activity: Activity) =>
//     activity.image_url || FALLBACK_IMAGES[activity.name] || "/combo.png"

//   const handleBookNow = (activity: Activity) => {
//     addItem(activity)
//     toast.success(`${activity.name} added!`, {
//       description: "Pick your date & slot on the booking page.",
//       action: { label: "View Booking", onClick: () => router.push("/booking") },
//     })
//     router.push("/booking")
//   }

//   const getPricingLabel = (activity: Activity): string => {
//     const isPerPerson = activity.pricing_type === "per_person"
//     const min         = activity.min_persons
//     const extra       = parseFloat(activity.extra_person_charge || "0")

//     if (isPerPerson) {
//       // per_person: base price already covers 1 person, extra charge for each additional
//       if (min > 1 && extra > 0) {
//         return `per person • min ${min} • +₹${extra.toLocaleString()} extra/person`
//       }
//       return `per person • min ${min} person${min !== 1 ? "s" : ""}`
//     } else {
//       // per_group: base price covers the group, extra charge per person beyond min
//       if (min > 1 && extra > 0) {
//         return `per group • min ${min} persons • +₹${extra.toLocaleString()}/extra person`
//       }
//       return `per group • min ${min} person${min !== 1 ? "s" : ""}`
//     }
//   }

//   return (
//     <section className="py-20 bg-background">
//       <div className="max-w-7xl mx-auto px-4">

//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-white mb-4">Our Adventures</h2>
//           <p className="text-lg text-muted-foreground mb-6">
//             Choose from our premium eco-adventure experiences.
//             Price offers available only for early bookings.
//           </p>
//           <div className="flex justify-center">
//             <div className="bg-accent/10 border border-accent/30 px-6 py-3 rounded-xl">
//               <div className="flex items-center gap-2 text-accent font-semibold justify-center">
//                 <Clock size={18} />
//                 Timings: 6:30 AM – 5:00 PM
//               </div>
//               <div className="text-sm text-muted-foreground mt-1">Closing Time: 6:30 PM</div>
//             </div>
//           </div>
//         </div>

//         {loading && (
//           <div className="flex justify-center items-center py-20">
//             <Loader2 className="animate-spin text-accent mr-2" size={28} />
//             <span className="text-muted-foreground">Loading activities...</span>
//           </div>
//         )}

//         {error && (
//           <div className="text-center py-20 text-muted-foreground">
//             <p>{error}</p>
//             <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Try Again</Button>
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
//             {activities.map((activity) => (
//               <div key={activity.id} className="bg-card rounded-2xl shadow-lg flex flex-col h-full overflow-hidden group">
//                 <div
//                   className="relative aspect-[4/3] cursor-pointer overflow-hidden"
//                   onClick={() => router.push(`/activities/${activity.id}`)}
//                 >
//                   <Image
//                     src={getImage(activity)}
//                     alt={activity.name}
//                     fill
//                     priority={activity.display_order === 1}
//                     sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
//                     className="object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   {activity.is_popular && (
//                     <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">Most Popular</Badge>
//                   )}
//                   {activity.requires_prebooking && (
//                     <Badge className="absolute top-4 left-4 bg-blue-600 text-white text-xs">Pre-book Only</Badge>
//                   )}
//                   <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                     <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">View Details</span>
//                   </div>
//                 </div>

//                 <div className="p-6 flex flex-col flex-grow">
//                   <h3 className="text-xl font-bold text-white mb-2">{activity.name}</h3>
//                   <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{activity.tagline}</p>
//                   <div className="text-sm text-muted-foreground mb-3">
//                     Duration: <span className="text-foreground font-medium">{activity.duration}</span>
//                   </div>
//                   <div className="mb-6">
//                     <p className="text-lg font-semibold text-accent">₹{parseFloat(activity.base_price).toLocaleString()}</p>
//                     <p className="text-xs text-muted-foreground">{getPricingLabel(activity)}</p>
//                   </div>
//                   <div className="mt-auto grid grid-cols-2 gap-2">
//                     <Button
//                       variant="outline"
//                       onClick={() => router.push(`/activities/${activity.id}`)}
//                       className="border-accent/40 text-accent hover:bg-accent/10 gap-1.5"
//                     >
//                       <Info size={14} /> Details
//                     </Button>
//                     <Button
//                       onClick={() => handleBookNow(activity)}
//                       className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
//                     >
//                       Book Now
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }
"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Loader2, Info, UserPlus } from "lucide-react"
import { useActivities } from "@/hooks/useActivities"
import { useCart } from "@/lib/cart-context"
import { Activity } from "@/lib/api"
import { toast } from "sonner"

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

export function ActivitiesSection() {
  const { activities, loading, error } = useActivities()
  const { addItem } = useCart()
  const router = useRouter()

  const getImage = (activity: Activity) =>
    activity.image_url || FALLBACK_IMAGES[activity.name] || "/combo.png"

  const handleBookNow = (activity: Activity) => {
    addItem(activity)
    toast.success(`${activity.name} added!`, {
      description: "Pick your date & slot on the booking page.",
      action: { label: "View Booking", onClick: () => router.push("/booking") },
    })
    router.push("/booking")
  }

  const getPricingLabel = (activity: Activity): string => {
    const isPerPerson = activity.pricing_type === "per_person"
    const min         = activity.min_persons

    if (isPerPerson) {
      return `per person • min ${min} person${min !== 1 ? "s" : ""}`
    } else {
      return `per group • up to ${min} person${min !== 1 ? "s" : ""}`
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Adventures</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Choose from our premium eco-adventure experiences.
            Price offers available only for early bookings.
          </p>
          <div className="flex justify-center">
            <div className="bg-accent/10 border border-accent/30 px-6 py-3 rounded-xl">
              <div className="flex items-center gap-2 text-accent font-semibold justify-center">
                <Clock size={18} />
                Timings: 6:30 AM – 5:00 PM
              </div>
              <div className="text-sm text-muted-foreground mt-1">Closing Time: 6:30 PM</div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-accent mr-2" size={28} />
            <span className="text-muted-foreground">Loading activities...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-muted-foreground">
            <p>{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {activities.map((activity) => {
              const extraCharge = parseFloat(activity.extra_person_charge || "0")
              const hasExtra    = extraCharge > 0

              return (
                <div key={activity.id} className="bg-card rounded-2xl shadow-lg flex flex-col h-full overflow-hidden group">

                  {/* Image */}
                  <div
                    className="relative aspect-[4/3] cursor-pointer overflow-hidden"
                    onClick={() => router.push(`/activities/${activity.id}`)}
                  >
                    <Image
                      src={getImage(activity)}
                      alt={activity.name}
                      fill
                      priority={activity.display_order === 1}
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {activity.is_popular && (
                      <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                        Most Popular
                      </Badge>
                    )}
                    {activity.requires_prebooking && (
                      <Badge className="absolute top-4 left-4 bg-blue-600 text-white text-xs">
                        Pre-book Only
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">{activity.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{activity.tagline}</p>

                    <div className="text-sm text-muted-foreground mb-3">
                      Duration: <span className="text-foreground font-medium">{activity.duration}</span>
                    </div>

                    {/* ── Pricing block ─────────────────────── */}
                    <div className="mb-6 flex flex-col gap-1">
                      <p className="text-lg font-semibold text-accent">
                        ₹{parseFloat(activity.base_price).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {getPricingLabel(activity)}
                      </p>

                      {/* ✅ Extra charge line — only shown when set */}
                      {hasExtra && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <UserPlus size={11} className="text-yellow-400 shrink-0" />
                          <p className="text-xs text-yellow-400 font-medium">
                            +₹{extraCharge.toLocaleString()} per extra person
                            <span className="text-yellow-400/60 font-normal">
                              {" "}(beyond {activity.min_persons})
                            </span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-auto grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => router.push(`/activities/${activity.id}`)}
                        className="border-accent/40 text-accent hover:bg-accent/10 gap-1.5"
                      >
                        <Info size={14} /> Details
                      </Button>
                      <Button
                        onClick={() => handleBookNow(activity)}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}