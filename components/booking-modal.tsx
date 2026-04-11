"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Loader2, Minus, Plus, Clock } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api, Activity, BookingInitiateResponse } from "@/lib/api"
import { toast } from "sonner"

// ── Zod schema ────────────────────────────────────────────────────
const schema = z.object({
  customer_name:  z.string().min(2, "Name must be at least 2 characters"),
  customer_email: z.string().email("Enter a valid email"),
  customer_phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile number"),
})
type FormData = z.infer<typeof schema>

interface Props {
  activity: Activity
  open: boolean
  onClose: () => void
}

type Step = "date" | "arrival" | "details" | "processing" | "success"

// ── Stepper component ─────────────────────────────────────────────
function Stepper({
  label, sublabel, value, min, max, onChange,
}: {
  label: string; sublabel: string
  value: number; min: number; max: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
      <div>
        <p className="text-white font-medium text-sm">{label}</p>
        <p className="text-muted-foreground text-xs">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Minus size={14} />
        </button>
        <span className="text-white font-bold w-5 text-center tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  )
}

// ── Build time slots from open/close strings ──────────────────────
function buildTimeSlots(openStr: string, closeStr: string, intervalMins = 30): string[] {
  const [oh, om] = openStr.split(":").map(Number)
  const [ch, cm] = closeStr.split(":").map(Number)
  const openMins  = oh * 60 + om
  const closeMins = ch * 60 + cm
  const slots: string[] = []
  for (let t = openMins; t <= closeMins; t += intervalMins) {
    const hh = String(Math.floor(t / 60)).padStart(2, "0")
    const mm = String(t % 60).padStart(2, "0")
    slots.push(`${hh}:${mm}`)
  }
  return slots
}

export function BookingModal({ activity, open, onClose }: Props) {
  // Derive operating window from activity — fallback to 06:30–17:00
  const openStr  = (activity as any).opening_time  ?? "06:30"
  const closeStr = (activity as any).closing_time  ?? "17:00"
  const timeSlots = buildTimeSlots(openStr, closeStr)

  const [step,          setStep]          = useState<Step>("date")
  const [selectedDate,  setSelectedDate]  = useState<Date>()
  const [loadingSlots,  setLoadingSlots]  = useState(false)
  const [arrivalTime,   setArrivalTime]   = useState(timeSlots[0] ?? "09:00")
  const [numAdults,     setNumAdults]     = useState(activity.min_persons)
  const [numChildren,   setNumChildren]   = useState(0)
  const [bookingResult, setBookingResult] = useState<BookingInitiateResponse | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  // ── Price calculation ─────────────────────────────────────────
  const adultPrice = parseFloat(activity.base_price)
  const childPrice = activity.child_price != null
    ? parseFloat(activity.child_price)
    : adultPrice

  const totalPrice = activity.pricing_type === "per_person"
    ? (adultPrice * numAdults) + (childPrice * numChildren)
    : adultPrice

  const payNow     = Math.ceil(totalPrice / 2)
  const payArrival = totalPrice - payNow
  const totalPersons = numAdults + numChildren

  // ── Date selection → check availability ──────────────────────
  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) return
    setSelectedDate(date)
    setLoadingSlots(true)
    try {
      const dateStr = format(date, "yyyy-MM-dd")
      const data    = await api.activities.availability(activity.id, dateStr)
      if (data.blocked) {
        toast.error("This date is not available. Please choose another date.")
      } else {
        setStep("arrival")
      }
    } catch {
      toast.error("Failed to check availability. Please try again.")
    } finally {
      setLoadingSlots(false)
    }
  }

  // ── Razorpay loader ───────────────────────────────────────────
  const loadRazorpay = (src: string) =>
    new Promise<boolean>(resolve => {
      const script   = document.createElement("script")
      script.src     = src
      script.onload  = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  // ── Form submit → initiate booking ───────────────────────────
  const onSubmit = async (formData: FormData) => {
    if (!selectedDate) return

    if (totalPersons < activity.min_persons) {
      toast.error(`Minimum ${activity.min_persons} person(s) required`)
      return
    }
    if (totalPersons > activity.max_persons) {
      toast.error(`Maximum ${activity.max_persons} persons allowed`)
      return
    }

    setStep("processing")
    try {
      const payload = {
        customer_name:  formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        items: [{
          activity_id:  activity.id,
          arrival_time: arrivalTime,
          visit_date:   format(selectedDate, "yyyy-MM-dd"),
          num_adults:   numAdults,
          num_children: numChildren,
        }],
      }

      const booking = await api.bookings.initiate(payload)
      setBookingResult(booking)

      await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js")

      const options = {
        key:         booking.razorpay_key_id,
        amount:      Math.round(payNow * 100),
        currency:    "INR",
        name:        "MangroveSpot Adventures",
        description: `${activity.name} — 50% advance`,
        order_id:    booking.razorpay_order_id,
        prefill: {
          name:    booking.customer_name,
          email:   booking.customer_email,
          contact: booking.customer_phone,
        },
        notes: {
          balance_due:   payArrival,
          booking_ref:   booking.booking_reference,
          payment_split: "50% advance, 50% at arrival",
        },
        theme: { color: "#16a34a" },
        handler: async (response: any) => {
          try {
            await api.payments.verify({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              booking_reference:   booking.booking_reference,
            })
            setStep("success")
            toast.success("Booking confirmed! Check your email.")
          } catch {
            toast.error("Payment verification failed. Contact support.")
          }
        },
        modal: { ondismiss: () => setStep("details") },
      }

      // @ts-ignore
      new window.Razorpay(options).open()
    } catch (err: any) {
      toast.error(err?.data?.detail || "Booking failed. Please try again.")
      setStep("details")
    }
  }

  const handleClose = () => {
    setStep("date")
    setSelectedDate(undefined)
    setArrivalTime(timeSlots[0] ?? "09:00")
    setNumAdults(activity.min_persons)
    setNumChildren(0)
    setBookingResult(null)
    onClose()
  }

  const openLabel  = format(new Date(`2000-01-01T${openStr}`),  "h:mm a")
  const closeLabel = format(new Date(`2000-01-01T${closeStr}`), "h:mm a")

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-card text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Book {activity.name}
          </DialogTitle>
          {selectedDate && step !== "date" && (
            <p className="text-sm text-muted-foreground">
              {format(selectedDate, "EEEE, MMMM d yyyy")}
              {arrivalTime && step !== "arrival" && (
                ` • Arrival ${format(new Date(`2000-01-01T${arrivalTime}`), "h:mm a")}`
              )}
            </p>
          )}
        </DialogHeader>

        {/* ── STEP 1 — Date picker ──────────────────────────── */}
        {step === "date" && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">Select your visit date</p>
            {loadingSlots ? (
              <div className="flex items-center gap-2 py-8">
                <Loader2 className="animate-spin" size={20} />
                <span>Checking availability...</span>
              </div>
            ) : (
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={{ before: new Date() }}
                className="rounded-lg border border-border p-2"
              />
            )}
          </div>
        )}

        {/* ── STEP 2 — Arrival time picker ──────────────────── */}
        {step === "arrival" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                Choose your arrival time — open{" "}
                <span className="text-white font-medium">{openLabel} – {closeLabel}</span>
              </p>

              <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex flex-col gap-3">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                  Select Arrival Time
                </Label>

                {/* ── Time slot grid — only admin-set window ── */}
                <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                  {timeSlots.map(slot => {
                    const label      = format(new Date(`2000-01-01T${slot}`), "h:mm a")
                    const isSelected = arrivalTime === slot
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setArrivalTime(slot)}
                        className={`flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl border text-xs font-medium transition-all active:scale-95
                          ${isSelected
                            ? "border-accent bg-accent/15 text-accent"
                            : "border-border text-muted-foreground hover:border-accent/50 hover:text-white"
                          }`}
                      >
                        <Clock size={11} className={isSelected ? "text-accent" : "text-muted-foreground"} />
                        {label}
                      </button>
                    )
                  })}
                </div>

                {arrivalTime && (
                  <p className="text-xs text-muted-foreground">
                    Selected:{" "}
                    <span className="text-white font-semibold">
                      {format(new Date(`2000-01-01T${arrivalTime}`), "h:mm a")}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="ghost" onClick={() => setStep("date")} className="flex-1">
                ← Back
              </Button>
              <Button
                onClick={() => {
                  if (!arrivalTime) {
                    toast.error("Please select an arrival time")
                    return
                  }
                  setStep("details")
                }}
                className="flex-1 bg-accent hover:bg-accent/90 font-semibold"
              >
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 3 — Customer details + persons ───────────── */}
        {step === "details" && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            {/* Summary pill */}
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-3 text-sm">
              <p className="font-semibold text-accent">{activity.name}</p>
              <p className="text-muted-foreground text-xs">
                {format(selectedDate!, "MMM d, yyyy")} · Arrival {format(new Date(`2000-01-01T${arrivalTime}`), "h:mm a")}
              </p>
              <div className="flex items-end justify-between mt-2">
                <div>
                  <p className="text-xs text-muted-foreground">Grand Total</p>
                  <p className="text-lg font-bold text-white">₹{totalPrice.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-400 font-medium">Pay now: ₹{payNow.toLocaleString()}</p>
                  <p className="text-xs text-yellow-400">At arrival: ₹{payArrival.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Adults + children steppers */}
            <div className="bg-card border border-border rounded-xl px-4 pt-3 pb-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Guests</p>
              <Stepper
                label="Adults"
                sublabel={`₹${adultPrice.toLocaleString()} per person`}
                value={numAdults}
                min={activity.min_persons}
                max={activity.max_persons}
                onChange={setNumAdults}
              />
              <Stepper
                label="Children"
                sublabel={
                  activity.child_price != null
                    ? `₹${childPrice.toLocaleString()} per child`
                    : "Same price as adults"
                }
                value={numChildren}
                min={0}
                max={activity.max_persons - numAdults}
                onChange={setNumChildren}
              />
              <p className="text-xs text-muted-foreground py-2">
                Total: <span className="text-white font-medium">{totalPersons}</span> guest{totalPersons !== 1 ? "s" : ""} &nbsp;·&nbsp;
                Min {activity.min_persons} · Max {activity.max_persons}
              </p>
            </div>

            {/* Customer info fields */}
            <div>
              <Label>Full Name</Label>
              <Input {...register("customer_name")} placeholder="Your name" className="mt-1" />
              {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name.message}</p>}
            </div>

            <div>
              <Label>Email</Label>
              <Input {...register("customer_email")} placeholder="your@email.com" className="mt-1" />
              {errors.customer_email && <p className="text-red-500 text-xs mt-1">{errors.customer_email.message}</p>}
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input {...register("customer_phone")} placeholder="10-digit mobile number" className="mt-1" />
              {errors.customer_phone && <p className="text-red-500 text-xs mt-1">{errors.customer_phone.message}</p>}
            </div>

            {/* Payment split notice */}
            <div className="bg-yellow-500/8 border border-yellow-500/20 rounded-xl p-3 flex flex-col gap-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-semibold">✓ Pay now (50%)</span>
                <span className="text-green-400 font-bold">₹{payNow.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 font-semibold">🏕 Pay at arrival (50%)</span>
                <span className="text-yellow-400 font-bold">₹{payArrival.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="ghost" onClick={() => setStep("arrival")} className="flex-1">
                ← Back
              </Button>
              <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90 font-semibold">
                Pay ₹{payNow.toLocaleString()} Now
              </Button>
            </div>
          </form>
        )}

        {/* ── STEP 4 — Processing ───────────────────────────── */}
        {step === "processing" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <Loader2 className="animate-spin text-accent" size={40} />
            <p className="text-muted-foreground">Processing your booking...</p>
          </div>
        )}

        {/* ── STEP 5 — Success ──────────────────────────────── */}
        {step === "success" && bookingResult && (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-3xl">✅</div>
            <h3 className="text-xl font-bold text-white">Booking Confirmed!</h3>
            <p className="text-muted-foreground text-sm">
              A confirmation email has been sent to<br />
              <span className="text-white">{bookingResult.customer_email}</span>
            </p>

            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 w-full">
              <p className="text-xs text-muted-foreground">Booking Reference</p>
              <p className="text-2xl font-bold text-accent font-mono">{bookingResult.booking_reference}</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 w-full text-left">
              <p className="text-yellow-400 text-xs font-semibold mb-0.5">💰 Reminder — Balance Due at Arrival</p>
              <p className="text-muted-foreground text-xs">
                Please carry <span className="text-white font-semibold">₹{payArrival.toLocaleString()}</span> to pay on arrival.
                You've already paid ₹{payNow.toLocaleString()} online.
              </p>
            </div>


            <Button onClick={handleClose} className="w-full bg-accent hover:bg-accent/90">Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}