'use client'

import {
  createContext, useContext, useEffect, useState, useCallback,
  type ReactNode,
} from 'react'
import type { AuthResponse } from '@/lib/api'

// ── Types ─────────────────────────────────────────────────────────

export interface CustomerUser {
  email:  string
  name:   string
  avatar: string
  token:  string   // always normalized to .token internally
}

interface AuthContextValue {
  user:    CustomerUser | null
  loading: boolean
  signOut: () => void
  setUser: (u: CustomerUser | AuthResponse) => void  // accepts raw API response too
}

// ── Context ───────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
  user:    null,
  loading: true,
  signOut: () => {},
  setUser: () => {},
})

const STORAGE_KEY = 'ms_customer'

// ── Normalizer ────────────────────────────────────────────────────
// Handles both DRF Token (.token) and dj-rest-auth (.key)
function normalizeUser(u: CustomerUser | AuthResponse): CustomerUser {
  return {
    email:  u.email,
    name:   u.name,
    avatar: u.avatar ?? '',
    token:  (u as any).token ?? (u as any).key ?? '',  // normalize here once
  }
}

// ── Provider ──────────────────────────────────────────────────────

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

  const setUser = useCallback((u: CustomerUser | AuthResponse) => {
    const normalized = normalizeUser(u)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
    setUserState(normalized)
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

// ── Hook ──────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext)
}

// ── Helpers ───────────────────────────────────────────────────────

/**
 * Returns true if the token should be considered valid/alive.
 *
 * Supports:
 *  - Opaque tokens (DRF Token, Knox): no dots, no expiry → always valid
 *  - JWTs (3 dot-separated base64 segments): decode payload, compare `exp`
 */
function _tokenAlive(token: string): boolean {
  if (!token || !token.trim()) return false

  const parts = token.split('.')

  // Opaque DRF/Knox token — no embedded expiry, trust as valid
  if (parts.length < 3) return true

  // JWT path
  try {
    const payload = parts[1]
    const padded  = payload + '='.repeat((4 - (payload.length % 4)) % 4)
    const json    = atob(padded.replace(/-/g, '+').replace(/_/g, '/'))
    const { exp } = JSON.parse(json)
    // No exp claim → treat as non-expiring
    return typeof exp === 'number' ? Date.now() / 1000 < exp : true
  } catch {
    return false  // malformed JWT → reject
  }
}