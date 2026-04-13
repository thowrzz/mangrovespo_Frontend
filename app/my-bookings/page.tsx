'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { format, isPast, isToday, isTomorrow, differenceInDays } from 'date-fns'
import {
  ArrowLeft, Loader2, Download, Calendar, Clock, Users,
  Wallet, CheckCircle2, XCircle, AlertCircle, Leaf, ChevronDown, ChevronUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { api, parseApiError } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'

// ── Helpers ───────────────────────────────────────────────────────────────────
function toHttps(url: string) {
  if (!url) return url
  return url.startsWith('http:') ? url.replace('http:', 'https:') : url
}

function getDateBadge(visitDate: string | null) {
  if (!visitDate) return null
  const date = new Date(visitDate + 'T00:00:00')
  const days = differenceInDays(date, new Date())
  if (isPast(date) && !isToday(date)) return { label: 'Completed', color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' }
  if (isToday(date))     return { label: 'TODAY 🎉',   color: 'bg-green-500/20 text-green-400 border-green-500/40' }
  if (isTomorrow(date))  return { label: 'Tomorrow',   color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' }
  if (days <= 7)         return { label: `In ${days} days`, color: 'bg-accent/20 text-accent border-accent/30' }
  return { label: format(date, 'MMM d, yyyy'), color: 'bg-zinc-800 text-zinc-300 border-zinc-700' }
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    confirmed: { icon: <CheckCircle2 size={12} />, color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Confirmed' },
    pending:   { icon: <AlertCircle size={12} />,  color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Pending' },
    cancelled: { icon: <XCircle size={12} />,      color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Cancelled' },
    completed: { icon: <CheckCircle2 size={12} />, color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30', label: 'Completed' },
  }
  const s = map[status?.toLowerCase()] ?? map.pending
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.color}`}>
      {s.icon} {s.label}
    </span>
  )
}

// ── Booking Card ──────────────────────────────────────────────────────────────
function BookingCard({ booking }: { booking: any }) {
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const dateBadge = getDateBadge(booking.visit_date)
  const grandTotal = parseFloat(booking.grand_total || '0')
  const amountPaid = parseFloat(booking.amount_paid || '0') || grandTotal / 2
  const balanceDue = parseFloat(booking.balance_due || '0') || grandTotal - amountPaid

  const isUpcoming = booking.visit_date
    ? !isPast(new Date(booking.visit_date + 'T00:00:00')) || isToday(new Date(booking.visit_date + 'T00:00:00'))
    : false

  const downloadReceipt = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookings/${booking.reference}/receipt/`,
      '_blank'
    )
  }

  return (
    <div className={`bg-card rounded-2xl border overflow-hidden transition-all
      ${isUpcoming ? 'border-accent/40 shadow-lg shadow-accent/5' : 'border-border'}`}>

      {/* ── Highlighted Date Banner (upcoming only) ── */}
      {isUpcoming && booking.visit_date && (
        <div className="bg-gradient-to-r from-accent/20 to-accent/5 border-b border-accent/20 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Calendar size={14} className="text-accent" />
            </div>
            <div>
              <p className="text-accent font-bold text-sm">
                {format(new Date(booking.visit_date + 'T00:00:00'), 'EEEE, MMMM d yyyy')}
              </p>
              {booking.arrival_time && (
                <p className="text-accent/70 text-xs flex items-center gap-1">
                  <Clock size={10} /> Arrival at {format(new Date(`2000-01-01T${booking.arrival_time}`), 'h:mm a')}
                </p>
              )}
            </div>
          </div>
          {dateBadge && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${dateBadge.color}`}>
              {dateBadge.label}
            </span>
          )}
        </div>
      )}

      {/* ── Card Header ── */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-white font-bold text-sm font-mono tracking-wide">{booking.reference}</p>
            <StatusBadge status={booking.status} />
          </div>
          <p className="text-muted-foreground text-xs mt-0.5">Booked on {booking.created_at}</p>
        </div>
        <div className="text-right shrink-0 ml-3">
          <p className="text-accent font-bold text-base tabular-nums">₹{grandTotal.toLocaleString()}</p>
          <p className="text-muted-foreground text-[10px]">total value</p>
        </div>
      </div>

      {/* ── Activities Preview ── */}
      <div className="px-4 pb-3 flex flex-col gap-1.5">
        {booking.items.slice(0, expanded ? undefined : 2).map((item: any, i: number) => (
          <div key={i} className="flex items-center gap-2.5">
            {item.activity_image ? (
              <img src={toHttps(item.activity_image)} alt={item.activity_name}
                className="w-8 h-8 rounded-lg object-cover shrink-0 border border-border/50" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Leaf size={12} className="text-accent" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{item.activity_name}</p>
              <p className="text-muted-foreground text-[10px]">
                {item.num_adults} Adult{item.num_adults !== 1 ? 's' : ''}
                {item.num_children > 0 ? ` + ${item.num_children} Child${item.num_children !== 1 ? 'ren' : ''}` : ''}
              </p>
            </div>
            {item.price && (
              <span className="text-white text-xs font-semibold tabular-nums shrink-0">₹{parseFloat(item.price).toLocaleString()}</span>
            )}
          </div>
        ))}
        {!expanded && booking.items.length > 2 && (
          <button onClick={() => setExpanded(true)} className="text-accent text-xs font-medium hover:underline text-left">
            +{booking.items.length - 2} more activit{booking.items.length - 2 !== 1 ? 'ies' : 'y'}
          </button>
        )}
      </div>

      {/* ── Payment Summary (expanded) ── */}
      {expanded && (
        <div className="mx-4 mb-3 bg-background rounded-xl border border-border p-3 flex flex-col gap-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Grand Total</span>
            <span className="text-white font-semibold tabular-nums">₹{grandTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1"><Wallet size={10} /> Paid Online (50%)</span>
            <span className="text-green-400 font-semibold tabular-nums">₹{amountPaid.toLocaleString()}</span>
          </div>
          {balanceDue > 0 && (
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Balance at Arrival</span>
              <span className="text-yellow-400 font-semibold tabular-nums">₹{balanceDue.toLocaleString()}</span>
            </div>
          )}
          {/* Past date visit info */}
          {!isUpcoming && booking.visit_date && (
            <div className="mt-1 pt-1.5 border-t border-border flex items-center gap-1.5">
              <Calendar size={10} className="text-muted-foreground" />
              <span className="text-muted-foreground text-[10px]">
                Visited {format(new Date(booking.visit_date + 'T00:00:00'), 'EEEE, MMM d yyyy')}
                {booking.arrival_time && ` at ${format(new Date(`2000-01-01T${booking.arrival_time}`), 'h:mm a')}`}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── Actions ── */}
      <div className="px-4 pb-4 flex gap-2">
        <Button onClick={downloadReceipt} size="sm"
          className="flex-1 bg-accent hover:bg-accent/90 text-white gap-1.5 h-9 text-xs font-semibold">
          <Download size={13} /> Download Receipt
        </Button>
        <button onClick={() => setExpanded((e) => !e)}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-white hover:border-accent/40 transition-colors shrink-0">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MyBookingsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming')

  useEffect(() => {
    if (authLoading) return
    if (!user) { router.push('/booking'); return }
    ;(api.bookings as any).myBookings()
      .then((data: any[]) => setBookings(data))
      .catch((err: any) => toast.error(parseApiError(err) || 'Failed to load bookings'))
      .finally(() => setLoading(false))
  }, [user, authLoading])

  const filtered = bookings.filter((b) => {
    if (filter === 'all') return true
    if (!b.visit_date) return filter === 'past'
    const date = new Date(b.visit_date + 'T00:00:00')
    const upcoming = !isPast(date) || isToday(date)
    return filter === 'upcoming' ? upcoming : !upcoming
  })

  const upcomingCount = bookings.filter((b) => {
    if (!b.visit_date) return false
    const date = new Date(b.visit_date + 'T00:00:00')
    return !isPast(date) || isToday(date)
  }).length

  return (
    <div className="min-h-screen bg-background pb-24">

      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3 max-w-2xl mx-auto">
          <button onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-border transition-colors shrink-0">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-white leading-none">My Bookings</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {user?.name} · {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
            </p>
          </div>
          {upcomingCount > 0 && (
            <span className="bg-accent/20 text-accent border border-accent/30 text-xs font-bold px-2.5 py-1 rounded-full">
              {upcomingCount} upcoming
            </span>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex border-t border-border max-w-2xl mx-auto">
          {(['upcoming', 'all', 'past'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-1 py-2.5 text-xs font-semibold capitalize transition-colors border-b-2
                ${filter === f ? 'border-accent text-accent' : 'border-transparent text-muted-foreground hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pt-5 flex flex-col gap-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-accent" size={32} />
            <p className="text-muted-foreground text-sm">Loading your bookings...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Calendar size={28} className="text-accent/60" />
            </div>
            <div>
              <p className="text-white font-bold text-base">
                {filter === 'upcoming' ? 'No upcoming bookings' : filter === 'past' ? 'No past bookings' : 'No bookings yet'}
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                {filter === 'upcoming' ? 'Your next adventure awaits!' : 'Your booking history will appear here'}
              </p>
            </div>
            <Button onClick={() => router.push('/booking')}
              className="bg-accent hover:bg-accent/90 text-white font-bold px-6">
              Book an Activity
            </Button>
          </div>
        ) : (
          filtered.map((b) => <BookingCard key={b.reference} booking={b} />)
        )}
      </div>
    </div>
  )
}