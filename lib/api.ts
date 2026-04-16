

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// // ── Token helper ──────────────────────────────────────────────────
// function getToken(): string | null {
//   if (typeof window === 'undefined') return null
//   try {
//     const raw = localStorage.getItem('ms_customer')
//     if (!raw) return null
//     const parsed = JSON.parse(raw)
//     return parsed?.token ?? parsed?.key ?? null  // ← handles both field names
//   } catch { return null }
// }

// async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
//   const token = getToken()
//   const res = await fetch(`${BASE_URL}${path}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Token ${token}` } : {}),  // DRF TokenAuthentication
//       ...options?.headers,
//     },
//     ...options,
//   })
//   if (!res.ok) {
//     const error = await res.json().catch(() => ({}))
//     const err: any = new Error(`HTTP ${res.status}`)
//     err.status = res.status
//     err.data   = error
//     throw err
//   }
//   return res.json()
// }

// // ── Types ─────────────────────────────────────────────────────────

// export interface TimeSlot {
//   id: number; label: string; time: string
//   capacity: number; available: number; is_full: boolean
// }

// export interface ActivityRule {
//   id: number
//   rule: string
//   order: number
// }

// export interface Activity {
//   id: number; name: string; tagline: string; category: string
//   image_url: string; duration: string; base_price: string
//   child_price: string | null
//   pricing_type: 'per_person' | 'per_group'; min_persons: number
//   max_persons: number; is_popular: boolean
//   requires_prebooking: boolean; display_order: number
// }

// export interface ActivityDetail extends Activity {
//   description: string
//   extra_person_charge: string; slots: TimeSlot[]
//   rules: ActivityRule[]
// }

// export interface AvailabilityResponse {
//   date: string; blocked: boolean; slots: TimeSlot[]
// }

// export interface BookingItem {
//   activity_id:  number
//   visit_date:   string
//   arrival_time: string
//   num_adults:   number
//   num_children: number
//   slot_id?:     number | null
// }

// export interface BookingPayload {
//   customer_name:    string
//   customer_email:   string
//   customer_phone:   string
//   special_requests?: string
//   items:            BookingItem[]
// }

// export interface BookingInitiateResponse {
//   booking_reference: string
//   razorpay_order_id: string
//   razorpay_key_id:   string
//   grand_total:       string
//   amount_to_pay:     string
//   balance_due:       string
//   payment_mode:      string
//   customer_name:     string
//   customer_email:    string
//   customer_phone:    string
// }

// export interface PaymentVerifyPayload {
//   razorpay_order_id:   string
//   razorpay_payment_id: string
//   razorpay_signature:  string
// }

// export interface BookingLookupResponse {
//   reference:      string
//   status:         string
//   customer_name:  string
//   customer_email: string
//   customer_phone: string
//   grand_total:    string
//   amount_paid:    string
//   balance_due:    string
//   payment_mode:   string
//   items: Array<{
//     activity_name:  string
//     activity_image: string
//     slot_label:     string | null
//     arrival_time:   string | null
//     visit_date:     string
//     num_adults:     number
//     num_children:   number
//     price_snapshot: string
//   }>
// }

// export interface MyBookingItem {
//   activity_name:  string
//   activity_image: string
//   slot_label:     string | null
//   arrival_time:   string | null
//   visit_date:     string
//   num_adults:     number
//   num_children:   number
//   price_snapshot: string
// }

// export interface MyBooking {
//   reference:      string
//   status:         string
//   created_at:     string
//   visit_date:     string | null
//   arrival_time:   string | null
//   grand_total:    string
//   amount_paid:    string
//   balance_due:    string
//   payment_mode:   string
//   customer_name:  string
//   customer_email: string
//   customer_phone: string
//   items:          MyBookingItem[]
// }

// // ── AuthResponse normalizes both DRF Token (.token) and dj-rest-auth (.key) ──
// export interface AuthResponse {
//   token?: string   // DRF TokenAuthentication / Knox
//   key?:   string   // dj-rest-auth default
//   name:   string
//   email:  string
//   avatar: string
// }


// export const api = {
//   activities: {
//     list: () =>
//       apiFetch<Activity[]>('/api/v1/activities/'),

//     detail: (id: number) =>
//       apiFetch<ActivityDetail>(`/api/v1/activities/${id}/`),

//     availability: (id: number, date: string) =>
//       apiFetch<AvailabilityResponse>(`/api/v1/activities/${id}/availability/?date=${date}`),

//     checkDate: (date: string) =>
//       apiFetch<{ blocked: boolean }>(`/api/v1/activities/check-date/?date=${date}`),
//   },

//   bookings: {
//     initiate: (data: BookingPayload) =>
//       apiFetch<BookingInitiateResponse>('/api/v1/bookings/initiate/', {
//         method: 'POST', body: JSON.stringify(data),
//       }),

//     lookup: (email: string, reference: string) =>
//       apiFetch<BookingLookupResponse>(
//         `/api/v1/bookings/lookup/?email=${encodeURIComponent(email)}&reference=${encodeURIComponent(reference)}`
//       ),

//     myBookings: () =>
//       apiFetch<MyBooking[]>('/api/v1/bookings/my-bookings/'),

//     receiptUrl: (reference: string): string =>
//       `${BASE_URL}/api/v1/bookings/${reference}/receipt/`,
//   },

//   payments: {
//     verify: (data: PaymentVerifyPayload) =>
//       apiFetch<{ status: string; booking_reference: string; message: string }>(
//         '/api/v1/payments/verify/',
//         { method: 'POST', body: JSON.stringify(data) }
//       ),
//   },

//   auth: {
//     sendOtp: (email: string) =>
//       apiFetch<{ message: string }>('/api/v1/auth/otp/send/', {
//         method: 'POST', body: JSON.stringify({ email }),
//       }),

//     verifyOtp: (email: string, code: string) =>
//       apiFetch<AuthResponse>('/api/v1/auth/otp/verify/', {
//         method: 'POST', body: JSON.stringify({ email, code }),
//       }),

//     google: (credential: string) =>
//       apiFetch<AuthResponse>('/api/v1/auth/google/', {
//         method: 'POST', body: JSON.stringify({ credential }),
//       }),
//   },
// }

// export function parseApiError(err: any): string {
//   const data = err?.data
//   if (!data || typeof data !== 'object') return err?.message || 'Something went wrong'
//   return Object.entries(data)
//     .map(([field, errors]) => {
//       const label = field === 'non_field_errors' || field === 'detail' ? '' : `${field}: `
//       const msg   = Array.isArray(errors) ? errors.join(', ') : String(errors)
//       return `${label}${msg}`
//     })
//     .join('\n')
// }

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// ── Token helper ──────────────────────────────────────────────────
function getToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('ms_customer')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed?.token ?? parsed?.key ?? null
  } catch { return null }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
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

export interface ActivityRule {
  id: number
  rule: string
  order: number
}

export interface Activity {
  id: number
  name: string
  tagline: string
  category: string
  image_url: string
  duration: string
  base_price: string
  child_price: string | null
  extra_person_charge: string | null   // ✅ moved here — needed on list cards too
  pricing_type: 'per_person' | 'per_group'
  min_persons: number
  max_persons: number
  is_popular: boolean
  requires_prebooking: boolean
  display_order: number
}

export interface ActivityDetail extends Activity {
  description: string
  // extra_person_charge inherited from Activity ✅
  slots: TimeSlot[]
  rules: ActivityRule[]
}

export interface AvailabilityResponse {
  date: string; blocked: boolean; slots: TimeSlot[]
}

export interface BookingItem {
  activity_id:  number
  visit_date:   string
  arrival_time: string
  num_adults:   number
  num_children: number
  slot_id?:     number | null
}

export interface BookingPayload {
  customer_name:     string
  customer_email:    string
  customer_phone:    string
  special_requests?: string
  items:             BookingItem[]
}

export interface BookingInitiateResponse {
  booking_reference: string
  razorpay_order_id: string
  razorpay_key_id:   string
  grand_total:       string
  amount_to_pay:     string
  balance_due:       string
  payment_mode:      string
  customer_name:     string
  customer_email:    string
  customer_phone:    string
}

export interface PaymentVerifyPayload {
  razorpay_order_id:   string
  razorpay_payment_id: string
  razorpay_signature:  string
}

export interface BookingLookupResponse {
  reference:      string
  status:         string
  customer_name:  string
  customer_email: string
  customer_phone: string
  grand_total:    string
  amount_paid:    string
  balance_due:    string
  payment_mode:   string
  items: Array<{
    activity_name:  string
    activity_image: string
    slot_label:     string | null
    arrival_time:   string | null
    visit_date:     string
    num_adults:     number
    num_children:   number
    price_snapshot: string
  }>
}

export interface MyBookingItem {
  activity_name:  string
  activity_image: string
  slot_label:     string | null
  arrival_time:   string | null
  visit_date:     string
  num_adults:     number
  num_children:   number
  price_snapshot: string
}

export interface MyBooking {
  reference:      string
  status:         string
  created_at:     string
  visit_date:     string | null
  arrival_time:   string | null
  grand_total:    string
  amount_paid:    string
  balance_due:    string
  payment_mode:   string
  customer_name:  string
  customer_email: string
  customer_phone: string
  items:          MyBookingItem[]
}

// ── AuthResponse — custom HMAC JWT issued by make_customer_token() ──
export interface AuthResponse {
  token:  string
  name:   string
  email:  string
  avatar: string
}

export const api = {
  activities: {
    list: () =>
      apiFetch<Activity[]>('/api/v1/activities/'),

    detail: (id: number) =>
      apiFetch<ActivityDetail>(`/api/v1/activities/${id}/`),

    availability: (id: number, date: string) =>
      apiFetch<AvailabilityResponse>(`/api/v1/activities/${id}/availability/?date=${date}`),

    checkDate: (date: string) =>
      apiFetch<{ blocked: boolean }>(`/api/v1/activities/check-date/?date=${date}`),
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

    myBookings: () =>
      apiFetch<MyBooking[]>('/api/v1/bookings/my-bookings/'),

    receiptUrl: (reference: string): string =>
      `${BASE_URL}/api/v1/bookings/${reference}/receipt/`,
  },

  payments: {
    verify: (data: PaymentVerifyPayload) =>
      apiFetch<{ status: string; booking_reference: string; message: string }>(
        '/api/v1/payments/verify/',
        { method: 'POST', body: JSON.stringify(data) }
      ),
  },

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