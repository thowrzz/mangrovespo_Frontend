"use client"

import { useState, useEffect, useRef } from "react"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import { X, Mail, ArrowLeft, Loader2, ShieldCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { api, parseApiError } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""

// ── 6-box OTP input ───────────────────────────────────────────────

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
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          className="w-11 h-14 text-center text-xl font-bold rounded-xl border border-border bg-background text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
        />
      ))}
    </div>
  )
}

// ── Auth Modal ────────────────────────────────────────────────────

type Step = "choose" | "email" | "otp"

interface Props {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function AuthModal({ open, onClose, onSuccess }: Props) {
  const { setUser } = useAuth()
  const [step,      setStep]      = useState<Step>("choose")
  const [email,     setEmail]     = useState("")
  const [otp,       setOtp]       = useState("")
  const [loading,   setLoading]   = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Reset on open
  useEffect(() => {
    if (open) { setStep("choose"); setEmail(""); setOtp(""); setLoading(false) }
  }, [open])

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return
    const id = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(id)
  }, [countdown])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const finish = (res: { token: string; name: string; email: string; avatar: string }) => {
    setUser(res)
    toast.success(`Welcome, ${res.name}! 🌿`)
    onSuccess?.()
    onClose()
  }

  const handleGoogle = async (credentialResponse: any) => {
    setLoading(true)
    try {
      finish(await api.auth.google(credentialResponse.credential))
    } catch (err: any) {
      toast.error(parseApiError(err) || "Google sign-in failed")
    } finally { setLoading(false) }
  }

  const handleSendOtp = async () => {
    if (!email.includes("@")) { toast.error("Enter a valid email"); return }
    setLoading(true)
    try {
      await api.auth.sendOtp(email)
      setStep("otp"); setCountdown(60)
      toast.success("OTP sent! Check your inbox.")
    } catch (err: any) {
      toast.error(parseApiError(err) || "Could not send OTP")
    } finally { setLoading(false) }
  }

  const handleVerifyOtp = async () => {
    if (otp.replace(/\s/g, "").length !== 6) { toast.error("Enter the 6-digit code"); return }
    setLoading(true)
    try {
      finish(await api.auth.verifyOtp(email, otp.trim()))
    } catch (err: any) {
      toast.error(parseApiError(err) || "Invalid or expired code")
      setOtp("")
    } finally { setLoading(false) }
  }

  if (!open) return null

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm flex items-end sm:items-center justify-center"
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        {/* Card */}
        <div className="w-full sm:max-w-sm bg-card rounded-t-3xl sm:rounded-3xl border border-border shadow-2xl overflow-hidden">

          {/* Mobile drag handle */}
          <div className="flex justify-center pt-3 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <div className="flex items-center gap-2">
              {step !== "choose" && (
                <button
                  onClick={() => { setStep(step === "otp" ? "email" : "choose"); setOtp("") }}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-border transition-colors"
                >
                  <ArrowLeft size={15} />
                </button>
              )}
              <div>
                <h2 className="text-white font-bold text-base leading-none">
                  {step === "choose" ? "Sign in to book" : step === "email" ? "Enter your email" : "Check your inbox"}
                </h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {step === "choose" ? "Your session is saved for 30 days"
                    : step === "email" ? "We'll send a 6-digit code"
                    : `Code sent to ${email}`}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-border transition-colors">
              <X size={15} />
            </button>
          </div>

          <div className="px-5 pb-6 pt-3 flex flex-col gap-4">

            {/* Choose */}
            {step === "choose" && (
              <>
                <div className="flex justify-center">
                  {loading
                    ? <Loader2 size={22} className="animate-spin text-accent my-4" />
                    : <GoogleLogin
                        onSuccess={handleGoogle}
                        onError={() => toast.error("Google sign-in failed")}
                        theme="filled_black"
                        shape="pill"
                        size="large"
                        width="280"
                        text="continue_with"
                      />
                  }
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 border-t border-border" />
                  <span className="text-muted-foreground text-xs">or</span>
                  <div className="flex-1 border-t border-border" />
                </div>

                <button
                  onClick={() => setStep("email")}
                  className="w-full flex items-center justify-center gap-2.5 border border-border rounded-full py-3 text-sm font-medium text-white hover:border-accent hover:bg-accent/5 transition-all"
                >
                  <Mail size={16} className="text-accent" />
                  Continue with Email OTP
                </button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  We only use your email to send booking confirmations.
                </p>
              </>
            )}

            {/* Email */}
            {step === "email" && (
              <>
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoFocus
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value.trim())}
                  onKeyDown={e => e.key === "Enter" && handleSendOtp()}
                  className="bg-background border-border h-12 text-base"
                />
                <Button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-5"
                >
                  {loading ? <><Loader2 size={15} className="animate-spin mr-1" />Sending...</> : "Send OTP →"}
                </Button>
              </>
            )}

            {/* OTP */}
            {step === "otp" && (
              <>
                <div className="text-center">
                  <ShieldCheck size={36} className="text-accent mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    Enter the 6-digit code sent to<br />
                    <span className="text-white font-medium">{email}</span>
                  </p>
                </div>

                <OtpInput value={otp} onChange={setOtp} />

                <Button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.replace(/\s/g, "").length !== 6}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-5"
                >
                  {loading ? <><Loader2 size={15} className="animate-spin mr-1" />Verifying...</> : "Verify & Continue →"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  {countdown > 0
                    ? `Resend in ${countdown}s`
                    : <button onClick={handleSendOtp} className="text-accent hover:underline">Resend code</button>
                  }
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}