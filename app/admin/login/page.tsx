"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Leaf, Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { adminApi } from "@/lib/admin-api"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername]       = useState("")
  const [password, setPassword]       = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await adminApi.login(username, password)
      router.push("/admin")
    } catch (err: any) {
      setError(err.message || "Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-8">

        {/* Logo + heading */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
            <Leaf size={30} className="text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-white">MangroveSpot</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to the Admin Panel
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleLogin}
          className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5 shadow-xl"
        >
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              className="bg-background border-border"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="bg-background border-border pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 flex items-start gap-2">
              <span className="text-red-400 text-lg leading-none mt-0.5">⚠</span>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-5 mt-1 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground">
          MangroveSpot Adventures · Admin Access Only
        </p>
      </div>
    </div>
  )
}
