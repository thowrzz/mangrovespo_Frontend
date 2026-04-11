// // lib/api.ts
// // Central API client for MangroveSpot backend
// // All fetch calls go through here — change BASE_URL in .env.local only

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     headers: { 'Content-Type': 'application/json', ...options?.headers },
//     ...options,
//   })
//   if (!res.ok) {
//     const error = await res.json().catch(() => ({}))
//     throw { status: res.status, data: error }
//   }
//   return res.json()
// }

// // ── Activities ────────────────────────────────────────────────────
// export interface TimeSlot {
//   id: number
//   label: string
//   time: string
//   capacity: number
//   available: number
//   is_full: boolean
// }

// export interface Activity {
//   id: number
//   name: string
//   tagline: string
//   category: string
//   image_url: string
//   duration: string
//   base_price: string
//   pricing_type: 'per_person' | 'per_group'
//   min_persons: number
//   max_persons: number
//   is_popular: boolean
//   requires_prebooking: boolean
//   display_order: number
// }

// export interface ActivityDetail extends Activity {
//   description: string
//   rules_text: string
//   extra_person_charge: string
//   slots: TimeSlot[]
// }

// export interface AvailabilityResponse {
//   date: string
//   blocked: boolean
//   slots: {
//     id: number
//     label: string
//     time: string
//     capacity: number
//     available: number
//     is_available: boolean
//   }[]
// }

// export const api = {
//   activities: {
//     list: () => apiFetch<{ count: number; results: Activity[] }>('/api/v1/activities/'),
//     detail: (id: number) => apiFetch<ActivityDetail>(`/api/v1/activities/${id}/`),
//     availability: (id: number, date: string) =>
//       apiFetch<AvailabilityResponse>(`/api/v1/activities/${id}/availability/?date=${date}`),
//   },

//   bookings: {
//     initiate: (data: BookingPayload) =>
//       apiFetch<BookingInitiateResponse>('/api/v1/bookings/initiate/', {
//         method: 'POST',
//         body: JSON.stringify(data),
//       }),
//     lookup: (email: string, reference: string) =>
//       apiFetch(`/api/v1/bookings/lookup/?email=${email}&reference=${reference}`),
//   },

//   payments: {
//     verify: (data: PaymentVerifyPayload) =>
//       apiFetch('/api/v1/payments/verify/', {
//         method: 'POST',
//         body: JSON.stringify(data),
//       }),
//   },
// }

// // ── Types ─────────────────────────────────────────────────────────
// export interface BookingItem {
//   activity_id: number
//   slot_id: number
//   visit_date: string
//   num_persons: number
// }

// export interface BookingPayload {
//   customer_name: string
//   customer_email: string
//   customer_phone: string
//   items: BookingItem[]
// }

// export interface BookingInitiateResponse {
//   booking_reference: string
//   razorpay_order_id: string
//   razorpay_key_id: string
//   grand_total: string
//   customer_name: string
//   customer_email: string
//   customer_phone: string
// }

// export interface PaymentVerifyPayload {
//   razorpay_order_id: string
//   razorpay_payment_id: string
//   razorpay_signature: string
//   booking_reference: string
// }
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    const err: any = new Error(`HTTP ${res.status}`)
    err.status = res.status
    err.data   = error
    throw err
  }
  return res.json()
}

// ── Types ─────────────────────────────────────────────────────────

export interface TimeSlot {
  id: number; label: string; time: string
  capacity: number; available: number; is_full: boolean
}

// ── NEW: structured activity rule ─────────────────────────────────
export interface ActivityRule {
  id: number
  rule: string
  order: number
}

export interface Activity {
  id: number; name: string; tagline: string; category: string
  image_url: string; duration: string; base_price: string
  child_price: string | null          // ── NEW: child pricing
  pricing_type: 'per_person' | 'per_group'; min_persons: number
  max_persons: number; is_popular: boolean
  requires_prebooking: boolean; display_order: number
}

export interface ActivityDetail extends Activity {
  description: string
  extra_person_charge: string; slots: TimeSlot[]
  rules: ActivityRule[]              // ── CHANGED: structured rules (replaces rules_text string)
}

export interface AvailabilityResponse {
  date: string; blocked: boolean; slots: TimeSlot[]
}

// ── CHANGED: per-item now sends adults + children + arrival_time ──
export interface BookingItem {
  activity_id:  number
  visit_date:   string
  arrival_time: string        // HH:MM — free arrival time picked by visitor
  num_adults:   number        // ── NEW: split from num_persons
  num_children: number        // ── NEW
  slot_id?:     number | null // optional — only for fixed-slot activities
}

export interface BookingPayload {
  customer_name:    string
  customer_email:   string
  customer_phone:   string
  special_requests?: string
  items:            BookingItem[]
}

// ── CHANGED: response now includes payment split fields ───────────
export interface BookingInitiateResponse {
  booking_reference: string
  razorpay_order_id: string
  razorpay_key_id:   string
  grand_total:       string   // full booking value
  amount_to_pay:     string   // 50% — charged now via Razorpay
  balance_due:       string   // 50% — collected at arrival
  payment_mode:      string   // always 'half'
  customer_name:     string
  customer_email:    string
  customer_phone:    string
}

export interface PaymentVerifyPayload {
  razorpay_order_id:   string
  razorpay_payment_id: string
  razorpay_signature:  string
}

// ── CHANGED: lookup response reflects adults/children split ───────
export interface BookingLookupResponse {
  reference:      string
  status:         string
  customer_name:  string
  customer_email: string
  customer_phone: string
  grand_total:    string
  amount_paid:    string      // ── NEW
  balance_due:    string      // ── NEW
  payment_mode:   string      // ── NEW
  items: Array<{
    activity_name:  string
    activity_image: string
    slot_label:     string | null
    arrival_time:   string | null  // ── NEW
    visit_date:     string
    num_adults:     number         // ── NEW
    num_children:   number         // ── NEW
    price_snapshot: string
  }>
}

export interface AuthResponse {
  token: string; name: string; email: string; avatar: string
}

// ── API ───────────────────────────────────────────────────────────

export const api = {
  activities: {
    list: () =>
      apiFetch<Activity[]>('/api/v1/activities/'),
    detail: (id: number) =>
      apiFetch<ActivityDetail>(`/api/v1/activities/${id}/`),
    availability: (id: number, date: string) =>
      apiFetch<AvailabilityResponse>(`/api/v1/activities/${id}/availability/?date=${date}`),
  },

  bookings: {
    initiate: (data: BookingPayload) =>
      apiFetch<BookingInitiateResponse>('/api/v1/bookings/initiate/', {
        method: 'POST', body: JSON.stringify(data),
      }),
    lookup: (email: string, reference: string) =>
      apiFetch<BookingLookupResponse>(
        `/api/v1/bookings/lookup/?email=${encodeURIComponent(email)}&reference=${encodeURIComponent(reference)}`
      ),
  },

  payments: {
    verify: (data: PaymentVerifyPayload) =>
      apiFetch<{ status: string; booking_reference: string; message: string }>(
        '/api/v1/payments/verify/',
        { method: 'POST', body: JSON.stringify(data) }
      ),
  },

  // ── Customer auth ──────────────────────────────────────────────
  auth: {
    sendOtp: (email: string) =>
      apiFetch<{ message: string }>('/api/v1/auth/otp/send/', {
        method: 'POST', body: JSON.stringify({ email }),
      }),
    verifyOtp: (email: string, code: string) =>
      apiFetch<AuthResponse>('/api/v1/auth/otp/verify/', {
        method: 'POST', body: JSON.stringify({ email, code }),
      }),
    google: (credential: string) =>
      apiFetch<AuthResponse>('/api/v1/auth/google/', {
        method: 'POST', body: JSON.stringify({ credential }),
      }),
  },
}

export function parseApiError(err: any): string {
  const data = err?.data
  if (!data || typeof data !== 'object') return err?.message || 'Something went wrong'
  return Object.entries(data)
    .map(([field, errors]) => {
      const label = field === 'non_field_errors' || field === 'detail' ? '' : `${field}: `
      const msg   = Array.isArray(errors) ? errors.join(', ') : String(errors)
      return `${label}${msg}`
    })
    .join('\n')
}
