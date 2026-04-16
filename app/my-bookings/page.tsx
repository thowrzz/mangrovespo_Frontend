// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Image from 'next/image'
// import {
//   ArrowLeft, Loader2, BookMarked, CalendarDays,
//   Clock, Users, Baby, IndianRupee, LogOut,
//   ChevronDown, ChevronUp, Phone,
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { useAuth } from '@/lib/auth-context'
// import { api, MyBooking, MyBookingItem } from '@/lib/api'   // ← import types from api.ts
// import { toast } from 'sonner'

// // ─── Helpers ──────────────────────────────────────────────────────
// const STATUS_STYLES: Record<string, string> = {
//   confirmed: 'bg-green-500/15 text-green-400 border-green-500/30',
//   pending:   'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
//   cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
//   completed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
// }

// function formatDate(dateStr: string) {
//   return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
//     weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
//   })
// }

// function formatTime(timeStr: string | null) {
//   if (!timeStr) return null
//   const [h, m] = timeStr.split(':').map(Number)
//   const ampm = h < 12 ? 'AM' : 'PM'
//   const h12  = h === 0 ? 12 : h > 12 ? h - 12 : h
//   return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
// }

// function toHttps(url: string) {
//   return url?.startsWith('http://') ? url.replace('http://', 'https://') : url
// }

// // ─── Booking Card ─────────────────────────────────────────────────
// function BookingCard({ booking }: { booking: MyBooking }) {
//   const [expanded, setExpanded] = useState(false)
//   const statusStyle = STATUS_STYLES[booking.status?.toLowerCase()] ?? STATUS_STYLES.pending

//   const firstItem   = booking.items[0]
//   const extraCount  = booking.items.length - 1
//   const visitDate   = firstItem?.visit_date ? formatDate(firstItem.visit_date) : '—'
//   const arrivalTime = firstItem ? formatTime(firstItem.arrival_time) : null
//   const grandTotal  = parseFloat(booking.grand_total || '0').toLocaleString('en-IN')
//   const amountPaid  = parseFloat(booking.amount_paid  || '0').toLocaleString('en-IN')
//   const balanceDue  = parseFloat(booking.balance_due  || '0').toLocaleString('en-IN')

//   return (
//     <div className="bg-card border border-border rounded-2xl overflow-hidden">

//       {/* Card Header */}
//       <div
//         className="flex items-center justify-between px-4 py-3 border-b border-border/60 cursor-pointer select-none"
//         onClick={() => setExpanded(e => !e)}
//       >
//         <div className="flex items-center gap-2.5 min-w-0">
//           <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
//             <BookMarked size={14} className="text-accent" />
//           </div>
//           <div className="min-w-0">
//             <p className="text-white font-semibold text-sm truncate">#{booking.reference}</p>
//             <p className="text-muted-foreground text-xs">{visitDate}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 shrink-0">
//           <Badge className={`text-[10px] px-2 py-0.5 border capitalize ${statusStyle}`}>
//             {booking.status}
//           </Badge>
//           {expanded
//             ? <ChevronUp size={14} className="text-muted-foreground" />
//             : <ChevronDown size={14} className="text-muted-foreground" />
//           }
//         </div>
//       </div>

//       {/* Activity preview row */}
//       <div className="px-4 py-3 flex items-center gap-3">
//         <div className="flex -space-x-2 shrink-0">
//           {booking.items.slice(0, 3).map((item, i) => (
//             <div key={i} className="w-10 h-10 rounded-xl overflow-hidden border-2 border-card relative">
//               <Image
//                 src={toHttps(item.activity_image) || '/combo.png'}
//                 alt={item.activity_name}
//                 fill sizes="40px"
//                 className="object-cover"
//                 onError={e => { (e.target as HTMLImageElement).src = '/combo.png' }}
//               />
//             </div>
//           ))}
//           {extraCount > 0 && (
//             <div className="w-10 h-10 rounded-xl bg-accent/10 border-2 border-card flex items-center justify-center">
//               <span className="text-accent text-[10px] font-bold">+{extraCount}</span>
//             </div>
//           )}
//         </div>

//         <div className="flex-1 min-w-0">
//           <p className="text-white text-sm font-medium truncate">
//             {booking.items.map(i => i.activity_name).join(', ')}
//           </p>
//           <div className="flex items-center gap-2 mt-0.5 flex-wrap">
//             {arrivalTime && (
//               <span className="flex items-center gap-1 text-muted-foreground text-xs">
//                 <Clock size={10} /> {arrivalTime}
//               </span>
//             )}
//             {firstItem && (
//               <span className="flex items-center gap-1 text-muted-foreground text-xs">
//                 <Users size={10} /> {firstItem.num_adults} adult{firstItem.num_adults !== 1 ? 's' : ''}
//                 {firstItem.num_children > 0 && `, ${firstItem.num_children} child${firstItem.num_children !== 1 ? 'ren' : ''}`}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="text-right shrink-0">
//           <p className="text-accent font-bold text-sm">₹{grandTotal}</p>
//           <p className="text-muted-foreground text-[10px]">total</p>
//         </div>
//       </div>

//       {/* Expanded detail */}
//       {expanded && (
//         <div className="border-t border-border/60 px-4 py-4 flex flex-col gap-4">

//           {/* Activity list */}
//           <div className="flex flex-col gap-2">
//             {booking.items.map((item, i) => (
//               <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-background/50">
//                 <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
//                   <Image
//                     src={toHttps(item.activity_image) || '/combo.png'}
//                     alt={item.activity_name}
//                     fill sizes="40px"
//                     className="object-cover"
//                     onError={e => { (e.target as HTMLImageElement).src = '/combo.png' }}
//                   />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-white text-xs font-semibold truncate">{item.activity_name}</p>
//                   <div className="flex items-center gap-2 mt-0.5 flex-wrap">
//                     <span className="flex items-center gap-1 text-muted-foreground text-[11px]">
//                       <CalendarDays size={9} /> {formatDate(item.visit_date)}
//                     </span>
//                     {item.arrival_time && (
//                       <span className="flex items-center gap-1 text-muted-foreground text-[11px]">
//                         <Clock size={9} /> {formatTime(item.arrival_time)}
//                       </span>
//                     )}
//                     <span className="flex items-center gap-1 text-muted-foreground text-[11px]">
//                       <Users size={9} /> {item.num_adults}A
//                       {item.num_children > 0 && (
//                         <><Baby size={9} className="ml-1" /> {item.num_children}C</>
//                       )}
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-accent text-xs font-bold shrink-0">
//                   ₹{parseFloat(item.price_snapshot || '0').toLocaleString('en-IN')}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Payment summary */}
//           <div className="bg-background/50 rounded-xl p-3 flex flex-col gap-1.5">
//             <p className="text-muted-foreground text-xs font-medium mb-1">Payment Summary</p>
//             <div className="flex justify-between text-xs">
//               <span className="text-muted-foreground">Total Amount</span>
//               <span className="text-white font-medium">₹{grandTotal}</span>
//             </div>
//             <div className="flex justify-between text-xs">
//               <span className="text-muted-foreground">Paid Online (50%)</span>
//               <span className="text-green-400 font-medium">₹{amountPaid}</span>
//             </div>
//             {parseFloat(booking.balance_due) > 0 && (
//               <div className="flex justify-between text-xs border-t border-border/60 pt-1.5 mt-0.5">
//                 <span className="text-muted-foreground">Balance at Arrival</span>
//                 <span className="text-yellow-400 font-semibold">₹{balanceDue}</span>
//               </div>
//             )}
//           </div>

//           {/* Customer info */}
//           <div className="flex items-center gap-3 text-xs text-muted-foreground">
//             <Phone size={11} />
//             <span>{booking.customer_phone}</span>
//             <span className="text-border">·</span>
//             <span className="truncate">{booking.customer_email}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// // ─── Main Page ────────────────────────────────────────────────────
// export default function MyBookingsPage() {
//   const router = useRouter()
//   // ✅ FIX 1: destructure authLoading to prevent redirect race condition
//   const { user, setUser, loading: authLoading } = useAuth()
//   const [bookings, setBookings] = useState<MyBooking[]>([])
//   const [loading, setLoading]   = useState(true)
//   const [error, setError]       = useState<string | null>(null)

//   // ✅ FIX 1: wait for auth to resolve before redirecting
//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.replace('/')
//     }
//   }, [user, authLoading, router])

//   // Fetch bookings — only runs when user is confirmed present
//   useEffect(() => {
//     if (!user) return
//     setLoading(true)
//     setError(null)
//     // ✅ FIX 2: direct typed call, no `as any` cast
//     api.bookings.myBookings()
//       .then((data) => {
//         setBookings(Array.isArray(data) ? data : [])
//         setLoading(false)
//       })
//       .catch((err: any) => {
//         console.error(err)
//         setError('Could not load your bookings. Please try again.')
//         setLoading(false)
//       })
//   }, [user])

//   // ✅ FIX 3: also clear localStorage on logout
//   const handleLogout = () => {
//     localStorage.removeItem('ms_customer')
//     setUser(null)
//     toast.success('Logged out successfully')
//     router.push('/')
//   }

//   // ✅ FIX 1: show nothing while auth is resolving (prevents flash)
//   if (authLoading || !user) return null

//   return (
//     <div className="min-h-screen bg-background">

//       {/* Header */}
//       <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border">
//         <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.push('/')}
//               className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
//             >
//               <ArrowLeft size={15} />
//             </button>
//             <div>
//               <h1 className="text-white font-bold text-base leading-none">My Bookings</h1>
//               <p className="text-muted-foreground text-xs mt-0.5">{user.name}</p>
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-1.5 text-muted-foreground hover:text-white text-xs transition-colors border border-border/60 hover:border-border px-3 py-1.5 rounded-full"
//           >
//             <LogOut size={12} />
//             Sign out
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-2xl mx-auto px-4 py-6">

//         {/* Loading */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-20 gap-3">
//             <Loader2 size={28} className="animate-spin text-accent" />
//             <p className="text-muted-foreground text-sm">Loading your bookings...</p>
//           </div>
//         )}

//         {/* Error */}
//         {!loading && error && (
//           <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
//             <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
//               <BookMarked size={20} className="text-red-400" />
//             </div>
//             <p className="text-white font-semibold">Something went wrong</p>
//             <p className="text-muted-foreground text-sm max-w-xs">{error}</p>
//             <Button
//               onClick={() => window.location.reload()}
//               className="bg-accent hover:bg-accent/90 text-white rounded-full px-6"
//             >
//               Try again
//             </Button>
//           </div>
//         )}

//         {/* Empty state */}
//         {!loading && !error && bookings.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
//             <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
//               <span className="text-2xl">🌿</span>
//             </div>
//             <div>
//               <p className="text-white font-bold text-base">No bookings yet</p>
//               <p className="text-muted-foreground text-sm mt-1 max-w-xs">
//                 Your adventure bookings will appear here once you make your first reservation.
//               </p>
//             </div>
//             <Button
//               onClick={() => router.push('/booking')}
//               className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8"
//             >
//               <CalendarDays size={15} className="mr-2" />
//               Book an Activity
//             </Button>
//           </div>
//         )}

//         {/* Booking list */}
//         {!loading && !error && bookings.length > 0 && (
//           <div className="flex flex-col gap-3">
//             <p className="text-muted-foreground text-xs px-1">
//               {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
//             </p>
//             {bookings.map(booking => (
//               <BookingCard key={booking.reference} booking={booking} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  ArrowLeft, Loader2, BookMarked, CalendarDays,
  Clock, Users, Baby, LogOut,
  ChevronDown, ChevronUp, Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-context'
import { api, MyBooking, MyBookingItem } from '@/lib/api'
import { toast } from 'sonner'

// ─── Helpers ──────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-green-500/15 text-green-400 border-green-500/30',
  pending:   'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
  completed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  expired:   'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })
}

function formatTime(timeStr: string | null | undefined): string | null {
  if (!timeStr) return null
  const [h, m] = timeStr.split(':').map(Number)
  const ampm = h < 12 ? 'AM' : 'PM'
  const h12  = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
}

function toHttps(url: string | null | undefined): string {
  if (!url) return '/combo.png'
  return url.startsWith('http://') ? url.replace('http://', 'https://') : url
}

// ─── Booking Card ─────────────────────────────────────────────────

function BookingCard({ booking }: { booking: MyBooking }) {
  const [expanded, setExpanded] = useState(false)

  const statusStyle = STATUS_STYLES[booking.status?.toLowerCase()] ?? STATUS_STYLES.pending
  const firstItem   = booking.items[0]
  const extraCount  = booking.items.length - 1

  // visit_date / arrival_time: prefer per-item, fall back to booking-level
  const resolvedVisitDate   = (firstItem as any)?.visit_date   ?? booking.visit_date   ?? null
  const resolvedArrivalTime = (firstItem as any)?.arrival_time ?? booking.arrival_time ?? null

  const grandTotal = parseFloat(booking.grand_total || '0').toLocaleString('en-IN')
  const amountPaid = parseFloat(booking.amount_paid || '0').toLocaleString('en-IN')
  const balanceDue = parseFloat(booking.balance_due || '0').toLocaleString('en-IN')

  // Per-item resolvers (Django now sends these on each item after the views.py fix)
  const itemVisitDate   = (item: MyBookingItem) =>
    (item as any).visit_date   ?? booking.visit_date   ?? null
  const itemArrivalTime = (item: MyBookingItem) =>
    (item as any).arrival_time ?? booking.arrival_time ?? null
  // Handles both 'price_snapshot' (new) and 'price' (old) field names
  const itemPrice = (item: MyBookingItem) =>
    parseFloat((item as any).price_snapshot ?? (item as any).price ?? '0')

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">

      {/* Card Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-border/60 cursor-pointer select-none"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <BookMarked size={14} className="text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">#{booking.reference}</p>
            <p className="text-muted-foreground text-xs">{formatDate(resolvedVisitDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge className={`text-[10px] px-2 py-0.5 border capitalize ${statusStyle}`}>
            {booking.status}
          </Badge>
          {expanded
            ? <ChevronUp size={14} className="text-muted-foreground" />
            : <ChevronDown size={14} className="text-muted-foreground" />
          }
        </div>
      </div>

      {/* Activity preview row */}
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex -space-x-2 shrink-0">
          {booking.items.slice(0, 3).map((item, i) => (
            <div key={i} className="w-10 h-10 rounded-xl overflow-hidden border-2 border-card relative">
              <Image
                src={toHttps(item.activity_image)}
                alt={item.activity_name}
                fill sizes="40px"
                className="object-cover"
                onError={e => { (e.target as HTMLImageElement).src = '/combo.png' }}
              />
            </div>
          ))}
          {extraCount > 0 && (
            <div className="w-10 h-10 rounded-xl bg-accent/10 border-2 border-card flex items-center justify-center">
              <span className="text-accent text-[10px] font-bold">+{extraCount}</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">
            {booking.items.map(i => i.activity_name).join(', ')}
          </p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            {formatTime(resolvedArrivalTime) && (
              <span className="flex items-center gap-1 text-muted-foreground text-xs">
                <Clock size={10} /> {formatTime(resolvedArrivalTime)}
              </span>
            )}
            {firstItem && (
              <span className="flex items-center gap-1 text-muted-foreground text-xs">
                <Users size={10} /> {firstItem.num_adults} adult{firstItem.num_adults !== 1 ? 's' : ''}
                {firstItem.num_children > 0 && `, ${firstItem.num_children} child${firstItem.num_children !== 1 ? 'ren' : ''}`}
              </span>
            )}
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="text-accent font-bold text-sm">₹{grandTotal}</p>
          <p className="text-muted-foreground text-[10px]">total</p>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-border/60 px-4 py-4 flex flex-col gap-4">

          {/* Activity list */}
          <div className="flex flex-col gap-2">
            {booking.items.map((item, i) => {
              const iDate  = itemVisitDate(item)
              const iTime  = itemArrivalTime(item)
              const iPrice = itemPrice(item)
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-background/50">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={toHttps(item.activity_image)}
                      alt={item.activity_name}
                      fill sizes="40px"
                      className="object-cover"
                      onError={e => { (e.target as HTMLImageElement).src = '/combo.png' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{item.activity_name}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      {iDate && (
                        <span className="flex items-center gap-1 text-muted-foreground text-[11px]">
                          <CalendarDays size={9} /> {formatDate(iDate)}
                        </span>
                      )}
                      {iTime && (
                        <span className="flex items-center gap-1 text-muted-foreground text-[11px]">
                          <Clock size={9} /> {formatTime(iTime)}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-muted-foreground text-[11px]">
                        <Users size={9} /> {item.num_adults}A
                        {item.num_children > 0 && (
                          <><Baby size={9} className="ml-1" /> {item.num_children}C</>
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="text-accent text-xs font-bold shrink-0">
                    ₹{iPrice.toLocaleString('en-IN')}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Payment summary */}
          <div className="bg-background/50 rounded-xl p-3 flex flex-col gap-1.5">
            <p className="text-muted-foreground text-xs font-medium mb-1">Payment Summary</p>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="text-white font-medium">₹{grandTotal}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Paid Online (50%)</span>
              <span className="text-green-400 font-medium">₹{amountPaid}</span>
            </div>
            {parseFloat(booking.balance_due || '0') > 0 && (
              <div className="flex justify-between text-xs border-t border-border/60 pt-1.5 mt-0.5">
                <span className="text-muted-foreground">Balance at Arrival</span>
                <span className="text-yellow-400 font-semibold">₹{balanceDue}</span>
              </div>
            )}
          </div>

          {/* Customer info */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Phone size={11} />
            <span>{booking.customer_phone}</span>
            <span className="text-border">·</span>
            <span className="truncate">{booking.customer_email}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────

export default function MyBookingsPage() {
  const router = useRouter()

  // ✅ Use signOut — setUser does NOT accept null
  const { user, loading: authLoading, signOut } = useAuth()

  const [bookings, setBookings] = useState<MyBooking[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  // Wait for auth to resolve before redirecting (prevents race-condition flash)
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/')
    }
  }, [user, authLoading, router])

  // Fetch bookings — only when user is confirmed present
  useEffect(() => {
    if (!user) return
    setLoading(true)
    setError(null)
    api.bookings.myBookings()
      .then((data) => {
        setBookings(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err: any) => {
        console.error('[my-bookings] fetch error:', err?.status, err?.data)
        const msg =
          err?.data?.detail ||
          err?.message ||
          'Could not load your bookings. Please try again.'
        setError(msg)
        setLoading(false)
      })
  }, [user])

  // ✅ signOut() handles localStorage.removeItem + state reset internally
  const handleLogout = () => {
    signOut()
    toast.success('Logged out successfully')
    router.push('/')
  }

  // Show nothing while auth is resolving (prevents content flash)
  if (authLoading || !user) return null

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
            >
              <ArrowLeft size={15} />
            </button>
            <div>
              <h1 className="text-white font-bold text-base leading-none">My Bookings</h1>
              <p className="text-muted-foreground text-xs mt-0.5">{user.name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-white text-xs transition-colors border border-border/60 hover:border-border px-3 py-1.5 rounded-full"
          >
            <LogOut size={12} />
            Sign out
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 size={28} className="animate-spin text-accent" />
            <p className="text-muted-foreground text-sm">Loading your bookings...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <BookMarked size={20} className="text-red-400" />
            </div>
            <p className="text-white font-semibold">Something went wrong</p>
            <p className="text-muted-foreground text-sm max-w-xs">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-accent hover:bg-accent/90 text-white rounded-full px-6"
            >
              Try again
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <span className="text-2xl">🌿</span>
            </div>
            <div>
              <p className="text-white font-bold text-base">No bookings yet</p>
              <p className="text-muted-foreground text-sm mt-1 max-w-xs">
                Your adventure bookings will appear here once you make your first reservation.
              </p>
            </div>
            <Button
              onClick={() => router.push('/booking')}
              className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8"
            >
              <CalendarDays size={15} className="mr-2" />
              Book an Activity
            </Button>
          </div>
        )}

        {/* Booking list */}
        {!loading && !error && bookings.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-muted-foreground text-xs px-1">
              {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
            </p>
            {bookings.map(booking => (
              <BookingCard key={booking.reference} booking={booking} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}