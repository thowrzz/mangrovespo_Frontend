"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Search, ChevronRight, ChevronLeft,
  Loader2, LayoutDashboard, BookOpen,
  LogOut, RefreshCw, X, Download, Clock,
  Filter, Leaf, Palmtree, Settings, Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { adminApi } from "@/lib/admin-api"
import { format } from "date-fns"

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-green-500/15 text-green-400 border-green-500/30",
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
  completed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  expired: "bg-gray-500/15 text-gray-400 border-gray-500/30",
}

const STATUS_OPTIONS = ["all", "confirmed", "pending", "cancelled", "completed"]

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Bookings", icon: BookOpen, href: "/admin/bookings" },
  { label: "Activities", icon: Palmtree, href: "/admin/activities" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
]

function getActivityNames(booking: any): string {
  if (!booking.items?.length) return "—"
  const names = booking.items
    .map((i: any) => i.activity_name)
    .filter(Boolean)

  if (names.length === 0) return "—"
  if (names.length === 1) return names[0]
  if (names.length === 2) return names.join(", ")
  return `${names[0]}, +${names.length - 1} more`
}

function getEarliestDate(booking: any): string {
  if (!booking.items?.length) return "—"
  const dates = booking.items
    .map((i: any) => i.visit_date)
    .filter(Boolean)
    .sort()

  if (!dates.length) return "—"

  try {
    return format(new Date(dates[0] + "T00:00:00"), "MMM d, yyyy")
  } catch {
    return dates[0]
  }
}

function getEarliestArrival(booking: any): string {
  if (!booking.items?.length) return "—"
  const sorted = [...booking.items]
    .filter((i: any) => i.visit_date)
    .sort((a: any, b: any) => a.visit_date.localeCompare(b.visit_date))

  if (!sorted.length) return "—"
  return sorted[0].slot_label ?? "—"
}

function MobileDrawer({
  open,
  onClose,
  onNavigate,
  onLogout,
  currentPath,
}: {
  open: boolean
  onClose: () => void
  onNavigate: (href: string) => void
  onLogout: () => void
  currentPath: string
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
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
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-border transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = currentPath === item.href
            return (
              <button
                key={item.href}
                onClick={() => {
                  onNavigate(item.href)
                  onClose()
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  active
                    ? "bg-accent/15 text-accent border border-accent/20"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={16} />
                {item.label}
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />}
              </button>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-border shrink-0">
          <button
            onClick={() => {
              onLogout()
              onClose()
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </>
  )
}

function BottomTabBar({
  currentPath,
  onNavigate,
}: {
  currentPath: string
  onNavigate: (href: string) => void
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-card/95 backdrop-blur-md border-t border-border">
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map((tab) => {
          const active = currentPath === tab.href
          return (
            <button
              key={tab.href}
              onClick={() => onNavigate(tab.href)}
              className={`relative flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                active ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-b-full" />
              )}
              <tab.icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              <span
                className={`text-[10px] font-medium leading-none ${
                  active ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function AdminBookingsPage() {
  const router = useRouter()
  const pathname = usePathname()

  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const currentPath = pathname ?? "/admin/bookings"

  const fetchBookings = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const params: Record<string, string> = { page: String(page) }
      if (search) params.search = search
      if (status !== "all") params.status = status
      if (dateFilter) params.items__visit_date = dateFilter

      const data = await adminApi.bookings.list(params)
      setBookings(data?.results ?? [])
      setTotalPages(Math.ceil((data?.count ?? 0) / 20))
      setTotalCount(data?.count ?? 0)
    } catch {
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [page, search, status, dateFilter])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const handleSearch = (v: string) => {
    setSearch(v)
    setPage(1)
  }

  const handleStatus = (v: string) => {
    setStatus(v)
    setPage(1)
  }

  const handleDate = (v: string) => {
    setDateFilter(v)
    setPage(1)
  }

  const clearFilters = () => {
    setSearch("")
    setStatus("all")
    setDateFilter("")
    setPage(1)
  }

  const hasFilters = search || status !== "all" || dateFilter

  const handleExport = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]
      const blob = await adminApi.reports.exportCsv("2020-01-01", today)
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `bookings-export-${today}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch {}
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={(href) => router.push(href)}
        onLogout={() => adminApi.logout()}
        currentPath={currentPath}
      />

      <header className="border-b border-border px-4 lg:px-6 py-3 lg:py-4 flex items-center gap-3 sticky top-0 bg-background/95 backdrop-blur-sm z-20">
        <button
          onClick={() => setDrawerOpen(true)}
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
          {NAV_ITEMS.map((item) => {
            const active = currentPath === item.href
            return (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                onClick={() => router.push(item.href)}
                className={`gap-1.5 ${
                  active ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-white"
                }`}
              >
                <item.icon size={14} />
                {item.label}
              </Button>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fetchBookings(true)}
            disabled={refreshing}
            className="text-muted-foreground hover:text-white w-9 h-9 p-0"
            title="Refresh"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => adminApi.logout()}
            className="hidden md:flex text-muted-foreground hover:text-red-400 gap-1.5"
          >
            <LogOut size={14} /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5 lg:py-8 flex flex-col gap-5 lg:gap-6 pb-24 md:pb-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-white">Bookings</h1>
            <p className="text-muted-foreground text-xs lg:text-sm mt-0.5">
              {totalCount} total booking{totalCount !== 1 ? "s" : ""}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="border-border text-muted-foreground hover:text-white gap-1.5"
          >
            <Download size={14} /> Export CSV
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search name, phone, reference..."
                className="pl-8 bg-card border-border text-sm h-9"
              />
              {search && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => handleDate(e.target.value)}
              className="bg-card border border-border rounded-xl px-3 py-1.5 text-sm text-muted-foreground h-9 hover:border-accent/50 transition-colors"
            />

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-400 transition-colors px-2"
              >
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleStatus(s)}
                className={`px-3 lg:px-4 py-1.5 rounded-xl text-xs font-semibold border capitalize transition-all ${
                  status === s
                    ? "bg-accent text-accent-foreground border-transparent"
                    : "border-border text-muted-foreground hover:text-white hover:border-accent/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {loading && (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="animate-spin text-accent" size={28} />
            </div>
          )}

          {!loading && bookings.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center gap-3">
              <Filter size={36} className="text-muted-foreground" />
              <p className="text-white font-semibold">No bookings found</p>
              <p className="text-muted-foreground text-sm">
                {hasFilters ? "Try adjusting your filters" : "No bookings yet"}
              </p>
              {hasFilters && (
                <button onClick={clearFilters} className="text-accent text-sm hover:underline mt-1">
                  Clear filters
                </button>
              )}
            </div>
          )}

          {!loading && bookings.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background/50">
                    {["Reference", "Customer", "Activities", "Visit Date", "Arrival", "Amount", "Status", ""].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 lg:px-5 py-3 text-xs text-muted-foreground font-medium whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b: any) => {
                    const grandTotal = parseFloat(b.grand_total ?? 0)
                    const amountPaid = parseFloat(b.amount_paid ?? 0)
                    const balanceDue = parseFloat(b.balance_due ?? 0)

                    return (
                      <tr
                        key={b.id}
                        onClick={() => router.push(`/admin/bookings/${b.id}`)}
                        className="border-b border-border/40 hover:bg-accent/5 active:bg-accent/10 transition-colors cursor-pointer"
                      >
                        <td className="px-4 lg:px-5 py-3 lg:py-4">
                          <span className="font-mono text-accent text-xs font-semibold">
                            {b.reference ?? "—"}
                          </span>
                        </td>

                        <td className="px-4 lg:px-5 py-3 lg:py-4 min-w-[130px]">
                          <p className="text-white font-medium text-xs lg:text-sm whitespace-nowrap">
                            {b.customer_name ?? "—"}
                          </p>
                          <p className="text-muted-foreground text-xs mt-0.5">
                            {b.customer_phone ?? b.customer_email ?? ""}
                          </p>
                        </td>

                        <td className="px-4 lg:px-5 py-3 lg:py-4 max-w-[160px]">
                          <p className="text-muted-foreground text-xs truncate">
                            {getActivityNames(b)}
                          </p>
                          <p className="text-xs text-muted-foreground/60 mt-0.5">
                            {b.items?.length ?? 0} item{(b.items?.length ?? 0) !== 1 ? "s" : ""}
                          </p>
                        </td>

                        <td className="px-4 lg:px-5 py-3 lg:py-4 text-muted-foreground text-xs whitespace-nowrap">
                          {getEarliestDate(b)}
                        </td>

                        <td className="px-4 lg:px-5 py-3 lg:py-4">
                          <div className="flex items-center gap-1.5 text-muted-foreground text-xs whitespace-nowrap">
                            <Clock size={11} />
                            {getEarliestArrival(b)}
                          </div>
                        </td>

                        <td className="px-4 lg:px-5 py-3 lg:py-4 whitespace-nowrap">
                          <p className="text-white font-semibold text-xs lg:text-sm">
                            ₹{grandTotal.toLocaleString()}
                          </p>
                          {balanceDue > 0 && (
                            <p className="text-xs text-yellow-400 mt-0.5">
                              ₹{amountPaid.toLocaleString()} paid · ₹{balanceDue.toLocaleString()} at arrival
                            </p>
                          )}
                        </td>

                        <td className="px-4 lg:px-5 py-3 lg:py-4">
                          <Badge
                            className={`border text-[10px] lg:text-xs capitalize ${
                              STATUS_COLORS[b.status] ?? "bg-gray-500/15 text-gray-400 border-gray-500/30"
                            }`}
                          >
                            {b.status ?? "—"}
                          </Badge>
                        </td>

                        <td className="px-4 lg:px-5 py-3 lg:py-4">
                          <ChevronRight size={14} className="text-muted-foreground" />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Page <span className="text-white font-medium">{page}</span> of{" "}
              <span className="text-white font-medium">{totalPages}</span>
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="border-border gap-1"
              >
                <ChevronLeft size={14} /> Prev
              </Button>

              <div className="hidden sm:flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                    if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...")
                    acc.push(p)
                    return acc
                  }, [])
                  .map((p, i) =>
                    p === "..." ? (
                      <span key={`dots-${i}`} className="px-2 text-muted-foreground text-sm self-center">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p as number)}
                        className={`w-8 h-8 rounded-lg text-xs font-medium border transition-all ${
                          page === p
                            ? "bg-accent text-accent-foreground border-transparent"
                            : "border-border text-muted-foreground hover:text-white"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="border-border gap-1"
              >
                Next <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </div>

      <BottomTabBar currentPath={currentPath} onNavigate={(href) => router.push(href)} />
    </div>
  )
}