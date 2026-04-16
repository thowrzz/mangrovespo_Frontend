"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Plus, Pencil, Trash2, Eye, EyeOff,
  Loader2, Leaf, LayoutDashboard, BookOpen,
  LogOut, Palmtree, Search, ImageOff, Settings, Menu, X, Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { adminApi, AdminActivity } from "@/lib/admin-api"
import { toast } from "sonner"

// ── Nav Items ────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Dashboard",  icon: LayoutDashboard, href: "/admin" },
  { label: "Bookings",   icon: BookOpen,        href: "/admin/bookings" },
  { label: "Activities", icon: Palmtree,        href: "/admin/activities" },
  { label: "Settings",   icon: Settings,        href: "/admin/settings" },
]

// ── Helpers ──────────────────────────────────────────────────────
function fmt12(time: string): string {
  if (!time) return ""
  const [h, m] = time.split(":").map(Number)
  const suffix = h >= 12 ? "PM" : "AM"
  const h12    = h % 12 || 12
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`
}

// ── Mobile Drawer ────────────────────────────────────────────────
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

        <div className="px-3 py-4 border-t border-border shrink-0">
          <button
            onClick={() => { onLogout(); onClose() }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </>
  )
}

// ── Bottom Tab Bar ───────────────────────────────────────────────
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

// ── Main Page ────────────────────────────────────────────────────
export default function ActivitiesListPage() {
  const router   = useRouter()
  const pathname = usePathname()

  const [activities, setActivities] = useState<AdminActivity[]>([])
  const [loading,    setLoading]    = useState(true)
  const [search,     setSearch]     = useState("")
  const [togglingId, setTogglingId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const currentPath = pathname ?? "/admin/activities"

  useEffect(() => {
    adminApi.activities.list()
      .then(data => setActivities(data))   // list() returns AdminActivity[] directly
      .catch(() => toast.error("Failed to load activities"))
      .finally(() => setLoading(false))
  }, [])

  const filtered = activities.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    (a.category ?? "").toLowerCase().includes(search.toLowerCase())
  )

  const toggleVisibility = async (activity: AdminActivity) => {
    setTogglingId(activity.id)
    try {
      const updated = await adminApi.activities.update(activity.id, {
        is_visible: !activity.is_visible,
      })
      setActivities(prev =>
        prev.map(a => a.id === activity.id ? { ...a, is_visible: updated.is_visible } : a)
      )
      toast.success(`${activity.name} is now ${updated.is_visible ? "visible" : "hidden"}`)
    } catch {
      toast.error("Failed to update visibility")
    } finally {
      setTogglingId(null)
    }
  }

  const deleteActivity = async (activity: AdminActivity) => {
    if (!confirm(`Delete "${activity.name}"? This cannot be undone.`)) return
    setDeletingId(activity.id)
    try {
      await adminApi.activities.delete(activity.id)
      setActivities(prev => prev.filter(a => a.id !== activity.id))
      toast.success(`${activity.name} deleted`)
    } catch {
      toast.error("Failed to delete activity")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={href => router.push(href)}
        onLogout={() => adminApi.logout()}
        currentPath={currentPath}
      />

      {/* ── Top Header ──────────────────────────────────────── */}
      <header className="border-b border-border px-4 lg:px-6 py-3 lg:py-4 flex items-center gap-3 sticky top-0 bg-background/95 backdrop-blur-sm z-20">
        <button
          onClick={() => setDrawerOpen(true)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-white hover:bg-white/5 transition-colors shrink-0"
          aria-label="Open menu"
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

        <div className="ml-auto flex items-center gap-1">
          <Button
            onClick={() => router.push("/admin/activities/new")}
            size="sm"
            className="bg-accent hover:bg-accent/90 text-white md:hidden w-9 h-9 p-0"
            title="Add Activity"
          >
            <Plus size={16} />
          </Button>
          <Button
            variant="ghost" size="sm"
            onClick={() => adminApi.logout()}
            className="hidden md:flex text-muted-foreground hover:text-red-400 gap-1.5"
          >
            <LogOut size={14} /> Logout
          </Button>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-5 lg:py-8 flex flex-col gap-5 lg:gap-6 pb-24 md:pb-8">

        {/* Page Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-white">Activities</h1>
            <p className="text-muted-foreground text-xs lg:text-sm mt-0.5">
              {activities.length} total · {activities.filter(a => a.is_visible).length} visible
            </p>
          </div>
          <Button
            onClick={() => router.push("/admin/activities/new")}
            className="hidden md:flex bg-accent hover:bg-accent/90 text-white gap-2"
          >
            <Plus size={15} /> Add Activity
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search activities..."
            className="pl-9 bg-card border-border h-9 text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Activity Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-accent" size={28} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Palmtree size={36} className="text-muted-foreground" />
            <p className="text-white font-semibold">
              {search ? "No activities match your search" : "No activities yet"}
            </p>
            <p className="text-muted-foreground text-sm">
              {search ? `No results for "${search}"` : "Add your first activity to get started"}
            </p>
            {!search && (
              <Button
                onClick={() => router.push("/admin/activities/new")}
                className="bg-accent hover:bg-accent/90 text-white gap-2 mt-2"
              >
                <Plus size={14} /> Add your first activity
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(activity => {
              const openT  = activity.opening_time ?? ""
              const closeT = activity.closing_time ?? ""
              const hasHours = !!(openT && closeT)

              return (
                <div
                  key={activity.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-colors group"
                >
                  {/* Image */}
                  <div className="relative h-40 lg:h-44 bg-accent/5">
                    {activity.image_url ? (
                      <img
                        src={activity.image_url}
                        alt={activity.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageOff size={28} className="text-muted-foreground/40" />
                      </div>
                    )}

                    <div className="absolute top-2.5 right-2.5">
                      <Badge className={`text-xs border ${
                        activity.is_visible
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
                      }`}>
                        {activity.is_visible ? "Visible" : "Hidden"}
                      </Badge>
                    </div>

                    {activity.is_popular && (
                      <div className="absolute top-2.5 left-2.5">
                        <Badge className="text-xs border bg-accent/20 text-accent border-accent/30">
                          Popular
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <h3 className="text-white font-semibold text-sm lg:text-base leading-snug">
                        {activity.name}
                      </h3>
                      <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">
                        {activity.tagline || activity.category || "—"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-accent font-bold text-sm lg:text-base">
                          ₹{parseFloat(activity.base_price ?? "0").toLocaleString()}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {activity.pricing_type === "per_person" ? "per person" : "per group"}
                        </p>
                      </div>

                      {hasHours ? (
                        <div className="flex items-center gap-1 bg-accent/8 border border-accent/20 rounded-lg px-2 py-1">
                          <Clock size={11} className="text-accent shrink-0" />
                          <span className="text-accent text-[11px] font-medium tabular-nums">
                            {fmt12(openT)} – {fmt12(closeT)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 bg-zinc-500/10 border border-zinc-500/20 rounded-lg px-2 py-1">
                          <Clock size={11} className="text-zinc-500 shrink-0" />
                          <span className="text-zinc-500 text-[11px] font-medium">No hours set</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1 border-t border-border/40">
                      <Button
                        size="sm" variant="ghost"
                        onClick={() => router.push(`/admin/activities/${activity.id}`)}
                        className="flex-1 text-muted-foreground hover:text-white gap-1.5 text-xs"
                      >
                        <Pencil size={12} /> Edit
                      </Button>
                      <Button
                        size="sm" variant="ghost"
                        onClick={() => toggleVisibility(activity)}
                        disabled={togglingId === activity.id}
                        className="flex-1 text-muted-foreground hover:text-white gap-1.5 text-xs"
                      >
                        {togglingId === activity.id
                          ? <Loader2 size={12} className="animate-spin" />
                          : activity.is_visible
                            ? <EyeOff size={12} />
                            : <Eye size={12} />
                        }
                        {activity.is_visible ? "Hide" : "Show"}
                      </Button>
                      <Button
                        size="sm" variant="ghost"
                        onClick={() => deleteActivity(activity)}
                        disabled={deletingId === activity.id}
                        className="text-muted-foreground hover:text-red-400 text-xs px-2"
                      >
                        {deletingId === activity.id
                          ? <Loader2 size={12} className="animate-spin" />
                          : <Trash2 size={12} />
                        }
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <BottomTabBar currentPath={currentPath} onNavigate={href => router.push(href)} />
    </div>
  )
}