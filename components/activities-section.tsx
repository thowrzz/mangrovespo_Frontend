
// "use client"

// import Image from "next/image"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Clock, Loader2, Info, UserPlus } from "lucide-react"
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

//     if (isPerPerson) {
//       return `per person • min ${min} person${min !== 1 ? "s" : ""}`
//     } else {
//       return `per group • up to ${min} person${min !== 1 ? "s" : ""}`
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
//             <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
//               Try Again
//             </Button>
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
//             {activities.map((activity) => {
//               const extraCharge = parseFloat(activity.extra_person_charge || "0")
//               const hasExtra    = extraCharge > 0

//               return (
//                 <div key={activity.id} className="bg-card rounded-2xl shadow-lg flex flex-col h-full overflow-hidden group">

//                   {/* Image */}
//                   <div
//                     className="relative aspect-[4/3] cursor-pointer overflow-hidden"
//                     onClick={() => router.push(`/activities/${activity.id}`)}
//                   >
//                     <Image
//                       src={getImage(activity)}
//                       alt={activity.name}
//                       fill
//                       priority={activity.display_order === 1}
//                       sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
//                       className="object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                     {activity.is_popular && (
//                       <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
//                         Most Popular
//                       </Badge>
//                     )}
//                     {activity.requires_prebooking && (
//                       <Badge className="absolute top-4 left-4 bg-blue-600 text-white text-xs">
//                         Pre-book Only
//                       </Badge>
//                     )}
//                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                       <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
//                         View Details
//                       </span>
//                     </div>
//                   </div>

//                   {/* Card Body */}
//                   <div className="p-6 flex flex-col flex-grow">
//                     <h3 className="text-xl font-bold text-white mb-2">{activity.name}</h3>
//                     <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{activity.tagline}</p>

//                     <div className="text-sm text-muted-foreground mb-3">
//                       Duration: <span className="text-foreground font-medium">{activity.duration}</span>
//                     </div>

//                     {/* ── Pricing block ─────────────────────── */}
//                     <div className="mb-6 flex flex-col gap-1">
//                       <p className="text-lg font-semibold text-accent">
//                         ₹{parseFloat(activity.base_price).toLocaleString()}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {getPricingLabel(activity)}
//                       </p>

//                       {/* ✅ Extra charge line — only shown when set */}
//                       {hasExtra && (
//                         <div className="flex items-center gap-1.5 mt-1">
//                           <UserPlus size={11} className="text-yellow-400 shrink-0" />
//                           <p className="text-xs text-yellow-400 font-medium">
//                             +₹{extraCharge.toLocaleString()} per extra person
//                             <span className="text-yellow-400/60 font-normal">
//                               {" "}(beyond {activity.min_persons})
//                             </span>
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     {/* Buttons */}
//                     <div className="mt-auto grid grid-cols-2 gap-2">
//                       <Button
//                         variant="outline"
//                         onClick={() => router.push(`/activities/${activity.id}`)}
//                         className="border-accent/40 text-accent hover:bg-accent/10 gap-1.5"
//                       >
//                         <Info size={14} /> Details
//                       </Button>
//                       <Button
//                         onClick={() => handleBookNow(activity)}
//                         className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
//                       >
//                         Book Now
//                       </Button>
//                     </div>
//                   </div>

//                 </div>
//               )
//             })}
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
import { Clock, Loader2, Info, UserPlus, Zap, Shield, Timer } from "lucide-react"
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

        {/* ── Keyframe animations ─────────────────────────────────── */}
        <style>{`
          @keyframes shimmer-sweep {
            0%   { transform: translateX(-100%); }
            100% { transform: translateX(250%); }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.25); }
            50%       { box-shadow: 0 0 24px 8px rgba(16,185,129,0.18); }
          }
          @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-4px); }
          }
          @keyframes text-glow {
            0%, 100% { text-shadow: 0 0 0px rgba(52,211,153,0); }
            50%       { text-shadow: 0 0 14px rgba(52,211,153,0.65); }
          }
          @keyframes cta-pulse {
            0%, 100% { box-shadow: 0 4px 16px rgba(16,185,129,0.25); }
            50%       { box-shadow: 0 4px 36px rgba(16,185,129,0.55); }
          }
          @keyframes chip-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
            50%       { box-shadow: 0 0 10px 3px rgba(16,185,129,0.25); }
          }
        `}</style>

        {/* ── Early Bird Banner ───────────────────────────────────── */}
        <div className="relative mb-12 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-emerald-900/10 to-background rounded-2xl" />
          <div className="absolute inset-0 border border-emerald-500/40 rounded-2xl" />
          <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 35%, rgba(52,211,153,0.12) 50%, transparent 65%)",
              animation: "shimmer-sweep 4s ease-in-out infinite",
            }}
          />
          <span className="absolute top-4 right-4 flex h-3 w-3 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
          </span>

          <div className="relative px-6 py-6 flex flex-col sm:flex-row items-center gap-5 z-10">

            {/* Animated 25% OFF badge */}
            <div
              className="relative flex flex-col items-center justify-center w-24 h-24 rounded-2xl border-2 border-emerald-500/60 shrink-0 overflow-hidden"
              style={{
                background: "radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0.05) 100%)",
                animation: "pulse-glow 2.5s ease-in-out infinite",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, transparent 30%, rgba(52,211,153,0.2) 50%, transparent 70%)",
                  animation: "shimmer-sweep 3s ease-in-out infinite",
                }}
              />
              <p
                className="text-emerald-400 font-black text-4xl leading-none relative z-10"
                style={{ animation: "bounce-subtle 2s ease-in-out infinite" }}
              >
                25%
              </p>
              <p className="text-emerald-300 text-[11px] font-black uppercase tracking-widest relative z-10">
                OFF
              </p>
            </div>

            {/* Text content */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1.5 flex-wrap">
                <Timer size={13} className="text-emerald-400" />
                <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
                  Pre-Booking Offer
                </span>
                <span
                  className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full"
                  style={{ animation: "pulse 1.8s ease-in-out infinite" }}
                >
                  ONLINE ONLY
                </span>
              </div>

              <h3 className="text-white font-bold text-xl sm:text-2xl leading-snug">
                Pre-Book Online &{" "}
                <span
                  className="text-emerald-400"
                  style={{ animation: "text-glow 2.5s ease-in-out infinite" }}
                >
                  Get 25% Off
                </span>{" "}
                — Book Now, Save More!
              </h3>

              <p className="text-muted-foreground text-sm mt-1.5">
                Book in advance through our website and enjoy{" "}
                <span className="text-white font-semibold">25% discount</span> on all activities.{" "}
                <span className="text-white/60">Walk-in visitors pay full price.</span>
              </p>

              {/* 3-step flow */}
              <div className="flex items-center gap-3 mt-3 flex-wrap justify-center sm:justify-start">
                {[
                  { step: "1", text: "Pick activities" },
                  { step: "2", text: "Pay 50% advance online" },
                  { step: "3", text: "Pay balance at venue" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {s.step}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{s.text}</span>
                    {i < 2 && <span className="text-emerald-700 text-xs">→</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA + trust pills */}
            <div className="flex flex-col gap-3 shrink-0 items-center">
              <Button
                onClick={() => router.push("/booking")}
                className="relative overflow-hidden bg-emerald-500 hover:bg-emerald-400 text-white font-black px-6 py-5 text-base rounded-xl active:scale-95 transition-all"
                style={{ animation: "cta-pulse 2.5s ease-in-out infinite" }}
              >
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)",
                    animation: "shimmer-sweep 2.5s ease-in-out infinite",
                  }}
                />
                <span className="relative flex items-center gap-2">
                  🎯 Book Now &amp; Save 25%
                </span>
              </Button>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 bg-background/50 border border-white/10 rounded-full px-3 py-1.5">
                  <Zap size={11} className="text-emerald-400" />
                  <span className="text-xs text-white font-medium whitespace-nowrap">Instant Confirmation</span>
                </div>
                <div className="flex items-center gap-1.5 bg-background/50 border border-white/10 rounded-full px-3 py-1.5">
                  <Shield size={11} className="text-emerald-400" />
                  <span className="text-xs text-white font-medium whitespace-nowrap">Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section Header ──────────────────────────────────────── */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Our Adventures</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Choose from our premium eco-adventure experiences.
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

        {/* ── Loading ─────────────────────────────────────────────── */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-accent mr-2" size={28} />
            <span className="text-muted-foreground">Loading activities...</span>
          </div>
        )}

        {/* ── Error ───────────────────────────────────────────────── */}
        {error && (
          <div className="text-center py-20 text-muted-foreground">
            <p>{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        )}

        {/* ── Activity Cards ──────────────────────────────────────── */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {activities.map((activity) => {
              const extraCharge   = parseFloat(activity.extra_person_charge || "0")
              const hasExtra      = extraCharge > 0
              const actualPrice   = parseFloat(activity.base_price)

              return (
                <div
                  key={activity.id}
                  className="bg-card rounded-2xl shadow-lg flex flex-col h-full overflow-hidden group"
                >
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

                    {/* Green early bird chip */}
                    <div className="absolute bottom-3 left-3">
                      <span
                        className="flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ animation: "chip-pulse 2s ease-in-out infinite" }}
                      >
                        <Timer size={9} /> Pre-book: 25% OFF
                      </span>
                    </div>

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

                    {/* Pricing — actual price shown as discounted */}
                    <div className="mb-5 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xl font-bold text-emerald-400">
                          ₹{actualPrice.toLocaleString()}
                        </p>
                        <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          25% OFF Applied
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground">{getPricingLabel(activity)}</p>

                      <p className="text-[11px] text-emerald-400/60">
                        Pre-book online price · 50% advance + 50% at venue
                      </p>

                      {hasExtra && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <UserPlus size={11} className="text-emerald-400 shrink-0" />
                          <p className="text-xs text-emerald-400 font-medium">
                            +₹{extraCharge.toLocaleString()} per extra person
                            <span className="text-emerald-400/60 font-normal">
                              {" "}(beyond {activity.min_persons})
                            </span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-auto flex flex-col gap-2">
                      <Button
                        onClick={() => handleBookNow(activity)}
                        className="relative overflow-hidden w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-5 text-sm active:scale-[0.98] transition-all rounded-xl"
                        style={{ animation: "cta-pulse 2.5s ease-in-out infinite" }}
                      >
                        <span
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)",
                            animation: "shimmer-sweep 3s ease-in-out infinite",
                          }}
                        />
                        <span className="relative">🎯 Pre-Book &amp; Get 25% Off</span>
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => router.push(`/activities/${activity.id}`)}
                        className="w-full border border-border text-muted-foreground hover:text-white gap-1.5 text-xs"
                      >
                        <Info size={13} /> View Details
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