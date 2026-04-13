
// // "use client"

// // import { useState, useCallback, useEffect, useRef, memo } from "react"
// // import { useRouter } from "next/navigation"
// // import Image from "next/image"
// // import { format } from "date-fns"
// // import { DayPicker } from "react-day-picker"
// // import "react-day-picker/dist/style.css"
// // import {
// //   Trash2, Loader2, ShoppingCart, IndianRupee, ArrowLeft,
// //   Plus, Check, Calendar, Clock, Users, Pencil, X, ChevronRight,
// //   LogOut, Mail, ArrowRight, ShieldCheck
// // } from "lucide-react"
// // import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { useCart, CartItem } from "@/lib/cart-context"
// // import { useActivities } from "@/hooks/useActivities"
// // import { api, Activity, parseApiError } from "@/lib/api"
// // import { useAuth } from "@/lib/auth-context"
// // import { toast } from "sonner"
// // import { useForm } from "react-hook-form"
// // import { zodResolver } from "@hookform/resolvers/zod"
// // import { z } from "zod"

// // const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""

// // // ─── Razorpay preloader ───────────────────────────────────────────

// // function useRazorpayPreload() {
// //   useEffect(() => {
// //     if ((window as any).Razorpay) return
// //     if (document.querySelector('script[src*="razorpay"]')) return
// //     const s = document.createElement("script")
// //     s.src = "https://checkout.razorpay.com/v1/checkout.js"
// //     s.async = true
// //     document.body.appendChild(s)
// //   }, [])

// //   const ensureReady = (): Promise<boolean> =>
// //     new Promise(resolve => {
// //       if ((window as any).Razorpay) return resolve(true)
// //       const t0 = Date.now()
// //       const id = setInterval(() => {
// //         if ((window as any).Razorpay) { clearInterval(id); resolve(true) }
// //         else if (Date.now() - t0 > 8000) { clearInterval(id); resolve(false) }
// //       }, 100)
// //     })

// //   return { ensureReady }
// // }

// // // ─── Image helpers ────────────────────────────────────────────────

// // const FALLBACK: Record<string, string> = {
// //   "Kayaking": "/Mangrove-Kayaking.jpg",
// //   "Coracle Ride": "/Coracle-Ride.jpg",
// //   "Country Boat Ride": "/Country-Boat.png",
// //   "Bamboo Rafting": "/Country-Boat.png",
// //   "Zip Line": "/combo.png",
// //   "ATV Ride": "/ATV-Ride.jpg",
// //   "Archery": "/arch.jpg",
// //   "Fishing": "/stand.jpg",
// //   "Nature Walk": "/Mangrove-Kayaking.jpg",
// //   "Mud Activities": "/rain1.jpg",
// //   "Tug of War": "/student-offer.jpg",
// //   "Cultural Performance": "/combo.png",
// // }

// // function toHttps(url: string): string {
// //   if (!url) return url
// //   return url.startsWith("http://") ? url.replace("http://", "https://") : url
// // }
// // function activityImage(activity: Activity): string {
// //   return toHttps(activity.image_url || FALLBACK[activity.name] || "/combo.png")
// // }

// // // ─── Schema ───────────────────────────────────────────────────────

// // const schema = z.object({
// //   customer_name:  z.string().min(2, "At least 2 characters"),
// //   customer_email: z.string().email("Enter a valid email"),
// //   customer_phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit number"),
// // })
// // type FormData = z.infer<typeof schema>

// // // ─── OTP Input ───────────────────────────────────────────────────

// // function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
// //   const refs = useRef<(HTMLInputElement | null)[]>([])

// //   const handleChange = (i: number, v: string) => {
// //     const digit = v.replace(/\D/g, "").slice(-1)
// //     const arr = (value + "      ").split("").slice(0, 6)
// //     arr[i] = digit
// //     onChange(arr.join("").trimEnd())
// //     if (digit && i < 5) refs.current[i + 1]?.focus()
// //   }

// //   const handleKey = (i: number, e: React.KeyboardEvent) => {
// //     if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus()
// //   }

// //   const handlePaste = (e: React.ClipboardEvent) => {
// //     const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
// //     if (digits.length === 6) { onChange(digits); refs.current[5]?.focus() }
// //     e.preventDefault()
// //   }

// //   return (
// //     <div className="flex gap-2 justify-center" onPaste={handlePaste}>
// //       {Array.from({ length: 6 }).map((_, i) => (
// //         <input
// //           key={i}
// //           ref={el => { refs.current[i] = el }}
// //           type="text"
// //           inputMode="numeric"
// //           maxLength={1}
// //           value={value[i] || ""}
// //           onChange={e => handleChange(i, e.target.value)}
// //           onKeyDown={e => handleKey(i, e)}
// //           className="w-11 h-14 text-center text-xl font-bold rounded-xl border border-border bg-background text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
// //         />
// //       ))}
// //     </div>
// //   )
// // }

// // // ─── Auth Gate Overlay ────────────────────────────────────────────
// // // Full-screen overlay shown when user is not signed in.
// // // Activities are visible blurred behind it — creates urgency.
// // // Cannot be dismissed — must sign in to proceed.

// // type AuthStep = "choose" | "email" | "otp"

// // function AuthGate({ onSuccess }: { onSuccess: () => void }) {
// //   const { setUser } = useAuth()
// //   const [step,      setStep]      = useState<AuthStep>("choose")
// //   const [email,     setEmail]     = useState("")
// //   const [otp,       setOtp]       = useState("")
// //   const [loading,   setLoading]   = useState(false)
// //   const [countdown, setCountdown] = useState(0)

// //   useEffect(() => {
// //     if (countdown <= 0) return
// //     const id = setTimeout(() => setCountdown(c => c - 1), 1000)
// //     return () => clearTimeout(id)
// //   }, [countdown])

// //   // Prevent background scroll while overlay is shown
// //   useEffect(() => {
// //     document.body.style.overflow = "hidden"
// //     return () => { document.body.style.overflow = "" }
// //   }, [])

// //   const finish = (res: { token: string; name: string; email: string; avatar: string }) => {
// //     setUser(res)
// //     toast.success(`Welcome, ${res.name}! 🌿`)
// //     onSuccess()
// //   }

// //   const handleGoogle = async (credentialResponse: any) => {
// //     setLoading(true)
// //     try {
// //       finish(await api.auth.google(credentialResponse.credential))
// //     } catch (err: any) {
// //       toast.error(parseApiError(err) || "Google sign-in failed")
// //     } finally { setLoading(false) }
// //   }

// //   const handleSendOtp = async () => {
// //     if (!email.includes("@")) { toast.error("Enter a valid email address"); return }
// //     setLoading(true)
// //     try {
// //       await api.auth.sendOtp(email.trim().toLowerCase())
// //       setStep("otp")
// //       setCountdown(60)
// //       toast.success("OTP sent! Check your inbox.")
// //     } catch (err: any) {
// //       toast.error(parseApiError(err) || "Could not send OTP")
// //     } finally { setLoading(false) }
// //   }

// //   const handleVerifyOtp = async () => {
// //     if (otp.replace(/\s/g, "").length !== 6) { toast.error("Enter the 6-digit code"); return }
// //     setLoading(true)
// //     try {
// //       finish(await api.auth.verifyOtp(email.trim().toLowerCase(), otp.trim()))
// //     } catch (err: any) {
// //       toast.error(parseApiError(err) || "Invalid or expired code")
// //       setOtp("")
// //     } finally { setLoading(false) }
// //   }

// //   return (
// //     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
// //       {/* Full-screen overlay — cannot be dismissed */}
// //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
// //         style={{ backdropFilter: "blur(12px)", backgroundColor: "rgba(0,0,0,0.75)" }}
// //       >
// //         {/* Card */}
// //         <div className="w-full max-w-sm bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">

// //           {/* Header with logo / branding */}
// //           <div className="px-6 pt-8 pb-4 text-center border-b border-border">
// //             <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
// //               <span className="text-2xl">🌿</span>
// //             </div>
// //             <h1 className="text-white font-bold text-xl leading-tight">
// //               {step === "choose" && "Sign in to Book"}
// //               {step === "email"  && "Enter your email"}
// //               {step === "otp"    && "Check your inbox"}
// //             </h1>
// //             <p className="text-muted-foreground text-sm mt-1">
// //               {step === "choose" && "Create an account or sign in to continue"}
// //               {step === "email"  && "We'll send a 6-digit verification code"}
// //               {step === "otp"    && `Code sent to ${email}`}
// //             </p>
// //           </div>

// //           <div className="px-6 py-6 flex flex-col gap-4">

// //             {/* ── Choose step ──────────────────────────────── */}
// //             {step === "choose" && (
// //               <>
// //                 {/* Google sign in */}
// //                 <div className="flex justify-center">
// //                   {loading
// //                     ? <div className="flex items-center gap-2 py-2 text-muted-foreground text-sm">
// //                         <Loader2 size={18} className="animate-spin text-accent" /> Signing in...
// //                       </div>
// //                     : <GoogleLogin
// //                         onSuccess={handleGoogle}
// //                         onError={() => toast.error("Google sign-in failed. Try OTP.")}
// //                         theme="filled_black"
// //                         shape="pill"
// //                         size="large"
// //                         width="300"
// //                         text="continue_with"
// //                       />
// //                   }
// //                 </div>

// //                 {/* Divider */}
// //                 <div className="flex items-center gap-3">
// //                   <div className="flex-1 border-t border-border" />
// //                   <span className="text-muted-foreground text-xs font-medium">or</span>
// //                   <div className="flex-1 border-t border-border" />
// //                 </div>

// //                 {/* Email OTP */}
// //                 <button
// //                   onClick={() => setStep("email")}
// //                   className="w-full flex items-center gap-3 border border-border hover:border-accent/60 bg-background hover:bg-accent/5 rounded-2xl px-4 py-3.5 transition-all group"
// //                 >
// //                   <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
// //                     <Mail size={16} className="text-accent" />
// //                   </div>
// //                   <div className="text-left flex-1">
// //                     <p className="text-white text-sm font-semibold">Continue with Email</p>
// //                     <p className="text-muted-foreground text-xs">Get a one-time code in your inbox</p>
// //                   </div>
// //                   <ArrowRight size={15} className="text-muted-foreground group-hover:text-accent transition-colors" />
// //                 </button>

// //                 <p className="text-xs text-muted-foreground text-center leading-relaxed px-2">
// //                   Your session is saved for 30 days. We only use your email for booking confirmations.
// //                 </p>
// //               </>
// //             )}

// //             {/* ── Email step ───────────────────────────────── */}
// //             {step === "email" && (
// //               <>
// //                 <Input
// //                   type="email"
// //                   inputMode="email"
// //                   autoComplete="email"
// //                   autoFocus
// //                   placeholder="your@email.com"
// //                   value={email}
// //                   onChange={e => setEmail(e.target.value)}
// //                   onKeyDown={e => e.key === "Enter" && handleSendOtp()}
// //                   className="bg-background border-border h-12 text-base"
// //                 />
// //                 <Button
// //                   onClick={handleSendOtp}
// //                   disabled={loading || !email.includes("@")}
// //                   className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-5"
// //                 >
// //                   {loading
// //                     ? <><Loader2 size={15} className="animate-spin mr-1.5" />Sending code...</>
// //                     : "Send verification code →"
// //                   }
// //                 </Button>
// //                 <button
// //                   onClick={() => setStep("choose")}
// //                   className="text-xs text-muted-foreground hover:text-white text-center transition-colors"
// //                 >
// //                   ← Back to sign in options
// //                 </button>
// //               </>
// //             )}

// //             {/* ── OTP step ─────────────────────────────────── */}
// //             {step === "otp" && (
// //               <>
// //                 <div className="text-center">
// //                   <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3">
// //                     <ShieldCheck size={22} className="text-accent" />
// //                   </div>
// //                   <p className="text-muted-foreground text-sm">
// //                     Enter the 6-digit code sent to<br />
// //                     <span className="text-white font-semibold">{email}</span>
// //                   </p>
// //                 </div>

// //                 <OtpInput value={otp} onChange={setOtp} />

// //                 <Button
// //                   onClick={handleVerifyOtp}
// //                   disabled={loading || otp.replace(/\s/g, "").length !== 6}
// //                   className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-5"
// //                 >
// //                   {loading
// //                     ? <><Loader2 size={15} className="animate-spin mr-1.5" />Verifying...</>
// //                     : "Verify & Continue →"
// //                   }
// //                 </Button>

// //                 <div className="flex items-center justify-between text-xs">
// //                   <button
// //                     onClick={() => { setStep("email"); setOtp("") }}
// //                     className="text-muted-foreground hover:text-white transition-colors"
// //                   >
// //                     ← Change email
// //                   </button>
// //                   {countdown > 0
// //                     ? <span className="text-muted-foreground">Resend in {countdown}s</span>
// //                     : <button onClick={handleSendOtp} className="text-accent hover:underline">
// //                         Resend code
// //                       </button>
// //                   }
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </GoogleOAuthProvider>
// //   )
// // }

// // // ─── Bottom Sheet ─────────────────────────────────────────────────

// // function BottomSheet({ open, onClose, title, children }: {
// //   open: boolean; onClose: () => void; title: string; children: React.ReactNode
// // }) {
// //   useEffect(() => {
// //     document.body.style.overflow = open ? "hidden" : ""
// //     return () => { document.body.style.overflow = "" }
// //   }, [open])

// //   if (!open) return null
// //   return (
// //     <>
// //       <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />
// //       <div className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl border-t border-border flex flex-col" style={{ maxHeight: "92dvh" }}>
// //         <div className="relative flex items-center justify-between px-4 pt-4 pb-3 border-b border-border shrink-0">
// //           <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-border" />
// //           <p className="text-white font-bold text-sm">{title}</p>
// //           <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-white transition-colors">
// //             <X size={16} />
// //           </button>
// //         </div>
// //         <div className="overflow-y-auto flex-1 overscroll-contain">{children}</div>
// //       </div>
// //     </>
// //   )
// // }

// // // ─── Slot Configurator ────────────────────────────────────────────

// // function SlotConfigurator({ item, onDone }: { item: CartItem; onDone?: () => void }) {
// //   const { updateItem } = useCart()
// //   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
// //     item.date ? new Date(item.date + "T00:00:00") : undefined
// //   )
// //   const [slots, setSlots] = useState<any[]>([])
// //   const [loadingSlots, setLoadingSlots] = useState(false)
// //   const [pickerStep, setPickerStep] = useState<"date" | "slot">("date")

// //   const price = item.activity.pricing_type === "per_person"
// //     ? parseFloat(item.activity.base_price) * item.numPersons
// //     : parseFloat(item.activity.base_price)

// //   const onDateSelect = async (date: Date | undefined) => {
// //     if (!date) return
// //     setSelectedDate(date)
// //     setLoadingSlots(true)
// //     updateItem(item.cartId, { slotId: null, slotLabel: "", slotTime: "" })
// //     try {
// //       const dateStr = format(date, "yyyy-MM-dd")
// //       const data = await api.activities.availability(item.activity.id, dateStr)
// //       if (data.blocked) { toast.error("This date is blocked. Pick another."); setSlots([]); return }
// //       setSlots(data.slots)
// //       updateItem(item.cartId, { date: dateStr })
// //       setPickerStep("slot")
// //     } catch { toast.error("Could not load slots. Try again.") }
// //     finally { setLoadingSlots(false) }
// //   }

// //   const onSlotSelect = (slot: any) => {
// //     if (slot.is_full) return
// //     updateItem(item.cartId, { slotId: slot.id, slotLabel: slot.label, slotTime: slot.time })
// //     onDone?.()
// //   }

// //   return (
// //     <div className="flex flex-col">
// //       <div className="flex items-center gap-3 p-4 border-b border-border">
// //         <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
// //           <Image src={activityImage(item.activity)} alt={item.activity.name} fill sizes="48px" className="object-cover" />
// //         </div>
// //         <div className="flex-1 min-w-0">
// //           <p className="text-white font-semibold text-sm truncate">{item.activity.name}</p>
// //           <p className="text-muted-foreground text-xs">{item.activity.duration}</p>
// //         </div>
// //         <p className="text-accent font-bold text-sm shrink-0">₹{price.toLocaleString()}</p>
// //       </div>
// //       <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/40">
// //         <span className="flex items-center gap-2 text-sm text-muted-foreground"><Users size={14} className="text-accent" />Persons</span>
// //         <div className="flex items-center gap-4">
// //           <button onClick={() => updateItem(item.cartId, { numPersons: Math.max(item.activity.min_persons, item.numPersons - 1) })} className="w-9 h-9 rounded-full border border-border text-white hover:border-accent hover:text-accent flex items-center justify-center text-lg transition-colors active:scale-90">−</button>
// //           <span className="text-white font-bold w-5 text-center tabular-nums">{item.numPersons}</span>
// //           <button onClick={() => updateItem(item.cartId, { numPersons: Math.min(item.activity.max_persons, item.numPersons + 1) })} className="w-9 h-9 rounded-full border border-border text-white hover:border-accent hover:text-accent flex items-center justify-center text-lg transition-colors active:scale-90">+</button>
// //         </div>
// //         <p className="text-xs text-muted-foreground">max {item.activity.max_persons}</p>
// //       </div>
// //       <div className="flex gap-2 p-3 border-b border-border">
// //         {([
// //           { key: "date" as const, icon: <Calendar size={13} />, label: selectedDate ? format(selectedDate, "MMM d") : "Pick Date", disabled: false },
// //           { key: "slot" as const, icon: <Clock size={13} />, label: item.slotId ? item.slotTime : "Pick Slot", disabled: !selectedDate },
// //         ]).map(t => (
// //           <button key={t.key} onClick={() => { if (!t.disabled) setPickerStep(t.key) }} disabled={t.disabled}
// //             className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-all
// //               ${pickerStep === t.key ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground"}
// //               disabled:opacity-40 disabled:cursor-not-allowed`}
// //           >{t.icon}{t.label}</button>
// //         ))}
// //       </div>
// //       {pickerStep === "date" && (
// //         <div className="flex justify-center py-2 px-2">
// //           {loadingSlots
// //             ? <div className="flex items-center gap-2 py-10 text-muted-foreground text-sm"><Loader2 size={16} className="animate-spin text-accent" />Checking availability...</div>
// //             : <DayPicker mode="single" selected={selectedDate} onSelect={onDateSelect} disabled={{ before: new Date() }} className="!text-sm" />
// //           }
// //         </div>
// //       )}
// //       {pickerStep === "slot" && (
// //         <div className="flex flex-col gap-2 p-3">
// //           {slots.length === 0
// //             ? <p className="text-center text-muted-foreground text-sm py-8">No slots available for this date.</p>
// //             : slots.map(slot => (
// //               <button key={slot.id} onClick={() => onSlotSelect(slot)} disabled={slot.is_full}
// //                 className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all active:scale-[0.98]
// //                   ${slot.is_full ? "opacity-40 cursor-not-allowed border-border" : item.slotId === slot.id ? "border-accent bg-accent/10 text-white" : "border-border hover:border-accent/60 text-muted-foreground"}`}
// //               >
// //                 <div className="flex items-center gap-3">
// //                   {item.slotId === slot.id ? <Check size={14} className="text-accent shrink-0" /> : <Clock size={14} className="text-muted-foreground shrink-0" />}
// //                   <div className="text-left">
// //                     <p className="font-semibold text-white">{slot.label}</p>
// //                     <p className="text-xs text-muted-foreground">{slot.time}</p>
// //                   </div>
// //                 </div>
// //                 <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${!slot.is_full ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
// //                   {slot.is_full ? "Full" : `${slot.available} left`}
// //                 </span>
// //               </button>
// //             ))
// //           }
// //           <button onClick={() => setPickerStep("date")} className="text-xs text-muted-foreground hover:text-accent py-2 text-center transition-colors">← Change date</button>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // // ─── Cart Item Row ────────────────────────────────────────────────

// // const CartItemRow = memo(function CartItemRow({ item, onEdit }: { item: CartItem; onEdit: (i: CartItem) => void }) {
// //   const { removeItem } = useCart()
// //   const configured = !!(item.date && item.slotId)
// //   const price = item.activity.pricing_type === "per_person"
// //     ? parseFloat(item.activity.base_price) * item.numPersons
// //     : parseFloat(item.activity.base_price)
// //   return (
// //     <div className={`rounded-2xl border overflow-hidden transition-all ${configured ? "border-accent/30 bg-accent/5" : "border-orange-500/40 bg-orange-500/5"}`}>
// //       <div className="flex items-center gap-3 p-3">
// //         <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
// //           <Image src={activityImage(item.activity)} alt={item.activity.name} fill sizes="48px" className="object-cover" />
// //         </div>
// //         <div className="flex-1 min-w-0">
// //           <p className="text-white font-semibold text-sm truncate">{item.activity.name}</p>
// //           {configured
// //             ? <p className="text-xs text-accent/80 mt-0.5 truncate">{format(new Date(item.date + "T00:00:00"), "MMM d")} · {item.slotLabel} · {item.numPersons}p</p>
// //             : <p className="text-orange-400 text-xs mt-0.5 font-medium">Tap ✏ to configure</p>
// //           }
// //         </div>
// //         <div className="flex items-center gap-1 shrink-0">
// //           <p className="text-accent font-bold text-sm mr-1 tabular-nums">₹{price.toLocaleString()}</p>
// //           <button onClick={() => onEdit(item)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"><Pencil size={13} /></button>
// //           <button onClick={() => removeItem(item.cartId)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={13} /></button>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // })

// // // ─── Activity Card ────────────────────────────────────────────────

// // const ActivityCard = memo(function ActivityCard({ activity, added, onToggle, priority = false }: { activity: Activity; added: boolean; onToggle: () => void; priority?: boolean }) {
// //   return (
// //     <div className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${added ? "border-accent/40 bg-accent/5" : "border-border bg-card"}`}>
// //       <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
// //         <Image src={activityImage(activity)} alt={activity.name} fill sizes="56px" priority={priority} loading={priority ? "eager" : "lazy"} className="object-cover" />
// //       </div>
// //       <div className="flex-1 min-w-0">
// //         <div className="flex items-center gap-1.5">
// //           <p className="text-white font-semibold text-sm truncate">{activity.name}</p>
// //           {activity.is_popular && <Badge className="bg-accent/20 text-accent border-0 text-[10px] px-1.5 py-0 h-4 shrink-0">Popular</Badge>}
// //         </div>
// //         <p className="text-muted-foreground text-xs mt-0.5 truncate">{activity.tagline}</p>
// //         <div className="flex items-center gap-2 mt-1">
// //           <span className="text-accent font-bold text-sm">₹{parseFloat(activity.base_price).toLocaleString()}</span>
// //           <span className="text-muted-foreground text-xs">{activity.pricing_type === "per_person" ? "/person" : "/group"}</span>
// //           <span className="text-muted-foreground text-xs hidden sm:inline">· {activity.duration}</span>
// //         </div>
// //       </div>
// //       <button onClick={onToggle} className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-90 ${added ? "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20" : "border-accent/50 bg-accent text-white hover:bg-accent/90"}`}>
// //         {added ? <Trash2 size={14} /> : <Plus size={14} />}
// //       </button>
// //     </div>
// //   )
// // })

// // // ─── Checkout Form ────────────────────────────────────────────────

// // function CheckoutForm({ register, errors, handleSubmit, onSubmit, allConfigured, totalAmount, submitting }: {
// //   register: any; errors: any; handleSubmit: any; onSubmit: any
// //   allConfigured: boolean; totalAmount: number; submitting: boolean
// // }) {
// //   const fields = [
// //     { name: "customer_name" as const,  label: "Full Name",     placeholder: "e.g. Adarsh Kumar",      type: "text",  mode: "text",    auto: "name"  },
// //     { name: "customer_email" as const, label: "Email Address", placeholder: "your@email.com",          type: "email", mode: "email",   auto: "email" },
// //     { name: "customer_phone" as const, label: "Phone Number",  placeholder: "10-digit mobile number", type: "tel",   mode: "numeric", auto: "tel"   },
// //   ]
// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
// //       {fields.map(f => (
// //         <div key={f.name}>
// //           <Label className="text-xs text-muted-foreground">{f.label}</Label>
// //           <Input {...register(f.name)} type={f.type} placeholder={f.placeholder} className="mt-1 bg-background border-border h-11" autoComplete={f.auto} inputMode={f.mode as any} {...(f.name === "customer_phone" ? { maxLength: 10 } : {})} />
// //           {errors[f.name] && <p className="text-red-400 text-xs mt-1">{errors[f.name].message}</p>}
// //         </div>
// //       ))}
// //       <Button type="submit" disabled={!allConfigured || submitting} className="w-full bg-accent hover:bg-accent/90 text-white font-bold text-base py-6 mt-1 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all flex items-center justify-center gap-2">
// //         {submitting ? <><Loader2 size={16} className="animate-spin" />Creating order...</> : <>Pay ₹{totalAmount.toLocaleString()} →</>}
// //       </Button>
// //       <p className="text-xs text-muted-foreground text-center">🔒 Secure checkout via Razorpay · Confirmation sent to email</p>
// //     </form>
// //   )
// // }

// // // ─── Main Page ────────────────────────────────────────────────────

// // export default function BookingPage() {
// //   const router = useRouter()
// //   const { items, addItem, removeItem, clearCart, totalAmount } = useCart()
// //   const { activities, loading: loadingActivities } = useActivities()
// //   const { ensureReady } = useRazorpayPreload()
// //   const { user, loading: authLoading, signOut } = useAuth()

// //   const [step,         setStep]         = useState<"book" | "verifying" | "success">("book")
// //   const [submitting,   setSubmitting]   = useState(false)
// //   const [bookingRef,   setBookingRef]   = useState("")
// //   const [mobileView,   setMobileView]   = useState<"activities" | "cart">("activities")
// //   const [editingItem,  setEditingItem]  = useState<CartItem | null>(null)
// //   const [showCheckout, setShowCheckout] = useState(false)

// //   const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
// //     resolver: zodResolver(schema),
// //   })

// //   // Pre-fill form when user signs in
// //   useEffect(() => {
// //     if (user) {
// //       if (user.name)  setValue("customer_name",  user.name)
// //       if (user.email) setValue("customer_email", user.email)
// //     }
// //   }, [user, setValue])

// //   const allConfigured = items.length > 0 && items.every(i => i.date && i.slotId)
// //   const isAdded = (id: number) => items.some(i => i.activity.id === id)

// //   const handleToggle = useCallback((activity: Activity) => {
// //     const existing = items.find(i => i.activity.id === activity.id)
// //     if (existing) { removeItem(existing.cartId); toast.info(`${activity.name} removed`) }
// //     else { addItem(activity); toast.success(`${activity.name} added!`); setMobileView("cart") }
// //   }, [items, addItem, removeItem])

// //   const onSubmit = async (formData: FormData) => {
// //     setSubmitting(true)
// //     setShowCheckout(false)
// //     try {
// //       const booking = await api.bookings.initiate({
// //         customer_name:  formData.customer_name,
// //         customer_email: formData.customer_email,
// //         customer_phone: formData.customer_phone,
// //         items: items.map(i => ({ activity_id: i.activity.id, slot_id: i.slotId!, visit_date: i.date, num_persons: i.numPersons })),
// //       })
// //       setBookingRef(booking.booking_reference)
// //       const ready = await ensureReady()
// //       if (!ready) { toast.error("Payment gateway unavailable. Try again."); setSubmitting(false); return }
// //       setSubmitting(false)
// //       new (window as any).Razorpay({
// //         key: booking.razorpay_key_id,
// //         amount: Math.round(parseFloat(booking.grand_total) * 100),
// //         currency: "INR",
// //         name: "MangroveSpot Adventures",
// //         description: `${items.length} activit${items.length > 1 ? "ies" : "y"}`,
// //         order_id: booking.razorpay_order_id,
// //         prefill: { name: booking.customer_name, email: booking.customer_email, contact: booking.customer_phone },
// //         theme: { color: "#16a34a" },
// //         handler: async (response: any) => {
// //           setStep("verifying")
// //           try {
// //             await api.payments.verify({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature })
// //             clearCart()
// //             setStep("success")
// //           } catch {
// //             toast.error(`Verification failed. Keep your reference: ${booking.booking_reference}`)
// //             setStep("book")
// //           }
// //         },
// //         modal: { ondismiss: () => setStep("book") },
// //       }).open()
// //     } catch (err: any) {
// //       toast.error(parseApiError(err) || "Booking failed. Please try again.")
// //       setSubmitting(false)
// //     }
// //   }

// //   // ── Success screen ────────────────────────────────────────────

// //   if (step === "success") return (
// //     <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4 text-center">
// //       <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
// //         <Check size={36} className="text-green-400" />
// //       </div>
// //       <div>
// //         <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
// //         <p className="text-muted-foreground text-sm mt-2 max-w-xs mx-auto">Your adventures are booked. A confirmation email has been sent.</p>
// //       </div>
// //       <div className="bg-card border border-accent/30 rounded-2xl p-6 w-full max-w-xs">
// //         <p className="text-xs text-muted-foreground mb-2">Booking Reference</p>
// //         <p className="text-2xl font-bold text-accent font-mono tracking-widest">{bookingRef}</p>
// //         <p className="text-xs text-muted-foreground mt-2">Save this for your records</p>
// //       </div>
// //       <Button onClick={() => router.push("/")} className="bg-accent hover:bg-accent/90 px-8 py-5 font-bold w-full max-w-xs">Back to Home</Button>
// //     </div>
// //   )

// //   if (step === "verifying") return (
// //     <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4 text-center">
// //       <Loader2 className="animate-spin text-accent" size={40} />
// //       <p className="text-white font-bold text-lg">Confirming your payment...</p>
// //       <p className="text-muted-foreground text-sm max-w-xs">This takes just a moment. Do not close or refresh.</p>
// //     </div>
// //   )

// //   // ── Main UI ───────────────────────────────────────────────────

// //   // Show auth gate overlay if not signed in (and auth check is done)
// //   const showAuthGate = !authLoading && !user

// //   return (
// //     <main className="min-h-screen bg-background pb-32 lg:pb-8">

// //       {/* Auth gate — overlays entire page, blurs content behind */}
// //       {showAuthGate && (
// //         <AuthGate onSuccess={() => {
// //           // Nothing extra needed — once user is set, showAuthGate becomes false
// //         }} />
// //       )}

// //       {/* Top bar */}
// //       <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
// //         <div className="flex items-center gap-3 px-4 py-3 max-w-6xl mx-auto">
// //           <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-border transition-colors shrink-0">
// //             <ArrowLeft size={18} />
// //           </button>
// //           <div className="flex-1 min-w-0">
// //             <h1 className="text-base font-bold text-white leading-none">Book Adventures</h1>
// //             <p className="text-xs text-muted-foreground mt-0.5">MangroveSpot · Paravur</p>
// //           </div>

// //           {/* Signed in user pill */}
// //           {user && (
// //             <div className="hidden lg:flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5 shrink-0">
// //               {user.avatar
// //                 ? <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full" />
// //                 : <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold">{user.name?.[0]?.toUpperCase()}</div>
// //               }
// //               <span className="text-accent text-xs font-medium max-w-[100px] truncate">{user.name}</span>
// //               <button onClick={signOut} title="Sign out" className="text-accent/50 hover:text-accent transition-colors">
// //                 <LogOut size={11} />
// //               </button>
// //             </div>
// //           )}

// //           {items.length > 0 && (
// //             <button onClick={() => setMobileView("cart")} className="flex items-center gap-1.5 bg-accent/10 border border-accent/30 text-accent text-xs font-semibold px-3 py-1.5 rounded-full lg:hidden shrink-0">
// //               <ShoppingCart size={12} />{items.length} · ₹{totalAmount.toLocaleString()}
// //             </button>
// //           )}
// //         </div>

// //         <div className="flex lg:hidden border-t border-border">
// //           {(["activities", "cart"] as const).map(tab => (
// //             <button key={tab} onClick={() => setMobileView(tab)}
// //               className={`flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 flex items-center justify-center gap-1.5 capitalize ${mobileView === tab ? "border-accent text-accent" : "border-transparent text-muted-foreground"}`}
// //             >
// //               {tab}
// //               {tab === "cart" && items.length > 0 && (
// //                 <span className="bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{items.length}</span>
// //               )}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Grid */}
// //       <div className="max-w-6xl mx-auto px-4 pt-4 lg:grid lg:grid-cols-5 lg:gap-8 lg:pt-6">

// //         {/* Activities */}
// //         <div className={`lg:col-span-3 flex flex-col gap-3 ${mobileView === "activities" ? "block" : "hidden lg:flex"}`}>
// //           <div className="mb-1">
// //             <h2 className="text-white font-bold text-base">Choose Activities</h2>
// //             <p className="text-muted-foreground text-xs mt-0.5">Add one or more to your booking</p>
// //           </div>
// //           {loadingActivities
// //             ? <div className="flex justify-center py-12"><Loader2 className="animate-spin text-accent" size={28} /></div>
// //             : <div className="flex flex-col gap-2">{activities.map((a, i) => <ActivityCard key={a.id} activity={a} added={isAdded(a.id)} onToggle={() => handleToggle(a)} priority={i === 0} />)}</div>
// //           }
// //         </div>

// //         {/* Cart */}
// //         <div className={`lg:col-span-2 ${mobileView === "cart" ? "block" : "hidden lg:block"}`}>
// //           <div className="lg:sticky lg:top-[104px] flex flex-col gap-4">
// //             {items.length === 0 ? (
// //               <div className="bg-card border-2 border-dashed border-border rounded-2xl p-10 text-center flex flex-col items-center gap-3">
// //                 <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center"><ShoppingCart size={24} className="text-accent" /></div>
// //                 <p className="text-white font-bold">No activities yet</p>
// //                 <p className="text-muted-foreground text-sm">Add activities from the list</p>
// //                 <button onClick={() => setMobileView("activities")} className="lg:hidden text-accent text-sm font-medium flex items-center gap-1">Browse activities <ChevronRight size={14} /></button>
// //               </div>
// //             ) : (
// //               <>
// //                 <div className="flex items-center justify-between">
// //                   <h2 className="text-white font-bold text-base flex items-center gap-2"><ShoppingCart size={15} className="text-accent" />Your Selection</h2>
// //                   <span className="text-muted-foreground text-xs">{items.length} activit{items.length !== 1 ? "ies" : "y"}</span>
// //                 </div>
// //                 <div className="flex flex-col gap-2">{items.map(item => <CartItemRow key={item.cartId} item={item} onEdit={setEditingItem} />)}</div>
// //                 <div className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3">
// //                   <h3 className="text-white font-bold text-sm">Order Summary</h3>
// //                   <div className="flex flex-col gap-2">
// //                     {items.map(item => {
// //                       const p = item.activity.pricing_type === "per_person" ? parseFloat(item.activity.base_price) * item.numPersons : parseFloat(item.activity.base_price)
// //                       return (
// //                         <div key={item.cartId} className="flex justify-between items-start text-sm gap-2">
// //                           <div className="text-muted-foreground min-w-0">
// //                             <p className="truncate">{item.activity.name}</p>
// //                             {item.date && <p className="text-xs text-muted-foreground/60">{format(new Date(item.date + "T00:00:00"), "MMM d")}{item.slotLabel ? ` · ${item.slotLabel}` : ""}</p>}
// //                           </div>
// //                           <span className="text-white font-medium shrink-0 tabular-nums">₹{p.toLocaleString()}{item.activity.pricing_type === "per_person" && <span className="text-muted-foreground text-xs"> ×{item.numPersons}</span>}</span>
// //                         </div>
// //                       )
// //                     })}
// //                   </div>
// //                   <div className="flex justify-between items-center pt-2 border-t border-border">
// //                     <span className="text-white font-bold">Total</span>
// //                     <div className="flex items-center gap-0.5 text-accent"><IndianRupee size={15} /><span className="text-xl font-bold tabular-nums">{totalAmount.toLocaleString()}</span></div>
// //                   </div>
// //                 </div>
// //                 {!allConfigured && (
// //                   <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl px-3 py-2.5">
// //                     <p className="text-orange-400 text-xs font-medium">⚠ Select a date & time slot for each activity before paying</p>
// //                   </div>
// //                 )}
// //                 <div className="hidden lg:block bg-card border border-border rounded-2xl p-4">
// //                   <CheckoutForm register={register} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} allConfigured={allConfigured} totalAmount={totalAmount} submitting={submitting} />
// //                 </div>
// //                 <button onClick={() => setShowCheckout(true)} disabled={!allConfigured || submitting}
// //                   className="lg:hidden w-full bg-accent hover:bg-accent/90 text-white font-bold text-base py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// //                 >
// //                   {submitting ? <><Loader2 size={16} className="animate-spin" />Creating order...</> : <><IndianRupee size={16} />Pay ₹{totalAmount.toLocaleString()}</>}
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       <BottomSheet open={!!editingItem} onClose={() => setEditingItem(null)} title={editingItem ? `Configure — ${editingItem.activity.name}` : ""}>
// //         {editingItem && <SlotConfigurator item={editingItem} onDone={() => setEditingItem(null)} />}
// //       </BottomSheet>

// //       <BottomSheet open={showCheckout} onClose={() => setShowCheckout(false)} title="Enter Your Details">
// //         <div className="p-4">
// //           <CheckoutForm register={register} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} allConfigured={allConfigured} totalAmount={totalAmount} submitting={submitting} />
// //         </div>
// //       </BottomSheet>

// //       {items.length > 0 && mobileView === "activities" && (
// //         <div className="fixed bottom-0 left-0 right-0 z-20 lg:hidden p-3 bg-background/95 backdrop-blur-sm border-t border-border">
// //           <button onClick={() => setMobileView("cart")} className="w-full bg-accent text-white font-bold py-4 rounded-2xl flex items-center justify-between px-5 transition-all active:scale-[0.98]">
// //             <span className="flex items-center gap-2"><ShoppingCart size={16} />{items.length} activit{items.length !== 1 ? "ies" : "y"}</span>
// //             <span className="flex items-center gap-1"><IndianRupee size={14} />{totalAmount.toLocaleString()}<ChevronRight size={14} /></span>
// //           </button>
// //         </div>
// //       )}
// //     </main>
// //   )
// // }

// "use client"

// import { useState, useCallback, useEffect, useRef, memo } from "react"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import { format } from "date-fns"
// import { DayPicker } from "react-day-picker"
// import "react-day-picker/dist/style.css"
// import {
//   Trash2, Loader2, ShoppingCart, IndianRupee, ArrowLeft,
//   Plus, Check, Calendar, Clock, Users, Pencil, X, ChevronRight,
//   LogOut, Mail, ArrowRight, ShieldCheck
// } from "lucide-react"
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useCart, CartItem } from "@/lib/cart-context"
// import { useActivities } from "@/hooks/useActivities"
// import { api, Activity, parseApiError } from "@/lib/api"
// import { useAuth } from "@/lib/auth-context"
// import { toast } from "sonner"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"

// const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""

// // ─── Razorpay preloader ───────────────────────────────────────────

// function useRazorpayPreload() {
//   useEffect(() => {
//     if ((window as any).Razorpay) return
//     if (document.querySelector('script[src*="razorpay"]')) return
//     const s = document.createElement("script")
//     s.src = "https://checkout.razorpay.com/v1/checkout.js"
//     s.async = true
//     document.body.appendChild(s)
//   }, [])

//   const ensureReady = (): Promise<boolean> =>
//     new Promise(resolve => {
//       if ((window as any).Razorpay) return resolve(true)
//       const t0 = Date.now()
//       const id = setInterval(() => {
//         if ((window as any).Razorpay) { clearInterval(id); resolve(true) }
//         else if (Date.now() - t0 > 8000) { clearInterval(id); resolve(false) }
//       }, 100)
//     })

//   return { ensureReady }
// }

// // ─── Image helpers ────────────────────────────────────────────────

// const FALLBACK: Record<string, string> = {
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

// function toHttps(url: string): string {
//   if (!url) return url
//   return url.startsWith("http://") ? url.replace("http://", "https://") : url
// }
// function activityImage(activity: Activity): string {
//   return toHttps(activity.image_url || FALLBACK[activity.name] || "/combo.png")
// }

// // ─── Schema ───────────────────────────────────────────────────────

// const schema = z.object({
//   customer_name:  z.string().min(2, "At least 2 characters"),
//   customer_email: z.string().email("Enter a valid email"),
//   customer_phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit number"),
// })
// type FormData = z.infer<typeof schema>

// // ─── OTP Input ───────────────────────────────────────────────────

// function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
//   const refs = useRef<(HTMLInputElement | null)[]>([])

//   const handleChange = (i: number, v: string) => {
//     const digit = v.replace(/\D/g, "").slice(-1)
//     const arr = (value + "      ").split("").slice(0, 6)
//     arr[i] = digit
//     onChange(arr.join("").trimEnd())
//     if (digit && i < 5) refs.current[i + 1]?.focus()
//   }

//   const handleKey = (i: number, e: React.KeyboardEvent) => {
//     if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus()
//   }

//   const handlePaste = (e: React.ClipboardEvent) => {
//     const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
//     if (digits.length === 6) { onChange(digits); refs.current[5]?.focus() }
//     e.preventDefault()
//   }

//   return (
//     <div className="flex gap-2 justify-center" onPaste={handlePaste}>
//       {Array.from({ length: 6 }).map((_, i) => (
//         <input
//           key={i}
//           ref={el => { refs.current[i] = el }}
//           type="text"
//           inputMode="numeric"
//           maxLength={1}
//           value={value[i] || ""}
//           onChange={e => handleChange(i, e.target.value)}
//           onKeyDown={e => handleKey(i, e)}
//           className="w-11 h-14 text-center text-xl font-bold rounded-xl border border-border bg-background text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
//         />
//       ))}
//     </div>
//   )
// }

// // ─── Auth Gate Overlay ────────────────────────────────────────────

// type AuthStep = "choose" | "email" | "otp"

// function AuthGate({ onSuccess }: { onSuccess: () => void }) {
//   const { setUser } = useAuth()
//   const [step,      setStep]      = useState<AuthStep>("choose")
//   const [email,     setEmail]     = useState("")
//   const [otp,       setOtp]       = useState("")
//   const [loading,   setLoading]   = useState(false)
//   const [countdown, setCountdown] = useState(0)

//   useEffect(() => {
//     if (countdown <= 0) return
//     const id = setTimeout(() => setCountdown(c => c - 1), 1000)
//     return () => clearTimeout(id)
//   }, [countdown])

//   useEffect(() => {
//     document.body.style.overflow = "hidden"
//     return () => { document.body.style.overflow = "" }
//   }, [])

//   const finish = (res: { token: string; name: string; email: string; avatar: string }) => {
//     setUser(res)
//     toast.success(`Welcome, ${res.name}! 🌿`)
//     onSuccess()
//   }

//   const handleGoogle = async (credentialResponse: any) => {
//     setLoading(true)
//     try {
//       finish(await api.auth.google(credentialResponse.credential))
//     } catch (err: any) {
//       toast.error(parseApiError(err) || "Google sign-in failed")
//     } finally { setLoading(false) }
//   }

//   const handleSendOtp = async () => {
//     if (!email.includes("@")) { toast.error("Enter a valid email address"); return }
//     setLoading(true)
//     try {
//       await api.auth.sendOtp(email.trim().toLowerCase())
//       setStep("otp")
//       setCountdown(60)
//       toast.success("OTP sent! Check your inbox.")
//     } catch (err: any) {
//       toast.error(parseApiError(err) || "Could not send OTP")
//     } finally { setLoading(false) }
//   }

//   const handleVerifyOtp = async () => {
//     if (otp.replace(/\s/g, "").length !== 6) { toast.error("Enter the 6-digit code"); return }
//     setLoading(true)
//     try {
//       finish(await api.auth.verifyOtp(email.trim().toLowerCase(), otp.trim()))
//     } catch (err: any) {
//       toast.error(parseApiError(err) || "Invalid or expired code")
//       setOtp("")
//     } finally { setLoading(false) }
//   }

//   return (
//     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
//         style={{ backdropFilter: "blur(12px)", backgroundColor: "rgba(0,0,0,0.75)" }}
//       >
//         <div className="w-full max-w-sm bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">
//           <div className="px-6 pt-8 pb-4 text-center border-b border-border">
//             <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
//               <span className="text-2xl">🌿</span>
//             </div>
//             <h1 className="text-white font-bold text-xl leading-tight">
//               {step === "choose" && "Sign in to Book"}
//               {step === "email"  && "Enter your email"}
//               {step === "otp"    && "Check your inbox"}
//             </h1>
//             <p className="text-muted-foreground text-sm mt-1">
//               {step === "choose" && "Create an account or sign in to continue"}
//               {step === "email"  && "We'll send a 6-digit verification code"}
//               {step === "otp"    && `Code sent to ${email}`}
//             </p>
//           </div>

//           <div className="px-6 py-6 flex flex-col gap-4">
//             {step === "choose" && (
//               <>
//                 <div className="flex justify-center">
//                   {loading
//                     ? <div className="flex items-center gap-2 py-2 text-muted-foreground text-sm">
//                         <Loader2 size={18} className="animate-spin text-accent" /> Signing in...
//                       </div>
//                     : <GoogleLogin
//                         onSuccess={handleGoogle}
//                         onError={() => toast.error("Google sign-in failed. Try OTP.")}
//                         theme="filled_black"
//                         shape="pill"
//                         size="large"
//                         width="300"
//                         text="continue_with"
//                       />
//                   }
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="flex-1 border-t border-border" />
//                   <span className="text-muted-foreground text-xs font-medium">or</span>
//                   <div className="flex-1 border-t border-border" />
//                 </div>
//                 <button
//                   onClick={() => setStep("email")}
//                   className="w-full flex items-center gap-3 border border-border hover:border-accent/60 bg-background hover:bg-accent/5 rounded-2xl px-4 py-3.5 transition-all group"
//                 >
//                   <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
//                     <Mail size={16} className="text-accent" />
//                   </div>
//                   <div className="text-left flex-1">
//                     <p className="text-white text-sm font-semibold">Continue with Email</p>
//                     <p className="text-muted-foreground text-xs">Get a one-time code in your inbox</p>
//                   </div>
//                   <ArrowRight size={15} className="text-muted-foreground group-hover:text-accent transition-colors" />
//                 </button>
//                 <p className="text-xs text-muted-foreground text-center leading-relaxed px-2">
//                   Your session is saved for 30 days. We only use your email for booking confirmations.
//                 </p>
//               </>
//             )}

//             {step === "email" && (
//               <>
//                 <Input
//                   type="email"
//                   inputMode="email"
//                   autoComplete="email"
//                   autoFocus
//                   placeholder="your@email.com"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                   onKeyDown={e => e.key === "Enter" && handleSendOtp()}
//                   className="bg-background border-border h-12 text-base"
//                 />
//                 <Button
//                   onClick={handleSendOtp}
//                   disabled={loading || !email.includes("@")}
//                   className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-5"
//                 >
//                   {loading
//                     ? <><Loader2 size={15} className="animate-spin mr-1.5" />Sending code...</>
//                     : "Send verification code →"
//                   }
//                 </Button>
//                 <button
//                   onClick={() => setStep("choose")}
//                   className="text-xs text-muted-foreground hover:text-white text-center transition-colors"
//                 >
//                   ← Back to sign in options
//                 </button>
//               </>
//             )}

//             {step === "otp" && (
//               <>
//                 <div className="text-center">
//                   <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3">
//                     <ShieldCheck size={22} className="text-accent" />
//                   </div>
//                   <p className="text-muted-foreground text-sm">
//                     Enter the 6-digit code sent to<br />
//                     <span className="text-white font-semibold">{email}</span>
//                   </p>
//                 </div>
//                 <OtpInput value={otp} onChange={setOtp} />
//                 <Button
//                   onClick={handleVerifyOtp}
//                   disabled={loading || otp.replace(/\s/g, "").length !== 6}
//                   className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-5"
//                 >
//                   {loading
//                     ? <><Loader2 size={15} className="animate-spin mr-1.5" />Verifying...</>
//                     : "Verify & Continue →"
//                   }
//                 </Button>
//                 <div className="flex items-center justify-between text-xs">
//                   <button
//                     onClick={() => { setStep("email"); setOtp("") }}
//                     className="text-muted-foreground hover:text-white transition-colors"
//                   >
//                     ← Change email
//                   </button>
//                   {countdown > 0
//                     ? <span className="text-muted-foreground">Resend in {countdown}s</span>
//                     : <button onClick={handleSendOtp} className="text-accent hover:underline">
//                         Resend code
//                       </button>
//                   }
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   )
// }

// // ─── Bottom Sheet ─────────────────────────────────────────────────

// function BottomSheet({ open, onClose, title, children }: {
//   open: boolean; onClose: () => void; title: string; children: React.ReactNode
// }) {
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : ""
//     return () => { document.body.style.overflow = "" }
//   }, [open])

//   if (!open) return null
//   return (
//     <>
//       <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />
//       <div className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl border-t border-border flex flex-col" style={{ maxHeight: "92dvh" }}>
//         <div className="relative flex items-center justify-between px-4 pt-4 pb-3 border-b border-border shrink-0">
//           <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-border" />
//           <p className="text-white font-bold text-sm">{title}</p>
//           <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-white transition-colors">
//             <X size={16} />
//           </button>
//         </div>
//         <div className="overflow-y-auto flex-1 overscroll-contain">{children}</div>
//       </div>
//     </>
//   )
// }

// // ─── Slot Configurator ────────────────────────────────────────────
// // FIX: reads `liveItem` from cart on every render instead of
// // using the stale `item` prop snapshot — this is what caused
// // the + / − person buttons to appear broken (no re-render).

// function SlotConfigurator({ item, onDone }: { item: CartItem; onDone?: () => void }) {
//   const { updateItem, items } = useCart()

//   // Always read the live version from cart; fall back to prop only if
//   // the item has somehow been removed mid-session.
//   const liveItem = items.find(i => i.cartId === item.cartId) ?? item

//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
//     liveItem.date ? new Date(liveItem.date + "T00:00:00") : undefined
//   )
//   const [slots, setSlots] = useState<any[]>([])
//   const [loadingSlots, setLoadingSlots] = useState(false)
//   const [pickerStep, setPickerStep] = useState<"date" | "slot">("date")

//   const price = liveItem.activity.pricing_type === "per_person"
//     ? parseFloat(liveItem.activity.base_price) * liveItem.numPersons
//     : parseFloat(liveItem.activity.base_price)

//   const onDateSelect = async (date: Date | undefined) => {
//     if (!date) return
//     setSelectedDate(date)
//     setLoadingSlots(true)
//     updateItem(liveItem.cartId, { slotId: null, slotLabel: "", slotTime: "" })
//     try {
//       const dateStr = format(date, "yyyy-MM-dd")
//       const data = await api.activities.availability(liveItem.activity.id, dateStr)
//       if (data.blocked) { toast.error("This date is blocked. Pick another."); setSlots([]); return }
//       setSlots(data.slots)
//       updateItem(liveItem.cartId, { date: dateStr })
//       setPickerStep("slot")
//     } catch { toast.error("Could not load slots. Try again.") }
//     finally { setLoadingSlots(false) }
//   }

//   const onSlotSelect = (slot: any) => {
//     if (slot.is_full) return
//     updateItem(liveItem.cartId, { slotId: slot.id, slotLabel: slot.label, slotTime: slot.time })
//     onDone?.()
//   }

//   return (
//     <div className="flex flex-col">
//       {/* Activity header */}
//       <div className="flex items-center gap-3 p-4 border-b border-border">
//         <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
//           <Image src={activityImage(liveItem.activity)} alt={liveItem.activity.name} fill sizes="48px" className="object-cover" />
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-white font-semibold text-sm truncate">{liveItem.activity.name}</p>
//           <p className="text-muted-foreground text-xs">{liveItem.activity.duration}</p>
//         </div>
//         <p className="text-accent font-bold text-sm shrink-0">₹{price.toLocaleString()}</p>
//       </div>

//       {/* Persons stepper — uses liveItem so buttons reflect latest value */}
//       <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/40">
//         <span className="flex items-center gap-2 text-sm text-muted-foreground">
//           <Users size={14} className="text-accent" />Persons
//         </span>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => updateItem(liveItem.cartId, {
//               numPersons: Math.max(liveItem.activity.min_persons, liveItem.numPersons - 1)
//             })}
//             className="w-9 h-9 rounded-full border border-border text-white hover:border-accent hover:text-accent flex items-center justify-center text-lg transition-colors active:scale-90"
//           >−</button>
//           <span className="text-white font-bold w-5 text-center tabular-nums">{liveItem.numPersons}</span>
//           <button
//             onClick={() => updateItem(liveItem.cartId, {
//               numPersons: Math.min(liveItem.activity.max_persons, liveItem.numPersons + 1)
//             })}
//             className="w-9 h-9 rounded-full border border-border text-white hover:border-accent hover:text-accent flex items-center justify-center text-lg transition-colors active:scale-90"
//           >+</button>
//         </div>
//         <p className="text-xs text-muted-foreground">max {liveItem.activity.max_persons}</p>
//       </div>

//       {/* Date / Slot tab switcher */}
//       <div className="flex gap-2 p-3 border-b border-border">
//         {([
//           { key: "date" as const, icon: <Calendar size={13} />, label: selectedDate ? format(selectedDate, "MMM d") : "Pick Date", disabled: false },
//           { key: "slot" as const, icon: <Clock size={13} />, label: liveItem.slotId ? liveItem.slotTime : "Pick Slot", disabled: !selectedDate },
//         ]).map(t => (
//           <button key={t.key} onClick={() => { if (!t.disabled) setPickerStep(t.key) }} disabled={t.disabled}
//             className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-all
//               ${pickerStep === t.key ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground"}
//               disabled:opacity-40 disabled:cursor-not-allowed`}
//           >{t.icon}{t.label}</button>
//         ))}
//       </div>

//       {/* Date picker */}
//       {pickerStep === "date" && (
//         <div className="flex justify-center py-2 px-2">
//           {loadingSlots
//             ? <div className="flex items-center gap-2 py-10 text-muted-foreground text-sm">
//                 <Loader2 size={16} className="animate-spin text-accent" />Checking availability...
//               </div>
//             : <DayPicker mode="single" selected={selectedDate} onSelect={onDateSelect} disabled={{ before: new Date() }} className="!text-sm" />
//           }
//         </div>
//       )}

//       {/* Slot picker */}
//       {pickerStep === "slot" && (
//         <div className="flex flex-col gap-2 p-3">
//           {slots.length === 0
//             ? <p className="text-center text-muted-foreground text-sm py-8">No slots available for this date.</p>
//             : slots.map(slot => (
//               <button key={slot.id} onClick={() => onSlotSelect(slot)} disabled={slot.is_full}
//                 className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all active:scale-[0.98]
//                   ${slot.is_full ? "opacity-40 cursor-not-allowed border-border"
//                     : liveItem.slotId === slot.id ? "border-accent bg-accent/10 text-white"
//                     : "border-border hover:border-accent/60 text-muted-foreground"}`}
//               >
//                 <div className="flex items-center gap-3">
//                   {liveItem.slotId === slot.id
//                     ? <Check size={14} className="text-accent shrink-0" />
//                     : <Clock size={14} className="text-muted-foreground shrink-0" />
//                   }
//                   <div className="text-left">
//                     <p className="font-semibold text-white">{slot.label}</p>
//                     <p className="text-xs text-muted-foreground">{slot.time}</p>
//                   </div>
//                 </div>
//                 <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${!slot.is_full ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
//                   {slot.is_full ? "Full" : `${slot.available} left`}
//                 </span>
//               </button>
//             ))
//           }
//           <button onClick={() => setPickerStep("date")} className="text-xs text-muted-foreground hover:text-accent py-2 text-center transition-colors">← Change date</button>
//         </div>
//       )}
//     </div>
//   )
// }

// // ─── Cart Item Row ────────────────────────────────────────────────

// const CartItemRow = memo(function CartItemRow({ item, onEdit }: { item: CartItem; onEdit: (i: CartItem) => void }) {
//   const { removeItem } = useCart()
//   const configured = !!(item.date && item.slotId)
//   const price = item.activity.pricing_type === "per_person"
//     ? parseFloat(item.activity.base_price) * item.numPersons
//     : parseFloat(item.activity.base_price)
//   return (
//     <div className={`rounded-2xl border overflow-hidden transition-all ${configured ? "border-accent/30 bg-accent/5" : "border-orange-500/40 bg-orange-500/5"}`}>
//       <div className="flex items-center gap-3 p-3">
//         <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
//           <Image src={activityImage(item.activity)} alt={item.activity.name} fill sizes="48px" className="object-cover" />
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-white font-semibold text-sm truncate">{item.activity.name}</p>
//           {configured
//             ? <p className="text-xs text-accent/80 mt-0.5 truncate">{format(new Date(item.date + "T00:00:00"), "MMM d")} · {item.slotLabel} · {item.numPersons}p</p>
//             : <p className="text-orange-400 text-xs mt-0.5 font-medium">Tap ✏ to configure</p>
//           }
//         </div>
//         <div className="flex items-center gap-1 shrink-0">
//           <p className="text-accent font-bold text-sm mr-1 tabular-nums">₹{price.toLocaleString()}</p>
//           <button onClick={() => onEdit(item)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"><Pencil size={13} /></button>
//           <button onClick={() => removeItem(item.cartId)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={13} /></button>
//         </div>
//       </div>
//     </div>
//   )
// })

// // ─── Activity Card ────────────────────────────────────────────────

// const ActivityCard = memo(function ActivityCard({ activity, added, onToggle, priority = false }: { activity: Activity; added: boolean; onToggle: () => void; priority?: boolean }) {
//   return (
//     <div className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${added ? "border-accent/40 bg-accent/5" : "border-border bg-card"}`}>
//       <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
//         <Image src={activityImage(activity)} alt={activity.name} fill sizes="56px" priority={priority} loading={priority ? "eager" : "lazy"} className="object-cover" />
//       </div>
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center gap-1.5">
//           <p className="text-white font-semibold text-sm truncate">{activity.name}</p>
//           {activity.is_popular && <Badge className="bg-accent/20 text-accent border-0 text-[10px] px-1.5 py-0 h-4 shrink-0">Popular</Badge>}
//         </div>
//         <p className="text-muted-foreground text-xs mt-0.5 truncate">{activity.tagline}</p>
//         <div className="flex items-center gap-2 mt-1">
//           <span className="text-accent font-bold text-sm">₹{parseFloat(activity.base_price).toLocaleString()}</span>
//           <span className="text-muted-foreground text-xs">{activity.pricing_type === "per_person" ? "/person" : "/group"}</span>
//           <span className="text-muted-foreground text-xs hidden sm:inline">· {activity.duration}</span>
//         </div>
//       </div>
//       <button onClick={onToggle} className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-90 ${added ? "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20" : "border-accent/50 bg-accent text-white hover:bg-accent/90"}`}>
//         {added ? <Trash2 size={14} /> : <Plus size={14} />}
//       </button>
//     </div>
//   )
// })

// // ─── Checkout Form ────────────────────────────────────────────────

// function CheckoutForm({ register, errors, handleSubmit, onSubmit, allConfigured, totalAmount, submitting }: {
//   register: any; errors: any; handleSubmit: any; onSubmit: any
//   allConfigured: boolean; totalAmount: number; submitting: boolean
// }) {
//   const fields = [
//     { name: "customer_name" as const,  label: "Full Name",     placeholder: "e.g. Adarsh Kumar",      type: "text",  mode: "text",    auto: "name"  },
//     { name: "customer_email" as const, label: "Email Address", placeholder: "your@email.com",          type: "email", mode: "email",   auto: "email" },
//     { name: "customer_phone" as const, label: "Phone Number",  placeholder: "10-digit mobile number", type: "tel",   mode: "numeric", auto: "tel"   },
//   ]
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
//       {fields.map(f => (
//         <div key={f.name}>
//           <Label className="text-xs text-muted-foreground">{f.label}</Label>
//           <Input {...register(f.name)} type={f.type} placeholder={f.placeholder} className="mt-1 bg-background border-border h-11" autoComplete={f.auto} inputMode={f.mode as any} {...(f.name === "customer_phone" ? { maxLength: 10 } : {})} />
//           {errors[f.name] && <p className="text-red-400 text-xs mt-1">{errors[f.name].message}</p>}
//         </div>
//       ))}
//       <Button type="submit" disabled={!allConfigured || submitting} className="w-full bg-accent hover:bg-accent/90 text-white font-bold text-base py-6 mt-1 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all flex items-center justify-center gap-2">
//         {submitting ? <><Loader2 size={16} className="animate-spin" />Creating order...</> : <>Pay ₹{totalAmount.toLocaleString()} →</>}
//       </Button>
//       <p className="text-xs text-muted-foreground text-center">🔒 Secure checkout via Razorpay · Confirmation sent to email</p>
//     </form>
//   )
// }

// // ─── Main Page ────────────────────────────────────────────────────

// export default function BookingPage() {
//   const router = useRouter()
//   const { items, addItem, removeItem, clearCart, totalAmount } = useCart()
//   const { activities, loading: loadingActivities } = useActivities()
//   const { ensureReady } = useRazorpayPreload()
//   const { user, loading: authLoading, signOut } = useAuth()

//   const [step,         setStep]         = useState<"book" | "verifying" | "success">("book")
//   const [submitting,   setSubmitting]   = useState(false)
//   const [bookingRef,   setBookingRef]   = useState("")
//   const [mobileView,   setMobileView]   = useState<"activities" | "cart">("activities")
//   const [editingItem,  setEditingItem]  = useState<CartItem | null>(null)
//   const [showCheckout, setShowCheckout] = useState(false)

//   const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   })

//   useEffect(() => {
//     if (user) {
//       if (user.name)  setValue("customer_name",  user.name)
//       if (user.email) setValue("customer_email", user.email)
//     }
//   }, [user, setValue])

//   const allConfigured = items.length > 0 && items.every(i => i.date && i.slotId)
//   const isAdded = (id: number) => items.some(i => i.activity.id === id)

//   const handleToggle = useCallback((activity: Activity) => {
//     const existing = items.find(i => i.activity.id === activity.id)
//     if (existing) { removeItem(existing.cartId); toast.info(`${activity.name} removed`) }
//     else { addItem(activity); toast.success(`${activity.name} added!`); setMobileView("cart") }
//   }, [items, addItem, removeItem])

//   const onSubmit = async (formData: FormData) => {
//     setSubmitting(true)
//     setShowCheckout(false)
//     try {
//       const booking = await api.bookings.initiate({
//         customer_name:  formData.customer_name,
//         customer_email: formData.customer_email,
//         customer_phone: formData.customer_phone,
//         items: items.map(i => ({ activity_id: i.activity.id, slot_id: i.slotId!, visit_date: i.date, num_persons: i.numPersons })),
//       })
//       setBookingRef(booking.booking_reference)
//       const ready = await ensureReady()
//       if (!ready) { toast.error("Payment gateway unavailable. Try again."); setSubmitting(false); return }
//       setSubmitting(false)
//       new (window as any).Razorpay({
//         key: booking.razorpay_key_id,
//         amount: Math.round(parseFloat(booking.grand_total) * 100),
//         currency: "INR",
//         name: "MangroveSpot Adventures",
//         description: `${items.length} activit${items.length > 1 ? "ies" : "y"}`,
//         order_id: booking.razorpay_order_id,
//         prefill: { name: booking.customer_name, email: booking.customer_email, contact: booking.customer_phone },
//         theme: { color: "#16a34a" },
//         handler: async (response: any) => {
//           setStep("verifying")
//           try {
//             await api.payments.verify({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature })
//             clearCart()
//             setStep("success")
//           } catch {
//             toast.error(`Verification failed. Keep your reference: ${booking.booking_reference}`)
//             setStep("book")
//           }
//         },
//         modal: { ondismiss: () => setStep("book") },
//       }).open()
//     } catch (err: any) {
//       toast.error(parseApiError(err) || "Booking failed. Please try again.")
//       setSubmitting(false)
//     }
//   }

//   // ── Success screen ────────────────────────────────────────────

//   if (step === "success") return (
//     <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4 text-center">
//       <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
//         <Check size={36} className="text-green-400" />
//       </div>
//       <div>
//         <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
//         <p className="text-muted-foreground text-sm mt-2 max-w-xs mx-auto">Your adventures are booked. A confirmation email has been sent.</p>
//       </div>
//       <div className="bg-card border border-accent/30 rounded-2xl p-6 w-full max-w-xs">
//         <p className="text-xs text-muted-foreground mb-2">Booking Reference</p>
//         <p className="text-2xl font-bold text-accent font-mono tracking-widest">{bookingRef}</p>
//         <p className="text-xs text-muted-foreground mt-2">Save this for your records</p>
//       </div>
//       <Button onClick={() => router.push("/")} className="bg-accent hover:bg-accent/90 px-8 py-5 font-bold w-full max-w-xs">Back to Home</Button>
//     </div>
//   )

//   if (step === "verifying") return (
//     <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4 text-center">
//       <Loader2 className="animate-spin text-accent" size={40} />
//       <p className="text-white font-bold text-lg">Confirming your payment...</p>
//       <p className="text-muted-foreground text-sm max-w-xs">This takes just a moment. Do not close or refresh.</p>
//     </div>
//   )

//   // ── Main UI ───────────────────────────────────────────────────

//   const showAuthGate = !authLoading && !user

//   return (
//     <main className="min-h-screen bg-background pb-32 lg:pb-8">

//       {showAuthGate && (
//         <AuthGate onSuccess={() => {}} />
//       )}

//       {/* Top bar */}
//       <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
//         <div className="flex items-center gap-3 px-4 py-3 max-w-6xl mx-auto">
//           <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-border transition-colors shrink-0">
//             <ArrowLeft size={18} />
//           </button>
//           <div className="flex-1 min-w-0">
//             <h1 className="text-base font-bold text-white leading-none">Book Adventures</h1>
//             <p className="text-xs text-muted-foreground mt-0.5">MangroveSpot · Paravur</p>
//           </div>

//           {user && (
//             <div className="hidden lg:flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5 shrink-0">
//               {user.avatar
//                 ? <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full" />
//                 : <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold">{user.name?.[0]?.toUpperCase()}</div>
//               }
//               <span className="text-accent text-xs font-medium max-w-[100px] truncate">{user.name}</span>
//               <button onClick={signOut} title="Sign out" className="text-accent/50 hover:text-accent transition-colors">
//                 <LogOut size={11} />
//               </button>
//             </div>
//           )}

//           {items.length > 0 && (
//             <button onClick={() => setMobileView("cart")} className="flex items-center gap-1.5 bg-accent/10 border border-accent/30 text-accent text-xs font-semibold px-3 py-1.5 rounded-full lg:hidden shrink-0">
//               <ShoppingCart size={12} />{items.length} · ₹{totalAmount.toLocaleString()}
//             </button>
//           )}
//         </div>

//         <div className="flex lg:hidden border-t border-border">
//           {(["activities", "cart"] as const).map(tab => (
//             <button key={tab} onClick={() => setMobileView(tab)}
//               className={`flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 flex items-center justify-center gap-1.5 capitalize ${mobileView === tab ? "border-accent text-accent" : "border-transparent text-muted-foreground"}`}
//             >
//               {tab}
//               {tab === "cart" && items.length > 0 && (
//                 <span className="bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{items.length}</span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Grid */}
//       <div className="max-w-6xl mx-auto px-4 pt-4 lg:grid lg:grid-cols-5 lg:gap-8 lg:pt-6">

//         {/* Activities */}
//         <div className={`lg:col-span-3 flex flex-col gap-3 ${mobileView === "activities" ? "block" : "hidden lg:flex"}`}>
//           <div className="mb-1">
//             <h2 className="text-white font-bold text-base">Choose Activities</h2>
//             <p className="text-muted-foreground text-xs mt-0.5">Add one or more to your booking</p>
//           </div>
//           {loadingActivities
//             ? <div className="flex justify-center py-12"><Loader2 className="animate-spin text-accent" size={28} /></div>
//             : <div className="flex flex-col gap-2">{activities.map((a, i) => <ActivityCard key={a.id} activity={a} added={isAdded(a.id)} onToggle={() => handleToggle(a)} priority={i === 0} />)}</div>
//           }
//         </div>

//         {/* Cart */}
//         <div className={`lg:col-span-2 ${mobileView === "cart" ? "block" : "hidden lg:block"}`}>
//           <div className="lg:sticky lg:top-[104px] flex flex-col gap-4">
//             {items.length === 0 ? (
//               <div className="bg-card border-2 border-dashed border-border rounded-2xl p-10 text-center flex flex-col items-center gap-3">
//                 <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center"><ShoppingCart size={24} className="text-accent" /></div>
//                 <p className="text-white font-bold">No activities yet</p>
//                 <p className="text-muted-foreground text-sm">Add activities from the list</p>
//                 <button onClick={() => setMobileView("activities")} className="lg:hidden text-accent text-sm font-medium flex items-center gap-1">Browse activities <ChevronRight size={14} /></button>
//               </div>
//             ) : (
//               <>
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-white font-bold text-base flex items-center gap-2"><ShoppingCart size={15} className="text-accent" />Your Selection</h2>
//                   <span className="text-muted-foreground text-xs">{items.length} activit{items.length !== 1 ? "ies" : "y"}</span>
//                 </div>
//                 <div className="flex flex-col gap-2">{items.map(item => <CartItemRow key={item.cartId} item={item} onEdit={setEditingItem} />)}</div>
//                 <div className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3">
//                   <h3 className="text-white font-bold text-sm">Order Summary</h3>
//                   <div className="flex flex-col gap-2">
//                     {items.map(item => {
//                       const p = item.activity.pricing_type === "per_person" ? parseFloat(item.activity.base_price) * item.numPersons : parseFloat(item.activity.base_price)
//                       return (
//                         <div key={item.cartId} className="flex justify-between items-start text-sm gap-2">
//                           <div className="text-muted-foreground min-w-0">
//                             <p className="truncate">{item.activity.name}</p>
//                             {item.date && <p className="text-xs text-muted-foreground/60">{format(new Date(item.date + "T00:00:00"), "MMM d")}{item.slotLabel ? ` · ${item.slotLabel}` : ""}</p>}
//                           </div>
//                           <span className="text-white font-medium shrink-0 tabular-nums">₹{p.toLocaleString()}{item.activity.pricing_type === "per_person" && <span className="text-muted-foreground text-xs"> ×{item.numPersons}</span>}</span>
//                         </div>
//                       )
//                     })}
//                   </div>
//                   <div className="flex justify-between items-center pt-2 border-t border-border">
//                     <span className="text-white font-bold">Total</span>
//                     <div className="flex items-center gap-0.5 text-accent"><IndianRupee size={15} /><span className="text-xl font-bold tabular-nums">{totalAmount.toLocaleString()}</span></div>
//                   </div>
//                 </div>
//                 {!allConfigured && (
//                   <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl px-3 py-2.5">
//                     <p className="text-orange-400 text-xs font-medium">⚠ Select a date & time slot for each activity before paying</p>
//                   </div>
//                 )}
//                 <div className="hidden lg:block bg-card border border-border rounded-2xl p-4">
//                   <CheckoutForm register={register} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} allConfigured={allConfigured} totalAmount={totalAmount} submitting={submitting} />
//                 </div>
//                 <button onClick={() => setShowCheckout(true)} disabled={!allConfigured || submitting}
//                   className="lg:hidden w-full bg-accent hover:bg-accent/90 text-white font-bold text-base py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {submitting ? <><Loader2 size={16} className="animate-spin" />Creating order...</> : <><IndianRupee size={16} />Pay ₹{totalAmount.toLocaleString()}</>}
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       <BottomSheet open={!!editingItem} onClose={() => setEditingItem(null)} title={editingItem ? `Configure — ${editingItem.activity.name}` : ""}>
//         {editingItem && <SlotConfigurator item={editingItem} onDone={() => setEditingItem(null)} />}
//       </BottomSheet>

//       <BottomSheet open={showCheckout} onClose={() => setShowCheckout(false)} title="Enter Your Details">
//         <div className="p-4">
//           <CheckoutForm register={register} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} allConfigured={allConfigured} totalAmount={totalAmount} submitting={submitting} />
//         </div>
//       </BottomSheet>

//       {items.length > 0 && mobileView === "activities" && (
//         <div className="fixed bottom-0 left-0 right-0 z-20 lg:hidden p-3 bg-background/95 backdrop-blur-sm border-t border-border">
//           <button onClick={() => setMobileView("cart")} className="w-full bg-accent text-white font-bold py-4 rounded-2xl flex items-center justify-between px-5 transition-all active:scale-[0.98]">
//             <span className="flex items-center gap-2"><ShoppingCart size={16} />{items.length} activit{items.length !== 1 ? "ies" : "y"}</span>
//             <span className="flex items-center gap-1"><IndianRupee size={14} />{totalAmount.toLocaleString()}<ChevronRight size={14} /></span>
//           </button>
//         </div>
//       )}
//     </main>
//   )
// }

"use client"

import { useState, useCallback, useEffect, useRef, memo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import {
  Loader2, ShoppingCart, IndianRupee, ArrowLeft,
  Plus, Check, Calendar, Clock, Users, X,
  LogOut, Mail, ArrowRight, ShieldCheck, Baby, UserRound, Wallet,
  ChevronDown,
} from "lucide-react"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart, CartItem } from "@/lib/cart-context"
import { useActivities } from "@/hooks/useActivities"
import { api, Activity, parseApiError } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""

// ─── Operating hours ──────────────────────────────────────────────
const OPEN_HOUR  = 6
const OPEN_MIN   = 30
const CLOSE_HOUR = 17
const CLOSE_MIN  = 0

// Build valid time slots every 15 minutes between 06:30 and 17:00
function buildTimeSlots(): { hour: number; minute: number; label: string; value: string }[] {
  const slots = []
  for (let h = OPEN_HOUR; h <= CLOSE_HOUR; h++) {
    const minStart = h === OPEN_HOUR  ? OPEN_MIN  : 0
    const minEnd   = h === CLOSE_HOUR ? CLOSE_MIN : 45
    for (let m = minStart; m <= minEnd; m += 15) {
      const hh    = String(h).padStart(2, "0")
      const mm    = String(m).padStart(2, "0")
      const value = `${hh}:${mm}`
      const ampm  = h < 12 ? "AM" : "PM"
      const h12   = h === 0 ? 12 : h > 12 ? h - 12 : h
      const label = `${h12}:${mm} ${ampm}`
      slots.push({ hour: h, minute: m, label, value })
    }
  }
  return slots
}

const TIME_SLOTS = buildTimeSlots()

function isTimeInRange(time: string): boolean {
  if (!time) return false
  const [h, m] = time.split(":").map(Number)
  const mins      = h * 60 + m
  const openMins  = OPEN_HOUR  * 60 + OPEN_MIN
  const closeMins = CLOSE_HOUR * 60 + CLOSE_MIN
  return mins >= openMins && mins <= closeMins
}

// ─── Types ────────────────────────────────────────────────────────
type MainStep = "activities" | "datetime" | "guests" | "details" | "processing" | "success"

// ─── Razorpay preloader ───────────────────────────────────────────
function useRazorpayPreload() {
  useEffect(() => {
    if ((window as any).Razorpay) return
    if (document.querySelector('script[src*="razorpay"]')) return
    const s = document.createElement("script")
    s.src   = "https://checkout.razorpay.com/v1/checkout.js"
    s.async = true
    document.body.appendChild(s)
  }, [])

  const ensureReady = (): Promise<boolean> =>
    new Promise(resolve => {
      if ((window as any).Razorpay) return resolve(true)
      const t0 = Date.now()
      const id = setInterval(() => {
        if ((window as any).Razorpay) { clearInterval(id); resolve(true) }
        else if (Date.now() - t0 > 8000) { clearInterval(id); resolve(false) }
      }, 100)
    })

  return { ensureReady }
}

// ─── Image helpers ────────────────────────────────────────────────
const FALLBACK: Record<string, string> = {
  "Kayaking":             "/Mangrove-Kayaking.jpg",
  "Coracle Ride":         "/Coracle-Ride.jpg",
  "Country Boat Ride":    "/Country-Boat.png",
  "Bamboo Rafting":       "/Country-Boat.png",
  "Zip Line":             "/combo.png",
  "ATV Ride":             "/ATV-Ride.jpg",
  "Archery":              "/arch.jpg",
  "Fishing":              "/stand.jpg",
  "Nature Walk":          "/Mangrove-Kayaking.jpg",
  "Mud Activities":       "/rain1.jpg",
  "Tug of War":           "/student-offer.jpg",
  "Cultural Performance": "/combo.png",
}

function toHttps(url: string): string {
  if (!url) return url
  return url.startsWith("http://") ? url.replace("http://", "https://") : url
}

function activityImage(activity: Activity): string {
  return toHttps(activity.image_url || FALLBACK[activity.name] || "/combo.png")
}

// ─── Schema ───────────────────────────────────────────────────────
const schema = z.object({
  customer_name:  z.string().min(2, "At least 2 characters"),
  customer_email: z.string().email("Enter a valid email"),
  customer_phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit number"),
})
type FormData = z.infer<typeof schema>

// ─── OTP Input ───────────────────────────────────────────────────
function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(-1)
    const arr   = (value + "      ").split("").slice(0, 6)
    arr[i]      = digit
    onChange(arr.join("").trimEnd())
    if (digit && i < 5) refs.current[i + 1]?.focus()
  }

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (digits.length === 6) { onChange(digits); refs.current[5]?.focus() }
    e.preventDefault()
  }

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el }}
          type="text" inputMode="numeric" maxLength={1}
          value={value[i] || ""}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          className="w-11 h-14 text-center text-xl font-bold rounded-xl border border-border bg-background text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
        />
      ))}
    </div>
  )
}

// ─── Auth Gate ────────────────────────────────────────────────────
type AuthStep = "choose" | "email" | "otp"
function AuthGate({ onSuccess }: { onSuccess: () => void }) {
  const { setUser }                   = useAuth()
  const [step, setStep]               = useState<AuthStep>("choose")
  const [email, setEmail]             = useState("")
  const [otp, setOtp]                 = useState("")
  const [loading, setLoading]         = useState(false)
  const [countdown, setCountdown]     = useState(0)

  useEffect(() => {
    if (countdown <= 0) return
    const id = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(id)
  }, [countdown])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const finish = (res: { token: string; name: string; email: string; avatar: string }) => {
    setUser(res)
    toast.success(`Welcome, ${res.name}! 🌿`)
    onSuccess()
  }

  const handleGoogle = async (credentialResponse: any) => {
    setLoading(true)
    try { finish(await api.auth.google(credentialResponse.credential)) }
    catch (err: any) { toast.error(parseApiError(err) || "Google sign-in failed") }
    finally { setLoading(false) }
  }

  const handleSendOtp = async () => {
    if (!email.includes("@")) { toast.error("Enter a valid email address"); return }
    setLoading(true)
    try {
      await api.auth.sendOtp(email.trim().toLowerCase())
      setStep("otp"); setCountdown(60)
      toast.success("OTP sent! Check your inbox.")
    } catch (err: any) { toast.error(parseApiError(err) || "Could not send OTP") }
    finally { setLoading(false) }
  }

  const handleVerifyOtp = async () => {
    if (otp.replace(/\s/g, "").length !== 6) { toast.error("Enter the 6-digit code"); return }
    setLoading(true)
    try { finish(await api.auth.verifyOtp(email.trim().toLowerCase(), otp.trim())) }
    catch (err: any) { toast.error(parseApiError(err) || "Invalid or expired code"); setOtp("") }
    finally { setLoading(false) }
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: "blur(12px)", backgroundColor: "rgba(0,0,0,0.75)" }}
      >
        <div className="w-full max-w-sm bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">
          <div className="px-6 pt-8 pb-4 text-center border-b border-border">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌿</span>
            </div>
            <h1 className="text-white font-bold text-xl leading-tight">
              {step === "choose" && "Sign in to Book"}
              {step === "email"  && "Enter your email"}
              {step === "otp"    && "Check your inbox"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {step === "choose" && "Create an account or sign in to continue"}
              {step === "email"  && "We'll send a 6-digit verification code"}
              {step === "otp"    && `Code sent to ${email}`}
            </p>
          </div>

          <div className="px-6 py-6 flex flex-col gap-4">
            {step === "choose" && (
              <>
                <div className="flex justify-center">
                  {loading
                    ? <div className="flex items-center gap-2 py-2 text-muted-foreground text-sm"><Loader2 size={18} className="animate-spin text-accent" /> Signing in...</div>
                    : <GoogleLogin onSuccess={handleGoogle} onError={() => toast.error("Google sign-in failed. Try OTP.")} theme="filled_black" shape="pill" size="large" width="300" text="continue_with" />
                  }
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 border-t border-border" />
                  <span className="text-muted-foreground text-xs font-medium">or</span>
                  <div className="flex-1 border-t border-border" />
                </div>
                <button
                  onClick={() => setStep("email")}
                  className="w-full flex items-center gap-3 border border-border hover:border-accent/60 bg-background hover:bg-accent/5 rounded-2xl px-4 py-3.5 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><Mail size={16} className="text-accent" /></div>
                  <div className="text-left flex-1">
                    <p className="text-white text-sm font-semibold">Continue with Email</p>
                    <p className="text-muted-foreground text-xs">Get a one-time code in your inbox</p>
                  </div>
                  <ArrowRight size={15} className="text-muted-foreground group-hover:text-accent transition-colors" />
                </button>
                <p className="text-xs text-muted-foreground text-center leading-relaxed px-2">
                  Your session is saved for 30 days. We only use your email for booking confirmations.
                </p>
              </>
            )}

            {step === "email" && (
              <>
                <Input
                  type="email" inputMode="email" autoComplete="email" autoFocus
                  placeholder="your@email.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSendOtp()}
                  className="bg-background border-border h-12 text-base"
                />
                <Button
                  onClick={handleSendOtp}
                  disabled={loading || !email.includes("@")}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-5"
                >
                  {loading ? <><Loader2 size={15} className="animate-spin mr-1.5" />Sending code...</> : "Send verification code →"}
                </Button>
                <button onClick={() => setStep("choose")} className="text-xs text-muted-foreground hover:text-white text-center transition-colors">← Back to sign in options</button>
              </>
            )}

            {step === "otp" && (
              <>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck size={22} className="text-accent" />
                  </div>
                  <p className="text-muted-foreground text-sm">Enter the 6-digit code sent to<br /><span className="text-white font-semibold">{email}</span></p>
                </div>
                <OtpInput value={otp} onChange={setOtp} />
                <Button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.replace(/\s/g, "").length !== 6}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-5"
                >
                  {loading ? <><Loader2 size={15} className="animate-spin mr-1.5" />Verifying...</> : "Verify & Continue →"}
                </Button>
                <div className="flex items-center justify-between text-xs">
                  <button onClick={() => { setStep("email"); setOtp("") }} className="text-muted-foreground hover:text-white transition-colors">← Change email</button>
                  {countdown > 0
                    ? <span className="text-muted-foreground">Resend in {countdown}s</span>
                    : <button onClick={handleSendOtp} className="text-accent hover:underline">Resend code</button>
                  }
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

// ─── Step Indicator ───────────────────────────────────────────────
const STEPS: { key: MainStep; label: string }[] = [
  { key: "activities", label: "Activities" },
  { key: "datetime",   label: "Date & Time" },
  { key: "guests",     label: "Guests" },
  { key: "details",    label: "Payment" },
]

function StepBar({ current }: { current: MainStep }) {
  const stepKeys   = STEPS.map(s => s.key)
  const currentIdx = stepKeys.indexOf(current)
  if (currentIdx < 0) return null

  return (
    <div className="flex items-center gap-0 w-full px-4 py-3 border-b border-border bg-background/95">
      {STEPS.map((s, i) => {
        const done   = i < currentIdx
        const active = i === currentIdx
        return (
          <div key={s.key} className="flex items-center flex-1 min-w-0">
            <div className={`flex items-center gap-1.5 shrink-0 transition-all ${active ? "text-accent" : done ? "text-green-400" : "text-muted-foreground/40"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-[11px] font-bold transition-all
                ${active ? "border-accent bg-accent/15 text-accent" : done ? "border-green-500/50 bg-green-500/10 text-green-400" : "border-border text-muted-foreground/40"}`}>
                {done ? <Check size={11} /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:inline ${active ? "text-accent" : done ? "text-green-400" : "text-muted-foreground/40"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 transition-all ${done ? "bg-green-500/40" : "bg-border"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Activity Card ────────────────────────────────────────────────
const ActivityCard = memo(function ActivityCard({ activity, added, onToggle, priority = false }: {
  activity: Activity; added: boolean; onToggle: () => void; priority?: boolean
}) {
  return (
    <div
      onClick={onToggle}
      className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all active:scale-[0.99]
        ${added ? "border-accent/50 bg-accent/8 ring-1 ring-accent/20" : "border-border bg-card hover:border-border/80 hover:bg-card/80"}`}
    >
      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
        <Image
          src={activityImage(activity)} alt={activity.name}
          fill sizes="56px"
          priority={priority} loading={priority ? "eager" : "lazy"}
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-white font-semibold text-sm truncate">{activity.name}</p>
          {activity.is_popular && (
            <Badge className="bg-accent/20 text-accent border-0 text-[10px] px-1.5 py-0 h-4 shrink-0">Popular</Badge>
          )}
        </div>
        <p className="text-muted-foreground text-xs mt-0.5 truncate">{activity.tagline}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-accent font-bold text-sm">₹{parseFloat(activity.base_price).toLocaleString()}</span>
          <span className="text-muted-foreground text-xs">{activity.pricing_type === "per_person" ? "/person" : "/group"}</span>
          <span className="text-muted-foreground text-xs hidden sm:inline">· {activity.duration}</span>
        </div>
      </div>
      <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all
        ${added ? "border-accent bg-accent text-white" : "border-border/60 bg-background text-muted-foreground"}`}>
        {added ? <Check size={15} /> : <Plus size={15} />}
      </div>
    </div>
  )
})

// ─── Counter Button ───────────────────────────────────────────────
// Standalone component to avoid styling issues with counter numbers
function CounterButton({ onPress, disabled, children }: {
  onPress: () => void; disabled: boolean; children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "1px solid",
        borderColor: disabled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.25)",
        background: "transparent",
        color: disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.9)",
        fontSize: "20px",
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.15s",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  )
}

function CounterValue({ value }: { value: number }) {
  return (
    <span
      style={{
        minWidth: "32px",
        textAlign: "center",
        fontSize: "18px",
        fontWeight: 700,
        color: "#ffffff",
        fontVariantNumeric: "tabular-nums",
        display: "inline-block",
      }}
    >
      {value}
    </span>
  )
}

// ─── Guests Step ──────────────────────────────────────────────────
function GuestsStep({ items, updateItem, onNext, onBack }: {
  items: CartItem[]
  updateItem: (cartId: string, patch: Partial<CartItem>) => void
  onNext: () => void
  onBack: () => void
}) {
  const allValid = items.every(i => (i.numAdults + i.numChildren) >= i.activity.min_persons)

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center px-2 pt-2">
        <p className="text-white font-bold text-base">How many guests?</p>
        <p className="text-muted-foreground text-xs mt-1">Set the number of adults and children per activity</p>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(item => {
          const adultPrice = parseFloat(item.activity.base_price)
          const childPrice = item.activity.child_price != null
            ? parseFloat(String(item.activity.child_price))
            : adultPrice
          const total = item.activity.pricing_type === "per_person"
            ? adultPrice * item.numAdults + childPrice * item.numChildren
            : adultPrice
          const maxPersons = item.activity.max_persons

          const canAddAdult   = item.numAdults + item.numChildren < maxPersons
          const canRemoveAdult = item.numAdults > item.activity.min_persons
          const canAddChild   = item.numAdults + item.numChildren < maxPersons
          const canRemoveChild = item.numChildren > 0

          return (
            <div key={item.cartId} className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Activity header */}
              <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-border/60 bg-accent/5">
                <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0">
                  <Image src={activityImage(item.activity)} alt={item.activity.name} fill sizes="36px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{item.activity.name}</p>
                  <p className="text-muted-foreground text-[11px]">
                    Min {item.activity.min_persons} · Max {maxPersons}
                  </p>
                </div>
                <p style={{ color: "var(--color-accent, #16a34a)", fontWeight: 700, fontSize: "15px", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
                  ₹{total.toLocaleString()}
                </p>
              </div>

              {/* Adults row */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <UserRound size={13} className="text-accent" />
                  </div>
                  <div>
                    <p style={{ color: "#fff", fontSize: "14px", fontWeight: 500, lineHeight: 1 }}>Adults</p>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", marginTop: "3px" }}>
                      ₹{adultPrice.toLocaleString()} / person
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <CounterButton
                    onPress={() => updateItem(item.cartId, { numAdults: item.numAdults - 1 })}
                    disabled={!canRemoveAdult}
                  >−</CounterButton>
                  <CounterValue value={item.numAdults} />
                  <CounterButton
                    onPress={() => updateItem(item.cartId, { numAdults: item.numAdults + 1 })}
                    disabled={!canAddAdult}
                  >+</CounterButton>
                </div>
              </div>

              {/* Children row */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Baby size={13} className="text-blue-400" />
                  </div>
                  <div>
                    <p style={{ color: "#fff", fontSize: "14px", fontWeight: 500, lineHeight: 1 }}>Children</p>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", marginTop: "3px" }}>
                      {childPrice < adultPrice
                        ? `₹${childPrice.toLocaleString()} / child`
                        : "Same price as adults"}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <CounterButton
                    onPress={() => updateItem(item.cartId, { numChildren: item.numChildren - 1 })}
                    disabled={!canRemoveChild}
                  >−</CounterButton>
                  <CounterValue value={item.numChildren} />
                  <CounterButton
                    onPress={() => updateItem(item.cartId, { numChildren: item.numChildren + 1 })}
                    disabled={!canAddChild}
                  >+</CounterButton>
                </div>
              </div>

              {/* Validation hint */}
              {item.numAdults + item.numChildren < item.activity.min_persons && (
                <div className="px-4 pb-3">
                  <p style={{ color: "#f87171", fontSize: "11px" }}>
                    ⚠ Minimum {item.activity.min_persons} guests required
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex gap-2 pt-1">
        <Button variant="ghost" onClick={onBack} className="flex-1 border border-border text-muted-foreground hover:text-white">← Back</Button>
        <Button onClick={onNext} disabled={!allValid} className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold disabled:opacity-40">
          Continue →
        </Button>
      </div>
    </div>
  )
}

// ─── Scroll Drum Time Picker ──────────────────────────────────────
// Replaces the free <input type="time"> with a snap-scroll slot picker
// that is physically constrained to 06:30–17:00

function DrumTimePicker({ value, onChange }: {
  value: string
  onChange: (val: string) => void
}) {
  const listRef    = useRef<HTMLDivElement>(null)
  const ITEM_H     = 48
  const VISIBLE    = 5
  const PAD        = Math.floor(VISIBLE / 2)

  // Build padded list: PAD empty slots + TIME_SLOTS + PAD empty slots
  const paddedSlots = [
    ...Array(PAD).fill(null),
    ...TIME_SLOTS,
    ...Array(PAD).fill(null),
  ]

  const selectedIdx = TIME_SLOTS.findIndex(s => s.value === value)

  const scrollToIndex = useCallback((idx: number, smooth = true) => {
    if (!listRef.current) return
    listRef.current.scrollTo({
      top:      idx * ITEM_H,
      behavior: smooth ? "smooth" : "instant",
    })
  }, [])

  // Scroll to selected on mount / value change
  useEffect(() => {
    const idx = selectedIdx >= 0 ? selectedIdx : 0
    scrollToIndex(idx, false)
  }, []) // eslint-disable-line

  useEffect(() => {
    if (selectedIdx >= 0) scrollToIndex(selectedIdx, true)
  }, [value, selectedIdx, scrollToIndex])

  const handleScroll = useCallback(() => {
    if (!listRef.current) return
    const rawIdx  = Math.round(listRef.current.scrollTop / ITEM_H)
    const clamped = Math.max(0, Math.min(rawIdx, TIME_SLOTS.length - 1))
    const slot    = TIME_SLOTS[clamped]
    if (slot && slot.value !== value) onChange(slot.value)
  }, [value, onChange])

  // Snap on scroll end
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        handleScroll()
        // Re-snap
        const rawIdx  = Math.round(el.scrollTop / ITEM_H)
        const clamped = Math.max(0, Math.min(rawIdx, TIME_SLOTS.length - 1))
        el.scrollTo({ top: clamped * ITEM_H, behavior: "smooth" })
      }, 80)
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => { el.removeEventListener("scroll", onScroll); clearTimeout(timer) }
  }, [handleScroll])

  const containerH = ITEM_H * VISIBLE

  return (
    <div style={{ position: "relative", userSelect: "none" }}>
      {/* Selection highlight band */}
      <div
        style={{
          position:     "absolute",
          left:         0,
          right:        0,
          top:          `${PAD * ITEM_H}px`,
          height:       `${ITEM_H}px`,
          background:   "rgba(22,163,74,0.12)",
          border:       "1px solid rgba(22,163,74,0.3)",
          borderRadius: "12px",
          pointerEvents:"none",
          zIndex:        2,
        }}
      />
      {/* Top fade */}
      <div
        style={{
          position:   "absolute",
          top:         0,
          left:        0,
          right:       0,
          height:     `${ITEM_H * PAD}px`,
          background: "linear-gradient(to bottom, var(--background, #0a0a0a) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex:      3,
        }}
      />
      {/* Bottom fade */}
      <div
        style={{
          position:   "absolute",
          bottom:      0,
          left:        0,
          right:       0,
          height:     `${ITEM_H * PAD}px`,
          background: "linear-gradient(to top, var(--background, #0a0a0a) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex:      3,
        }}
      />
      {/* Scroll container */}
      <div
        ref={listRef}
        style={{
          height:           `${containerH}px`,
          overflowY:        "scroll",
          scrollbarWidth:   "none",
          msOverflowStyle:  "none",
          scrollSnapType:   "y mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {paddedSlots.map((slot, i) => {
          const isSelected = slot && slot.value === value
          const isAM       = slot && slot.hour < 12
          return (
            <div
              key={i}
              onClick={() => slot && onChange(slot.value)}
              style={{
                height:        `${ITEM_H}px`,
                display:       "flex",
                alignItems:    "center",
                justifyContent:"center",
                scrollSnapAlign:"center",
                cursor:         slot ? "pointer" : "default",
                transition:    "all 0.15s",
              }}
            >
              {slot && (
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span
                    style={{
                      fontSize:   isSelected ? "22px" : "17px",
                      fontWeight: isSelected ? 700 : 400,
                      color:      isSelected
                        ? "#ffffff"
                        : "rgba(255,255,255,0.3)",
                      fontVariantNumeric: "tabular-nums",
                      transition: "all 0.2s",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {slot.label.replace(/ (AM|PM)$/, "")}
                  </span>
                  <span
                    style={{
                      fontSize:   isSelected ? "13px" : "11px",
                      fontWeight: isSelected ? 600 : 400,
                      color:      isSelected
                        ? isAM ? "#34d399" : "#f59e0b"
                        : "rgba(255,255,255,0.2)",
                      transition: "all 0.2s",
                    }}
                  >
                    {isAM ? "AM" : "PM"}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {/* Hide scrollbar for webkit */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}

// ─── DateTime Step ────────────────────────────────────────────────
function DateTimeStep({ visitDate, arrivalTime, onDateChange, onTimeChange, onNext, onBack, adminTimeSlots }: {
  visitDate:      string
  arrivalTime:    string
  onDateChange:   (date: string) => void
  onTimeChange:   (time: string) => void
  onNext:         () => void
  onBack:         () => void
  adminTimeSlots: string[]
}) {
  const [calDate, setCalDate]     = useState<Date | undefined>(
    visitDate ? new Date(visitDate + "T00:00:00") : undefined
  )
  const [checking, setChecking]   = useState(false)
  const [dateOk, setDateOk]       = useState(!!visitDate)
  const [activeTab, setActiveTab] = useState<"date" | "time">(visitDate ? "time" : "date")

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) return
    setCalDate(date)
    setChecking(true)
    setDateOk(false)
    try {
      const dateStr = format(date, "yyyy-MM-dd")
      const data    = await (api.activities as any).checkDate?.(dateStr).catch(() => ({ blocked: false }))
      if (data?.blocked) {
        toast.error("This date is not available. Please pick another.")
        setChecking(false)
        return
      }
      onDateChange(dateStr)
      setDateOk(true)
      setActiveTab("time")
    } catch {
      const dateStr = format(date, "yyyy-MM-dd")
      onDateChange(dateStr)
      setDateOk(true)
      setActiveTab("time")
    } finally {
      setChecking(false)
    }
  }

  const canProceed = visitDate && arrivalTime && isTimeInRange(arrivalTime)

  // Formatted display of selected time
  const timeDisplay = arrivalTime
    ? (() => {
        const slot = TIME_SLOTS.find(s => s.value === arrivalTime)
        return slot ? slot.label : arrivalTime
      })()
    : null

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center px-2 pt-2">
        <p className="text-white font-bold text-base">When are you visiting?</p>
        <p className="text-muted-foreground text-xs mt-1">One date & arrival time applies to all your activities</p>
      </div>

      {/* Tab switcher */}
      <div className="flex rounded-xl border border-border overflow-hidden">
        {(["date", "time"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => { if (tab === "time" && !dateOk) return; setActiveTab(tab) }}
            disabled={tab === "time" && !dateOk}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-all
              ${activeTab === tab ? "bg-accent/15 text-accent" : "text-muted-foreground hover:text-white"}
              disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            {tab === "date"
              ? <><Calendar size={13} /> {visitDate ? format(new Date(visitDate + "T00:00:00"), "MMM d") : "Pick Date"}</>
              : <><Clock size={13} /> {timeDisplay ?? "Arrival Time"}</>
            }
          </button>
        ))}
      </div>

      {/* Date picker panel */}
      {activeTab === "date" && (
        <div className="flex flex-col items-center">
          {checking
            ? <div className="flex items-center gap-2 py-10 text-muted-foreground text-sm">
                <Loader2 size={16} className="animate-spin text-accent" />Checking availability...
              </div>
            : <DayPicker
                mode="single" selected={calDate} onSelect={handleDateSelect}
                disabled={{ before: new Date() }}
                className="!text-sm mx-auto"
              />
          }
        </div>
      )}

      {/* Time picker panel */}
      {activeTab === "time" && (
        <div className="flex flex-col gap-3">
          {adminTimeSlots.length > 0 ? (
            // Admin-defined preset slots
            <div className="grid grid-cols-3 gap-2">
              {adminTimeSlots.map(t => (
                <button
                  key={t}
                  onClick={() => onTimeChange(t)}
                  className={`py-2.5 rounded-xl border text-sm font-medium transition-all
                    ${arrivalTime === t
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-border text-muted-foreground hover:border-accent/50 hover:text-white"}`}
                >
                  {format(new Date(`2000-01-01T${t}`), "h:mm a")}
                </button>
              ))}
            </div>
          ) : (
            // Scroll-drum time picker — constrained to 06:30–17:00
            <div className="flex flex-col gap-2">
              {/* Header */}
              <div className="flex items-center justify-between px-1 mb-1">
                <p className="text-muted-foreground text-xs">Scroll to select arrival time</p>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    background: "rgba(22,163,74,0.1)",
                    color: "#16a34a",
                    border: "1px solid rgba(22,163,74,0.2)",
                    borderRadius: "999px",
                    padding: "2px 10px",
                  }}
                >
                  6:30 AM – 5:00 PM
                </span>
              </div>

              {/* Drum picker container */}
              <div
                style={{
                  background:   "rgba(255,255,255,0.03)",
                  border:       "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  overflow:     "hidden",
                  padding:      "0 16px",
                }}
              >
                <DrumTimePicker value={arrivalTime} onChange={onTimeChange} />
              </div>

              {/* Selected time confirmation */}
              {arrivalTime && isTimeInRange(arrivalTime) && (
                <div
                  style={{
                    display:      "flex",
                    alignItems:   "center",
                    gap:          "8px",
                    padding:      "10px 14px",
                    background:   "rgba(22,163,74,0.08)",
                    border:       "1px solid rgba(22,163,74,0.2)",
                    borderRadius: "12px",
                    marginTop:    "4px",
                  }}
                >
                  <Check size={14} style={{ color: "#16a34a", flexShrink: 0 }} />
                  <span style={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>
                    Arriving at {timeDisplay}
                  </span>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setActiveTab("date")}
            className="text-xs text-muted-foreground hover:text-accent py-1 text-center transition-colors"
          >
            ← Change date
          </button>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <Button variant="ghost" onClick={onBack} className="flex-1 border border-border text-muted-foreground hover:text-white">← Back</Button>
        <Button onClick={onNext} disabled={!canProceed} className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold disabled:opacity-40">
          Continue →
        </Button>
      </div>
    </div>
  )
}

// ─── Order Summary ────────────────────────────────────────────────
function OrderSummary({ items, visitDate, arrivalTime, totalAmount, compact = false }: {
  items: CartItem[]; visitDate: string; arrivalTime: string; totalAmount: number; compact?: boolean
}) {
  const [expanded, setExpanded] = useState(!compact)
  const payNow    = Math.ceil(totalAmount / 2)
  const payArrival = totalAmount - payNow

  const timeDisplay = arrivalTime
    ? TIME_SLOTS.find(s => s.value === arrivalTime)?.label ?? arrivalTime
    : null

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => compact && setExpanded(e => !e)}
        className={`w-full flex items-center justify-between px-4 py-3 ${compact ? "cursor-pointer" : "cursor-default"}`}
      >
        <div className="flex items-center gap-2">
          <ShoppingCart size={14} className="text-accent" />
          <p className="text-white text-sm font-bold">{items.length} activit{items.length !== 1 ? "ies" : "y"}</p>
          {visitDate && (
            <span className="text-muted-foreground text-xs hidden sm:inline">
              · {format(new Date(visitDate + "T00:00:00"), "MMM d")}
              {timeDisplay && ` · ${timeDisplay}`}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-accent font-bold text-sm tabular-nums">₹{totalAmount.toLocaleString()}</span>
          {compact && <ChevronDown size={14} className={`text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border">
          {items.map(item => {
            const adultP = parseFloat(item.activity.base_price)
            const childP = item.activity.child_price != null ? parseFloat(String(item.activity.child_price)) : adultP
            const p      = item.activity.pricing_type === "per_person"
              ? adultP * item.numAdults + childP * item.numChildren
              : adultP
            return (
              <div key={item.cartId} className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 last:border-0">
                <div className="min-w-0 flex-1">
                  <p className="text-white text-xs font-medium truncate">{item.activity.name}</p>
                  <p className="text-muted-foreground text-[11px]">
                    {item.numAdults}A{item.numChildren > 0 ? ` · ${item.numChildren}C` : ""}
                    {item.activity.pricing_type === "per_person" && ` · ₹${adultP.toLocaleString()}/adult`}
                  </p>
                </div>
                <span className="text-white text-sm font-semibold tabular-nums shrink-0 ml-2">₹{p.toLocaleString()}</span>
              </div>
            )
          })}
          <div className="px-4 pt-2 pb-3 flex flex-col gap-1.5 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-sm">Total</span>
              <span className="text-accent font-bold text-lg tabular-nums">₹{totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-accent/5 border border-accent/15 rounded-lg px-3 py-2 mt-1">
              <Wallet size={12} className="text-accent shrink-0" />
              <div className="flex-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Pay now (50%)</span>
                <span className="text-accent font-bold tabular-nums">₹{payNow.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs px-1">
              <span className="text-muted-foreground">Balance at arrival</span>
              <span className="text-yellow-400 font-medium tabular-nums">₹{payArrival.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Details / Payment Step ───────────────────────────────────────
function DetailsStep({ register, errors, handleSubmit, onSubmit, submitting, totalAmount, items, visitDate, arrivalTime, onBack }: {
  register: any; errors: any; handleSubmit: any; onSubmit: any
  submitting: boolean; totalAmount: number
  items: CartItem[]; visitDate: string; arrivalTime: string; onBack: () => void
}) {
  const payNow    = Math.ceil(totalAmount / 2)
  const payArrival = totalAmount - payNow

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <OrderSummary items={items} visitDate={visitDate} arrivalTime={arrivalTime} totalAmount={totalAmount} compact />

      <div className="flex flex-col gap-3">
        <p className="text-white text-sm font-bold">Your Details</p>
        {[
          { name: "customer_name"  as const, label: "Full Name",     placeholder: "e.g. Adarsh Kumar",       type: "text",  mode: "text",    auto: "name"  },
          { name: "customer_email" as const, label: "Email Address", placeholder: "your@email.com",           type: "email", mode: "email",   auto: "email" },
          { name: "customer_phone" as const, label: "Phone Number",  placeholder: "10-digit mobile number",  type: "tel",   mode: "numeric", auto: "tel"   },
        ].map(f => (
          <div key={f.name}>
            <Label className="text-xs text-muted-foreground">{f.label}</Label>
            <Input
              {...register(f.name)}
              type={f.type}
              placeholder={f.placeholder}
              className="mt-1 bg-background border-border h-11"
              autoComplete={f.auto}
              inputMode={f.mode as any}
              {...(f.name === "customer_phone" ? { maxLength: 10 } : {})}
            />
            {errors[f.name] && <p className="text-red-400 text-xs mt-1">{errors[f.name].message}</p>}
          </div>
        ))}
      </div>

      {/* Payment split info */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-3.5 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Wallet size={14} className="text-accent" />
          <p className="text-accent text-xs font-bold">50% Advance · 50% at Arrival</p>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Pay online now</span>
          <span className="text-white font-bold tabular-nums">₹{payNow.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Pay at the venue</span>
          <span className="text-yellow-400 font-medium tabular-nums">₹{payArrival.toLocaleString()}</span>
        </div>
        <div className="h-px bg-border my-0.5" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Total booking value</span>
          <span className="tabular-nums">₹{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="ghost" onClick={onBack} className="flex-1 border border-border text-muted-foreground hover:text-white">← Back</Button>
        <Button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold py-5 text-base disabled:opacity-40 active:scale-[0.98] transition-all"
        >
          {submitting
            ? <><Loader2 size={15} className="animate-spin mr-1.5" />Creating order...</>
            : <>Pay ₹{payNow.toLocaleString()} →</>}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">🔒 Secure checkout via Razorpay · Balance paid at venue</p>
    </form>
  )
}

// ─── Main Page ────────────────────────────────────────────────────
export default function BookingPage() {
  const router                          = useRouter()
  const { items, addItem, removeItem, clearCart, totalAmount, updateItem } = useCart()
  const { activities, loading: loadingActivities } = useActivities()
  const { ensureReady }                 = useRazorpayPreload()
  const { user, loading: authLoading, signOut } = useAuth()

  const [step,       setStep]       = useState<MainStep>("activities")
  const [submitting, setSubmitting] = useState(false)
  const [bookingRef, setBookingRef] = useState("")
  const [paidOnline, setPaidOnline] = useState(0)
  const [balanceDue, setBalanceDue] = useState(0)

  // ONE shared date/time for ALL activities
  const [visitDate,    setVisitDate]    = useState("")
  const [arrivalTime,  setArrivalTime]  = useState("")
  const [adminTimeSlots, setAdminTimeSlots] = useState<string[]>([])

  // Keep cart items in sync with shared date/time
  useEffect(() => {
    if (visitDate) items.forEach(i => updateItem(i.cartId, { date: visitDate }))
  }, [visitDate]) // eslint-disable-line

  useEffect(() => {
    if (arrivalTime) items.forEach(i => updateItem(i.cartId, { arrivalTime }))
  }, [arrivalTime]) // eslint-disable-line

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  // Pre-fill form from logged-in user
  useEffect(() => {
    if (user) {
      if (user.name)  setValue("customer_name",  user.name)
      if (user.email) setValue("customer_email", user.email)
    }
  }, [user, setValue])

  const isAdded = (id: number) => items.some(i => i.activity.id === id)

  const handleToggle = useCallback((activity: Activity) => {
    const existing = items.find(i => i.activity.id === activity.id)
    if (existing) {
      removeItem(existing.cartId)
      toast.info(`${activity.name} removed`)
    } else {
      addItem(activity)
      toast.success(`${activity.name} added!`)
    }
  }, [items, addItem, removeItem])

  const goBack = () => {
    if (step === "activities") { router.back(); return }
    const order: MainStep[] = ["activities", "datetime", "guests", "details"]
    const idx = order.indexOf(step)
    if (idx > 0) setStep(order[idx - 1])
  }

  const onSubmit = async (formData: FormData) => {
    setSubmitting(true)
    setStep("processing")
    try {
      const booking = await api.bookings.initiate({
        customer_name:  formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        items: items.map(i => ({
          activity_id:  i.activity.id,
          visit_date:   visitDate,
          arrival_time: arrivalTime,
          num_adults:   i.numAdults,
          num_children: i.numChildren,
        })),
      })

      setBookingRef(booking.booking_reference)

      const ready = await ensureReady()
      if (!ready) {
        toast.error("Payment gateway unavailable. Try again.")
        setSubmitting(false)
        setStep("details")
        return
      }

      setSubmitting(false)

      new (window as any).Razorpay({
        key:         booking.razorpay_key_id,
        amount:      Math.round(parseFloat(booking.amount_to_pay) * 100),
        currency:    "INR",
        name:        "MangroveSpot Adventures",
        description: `${items.length} activit${items.length > 1 ? "ies" : "y"} · Balance ₹${Math.round(parseFloat(booking.balance_due)).toLocaleString()} at arrival`,
        order_id:    booking.razorpay_order_id,
        prefill:     { name: booking.customer_name, email: booking.customer_email, contact: booking.customer_phone },
        theme:       { color: "#16a34a" },
        handler: async (response: any) => {
          setStep("processing")
          try {
            await api.payments.verify({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            })
            const paid = Math.ceil(totalAmount / 2)
            setPaidOnline(paid)
            setBalanceDue(totalAmount - paid)
            clearCart()
            setStep("success")
          } catch {
            toast.error(`Verification failed. Keep your reference: ${booking.booking_reference}`)
            setStep("details")
          }
        },
        modal: { ondismiss: () => setStep("details") },
      }).open()
    } catch (err: any) {
      toast.error(parseApiError(err) || "Booking failed. Please try again.")
      setSubmitting(false)
      setStep("details")
    }
  }

  // ── Processing screen ─────────────────────────────────────────
  if (step === "processing") return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4 text-center">
      <Loader2 className="animate-spin text-accent" size={40} />
      <p className="text-white font-bold text-lg">Confirming your payment...</p>
      <p className="text-muted-foreground text-sm max-w-xs">This takes just a moment. Do not close or refresh.</p>
    </div>
  )

  // ── Success screen ────────────────────────────────────────────
  if (step === "success") {
    const timeDisplay = arrivalTime
      ? TIME_SLOTS.find(s => s.value === arrivalTime)?.label ?? arrivalTime
      : null

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-5 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check size={36} className="text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-xs mx-auto">Your adventures are booked. A confirmation email has been sent.</p>
        </div>
        <div className="bg-card border border-accent/30 rounded-2xl p-6 w-full max-w-xs">
          <p className="text-xs text-muted-foreground mb-2">Booking Reference</p>
          <p className="text-2xl font-bold text-accent font-mono tracking-widest">{bookingRef}</p>
          {visitDate && timeDisplay && (
            <p className="text-xs text-muted-foreground mt-3">
              📅 {format(new Date(visitDate + "T00:00:00"), "EEEE, MMMM d yyyy")} · Arrival {timeDisplay}
            </p>
          )}
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3 w-full max-w-xs text-left">
          <p className="text-yellow-400 text-xs font-semibold flex items-center gap-1.5 mb-1">
            <Wallet size={13} /> Balance Due at Arrival
          </p>
          <p className="text-muted-foreground text-xs">
            Please carry <span className="text-white font-semibold">₹{balanceDue.toLocaleString()}</span> to pay at the venue.
            You've paid <span className="text-white font-semibold">₹{paidOnline.toLocaleString()}</span> online.
          </p>
        </div>
        <Button onClick={() => router.push("/")} className="bg-accent hover:bg-accent/90 px-8 py-5 font-bold w-full max-w-xs">
          Back to Home
        </Button>
      </div>
    )
  }

  const showAuthGate = !authLoading && !user

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-8">
      {showAuthGate && <AuthGate onSuccess={() => {}} />}

      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3 max-w-2xl mx-auto">
          <button
            onClick={goBack}
            className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-border transition-colors shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-white leading-none">Book Adventures</h1>
            <p className="text-xs text-muted-foreground mt-0.5">MangroveSpot · Paravur</p>
          </div>
          {user && (
            <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5 shrink-0">
              {user.avatar
                ? <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full" />
                : <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold">{user.name?.[0]?.toUpperCase()}</div>
              }
              <span className="text-accent text-xs font-medium max-w-[80px] truncate hidden sm:inline">{user.name}</span>
              <button onClick={signOut} title="Sign out" className="text-accent/50 hover:text-accent transition-colors">
                <LogOut size={11} />
              </button>
            </div>
          )}
        </div>
        <StepBar current={step} />
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pt-5 pb-4">

        {/* ── STEP 1: Pick Activities ───────────────────────── */}
        {step === "activities" && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-white font-bold text-base">Choose your activities</h2>
              <p className="text-muted-foreground text-xs mt-0.5">Tap to add or remove. You can pick multiple.</p>
            </div>
            {loadingActivities
              ? <div className="flex justify-center py-16"><Loader2 className="animate-spin text-accent" size={28} /></div>
              : (
                <div className="flex flex-col gap-2">
                  {activities.map((a, i) => (
                    <ActivityCard
                      key={a.id}
                      activity={a}
                      added={isAdded(a.id)}
                      onToggle={() => handleToggle(a)}
                      priority={i === 0}
                    />
                  ))}
                </div>
              )
            }
            {items.length > 0 && (
              <div className="sticky bottom-0 left-0 right-0 pt-3 bg-background/95 backdrop-blur-sm">
                <Button
                  onClick={() => setStep("datetime")}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-5 text-base rounded-2xl flex items-center justify-between px-5 transition-all active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart size={16} />
                    {items.length} activit{items.length !== 1 ? "ies" : "y"} selected
                  </span>
                  <span className="flex items-center gap-1 opacity-80">
                    <IndianRupee size={13} />{totalAmount.toLocaleString()} · Next →
                  </span>
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: Date & Time ───────────────────────────── */}
        {step === "datetime" && (
          <DateTimeStep
            visitDate={visitDate}
            arrivalTime={arrivalTime}
            onDateChange={setVisitDate}
            onTimeChange={setArrivalTime}
            onNext={() => setStep("guests")}
            onBack={() => setStep("activities")}
            adminTimeSlots={adminTimeSlots}
          />
        )}

        {/* ── STEP 3: Guests ────────────────────────────────── */}
        {step === "guests" && (
          <GuestsStep
            items={items}
            updateItem={updateItem}
            onNext={() => setStep("details")}
            onBack={() => setStep("datetime")}
          />
        )}

        {/* ── STEP 4: Details & Pay ─────────────────────────── */}
        {step === "details" && (
          <DetailsStep
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            submitting={submitting}
            totalAmount={totalAmount}
            items={items}
            visitDate={visitDate}
            arrivalTime={arrivalTime}
            onBack={() => setStep("guests")}
          />
        )}

      </div>
    </main>
  )
}