"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import {
  ArrowLeft, Loader2, Leaf, LayoutDashboard,
  BookOpen, LogOut, Palmtree, Plus,
  Trash2, Upload, Save, Clock, Pencil,
  Menu, X, Settings, ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { adminApi, parseApiError } from "@/lib/admin-api"
import { toast } from "sonner"

// ── Nav items ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Dashboard",  icon: LayoutDashboard, href: "/admin" },
  { label: "Bookings",   icon: BookOpen,        href: "/admin/bookings" },
  { label: "Activities", icon: Palmtree,        href: "/admin/activities" },
  { label: "Settings",   icon: Settings,        href: "/admin/settings" },
]

// ── Mobile Drawer ──────────────────────────────────────────────────────────
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
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-border transition-colors">
            <X size={16} />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const active = currentPath === item.href || currentPath.startsWith(item.href + "/")
            return (
              <button
                key={item.href}
                onClick={() => { onNavigate(item.href); onClose() }}
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

// ── Bottom Tab Bar ─────────────────────────────────────────────────────────
function BottomTabBar({ currentPath, onNavigate }: {
  currentPath: string
  onNavigate: (href: string) => void
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-card/95 backdrop-blur-md border-t border-border">
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map(tab => {
          const active = currentPath === tab.href || currentPath.startsWith(tab.href + "/")
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
              <span className="text-[10px] font-medium leading-none">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Constants ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  { value: "water",     label: "Water"     },
  { value: "thrill",    label: "Thrill"    },
  { value: "land",      label: "Land"      },
  { value: "cultural",  label: "Cultural"  },
  { value: "group_fun", label: "Group Fun" },
  { value: "skill",     label: "Skill"     },
]

const PRICING_TYPES = [
  { value: "per_person", label: "Per Person" },
  { value: "per_group",  label: "Per Group"  },
]

// ── Field wrapper ──────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  )
}

// ── Toggle switch ──────────────────────────────────────────────────────────
function Toggle({ checked, onChange, disabled = false }: {
  checked: boolean
  onChange: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex shrink-0 items-center w-11 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed
        ${checked ? "bg-accent" : "bg-border"}`}
    >
      <span className={`inline-block w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200
        ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  )
}

// ── Rule row ───────────────────────────────────────────────────────────────
function RuleRow({
  rule, onDelete, onUpdate, deletingRuleId,
}: {
  rule: { id: number; rule: string; order: number }
  onDelete: (id: number) => void
  onUpdate: (id: number, text: string) => void
  deletingRuleId: number | null
}) {
  const [editing, setEditing] = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [draft,   setDraft]   = useState(rule.rule)

  const handleSave = async () => {
    if (!draft.trim()) { toast.error("Rule cannot be empty"); return }
    setSaving(true)
    try {
      await adminApi.activities.rules.update(rule.id, { rule: draft, order: rule.order })
      onUpdate(rule.id, draft)
      setEditing(false)
      toast.success("Rule updated")
    } catch (err: any) {
      toast.error(parseApiError(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-background border border-border/50 rounded-xl overflow-hidden">
      {!editing ? (
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <ShieldCheck size={13} className="text-accent" />
            </div>
            <p className="text-white text-sm">{rule.rule}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button size="sm" variant="ghost" onClick={() => { setDraft(rule.rule); setEditing(true) }}
              className="text-muted-foreground hover:text-accent hover:bg-accent/10 w-8 h-8 p-0 rounded-lg">
              <Pencil size={13} />
            </Button>
            <Button size="sm" variant="ghost"
              onClick={() => onDelete(rule.id)}
              disabled={deletingRuleId === rule.id}
              className="text-muted-foreground hover:text-red-400 hover:bg-red-500/10 w-8 h-8 p-0 rounded-lg">
              {deletingRuleId === rule.id
                ? <Loader2 size={13} className="animate-spin" />
                : <Trash2 size={13} />}
            </Button>
          </div>
        </div>
      ) : (
        <div className="px-4 py-4 flex flex-col gap-3 bg-accent/[0.03] border-l-2 border-accent/40">
          <div className="flex items-center justify-between">
            <p className="text-accent text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <Pencil size={11} /> Editing Rule
            </p>
            <button type="button" onClick={() => setEditing(false)} className="text-muted-foreground hover:text-white text-xs transition-colors">
              Cancel
            </button>
          </div>
          <Input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") setEditing(false) }}
            className="bg-background border-border h-10 text-sm"
            autoFocus
          />
          <Button size="sm" onClick={handleSave} disabled={saving}
            className="self-start bg-accent hover:bg-accent/90 text-white gap-1.5 h-9 px-4">
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            Save Rule
          </Button>
        </div>
      )}
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function ActivityFormPage() {
  const params      = useParams()
  const router      = useRouter()
  const pathname    = usePathname()
  const isNew       = params.id === "new"
  const activityId  = isNew ? null : Number(params.id)
  const currentPath = pathname ?? "/admin/activities"

  const [loading,       setLoading]       = useState(!isNew)
  const [saving,        setSaving]        = useState(false)
  const [imageFile,     setImageFile]     = useState<File | null>(null)
  const [imagePreview,  setImagePreview]  = useState<string>("")
  const [uploadingImg,  setUploadingImg]  = useState(false)
  const [drawerOpen,    setDrawerOpen]    = useState(false)

  const objectUrlRef = useRef<string | null>(null)

  // ── Rules state ────────────────────────────────────────────────────────
  const [rules,          setRules]          = useState<{ id: number; rule: string; order: number }[]>([])
  const [newRule,        setNewRule]        = useState("")
  const [addingRule,     setAddingRule]     = useState(false)
  const [deletingRuleId, setDeletingRuleId] = useState<number | null>(null)

  // ── Form state ─────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    name:                "",
    tagline:             "",
    description:         "",
    category:            "water",
    base_price:          "",
    child_price:         "",
    pricing_type:        "per_person",
    extra_person_charge: "",
    min_persons:         "1",
    max_persons:         "10",
    duration:            "",
    opening_time:        "09:00",
    closing_time:        "17:00",
    is_visible:          true,
    is_popular:          false,
    requires_prebooking: true,
    display_order:       "0",
  })

  const set = (key: string, value: any) =>
    setForm(prev => ({ ...prev, [key]: value }))

  // Revoke object URL on unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  // ── Load existing activity ────────────────────────────────────────────
  useEffect(() => {
    if (isNew) return
    Promise.all([
      adminApi.activities.detail(activityId!),
      adminApi.activities.rules.list(activityId!),
    ])
      .then(([activity, rulesData]: any) => {
        setForm({
          name:                activity.name                ?? "",
          tagline:             activity.tagline             ?? "",
          description:         activity.description         ?? "",
          category:            activity.category            ?? "water",
          base_price:          String(activity.base_price   ?? ""),
          child_price:         activity.child_price != null ? String(activity.child_price) : "",
          pricing_type:        activity.pricing_type        ?? "per_person",
          extra_person_charge: String(activity.extra_person_charge ?? ""),
          min_persons:         String(activity.min_persons  ?? "1"),
          max_persons:         String(activity.max_persons  ?? "10"),
          duration:            activity.duration            ?? "",
          opening_time:        activity.opening_time        ?? "09:00",
          closing_time:        activity.closing_time        ?? "17:00",
          is_visible:          activity.is_visible          ?? true,
          is_popular:          activity.is_popular          ?? false,
          requires_prebooking: activity.requires_prebooking ?? true,
          display_order:       String(activity.display_order ?? "0"),
        })
        if (activity.image_url) setImagePreview(activity.image_url)

        const rawRules = rulesData?.results ?? rulesData
        setRules(Array.isArray(rawRules) ? rawRules : [])
      })
      .catch(() => toast.error("Failed to load activity"))
      .finally(() => setLoading(false))
  }, [activityId, isNew])

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    const url = URL.createObjectURL(file)
    objectUrlRef.current = url
    setImageFile(file)
    setImagePreview(url)
  }

  // ── Validate operating hours ──────────────────────────────────────────
  const validateHours = (): boolean => {
    if (!form.opening_time || !form.closing_time) {
      toast.error("Both opening and closing times are required")
      return false
    }
    if (form.opening_time >= form.closing_time) {
      toast.error("Opening time must be before closing time")
      return false
    }
    return true
  }

  // ── Save activity ─────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.name.trim()) { toast.error("Activity name is required"); return }
    if (!form.base_price)  { toast.error("Base price is required");    return }
    if (!validateHours())  return

    setSaving(true)
    try {
      const payload = {
        ...form,
        base_price:          parseFloat(form.base_price)          || 0,
        child_price:         form.child_price ? parseFloat(form.child_price) : null,
        extra_person_charge: parseFloat(form.extra_person_charge) || 0,
        min_persons:         parseInt(form.min_persons,   10)     || 1,
        max_persons:         parseInt(form.max_persons,   10)     || 10,
        display_order:       parseInt(form.display_order, 10)     || 0,
      }

      let saved: any
      if (isNew) {
        saved = await adminApi.activities.create(payload)
        toast.success("Activity created!")
      } else {
        saved = await adminApi.activities.update(activityId!, payload)
        toast.success("Activity updated!")
      }

      if (imageFile && saved?.id) {
        setUploadingImg(true)
        try {
          await adminApi.activities.uploadImage(saved.id, imageFile)
          toast.success("Image uploaded!")
        } catch (imgErr: any) {
          toast.error("Saved but image upload failed: " + parseApiError(imgErr))
        } finally {
          setUploadingImg(false)
        }
      }

      router.push("/admin/activities")
    } catch (err: any) {
      toast.error(parseApiError(err), { duration: 6000 })
    } finally {
      setSaving(false)
    }
  }

  // ── Rule handlers ─────────────────────────────────────────────────────
  const handleAddRule = async () => {
    if (!newRule.trim()) { toast.error("Rule text is required"); return }
    if (!activityId)     { toast.error("Save the activity first before adding rules"); return }

    setAddingRule(true)
    try {
      const created = await adminApi.activities.rules.create(activityId, {
        rule:  newRule.trim(),
        order: rules.length,
      })
      setRules(prev => [...prev, created])
      setNewRule("")
      toast.success("Rule added")
    } catch (err: any) {
      toast.error(parseApiError(err))
    } finally {
      setAddingRule(false)
    }
  }

  const handleDeleteRule = async (ruleId: number) => {
    setDeletingRuleId(ruleId)
    try {
      await adminApi.activities.rules.delete(ruleId)
      setRules(prev => prev.filter(r => r.id !== ruleId))
      toast.success("Rule deleted")
    } catch (err: any) {
      toast.error(parseApiError(err))
    } finally {
      setDeletingRuleId(null)
    }
  }

  const handleDeleteActivity = async () => {
    if (!confirm(`Delete "${form.name}"? This cannot be undone.`)) return
    try {
      await adminApi.activities.delete(activityId!)
      toast.success("Activity deleted")
      router.push("/admin/activities")
    } catch (err: any) {
      toast.error(parseApiError(err))
    }
  }

  // ── Operating hours preview ───────────────────────────────────────────
  const fmt12 = (t: string) => {
    if (!t) return ""
    const [h, m] = t.split(":").map(Number)
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={28} />
      </div>
    )
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

      {/* ── Top header ─────────────────────────────────────────────────── */}
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
            const active = currentPath === item.href || currentPath.startsWith(item.href + "/")
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

        <button
          onClick={() => router.push("/admin/activities")}
          className="md:hidden flex items-center gap-1 text-muted-foreground hover:text-white text-xs transition-colors ml-1"
        >
          <ArrowLeft size={14} /> Activities
        </button>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost" size="sm"
            onClick={() => adminApi.logout()}
            className="hidden md:flex text-muted-foreground hover:text-red-400 gap-1.5"
          >
            <LogOut size={14} /> Logout
          </Button>
        </div>
      </header>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-5 lg:py-6 flex flex-col gap-5 pb-36 md:pb-8">

        <div className="hidden md:block">
          <button
            onClick={() => router.push("/admin/activities")}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-white text-sm mb-3 transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            All Activities
          </button>
          <h1 className="text-2xl font-bold text-white">
            {isNew ? "Add New Activity" : `Edit: ${form.name}`}
          </h1>
        </div>

        <h1 className="md:hidden text-xl font-bold text-white">
          {isNew ? "Add New Activity" : `Edit: ${form.name}`}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">

          {/* ── LEFT col ───────────────────────────────────────────────── */}
          <div className="md:col-span-2 flex flex-col gap-5">

            {/* Basic Info */}
            <section className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
              <h2 className="text-white font-bold">Basic Information</h2>
              <Field label="Activity Name *">
                <Input value={form.name} onChange={e => set("name", e.target.value)}
                  placeholder="e.g. Kayaking Adventure"
                  className="bg-background border-border h-11" />
              </Field>
              <Field label="Tagline">
                <Input value={form.tagline} onChange={e => set("tagline", e.target.value)}
                  placeholder="Short one-liner shown on cards"
                  className="bg-background border-border h-11" />
              </Field>
              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={e => set("description", e.target.value)}
                  placeholder="Full description of the activity..."
                  rows={4}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-muted-foreground resize-none focus:outline-none focus:border-accent/50 transition-colors"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <select value={form.category} onChange={e => set("category", e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors h-11">
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value} className="bg-card">{c.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Duration">
                  <Input value={form.duration} onChange={e => set("duration", e.target.value)}
                    placeholder="e.g. 2 hours"
                    className="bg-background border-border h-11" />
                </Field>
              </div>
            </section>

            {/* Pricing */}
            <section className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
              <h2 className="text-white font-bold">Pricing</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Adult Price (₹) *">
                  <Input type="number" min="0" value={form.base_price}
                    onChange={e => set("base_price", e.target.value)}
                    placeholder="750" className="bg-background border-border h-11" />
                </Field>
                <Field label="Child Price (₹)">
                  <Input type="number" min="0" value={form.child_price}
                    onChange={e => set("child_price", e.target.value)}
                    placeholder="Leave blank = same as adult"
                    className="bg-background border-border h-11" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Pricing Type">
                  <select value={form.pricing_type} onChange={e => set("pricing_type", e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors h-11">
                    {PRICING_TYPES.map(p => (
                      <option key={p.value} value={p.value} className="bg-card">{p.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Extra Person Charge (₹)">
                  <Input type="number" min="0" value={form.extra_person_charge}
                    onChange={e => set("extra_person_charge", e.target.value)}
                    placeholder="0" className="bg-background border-border h-11" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Min Persons">
                  <Input type="number" min="1" value={form.min_persons}
                    onChange={e => set("min_persons", e.target.value)}
                    className="bg-background border-border h-11" />
                </Field>
                <Field label="Max Persons">
                  <Input type="number" min="1" value={form.max_persons}
                    onChange={e => set("max_persons", e.target.value)}
                    className="bg-background border-border h-11" />
                </Field>
              </div>
              {form.child_price === "" && (
                <p className="text-xs text-muted-foreground bg-accent/5 border border-accent/15 rounded-lg px-3 py-2">
                  💡 Child Price is blank — children will be charged the same as adults.
                </p>
              )}
            </section>

            {/* ── Operating Hours ─────────────────────────────────────── */}
            <section className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
              <div>
                <h2 className="text-white font-bold">Operating Hours</h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Visitors can pick any arrival time within this window
                </p>
              </div>

              {/* Time range pickers */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Opening Time *">
                  <Input
                    type="time"
                    value={form.opening_time}
                    onChange={e => set("opening_time", e.target.value)}
                    className="bg-background border-border h-11"
                  />
                </Field>
                <Field label="Closing Time *">
                  <Input
                    type="time"
                    value={form.closing_time}
                    onChange={e => set("closing_time", e.target.value)}
                    className="bg-background border-border h-11"
                  />
                </Field>
              </div>

              {/* Live preview */}
              {form.opening_time && form.closing_time && (
                <div className={`flex items-center gap-2 rounded-xl px-4 py-3 border
                  ${form.opening_time < form.closing_time
                    ? "bg-accent/8 border-accent/20"
                    : "bg-red-500/8 border-red-500/20"
                  }`}
                >
                  <Clock size={14} className={form.opening_time < form.closing_time ? "text-accent" : "text-red-400"} />
                  {form.opening_time < form.closing_time ? (
                    <p className="text-accent text-sm font-medium">
                      Open {fmt12(form.opening_time)} – {fmt12(form.closing_time)}
                    </p>
                  ) : (
                    <p className="text-red-400 text-sm font-medium">
                      ⚠ Closing time must be after opening time
                    </p>
                  )}
                </div>
              )}

              <p className="text-muted-foreground text-xs">
                When booking, visitors will see a time picker constrained to this window. No fixed slots — they choose freely.
              </p>
            </section>

            {/* Activity Rules */}
            <section className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
              <div>
                <h2 className="text-white font-bold">Activity Rules</h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {isNew
                    ? "Save the activity first, then add rules"
                    : `${rules.length} rule${rules.length !== 1 ? "s" : ""} — shown on the activity page`}
                </p>
              </div>

              {rules.length > 0 && (
                <div className="flex flex-col gap-2">
                  {rules.map(rule => (
                    <RuleRow
                      key={rule.id}
                      rule={rule}
                      onDelete={handleDeleteRule}
                      onUpdate={(id, text) =>
                        setRules(prev => prev.map(r => r.id === id ? { ...r, rule: text } : r))
                      }
                      deletingRuleId={deletingRuleId}
                    />
                  ))}
                </div>
              )}

              {rules.length === 0 && !isNew && (
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <ShieldCheck size={28} className="text-muted-foreground/30" />
                  <p className="text-muted-foreground text-xs">No rules added yet</p>
                </div>
              )}

              {!isNew && (
                <div className="border border-dashed border-border/50 rounded-xl p-4 flex flex-col gap-3 bg-accent/[0.02]">
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                    Add New Rule
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={newRule}
                      onChange={e => setNewRule(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAddRule() } }}
                      placeholder="e.g. Minimum age 10 years required"
                      className="bg-background border-border h-11 flex-1"
                    />
                    <Button onClick={handleAddRule} disabled={addingRule}
                      className="bg-accent hover:bg-accent/90 text-white gap-1.5 h-11 px-4 shrink-0">
                      {addingRule ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                      Add
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Press Enter or click Add to save each rule.</p>
                </div>
              )}
            </section>
          </div>

          {/* ── RIGHT col ──────────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Image upload */}
            <section className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
              <h2 className="text-white font-bold text-sm">Activity Image</h2>
              <div className="relative aspect-video bg-accent/5 rounded-xl overflow-hidden border border-border/50">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <Upload size={22} className="text-muted-foreground/50" />
                    <p className="text-muted-foreground text-xs">No image yet</p>
                  </div>
                )}
                {uploadingImg && (
                  <div className="absolute inset-0 bg-background/70 flex items-center justify-center gap-2 rounded-xl">
                    <Loader2 size={18} className="animate-spin text-accent" />
                    <span className="text-sm text-white">Uploading...</span>
                  </div>
                )}
              </div>
              <label className="cursor-pointer">
                <div className="w-full flex items-center justify-center gap-2 border border-dashed border-border/60 rounded-xl py-3 text-muted-foreground hover:text-white hover:border-accent/40 hover:bg-accent/5 transition-colors text-sm font-medium">
                  <Upload size={14} />
                  {imagePreview ? "Change Image" : "Upload Image"}
                </div>
                <input type="file" accept="image/*" onChange={handleImagePick} className="hidden" />
              </label>
            </section>

            {/* Settings */}
            <section className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
              <h2 className="text-white font-bold text-sm">Settings</h2>

              {([
                { key: "is_visible",          label: "Visible to customers",  desc: "Show on the booking page"   },
                { key: "is_popular",          label: "Mark as Popular",        desc: "Show popular badge on card" },
                { key: "requires_prebooking", label: "Requires Pre-booking",   desc: "Must be booked in advance"  },
              ] as const).map(({ key, label, desc }) => (
                <div key={key} className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">{label}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
                  </div>
                  <Toggle
                    checked={form[key] as boolean}
                    onChange={() => set(key, !form[key])}
                  />
                </div>
              ))}

              <Field label="Display Order">
                <Input type="number" min="0" value={form.display_order}
                  onChange={e => set("display_order", e.target.value)}
                  className="bg-background border-border h-11" />
              </Field>
            </section>

            {/* Save / Delete — desktop */}
            <div className="hidden md:flex flex-col gap-3">
              <Button onClick={handleSave} disabled={saving || uploadingImg}
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-12 gap-2 text-base">
                {saving
                  ? <><Loader2 size={15} className="animate-spin" /> Saving...</>
                  : <><Save size={15} /> {isNew ? "Create Activity" : "Save Changes"}</>
                }
              </Button>
              {!isNew && (
                <Button variant="outline" onClick={handleDeleteActivity}
                  className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 gap-2 h-11">
                  <Trash2 size={14} /> Delete Activity
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky save bar ──────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3 flex gap-3">
        {!isNew && (
          <Button variant="outline" size="sm" onClick={handleDeleteActivity}
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 h-12 w-12 p-0 shrink-0">
            <Trash2 size={16} />
          </Button>
        )}
        <Button onClick={handleSave} disabled={saving || uploadingImg}
          className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold h-12 gap-2">
          {saving
            ? <><Loader2 size={16} className="animate-spin" /> Saving...</>
            : <><Save size={16} /> {isNew ? "Create Activity" : "Save Changes"}</>
          }
        </Button>
      </div>

      <BottomTabBar currentPath={currentPath} onNavigate={href => router.push(href)} />
    </div>
  )
}