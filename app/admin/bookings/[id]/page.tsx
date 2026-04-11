"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import {
  ArrowLeft, Loader2, Phone, Mail, User,
  CalendarDays, Clock, Users, IndianRupee,
  CheckCircle, XCircle, AlertCircle,
  LayoutDashboard, BookOpen, Palmtree,
  Settings, LogOut, Copy, Check, Leaf,
  MessageCircle, Menu, X, Baby, Wallet
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { adminApi } from "@/lib/admin-api"
import { format } from "date-fns"
import { toast } from "sonner"

const NAV_ITEMS = [
  { label: "Dashboard",  icon: LayoutDashboard, href: "/admin" },
  { label: "Bookings",   icon: BookOpen,        href: "/admin/bookings" },
  { label: "Activities", icon: Palmtree,        href: "/admin/activities" },
  { label: "Settings",   icon: Settings,        href: "/admin/settings" },
]

function isActive(currentPath: string, href: string) {
  if (href === "/admin") return currentPath === "/admin"
  return currentPath.startsWith(href)
}

function MobileDrawer({ open, onClose, onNavigate, onLogout, currentPath }: {
  open: boolean; onClose: () => void; onNavigate: (href: string) => void
  onLogout: () => void; currentPath: string
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!open) return null
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-card border-r border-border flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Leaf size={15} className="text-accent" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">MangroveSpot</p>
              <p className="text-muted-foreground text-xs mt-0.5">Admin Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-border transition-colors">
            <X size={16} />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const active = isActive(currentPath, item.href)
            return (
              <button key={item.href} onClick={() => { onNavigate(item.href); onClose() }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left
                  ${active ? "bg-accent/15 text-accent border border-accent/20" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
              >
                <item.icon size={16} />
                {item.label}
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />}
              </button>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-border shrink-0">
          <button onClick={() => { onLogout(); onClose() }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </>
  )
}

function BottomTabBar({ currentPath, onNavigate }: {
  currentPath: string; onNavigate: (href: string) => void
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-card/95 backdrop-blur-md border-t border-border">
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map(tab => {
          const active = isActive(currentPath, tab.href)
          return (
            <button key={tab.href} onClick={() => onNavigate(tab.href)}
              className={`relative flex-1 flex flex-col items-center justify-center gap-1 transition-colors
                ${active ? "text-accent" : "text-muted-foreground"}`}
            >
              {active && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-b-full" />}
              <tab.icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              <span className={`text-[10px] font-medium leading-none ${active ? "text-accent" : "text-muted-foreground"}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function fmtDate(value: string | null | undefined, fmt: string): string {
  if (!value) return "—"
  const d = new Date(value.includes("T") ? value : value + "T00:00:00")
  if (isNaN(d.getTime())) return value
  return format(d, fmt)
}

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-green-500/15 text-green-400 border-green-500/30",
  pending:   "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
  completed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  expired:   "bg-gray-500/15 text-gray-400 border-gray-500/30",
}

function InfoRow({ label, value, mono = false }: {
  label: string; value?: string | null; mono?: boolean
}) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-border/40 last:border-0 gap-4">
      <span className="text-muted-foreground text-sm shrink-0">{label}</span>
      <span className={`text-white text-sm text-right break-all ${mono ? "font-mono text-xs" : "font-medium"}`}>
        {value || "—"}
      </span>
    </div>
  )
}

function itemSubtotal(item: any): number {
  return parseFloat(item.price_snapshot ?? 0)
}

export default function BookingDetailPage() {
  const { id }   = useParams()
  const router   = useRouter()
  const pathname = usePathname()

  const [booking,       setBooking]       = useState<any>(null)
  const [loading,       setLoading]       = useState(true)
  const [actionLoading, setActionLoading] = useState("")
  const [cancelReason,  setCancelReason]  = useState("")
  const [showCancel,    setShowCancel]    = useState(false)
  const [copied,        setCopied]        = useState(false)
  const [drawerOpen,    setDrawerOpen]    = useState(false)

  const currentPath = pathname ?? "/admin/bookings"

  useEffect(() => {
    if (!id) return
    adminApi.bookings.detail(String(id))
      .then(setBooking)
      .catch(() => toast.error("Failed to load booking"))
      .finally(() => setLoading(false))
  }, [id])

  const handleStatus = async (newStatus: string) => {
    setActionLoading(newStatus)
    try {
      const updated = await adminApi.bookings.updateStatus(String(id), newStatus)
      setBooking((prev: any) => ({ ...prev, status: updated.status }))
      toast.success(`Booking marked as ${newStatus}`)
    } catch {
      toast.error("Failed to update status")
    } finally { setActionLoading("") }
  }

  const handleCancel = async () => {
    setActionLoading("cancel")
    try {
      await adminApi.bookings.updateStatus(String(id), "cancelled")
      setBooking((prev: any) => ({ ...prev, status: "cancelled" }))
      setShowCancel(false)
      setCancelReason("")
      toast.success("Booking cancelled")
    } catch {
      toast.error("Failed to cancel booking")
    } finally { setActionLoading("") }
  }

  const copyRef = () => {
    navigator.clipboard.writeText(booking?.reference ?? "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
        <Leaf size={22} className="text-accent" />
      </div>
      <Loader2 className="animate-spin text-accent" size={24} />
    </div>
  )

  if (!booking) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <AlertCircle size={40} className="text-muted-foreground" />
      <p className="text-white font-semibold">Booking not found</p>
      <Button variant="outline" onClick={() => router.push("/admin/bookings")} className="border-border gap-1.5">
        <ArrowLeft size={14} /> Back to Bookings
      </Button>
    </div>
  )

  const isCancelled = booking.status === "cancelled"
  const isCompleted = booking.status === "completed"
  const items       = booking.items ?? []

  const grandTotal = parseFloat(booking.grand_total ?? 0)
  const amountPaid = parseFloat(booking.amount_paid ?? 0)   // 50% paid at booking
  const balanceDue = parseFloat(booking.balance_due ?? 0)   // 50% due at arrival

  return (
    <div className="min-h-screen bg-background">

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={href => router.push(href)}
        onLogout={() => adminApi.logout()}
        currentPath={currentPath}
      />

      <header className="border-b border-border px-4 lg:px-6 py-3 lg:py-4 flex items-center gap-3 sticky top-0 bg-background/95 backdrop-blur-sm z-20">
        <button onClick={() => setDrawerOpen(true)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-white hover:bg-white/5 transition-colors shrink-0"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Leaf size={15} className="text-accent" />
          </div>
          <span className="text-white font-bold text-sm lg:text-base">
            <span className="hidden sm:inline">MangroveSpot </span>Admin
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1 ml-6">
          {NAV_ITEMS.map(item => (
            <Button key={item.href} variant="ghost" size="sm"
              onClick={() => router.push(item.href)}
              className={`gap-1.5 ${isActive(currentPath, item.href) ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-white"}`}
            >
              <item.icon size={14} />{item.label}
            </Button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => router.push("/admin/bookings")}
            className="text-muted-foreground hover:text-white gap-1.5 hidden sm:flex"
          >
            <ArrowLeft size={14} /> All Bookings
          </Button>
          <Button variant="ghost" size="sm" onClick={() => adminApi.logout()}
            className="hidden md:flex text-muted-foreground hover:text-red-400 gap-1.5"
          >
            <LogOut size={14} /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 lg:py-8 flex flex-col gap-6 pb-24 md:pb-8">

        <div>
          <button onClick={() => router.push("/admin/bookings")}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-white text-sm mb-4 transition-colors group md:hidden"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            All Bookings
          </button>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl lg:text-2xl font-bold text-white font-mono tracking-wide">
                {booking.reference ?? "—"}
              </h1>
              <button onClick={copyRef} title="Copy reference"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
              </button>
              <Badge className={`border capitalize ${STATUS_COLORS[booking.status] ?? "bg-gray-500/15 text-gray-400 border-gray-500/30"}`}>
                {booking.status}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Booked {fmtDate(booking.created_at, "MMM d, yyyy · h:mm a")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="md:col-span-2 flex flex-col gap-5">

            {/* ── Booked Activities ─────────────────────────────── */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="text-white font-bold">Booked Activities</h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </p>
              </div>

              {items.length === 0 ? (
                <p className="text-muted-foreground text-sm px-5 py-8 text-center">No items found</p>
              ) : (
                <div className="divide-y divide-border/50">
                  {items.map((item: any, i: number) => {
                    const subtotal     = itemSubtotal(item)
                    const numAdults    = item.num_adults   ?? 1
                    const numChildren  = item.num_children ?? 0
                    const totalPersons = numAdults + numChildren

                    return (
                      <div key={item.id ?? i} className="px-5 py-4 flex items-start gap-4">
                        <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center text-accent font-bold text-sm shrink-0">
                          {i + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold">{item.activity_name ?? "—"}</p>

                          <div className="flex flex-wrap gap-3 mt-2">
                            <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                              <CalendarDays size={11} />
                              {fmtDate(item.visit_date, "MMM d, yyyy")}
                            </span>
                            <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                              <Clock size={11} />
                              {item.slot_label ?? "—"}
                            </span>
                            <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                              <Users size={11} />
                              {numAdults} adult{numAdults !== 1 ? "s" : ""}
                            </span>
                            {numChildren > 0 && (
                              <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                                <Baby size={11} />
                                {numChildren} child{numChildren !== 1 ? "ren" : ""}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-white font-semibold">₹{subtotal.toLocaleString()}</p>
                          {totalPersons > 1 && (
                            <p className="text-muted-foreground text-xs mt-0.5">
                              {numAdults}A{numChildren > 0 ? ` + ${numChildren}C` : ""}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Customer Details */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="text-white font-bold mb-4">Customer Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <User size={15} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-white font-semibold text-sm truncate">{booking.customer_name ?? "—"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone size={15} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <a href={`tel:${booking.customer_phone}`}
                      className="text-white font-semibold text-sm hover:text-accent transition-colors"
                    >
                      {booking.customer_phone ?? "—"}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail size={15} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a href={`mailto:${booking.customer_email}`}
                      className="text-white font-semibold text-sm hover:text-accent transition-colors truncate block"
                    >
                      {booking.customer_email ?? "—"}
                    </a>
                  </div>
                </div>
              </div>

              {booking.special_requests && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Special Requests</p>
                  <p className="text-white text-sm leading-relaxed">{booking.special_requests}</p>
                </div>
              )}
            </div>

            {/* ── Payment Details ─────────────────────────────────── */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="text-white font-bold mb-3">Payment Details</h2>
              <InfoRow label="Booking Reference" value={booking.reference} mono />
              <InfoRow label="Razorpay Order ID" value={booking.razorpay_order_id} mono />
              <InfoRow
                label="Payment Status"
                value={
                  !booking.razorpay_order_id ? "Not initiated" :
                  (booking.status === "confirmed" || booking.status === "completed") ? "50% Paid Online ✓" :
                  booking.status === "cancelled" ? "Refund pending" :
                  "Awaiting payment"
                }
              />
              <InfoRow label="Booked On" value={fmtDate(booking.created_at, "MMM d, yyyy · h:mm a")} />
              <InfoRow label="Grand Total" value={`₹${grandTotal.toLocaleString()}`} />
              <InfoRow label="Paid Now (50%)" value={`₹${amountPaid.toLocaleString()}`} />
              <InfoRow label="Balance at Arrival (50%)" value={`₹${balanceDue.toLocaleString()}`} />
            </div>
          </div>

          {/* ── RIGHT ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* ── Amount Summary ──────────────────────────────────── */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="text-white font-bold mb-4">Amount Summary</h2>

              <div className="flex flex-col gap-2 mb-3">
                {items.map((item: any, i: number) => {
                  const subtotal    = itemSubtotal(item)
                  const numAdults   = item.num_adults   ?? 1
                  const numChildren = item.num_children ?? 0
                  return (
                    <div key={item.id ?? i} className="flex flex-col gap-0.5">
                      <div className="flex justify-between items-start gap-2 text-sm">
                        <span className="text-muted-foreground truncate flex-1">
                          {item.activity_name ?? "—"}
                        </span>
                        <span className="text-white font-medium shrink-0">
                          ₹{subtotal.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs text-right">
                        {numAdults} adult{numAdults !== 1 ? "s" : ""}
                        {numChildren > 0 ? ` + ${numChildren} child${numChildren !== 1 ? "ren" : ""}` : ""}
                      </p>
                    </div>
                  )
                })}
              </div>

              <hr className="border-border my-3" />

              {/* Grand total */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-white font-bold">Grand Total</span>
                <div className="flex items-center gap-0.5 text-accent">
                  <IndianRupee size={16} />
                  <span className="text-2xl font-bold tabular-nums">
                    {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment split pills */}
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-center bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-green-400 shrink-0" />
                    <span className="text-xs text-green-400 font-medium">Paid online (50%)</span>
                  </div>
                  <span className="text-green-400 text-sm font-bold">₹{amountPaid.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Wallet size={13} className="text-yellow-400 shrink-0" />
                    <span className="text-xs text-yellow-400 font-medium">Due at arrival (50%)</span>
                  </div>
                  <span className="text-yellow-400 text-sm font-bold">₹{balanceDue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
              <h2 className="text-white font-bold">Actions</h2>

              {booking.status === "pending" && (
                <Button onClick={() => handleStatus("confirmed")} disabled={!!actionLoading}
                  className="w-full bg-green-600 hover:bg-green-700 gap-2"
                >
                  {actionLoading === "confirmed"
                    ? <Loader2 size={14} className="animate-spin" />
                    : <CheckCircle size={14} />}
                  Confirm Booking
                </Button>
              )}

              {(booking.status === "confirmed" || booking.status === "pending") && (
                <Button onClick={() => handleStatus("completed")} disabled={!!actionLoading}
                  variant="outline"
                  className="w-full border-blue-500/40 text-blue-400 hover:bg-blue-500/10 gap-2"
                >
                  {actionLoading === "completed"
                    ? <Loader2 size={14} className="animate-spin" />
                    : <CheckCircle size={14} />}
                  Mark as Completed
                </Button>
              )}

              {!isCancelled && !isCompleted && (
                <>
                  {!showCancel ? (
                    <Button onClick={() => setShowCancel(true)} variant="outline"
                      className="w-full border-red-500/40 text-red-400 hover:bg-red-500/10 gap-2"
                    >
                      <XCircle size={14} /> Cancel Booking
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-muted-foreground">Reason (optional)</p>
                      <textarea
                        value={cancelReason}
                        onChange={e => setCancelReason(e.target.value)}
                        placeholder="e.g. Customer requested cancellation"
                        className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground resize-none h-20 focus:outline-none focus:border-accent/50 transition-colors"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleCancel} disabled={!!actionLoading}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-sm"
                        >
                          {actionLoading === "cancel" && <Loader2 size={13} className="animate-spin mr-1" />}
                          Confirm Cancel
                        </Button>
                        <Button onClick={() => { setShowCancel(false); setCancelReason("") }}
                          variant="outline" className="flex-1 border-border text-sm"
                        >
                          Back
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {isCancelled && (
                <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  <AlertCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-red-400 text-xs font-semibold">Booking Cancelled</p>
                    <p className="text-muted-foreground text-xs mt-0.5">No further actions available</p>
                  </div>
                </div>
              )}

              <hr className="border-border" />

              <a
                href={`https://wa.me/91${booking.customer_phone}?text=${encodeURIComponent(
                  `Hello ${booking.customer_name}, regarding your MangroveSpot booking *${booking.reference}*`
                )}`}
                target="_blank" rel="noopener noreferrer"
              >
                <Button variant="outline"
                  className="w-full border-green-500/40 text-green-400 hover:bg-green-500/10 gap-2"
                >
                  <MessageCircle size={14} /> WhatsApp Customer
                </Button>
              </a>

              <a href={`tel:${booking.customer_phone}`}>
                <Button variant="outline"
                  className="w-full border-border text-muted-foreground hover:text-white gap-2"
                >
                  <Phone size={14} /> Call Customer
                </Button>
              </a>
            </div>

          </div>
        </div>
      </div>

      <BottomTabBar currentPath={currentPath} onNavigate={href => router.push(href)} />
    </div>
  )
}