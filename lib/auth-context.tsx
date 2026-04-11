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
  const [user, setUserState]   = useState<CustomerUser | null>(null)
  const [loading, setLoading]  = useState(true)

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: CustomerUser = JSON.parse(raw)
        // Quick expiry check — decode JWT payload
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

function _tokenAlive(token: string): boolean {
  try {
    const [, payload] = token.split(".")
    const pad = 4 - (payload.length % 4)
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad))
    const { exp } = JSON.parse(json)
    return Date.now() / 1000 < exp
  } catch {
    return false
  }
}