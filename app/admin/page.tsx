
"use client"
import { useEffect, useState, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  TrendingUp, Users, CalendarCheck, IndianRupee,
  Loader2, RefreshCw, LogOut, LayoutDashboard,
  BookOpen, ChevronRight, ArrowUpRight, ArrowDownRight,
  Clock, Leaf, Palmtree, Settings, CalendarDays, Menu, X
} from "lucide-react"


import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { adminApi } from "@/lib/admin-api"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts"
import { format } from "date-fns"

// ── Constants ────────────────────────────────────────────────────
const PIE_COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#bbf7d0", "#dcfce7"]

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-green-500/15 text-green-400 border-green-500/30",
  pending:   "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
  completed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
}

// ── Nav items shared between top nav, drawer, and bottom tabs ────
const NAV_ITEMS = [
  { label: "Dashboard",  icon: LayoutDashboard, href: "/admin" },
  { label: "Bookings",   icon: BookOpen,        href: "/admin/bookings" },
  { label: "Activities", icon: Palmtree,        href: "/admin/activities" },
  { label: "Settings",   icon: Settings,        href: "/admin/settings" },
]

// ── Mobile Slide-in Drawer ───────────────────────────────────────
function MobileDrawer({
  open, onClose, onNavigate, onLogout, currentPath,
}: {
  open: boolean
  onClose: () => void
  onNavigate: (href: string) => void
  onLogout: () => void
  currentPath: string
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-card border-r border-border flex flex-col shadow-2xl">

        {/* Header */}
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

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const active = currentPath === item.href
            return (
              <button
                key={item.href}
                onClick={() => { onNavigate(item.href); onClose() }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left
                  ${active
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

        {/* Logout */}
        <div className="px-3 py-4 border-t border-border shrink-0">
          <button
            onClick={() => { onLogout(); onClose() }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

// ── Bottom Tab Bar (mobile only, md:hidden) ──────────────────────
function BottomTabBar({ currentPath, onNavigate }: {
  currentPath: string
  onNavigate: (href: string) => void
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-card/95 backdrop-blur-md border-t border-border safe-area-pb">
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map(tab => {
          const active = currentPath === tab.href
          return (
            <button
              key={tab.href}
              onClick={() => onNavigate(tab.href)}
              className={`relative flex-1 flex flex-col items-center justify-center gap-1 transition-colors
                ${active ? "text-accent" : "text-muted-foreground"}`}
            >
              {/* Active pill indicator */}
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-b-full" />
              )}
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

// ── Stat Card ────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, trend }: {
  icon: any; label: string; value: string | number; sub?: string; trend?: number
}) {
  const positive = (trend ?? 0) >= 0
  return (
    <div className="bg-card border border-border rounded-2xl p-4 lg:p-5 flex flex-col gap-3 lg:gap-4">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-accent/15 flex items-center justify-center">
          <Icon size={16} className="text-accent" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-0.5 text-xs font-semibold ${positive ? "text-green-400" : "text-red-400"}`}>
            {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-xl lg:text-3xl font-bold text-white tracking-tight">{value}</p>
        <p className="text-muted-foreground text-xs lg:text-sm mt-0.5">{label}</p>
        {sub && <p className="text-xs text-muted-foreground/60 mt-0.5 hidden lg:block">{sub}</p>}
      </div>
    </div>
  )
}

// ── Revenue Tooltip ──────────────────────────────────────────────
function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-xl">
      <p className="text-muted-foreground text-xs mb-1">{label}</p>
      <p className="text-white font-bold">₹{Number(payload[0].value).toLocaleString()}</p>
    </div>
  )
}

// ── Booking Table ────────────────────────────────────────────────
function BookingTable({
  bookings, onRowClick,
  emptyIcon: EmptyIcon = CalendarCheck,
  emptyTitle = "No bookings",
  emptySubtitle = "Bookings will appear here",
}: {
  bookings: any[]
  onRowClick: (id: number) => void
  emptyIcon?: any
  emptyTitle?: string
  emptySubtitle?: string
}) {
  if (!bookings.length) {
    return (
      <div className="px-6 py-12 text-center flex flex-col items-center gap-2">
        <EmptyIcon size={30} className="text-muted-foreground" />
        <p className="text-white font-semibold mt-1">{emptyTitle}</p>
        <p className="text-muted-foreground text-sm">{emptySubtitle}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-background/50">
            {["Reference", "Customer", "Activities", "Slot", "Amount", "Status", ""].map(h => (
              <th key={h} className="text-left px-4 lg:px-6 py-3 text-xs text-muted-foreground font-medium whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((b: any) => (
            <tr
              key={b.id}
              onClick={() => onRowClick(b.id)}
              className="border-b border-border/40 hover:bg-accent/5 active:bg-accent/10 transition-colors cursor-pointer"
            >
              <td className="px-4 lg:px-6 py-3 lg:py-4">
                <span className="font-mono text-accent text-xs font-semibold">
                  {b.reference ?? b.booking_reference ?? "—"}
                </span>
              </td>
              <td className="px-4 lg:px-6 py-3 lg:py-4">
                <p className="text-white font-medium whitespace-nowrap text-xs lg:text-sm">{b.customer_name}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{b.customer_phone}</p>
              </td>
              <td className="px-4 lg:px-6 py-3 lg:py-4 max-w-[140px] lg:max-w-[200px]">
                <p className="text-muted-foreground truncate text-xs">
                  {Array.isArray(b.activities) ? b.activities.join(", ") : (b.activities || "—")}
                </p>
              </td>
              <td className="px-4 lg:px-6 py-3 lg:py-4">
                <div className="flex items-center gap-1 text-muted-foreground text-xs whitespace-nowrap">
                  <Clock size={10} />
                  {b.earliest_slot || "—"}
                </div>
              </td>
              <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                <span className="text-white font-semibold text-xs lg:text-sm">
                  ₹{parseFloat(b.grand_total || "0").toLocaleString()}
                </span>
              </td>
              <td className="px-4 lg:px-6 py-3 lg:py-4">
                <Badge className={`border text-[10px] lg:text-xs capitalize ${STATUS_COLORS[b.status] ?? "bg-gray-500/15 text-gray-400 border-gray-500/30"}`}>
                  {b.status}
                </Badge>
              </td>
              <td className="px-4 lg:px-6 py-3 lg:py-4">
                <ChevronRight size={14} className="text-muted-foreground" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router   = useRouter()
  const pathname = usePathname()

  const [stats,      setStats]      = useState<any>(null)
  const [revenue,    setRevenue]    = useState<any[]>([])
  const [breakdown,  setBreakdown]  = useState<any[]>([])
  const [loading,    setLoading]    = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [days,       setDays]       = useState(7)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const fetchData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true)
    else setLoading(true)
    try {
      const [s, r, b] = await Promise.all([
        adminApi.dashboard.stats(),
        adminApi.dashboard.revenueChart(days),
        adminApi.dashboard.activityBreakdown(),
      ])
      setStats(s)
      setRevenue(r.data ?? [])
      setBreakdown(b.data ?? [])
    } catch {
      // 401 → adminApi redirects to /admin/login automatically
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [days])

  useEffect(() => { fetchData() }, [fetchData])

  const currentPath = pathname ?? "/admin"
  const todayList    = stats?.today_booking_list    ?? []
  const tomorrowList = stats?.tomorrow_booking_list ?? []

  // ── Full-page loader ──────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
          <Leaf size={22} className="text-accent" />
        </div>
        <Loader2 className="animate-spin text-accent" size={24} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Mobile drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={href => router.push(href)}
        onLogout={() => adminApi.logout()}
        currentPath={currentPath}
      />

      {/* ── Top header ───────────────────────────────────────── */}
      <header className="border-b border-border px-4 lg:px-6 py-3 lg:py-4 flex items-center gap-3 sticky top-0 bg-background/95 backdrop-blur-sm z-20">

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-white hover:bg-white/5 transition-colors shrink-0"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Leaf size={15} className="text-accent" />
          </div>
          <span className="text-white font-bold text-sm lg:text-base">
            <span className="hidden sm:inline">MangroveSpot </span>Admin
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 ml-6">
          {NAV_ITEMS.map(item => {
            const active = currentPath === item.href
            return (
              <Button
                key={item.href}
                variant="ghost" size="sm"
                onClick={() => router.push(item.href)}
                className={`gap-1.5 ${active ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-white"}`}
              >
                <item.icon size={14} /> {item.label}
              </Button>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-1">
          {/* Refresh — always visible */}
          <Button
            variant="ghost" size="sm"
            onClick={() => fetchData(true)}
            disabled={refreshing}
            className="text-muted-foreground hover:text-white w-9 h-9 p-0"
            title="Refresh data"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          </Button>

          {/* Logout — desktop only (drawer has it on mobile) */}
          <Button
            variant="ghost" size="sm"
            onClick={() => adminApi.logout()}
            className="hidden md:flex text-muted-foreground hover:text-red-400 gap-1.5"
          >
            <LogOut size={14} /> Logout
          </Button>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────── */}
      {/* pb-20 clears the fixed bottom tab bar on mobile */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5 lg:py-8 flex flex-col gap-5 lg:gap-8 pb-24 md:pb-8">

        {/* Page title */}
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-muted-foreground text-xs lg:text-sm mt-0.5">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <StatCard
            icon={IndianRupee}
            label="Today's Revenue"
            value={`₹${(stats?.today_revenue ?? 0).toLocaleString()}`}
            sub="Paid bookings only"
            trend={stats?.revenue_trend}
          />
          <StatCard
            icon={CalendarCheck}
            label="Today's Bookings"
            value={stats?.today_bookings ?? 0}
            sub="New today"
            trend={stats?.booking_trend}
          />
          <StatCard
            icon={Users}
            label="Total Customers"
            value={(stats?.total_customers ?? 0).toLocaleString()}
            sub="All time"
          />
          <StatCard
            icon={TrendingUp}
            label="Month Revenue"
            value={`₹${(stats?.month_revenue ?? 0).toLocaleString()}`}
            sub={`${stats?.month_bookings ?? 0} bookings`}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

          {/* Revenue bar chart */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-4 lg:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-sm lg:text-base">Revenue Overview</h2>
                <p className="text-muted-foreground text-xs mt-0.5">Last {days} days</p>
              </div>
              <div className="flex gap-1">
                {[7, 14, 30].map(d => (
                  <button
                    key={d}
                    onClick={() => setDays(d)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all
                      ${days === d ? "bg-accent text-white" : "text-muted-foreground hover:text-white"}`}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>
            {revenue.length === 0 ? (
              <div className="h-44 flex items-center justify-center text-muted-foreground text-sm">No revenue data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={revenue} barSize={days <= 7 ? 22 : days <= 14 ? 14 : 8}>
                  <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    axisLine={false} tickLine={false}
                    tickFormatter={v => v >= 1000 ? `₹${(v / 1000).toFixed(0)}k` : `₹${v}`}
                    width={42}
                  />
                  <Tooltip content={<RevenueTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="revenue" fill="#16a34a" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Pie chart */}
          <div className="bg-card border border-border rounded-2xl p-4 lg:p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-white font-bold text-sm lg:text-base">Popular Activities</h2>
              <p className="text-muted-foreground text-xs mt-0.5">By booking count</p>
            </div>
            {breakdown.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm py-8">No data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={breakdown} cx="50%" cy="40%" innerRadius={44} outerRadius={68} dataKey="count" nameKey="activity" paddingAngle={3}>
                    {breakdown.map((_: any, i: number) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#1c1c1c", border: "1px solid #27272a", borderRadius: 12 }}
                    formatter={(v: any) => [v, "Bookings"]}
                  />
                  <Legend
                    iconType="circle" iconSize={7}
                    formatter={val => <span style={{ color: "#9ca3af", fontSize: 10 }}>{val}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Today's bookings */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 lg:px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarCheck size={15} className="text-accent shrink-0" />
              <div>
                <h2 className="text-white font-bold text-sm lg:text-base">Today's Bookings</h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {todayList.length} booking{todayList.length !== 1 ? "s" : ""} · {format(new Date(), "MMM d, yyyy")}
                </p>
              </div>
            </div>
            <Button
              variant="ghost" size="sm"
              onClick={() => router.push("/admin/bookings")}
              className="text-accent hover:text-accent/80 gap-1 text-xs shrink-0"
            >
              View All <ChevronRight size={13} />
            </Button>
          </div>
          <BookingTable
            bookings={todayList}
            onRowClick={id => router.push(`/admin/bookings/${id}`)}
            emptyIcon={CalendarCheck}
            emptyTitle="No bookings today yet"
            emptySubtitle="New bookings will appear here"
          />
        </div>

        {/* Tomorrow's bookings */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 lg:px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-accent shrink-0" />
              <div>
                <h2 className="text-white font-bold text-sm lg:text-base">Tomorrow's Bookings</h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {tomorrowList.length} booking{tomorrowList.length !== 1 ? "s" : ""} · {format(new Date(Date.now() + 86400000), "MMM d, yyyy")}
                </p>
              </div>
            </div>
            <Button
              variant="ghost" size="sm"
              onClick={() => router.push(`/admin/bookings?date=${format(new Date(Date.now() + 86400000), "yyyy-MM-dd")}`)}
              className="text-accent hover:text-accent/80 gap-1 text-xs shrink-0"
            >
              View All <ChevronRight size={13} />
            </Button>
          </div>
          <BookingTable
            bookings={tomorrowList}
            onRowClick={id => router.push(`/admin/bookings/${id}`)}
            emptyIcon={CalendarDays}
            emptyTitle="No bookings for tomorrow"
            emptySubtitle="Tomorrow's confirmed bookings will appear here"
          />
        </div>

      </div>

      {/* ── Bottom Tab Bar — mobile only ──────────────────────── */}
      <BottomTabBar currentPath={currentPath} onNavigate={href => router.push(href)} />

    </div>
  )
}