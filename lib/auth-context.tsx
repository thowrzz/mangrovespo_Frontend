"use client"

import {
  createContext, useContext, useEffect, useState, useCallback,
  type ReactNode,
} from "react"

// ─── Types ────────────────────────────────────────────────────────

export interface CustomerUser {
  email:  string
  name:   string
  avatar: string
  token:  string
}

interface AuthContextValue {
  user:      CustomerUser | null
  loading:   boolean
  signOut:   () => void
  setUser:   (u: CustomerUser) => void
}

// ─── Context ──────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
  user:    null,
  loading: true,
  signOut: () => {},
  setUser: () => {},
})

const STORAGE_KEY = "ms_customer"

// ─── Provider ─────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState]  = useState<CustomerUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: CustomerUser = JSON.parse(raw)
        if (_tokenAlive(parsed.token)) {
          setUserState(parsed)
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    } finally {
      setLoading(false)
    }
  }, [])

  const setUser = useCallback((u: CustomerUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    setUserState(u)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUserState(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext)
}

// ─── Helpers ──────────────────────────────────────────────────────

/**
 * Returns true if the token should be considered valid/alive.
 *
 * Supports two token formats:
 *  - Opaque tokens (DRF Token, Knox): flat hex/alphanumeric strings with no dots.
 *    These have no embedded expiry, so we just check they are non-empty.
 *  - JWTs (3 dot-separated base64 segments): we decode the payload and compare `exp`.
 *    If `exp` is absent we trust the token rather than reject it.
 */
function _tokenAlive(token: string): boolean {
  if (!token || !token.trim()) return false

  const parts = token.split(".")

  // Opaque DRF token — no expiry to check, trust as valid
  if (parts.length < 3) {
    return true
  }

  // JWT path
  try {
    const payload = parts[1]
    const padded  = payload + "=".repeat((4 - (payload.length % 4)) % 4)
    const json    = atob(padded.replace(/-/g, "+").replace(/_/g, "/"))
    const { exp } = JSON.parse(json)
    // If no `exp` claim, treat token as non-expiring
    return typeof exp === "number" ? Date.now() / 1000 < exp : true
  } catch {
    // Malformed JWT — reject
    return false
  }
}