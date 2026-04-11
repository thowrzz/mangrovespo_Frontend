// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import {
//   Leaf, LayoutDashboard, BookOpen, Palmtree,
//   LogOut, Settings, User, Lock, Bell,
//   Globe, Save, Loader2, Eye, EyeOff,
//   Plus, Pencil, Trash2
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { adminApi } from "@/lib/admin-api"
// import { toast } from "sonner"

// function Field({ label, children }: { label: string; children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <Label className="text-xs text-muted-foreground">{label}</Label>
//       {children}
//     </div>
//   )
// }

// function Section({ icon: Icon, title, children }: {
//   icon: any; title: string; children: React.ReactNode
// }) {
//   return (
//     <section className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
//       <div className="flex items-center gap-2.5 pb-1 border-b border-border/50">
//         <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
//           <Icon size={15} className="text-accent" />
//         </div>
//         <h2 className="text-white font-bold">{title}</h2>
//       </div>
//       {children}
//     </section>
//   )
// }

// export default function SettingsPage() {
//   const router = useRouter()

//   // ── Password change ───────────────────────────────────────────
//   const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" })
//   const [showPw, setShowPw]       = useState(false)
//   const [savingPw, setSavingPw]   = useState(false)

//   // ── Site settings ─────────────────────────────────────────────
//   const [site, setSite] = useState({
//     site_name:     "MangroveSpot",
//     contact_email: "",
//     contact_phone: "",
//     razorpay_mode: "test",
//   })
//   const [savingSite, setSavingSite] = useState(false)

//   const handlePasswordChange = async () => {
//     if (!passwords.current)                          { toast.error("Enter current password"); return }
//     if (passwords.new.length < 8)                    { toast.error("New password must be at least 8 characters"); return }
//     if (passwords.new !== passwords.confirm)          { toast.error("Passwords don't match"); return }
//     setSavingPw(true)
//     try {
//       await (adminApi as any).auth?.changePassword?.({
//         current_password: passwords.current,
//         new_password:     passwords.new,
//       })
//       toast.success("Password changed successfully")
//       setPasswords({ current: "", new: "", confirm: "" })
//     } catch {
//       toast.error("Failed to change password — check your current password")
//     } finally {
//       setSavingPw(false)
//     }
//   }

//   const handleSaveSite = async () => {
//     setSavingSite(true)
//     try {
//       localStorage.setItem("mangrovespot_settings", JSON.stringify(site))
//       toast.success("Settings saved")
//     } catch {
//       toast.error("Failed to save settings")
//     } finally {
//       setSavingSite(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">

//       {/* Nav */}
//       <header className="border-b border-border px-6 py-4 flex items-center gap-4 sticky top-0 bg-background/95 backdrop-blur-sm z-20">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
//             <Leaf size={15} className="text-accent" />
//           </div>
//           <span className="text-white font-bold">MangroveSpot Admin</span>
//         </div>
//         <nav className="hidden md:flex items-center gap-1 ml-6">
//           <Button variant="ghost" size="sm" onClick={() => router.push("/admin")}
//             className="text-muted-foreground hover:text-white gap-1.5">
//             <LayoutDashboard size={14} /> Dashboard
//           </Button>
//           <Button variant="ghost" size="sm" onClick={() => router.push("/admin/bookings")}
//             className="text-muted-foreground hover:text-white gap-1.5">
//             <BookOpen size={14} /> Bookings
//           </Button>
//           <Button variant="ghost" size="sm" onClick={() => router.push("/admin/activities")}
//             className="text-muted-foreground hover:text-white gap-1.5">
//             <Palmtree size={14} /> Activities
//           </Button>
//         </nav>
//         <div className="ml-auto flex items-center gap-2">
//           <Button variant="ghost" size="sm" onClick={() => router.push("/admin/settings")}
//             className="text-accent bg-accent/10" title="Settings">
//             <Settings size={15} />
//           </Button>
//           <Button variant="ghost" size="sm" onClick={() => adminApi.logout()}
//             className="text-muted-foreground hover:text-red-400 gap-1.5">
//             <LogOut size={14} /> Logout
//           </Button>
//         </div>
//       </header>

//       <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">

//         <div>
//           <h1 className="text-2xl font-bold text-white">Settings</h1>
//           <p className="text-muted-foreground text-sm mt-1">
//             Manage your account and site configuration
//           </p>
//         </div>

// {/* ── Activities Management ────────────────────────────────── */}
// <Section icon={Palmtree} title="Activities Management">
//   <div className="flex flex-col gap-2">
//     <Button
//       onClick={() => router.push("/admin/activities/new")}
//       className="w-full justify-start bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
//     >
//       <Plus size={15} /> Add New Activity
//     </Button>
//     <Button
//       onClick={() => router.push("/admin/activities")}
//       variant="outline"
//       className="w-full justify-start border-border text-muted-foreground hover:text-white gap-2"
//     >
//       <Pencil size={15} /> Edit / Delete Activities
//     </Button>
//   </div>
// </Section>

//         {/* ── Site Info ───────────────────────────────────────── */}
//         <Section icon={Globe} title="Site Information">
//           <Field label="Site Name">
//             <Input value={site.site_name}
//               onChange={e => setSite(p => ({ ...p, site_name: e.target.value }))}
//               className="bg-background border-border" />
//           </Field>
//           <div className="grid grid-cols-2 gap-4">
//             <Field label="Contact Email">
//               <Input type="email" value={site.contact_email}
//                 onChange={e => setSite(p => ({ ...p, contact_email: e.target.value }))}
//                 placeholder="hello@mangrovespot.in"
//                 className="bg-background border-border" />
//             </Field>
//             <Field label="Contact Phone">
//               <Input value={site.contact_phone}
//                 onChange={e => setSite(p => ({ ...p, contact_phone: e.target.value }))}
//                 placeholder="+91 98765 43210"
//                 className="bg-background border-border" />
//             </Field>
//           </div>
//           <Field label="Razorpay Mode">
//             <div className="flex gap-3">
//               {["test", "live"].map(mode => (
//                 <button
//                   key={mode}
//                   onClick={() => setSite(p => ({ ...p, razorpay_mode: mode }))}
//                   className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold capitalize transition-all ${
//                     site.razorpay_mode === mode
//                       ? mode === "live"
//                         ? "bg-green-500/15 border-green-500/40 text-green-400"
//                         : "bg-accent/15 border-accent/40 text-accent"
//                       : "border-border text-muted-foreground hover:text-white"
//                   }`}
//                 >
//                   {mode}
//                 </button>
//               ))}
//             </div>
//           </Field>
//           <Button onClick={handleSaveSite} disabled={savingSite}
//             className="self-start bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
//             {savingSite ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
//             Save Settings
//           </Button>
//         </Section>

//         {/* ── Change Password ─────────────────────────────────── */}
//         <Section icon={Lock} title="Change Password">
//           <Field label="Current Password">
//             <div className="relative">
//               <Input
//                 type={showPw ? "text" : "password"}
//                 value={passwords.current}
//                 onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
//                 className="bg-background border-border pr-10"
//                 placeholder="••••••••"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPw(v => !v)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
//               >
//                 {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
//               </button>
//             </div>
//           </Field>
//           <div className="grid grid-cols-2 gap-4">
//             <Field label="New Password">
//               <Input
//                 type={showPw ? "text" : "password"}
//                 value={passwords.new}
//                 onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))}
//                 className="bg-background border-border"
//                 placeholder="Min 8 characters"
//               />
//             </Field>
//             <Field label="Confirm New Password">
//               <Input
//                 type={showPw ? "text" : "password"}
//                 value={passwords.confirm}
//                 onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
//                 className="bg-background border-border"
//                 placeholder="Repeat password"
//               />
//             </Field>
//           </div>
//           <Button onClick={handlePasswordChange} disabled={savingPw}
//             className="self-start bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
//             {savingPw ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
//             Update Password
//           </Button>
//         </Section>

//         {/* ── Account ─────────────────────────────────────────── */}
//         <Section icon={User} title="Account">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-white text-sm font-medium">Admin Account</p>
//               <p className="text-muted-foreground text-xs mt-0.5">Logged in as superuser</p>
//             </div>
//             <Button variant="outline" onClick={() => adminApi.logout()}
//               className="border-red-500/30 text-red-400 hover:bg-red-500/10 gap-2">
//               <LogOut size={14} /> Sign Out
//             </Button>
//           </div>
//         </Section>

//         {/* ── Notifications ────────────────────────────────────── */}
//         <Section icon={Bell} title="Notifications">
//           <div className="flex items-center justify-between py-1">
//             <div>
//               <p className="text-white text-sm">Email on new booking</p>
//               <p className="text-muted-foreground text-xs mt-0.5">
//                 Get notified when a new booking is confirmed
//               </p>
//             </div>
//             <div className="w-10 h-5 rounded-full bg-accent flex items-center cursor-not-allowed"
//               title="Coming soon">
//               <div className="w-4 h-4 rounded-full bg-white translate-x-5 transition-transform" />
//             </div>
//           </div>
//           <p className="text-muted-foreground text-xs">
//             More notification settings coming soon
//           </p>
//         </Section>

//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Leaf, LayoutDashboard, BookOpen, Palmtree,
  LogOut, Settings, User, Lock, Bell,
  Globe, Save, Loader2, Eye, EyeOff,
  Plus, Pencil, Menu, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { adminApi } from "@/lib/admin-api"
import { toast } from "sonner"

// ── Shared Nav Items ─────────────────────────────────────────────
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
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
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

        {/* Nav Links */}
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

// ── Reusable Field & Section ─────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  )
}

function Section({ icon: Icon, title, children }: {
  icon: any; title: string; children: React.ReactNode
}) {
  return (
    <section className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2.5 pb-1 border-b border-border/50">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <Icon size={15} className="text-accent" />
        </div>
        <h2 className="text-white font-bold">{title}</h2>
      </div>
      {children}
    </section>
  )
}

// ── Main Page ────────────────────────────────────────────────────
export default function SettingsPage() {
  const router   = useRouter()
  const pathname = usePathname()

  const currentPath = pathname ?? "/admin/settings"
  const [drawerOpen, setDrawerOpen] = useState(false)

  // ── Password change ──────────────────────────────────────────
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" })
  const [showPw,    setShowPw]    = useState(false)
  const [savingPw,  setSavingPw]  = useState(false)

  // ── Site settings ────────────────────────────────────────────
  const [site, setSite] = useState({
    site_name:     "MangroveSpot",
    contact_email: "",
    contact_phone: "",
    razorpay_mode: "test",
  })
  const [savingSite, setSavingSite] = useState(false)

  const handlePasswordChange = async () => {
    if (!passwords.current)                 { toast.error("Enter current password"); return }
    if (passwords.new.length < 8)           { toast.error("New password must be at least 8 characters"); return }
    if (passwords.new !== passwords.confirm) { toast.error("Passwords don't match"); return }
    setSavingPw(true)
    try {
      await (adminApi as any).auth?.changePassword?.({
        current_password: passwords.current,
        new_password:     passwords.new,
      })
      toast.success("Password changed successfully")
      setPasswords({ current: "", new: "", confirm: "" })
    } catch {
      toast.error("Failed to change password — check your current password")
    } finally {
      setSavingPw(false)
    }
  }

  const handleSaveSite = async () => {
    setSavingSite(true)
    try {
      localStorage.setItem("mangrovespot_settings", JSON.stringify(site))
      toast.success("Settings saved")
    } catch {
      toast.error("Failed to save settings")
    } finally {
      setSavingSite(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Mobile Drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={href => router.push(href)}
        onLogout={() => adminApi.logout()}
        currentPath={currentPath}
      />

      {/* ── Top Header ──────────────────────────────────────── */}
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

        {/* Desktop Nav */}
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
      <div className="max-w-3xl mx-auto px-4 lg:px-6 py-5 lg:py-8 flex flex-col gap-6 pb-24 md:pb-8">

        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-white">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your account and site configuration
          </p>
        </div>

        {/* Activities Management */}
        <Section icon={Palmtree} title="Activities Management">
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => router.push("/admin/activities/new")}
              className="w-full justify-start bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
            >
              <Plus size={15} /> Add New Activity
            </Button>
            <Button
              onClick={() => router.push("/admin/activities")}
              variant="outline"
              className="w-full justify-start border-border text-muted-foreground hover:text-white gap-2"
            >
              <Pencil size={15} /> Edit / Delete Activities
            </Button>
          </div>
        </Section>

        {/* Site Information */}
        <Section icon={Globe} title="Site Information">
          <Field label="Site Name">
            <Input
              value={site.site_name}
              onChange={e => setSite(p => ({ ...p, site_name: e.target.value }))}
              className="bg-background border-border"
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Contact Email">
              <Input
                type="email"
                value={site.contact_email}
                onChange={e => setSite(p => ({ ...p, contact_email: e.target.value }))}
                placeholder="hello@mangrovespot.in"
                className="bg-background border-border"
              />
            </Field>
            <Field label="Contact Phone">
              <Input
                value={site.contact_phone}
                onChange={e => setSite(p => ({ ...p, contact_phone: e.target.value }))}
                placeholder="+91 98765 43210"
                className="bg-background border-border"
              />
            </Field>
          </div>
          <Field label="Razorpay Mode">
            <div className="flex gap-3">
              {["test", "live"].map(mode => (
                <button
                  key={mode}
                  onClick={() => setSite(p => ({ ...p, razorpay_mode: mode }))}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold capitalize transition-all ${
                    site.razorpay_mode === mode
                      ? mode === "live"
                        ? "bg-green-500/15 border-green-500/40 text-green-400"
                        : "bg-accent/15 border-accent/40 text-accent"
                      : "border-border text-muted-foreground hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </Field>
          <Button
            onClick={handleSaveSite}
            disabled={savingSite}
            className="self-start bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
          >
            {savingSite ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Settings
          </Button>
        </Section>

        {/* Change Password */}
        <Section icon={Lock} title="Change Password">
          <Field label="Current Password">
            <div className="relative">
              <Input
                type={showPw ? "text" : "password"}
                value={passwords.current}
                onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                className="bg-background border-border pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="New Password">
              <Input
                type={showPw ? "text" : "password"}
                value={passwords.new}
                onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))}
                className="bg-background border-border"
                placeholder="Min 8 characters"
              />
            </Field>
            <Field label="Confirm New Password">
              <Input
                type={showPw ? "text" : "password"}
                value={passwords.confirm}
                onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                className="bg-background border-border"
                placeholder="Repeat password"
              />
            </Field>
          </div>
          <Button
            onClick={handlePasswordChange}
            disabled={savingPw}
            className="self-start bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
          >
            {savingPw ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Update Password
          </Button>
        </Section>

        {/* Account */}
        <Section icon={User} title="Account">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Admin Account</p>
              <p className="text-muted-foreground text-xs mt-0.5">Logged in as superuser</p>
            </div>
            <Button
              variant="outline"
              onClick={() => adminApi.logout()}
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 gap-2"
            >
              <LogOut size={14} /> Sign Out
            </Button>
          </div>
        </Section>

        {/* Notifications */}
        <Section icon={Bell} title="Notifications">
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-white text-sm">Email on new booking</p>
              <p className="text-muted-foreground text-xs mt-0.5">
                Get notified when a new booking is confirmed
              </p>
            </div>
            <div
              className="w-10 h-5 rounded-full bg-accent flex items-center cursor-not-allowed"
              title="Coming soon"
            >
              <div className="w-4 h-4 rounded-full bg-white translate-x-5 transition-transform" />
            </div>
          </div>
          <p className="text-muted-foreground text-xs">
            More notification settings coming soon
          </p>
        </Section>

      </div>

      {/* ── Bottom Tab Bar — mobile only ────────────────────── */}
      <BottomTabBar currentPath={currentPath} onNavigate={href => router.push(href)} />

    </div>
  )
}
