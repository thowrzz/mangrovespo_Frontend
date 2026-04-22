

// const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// // ── Token helpers (JWT) ───────────────────────────────────────────
// function getAccessToken(): string {
//   if (typeof document === "undefined") return ""
//   const match = document.cookie.match(/admin_access=([^;]+)/)
//   return match ? match[1] : ""
// }

// function setTokens(access: string, refresh: string) {
//   document.cookie = `admin_access=${access}; path=/; max-age=${60 * 60 * 24 * 7}`
//   document.cookie = `admin_refresh=${refresh}; path=/; max-age=${60 * 60 * 24 * 30}`
// }

// function clearTokens() {
//   document.cookie = "admin_access=; max-age=0; path=/"
//   document.cookie = "admin_refresh=; max-age=0; path=/"
// }

// // ── Error helper ──────────────────────────────────────────────────
// async function throwApiError(res: Response): Promise<never> {
//   const body = await res.json().catch(() => ({}))
//   const error: any = new Error(`HTTP ${res.status}`)
//   error.status = res.status
//   error.data   = body
//   throw error
// }

// // ── Refresh singleton (prevents parallel refresh storms) ──────────
// let _refreshPromise: Promise<boolean> | null = null

// async function tryRefresh(): Promise<boolean> {
//   if (_refreshPromise) return _refreshPromise
//   _refreshPromise = (async () => {
//     const match   = document.cookie.match(/admin_refresh=([^;]+)/)
//     const refresh = match ? match[1] : ""
//     if (!refresh) return false
//     try {
//       const res = await fetch(`${BASE}/api/v1/auth/token/refresh/`, {
//         method:  "POST",
//         headers: { "Content-Type": "application/json" },
//         body:    JSON.stringify({ refresh }),
//       })
//       if (!res.ok) return false
//       const data = await res.json()
//       setTokens(data.access, refresh)
//       return true
//     } catch {
//       return false
//     } finally {
//       _refreshPromise = null
//     }
//   })()
//   return _refreshPromise
// }

// // ── Core fetch ────────────────────────────────────────────────────
// async function adminFetch(path: string, options: RequestInit = {}) {
//   const isFormData = options.body instanceof FormData

//   // token passed explicitly so retry always uses the freshest value
//   const makeHeaders = (token: string): Record<string, string> => ({
//     ...(!isFormData && { "Content-Type": "application/json" }),
//     Authorization: `Bearer ${token}`,
//     ...(options.headers as Record<string, string>),
//   })

//   const res = await fetch(`${BASE}${path}`, {
//     ...options,
//     headers: makeHeaders(getAccessToken()),
//   })

//   if (res.status === 401) {
//     const refreshed = await tryRefresh()
//     if (!refreshed) {
//       clearTokens()
//       window.location.href = "/admin/login"
//       return new Promise(() => {})
//     }
//     // read token AFTER refresh completes — not from a stale closure
//     const retry = await fetch(`${BASE}${path}`, {
//       ...options,
//       headers: makeHeaders(getAccessToken()),
//     })
//     if (!retry.ok) await throwApiError(retry)
//     if (retry.status === 204) return null
//     return retry.json()
//   }

//   if (!res.ok) await throwApiError(res)
//   if (res.status === 204) return null
//   return res.json()
// }

// // ── Blob fetch (CSV export) ───────────────────────────────────────
// async function adminFetchBlob(path: string): Promise<Blob> {
//   const res = await fetch(`${BASE}${path}`, {
//     headers: { Authorization: `Bearer ${getAccessToken()}` },
//   })

//   if (res.status === 401) {
//     const refreshed = await tryRefresh()
//     if (!refreshed) {
//       clearTokens()
//       window.location.href = "/admin/login"
//       return new Promise(() => {})
//     }
//     const retry = await fetch(`${BASE}${path}`, {
//       headers: { Authorization: `Bearer ${getAccessToken()}` },
//     })
//     if (!retry.ok) throw new Error(`Export failed: ${retry.status}`)
//     return retry.blob()
//   }

//   if (!res.ok) throw new Error(`Export failed: ${res.status}`)
//   return res.blob()
// }

// // ── Shared error parser ───────────────────────────────────────────
// export function parseApiError(err: any): string {
//   const data = err?.data
//   if (!data || typeof data !== "object") return err?.message || "Something went wrong"
//   return Object.entries(data)
//     .map(([field, errors]) => {
//       const label = field === "non_field_errors" || field === "detail" ? "" : `${field}: `
//       const msg   = Array.isArray(errors) ? errors.join(", ") : String(errors)
//       return `${label}${msg}`
//     })
//     .join("\n")
// }

// // ── Types ─────────────────────────────────────────────────────────
// export interface AdminBooking {
//   id:             number
//   reference:      string
//   status:         "pending" | "confirmed" | "completed" | "cancelled" | "expired"
//   customer_name:  string
//   customer_email: string
//   customer_phone: string
//   grand_total:    string
//   amount_paid:    string
//   balance_due:    string
//   payment_mode:   string
//   created_at:     string
//   items:          AdminBookingItem[]
// }

// export interface AdminBookingItem {
//   id:           number
//   activity:     { id: number; name: string }
//   slot:         { id: number; label: string; time: string } | null
//   arrival_time: string | null
//   num_adults:   number
//   num_children: number
// }

// export interface AdminActivity {
//   id:                  number
//   name:                string
//   tagline:             string
//   category:            string
//   image_url:           string
//   duration:            string
//   base_price:          string
//   child_price:         string | null
//   pricing_type:        "per_person" | "per_group"
//   extra_person_charge: string | null
//   min_persons:         number
//   max_persons:         number
//   opening_time:        string
//   closing_time:        string
//   is_popular:          boolean
//   is_visible:          boolean
//   requires_prebooking: boolean
//   display_order:       number
//   description:         string
//   rules_text:          string
// }

// export interface AdminSlot {
//   id:        number
//   label:     string
//   time:      string
//   capacity:  number
//   is_active: boolean
// }

// export interface AdminRule {
//   id:    number
//   rule:  string
//   order: number
// }

// export interface DailyReport {
//   date:           string
//   total_bookings: number
//   total_revenue:  number
//   by_activity: Array<{
//     activity__name: string
//     total_revenue:  number
//     booking_count:  number
//     total_persons:  number
//   }>
// }

// export interface WeeklyReport {
//   days: Array<{
//     date:     string
//     revenue:  number
//     bookings: number
//   }>
// }

// export interface DashboardStats {
//   today_revenue:         number
//   today_bookings:        number
//   revenue_trend:         number
//   booking_trend:         number
//   month_revenue:         number
//   month_bookings:        number
//   total_customers:       number
//   today_booking_list:    DashboardBookingRow[]
//   tomorrow_booking_list: DashboardBookingRow[]
// }

// export interface DashboardBookingRow {
//   id:             number
//   reference:      string
//   customer_name:  string
//   customer_phone: string
//   customer_email: string
//   activities:     string[]
//   earliest_slot:  string | null
//   grand_total:    string
//   status:         string
// }

// export interface RevenueChartData {
//   data: Array<{ date: string; revenue: number }>
// }

// export interface ActivityBreakdownData {
//   data: Array<{ activity: string; count: number }>
// }

// export interface BlockedDate {
//   id:       number
//   date:     string
//   reason:   string
//   activity: number | null
// }

// // ── API ───────────────────────────────────────────────────────────
// export const adminApi = {

//   login: async (username: string, password: string) => {
//     const res = await fetch(`${BASE}/api/v1/auth/token/`, {
//       method:  "POST",
//       headers: { "Content-Type": "application/json" },
//       body:    JSON.stringify({ username, password }),
//     })
//     const data = await res.json()
//     if (!res.ok) throw new Error(data.detail || "Invalid credentials")
//     setTokens(data.access, data.refresh)
//   },

//   logout: () => {
//     clearTokens()
//     window.location.href = "/admin/login"
//   },

//   // ── Dashboard ─────────────────────────────────────────────────
//   dashboard: {
//     stats: (): Promise<DashboardStats> =>
//       adminFetch("/api/v1/admin/reports/dashboard/"),

//     revenueChart: (days = 7): Promise<RevenueChartData> =>
//       adminFetch(`/api/v1/admin/reports/revenue-chart/?days=${days}`),

//     activityBreakdown: (): Promise<ActivityBreakdownData> =>
//       adminFetch("/api/v1/admin/reports/activity-breakdown/"),
//   },

//   // ── Reports ───────────────────────────────────────────────────
//   reports: {
//     daily: (date?: string): Promise<DailyReport> => {
//       const qs = date ? `?date=${date}` : ""
//       return adminFetch(`/api/v1/admin/reports/daily/${qs}`)
//     },

//     weekly: (): Promise<WeeklyReport> =>
//       adminFetch("/api/v1/admin/reports/weekly/"),

//     exportCsv: (from: string, to: string): Promise<Blob> =>
//       adminFetchBlob(`/api/v1/admin/reports/export/?from=${from}&to=${to}`),
//   },

//   // ── Bookings ──────────────────────────────────────────────────
//   bookings: {
//     list: (params?: Record<string, string>): Promise<{ results: AdminBooking[]; count: number }> => {
//       const qs = params ? "?" + new URLSearchParams(params).toString() : ""
//       return adminFetch(`/api/v1/admin/bookings/${qs}`)
//     },

//     detail: (id: string | number): Promise<AdminBooking> =>
//       adminFetch(`/api/v1/admin/bookings/${id}/`),

//     updateStatus: (id: string | number, status: string): Promise<{
//       success: boolean; id: number; reference: string; status: string
//     }> =>
//       adminFetch(`/api/v1/admin/bookings/${id}/status/`, {
//         method: "PATCH",
//         body:   JSON.stringify({ status }),
//       }),

//     cancel: (id: string | number): Promise<{ status: string; reference: string }> =>
//       adminFetch(`/api/v1/admin/bookings/${id}/cancel/`, { method: "POST" }),

//     complete: (id: string | number): Promise<{ status: string; reference: string }> =>
//       adminFetch(`/api/v1/admin/bookings/${id}/complete/`, { method: "POST" }),
//   },

//   // ── Activities ────────────────────────────────────────────────
//   activities: {
//     list: (): Promise<AdminActivity[]> =>
//       adminFetch("/api/v1/admin/activities/"),

//     create: (data: Partial<AdminActivity>): Promise<AdminActivity> =>
//       adminFetch("/api/v1/admin/activities/", {
//         method: "POST",
//         body:   JSON.stringify(data),
//       }),

//     detail: (id: string | number): Promise<AdminActivity> =>
//       adminFetch(`/api/v1/admin/activities/${id}/`),

//     update: (id: string | number, data: Partial<AdminActivity>): Promise<AdminActivity> =>
//       adminFetch(`/api/v1/admin/activities/${id}/`, {
//         method: "PATCH",
//         body:   JSON.stringify(data),
//       }),

//     delete: (id: string | number): Promise<null> =>
//       adminFetch(`/api/v1/admin/activities/${id}/`, { method: "DELETE" }),

//     uploadImage: (id: string | number, file: File): Promise<{ image_url: string }> => {
//       const form = new FormData()
//       form.append("image", file)
//       return adminFetch(`/api/v1/admin/activities/${id}/upload-image/`, {
//         method: "POST",
//         body:   form,
//       })
//     },

//     // ── Slots ────────────────────────────────────────────────
//     slots: {
//       list: (activityId: string | number): Promise<AdminSlot[]> =>
//         adminFetch(`/api/v1/admin/activities/${activityId}/slots/`),

//       create: (activityId: string | number, data: Partial<AdminSlot>): Promise<AdminSlot> =>
//         adminFetch(`/api/v1/admin/activities/${activityId}/slots/`, {
//           method: "POST",
//           body:   JSON.stringify(data),
//         }),

//       update: (slotId: string | number, data: Partial<AdminSlot>): Promise<AdminSlot> =>
//         adminFetch(`/api/v1/admin/slots/${slotId}/`, {
//           method: "PATCH",
//           body:   JSON.stringify(data),
//         }),

//       delete: (slotId: string | number): Promise<null> =>
//         adminFetch(`/api/v1/admin/slots/${slotId}/`, { method: "DELETE" }),
//     },

//     // ── Rules ────────────────────────────────────────────────
//     rules: {
//       list: (activityId: string | number): Promise<AdminRule[]> =>
//         adminFetch(`/api/v1/admin/activities/${activityId}/rules/`),

//       create: (activityId: string | number, data: { rule: string; order: number }): Promise<AdminRule> =>
//         adminFetch(`/api/v1/admin/activities/${activityId}/rules/`, {
//           method: "POST",
//           body:   JSON.stringify(data),
//         }),

//       update: (activityId: string | number, ruleId: string | number, data: { rule: string; order: number }): Promise<AdminRule> =>
//         adminFetch(`/api/v1/admin/activities/${activityId}/rules/${ruleId}/`, {
//           method: "PATCH",
//           body:   JSON.stringify(data),
//         }),

//       delete: (activityId: string | number, ruleId: string | number): Promise<null> =>
//         adminFetch(`/api/v1/admin/activities/${activityId}/rules/${ruleId}/`, {
//           method: "DELETE",
//         }),
//     },
//   },

//   // ── Availability / Blocked Dates ──────────────────────────────
//   availability: {
//     list: (month?: number, year?: number): Promise<BlockedDate[]> => {
//       const params = new URLSearchParams()
//       if (month) params.set("month", String(month))
//       if (year)  params.set("year",  String(year))
//       const qs = params.toString() ? `?${params}` : ""
//       return adminFetch(`/api/v1/admin/blocked-dates/${qs}`)
//     },

//     block: (data: { date: string; reason?: string; activity?: number | null }): Promise<BlockedDate> =>
//       adminFetch("/api/v1/admin/blocked-dates/", {
//         method: "POST",
//         body:   JSON.stringify(data),
//       }),

//     unblock: (id: number): Promise<null> =>
//       adminFetch(`/api/v1/admin/blocked-dates/${id}/`, { method: "DELETE" }),
//   },
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
  extra_person_charge: string | null
  pricing_type: 'per_person' | 'per_group'
  min_persons: number
  max_persons: number
  opening_time: string
  closing_time: string
  is_popular: boolean
  requires_prebooking: boolean
  display_order: number
  // ── Age restriction ──────────────────────────────────────────
  min_age: number | null          // e.g. 7 → "children under 7 not allowed"
  children_allowed: boolean       // false when min_age is set — use to show/hide children counter
}

export interface ActivityDetail extends Activity {
  description: string
  slots: TimeSlot[]
  rules: ActivityRule[]
}

export interface AvailabilityResponse {
  date: string; blocked: boolean; has_slots: boolean; slots: TimeSlot[]
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

// ═══════════════════════════════════════════════════════════════════
// ADMIN API
// ═══════════════════════════════════════════════════════════════════

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

function getAccessToken(): string {
  if (typeof document === "undefined") return ""
  const match = document.cookie.match(/admin_access=([^;]+)/)
  return match ? match[1] : ""
}

function setTokens(access: string, refresh: string) {
  document.cookie = `admin_access=${access}; path=/; max-age=${60 * 60 * 24 * 7}`
  document.cookie = `admin_refresh=${refresh}; path=/; max-age=${60 * 60 * 24 * 30}`
}

function clearTokens() {
  document.cookie = "admin_access=; max-age=0; path=/"
  document.cookie = "admin_refresh=; max-age=0; path=/"
}

async function throwApiError(res: Response): Promise<never> {
  const body = await res.json().catch(() => ({}))
  const error: any = new Error(`HTTP ${res.status}`)
  error.status = res.status
  error.data   = body
  throw error
}

let _refreshPromise: Promise<boolean> | null = null

async function tryRefresh(): Promise<boolean> {
  if (_refreshPromise) return _refreshPromise
  _refreshPromise = (async () => {
    const match   = document.cookie.match(/admin_refresh=([^;]+)/)
    const refresh = match ? match[1] : ""
    if (!refresh) return false
    try {
      const res = await fetch(`${BASE}/api/v1/auth/token/refresh/`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ refresh }),
      })
      if (!res.ok) return false
      const data = await res.json()
      setTokens(data.access, refresh)
      return true
    } catch {
      return false
    } finally {
      _refreshPromise = null
    }
  })()
  return _refreshPromise
}

async function adminFetch(path: string, options: RequestInit = {}) {
  const isFormData = options.body instanceof FormData

  const makeHeaders = (token: string): Record<string, string> => ({
    ...(!isFormData && { "Content-Type": "application/json" }),
    Authorization: `Bearer ${token}`,
    ...(options.headers as Record<string, string>),
  })

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: makeHeaders(getAccessToken()),
  })

  if (res.status === 401) {
    const refreshed = await tryRefresh()
    if (!refreshed) {
      clearTokens()
      window.location.href = "/admin/login"
      return new Promise(() => {})
    }
    const retry = await fetch(`${BASE}${path}`, {
      ...options,
      headers: makeHeaders(getAccessToken()),
    })
    if (!retry.ok) await throwApiError(retry)
    if (retry.status === 204) return null
    return retry.json()
  }

  if (!res.ok) await throwApiError(res)
  if (res.status === 204) return null
  return res.json()
}

async function adminFetchBlob(path: string): Promise<Blob> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  })

  if (res.status === 401) {
    const refreshed = await tryRefresh()
    if (!refreshed) {
      clearTokens()
      window.location.href = "/admin/login"
      return new Promise(() => {})
    }
    const retry = await fetch(`${BASE}${path}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
    if (!retry.ok) throw new Error(`Export failed: ${retry.status}`)
    return retry.blob()
  }

  if (!res.ok) throw new Error(`Export failed: ${res.status}`)
  return res.blob()
}

// ── Admin Types ───────────────────────────────────────────────────

export interface AdminBooking {
  id:             number
  reference:      string
  status:         "pending" | "confirmed" | "completed" | "cancelled" | "expired"
  customer_name:  string
  customer_email: string
  customer_phone: string
  grand_total:    string
  amount_paid:    string
  balance_due:    string
  payment_mode:   string
  created_at:     string
  items:          AdminBookingItem[]
}

export interface AdminBookingItem {
  id:           number
  activity:     { id: number; name: string }
  slot:         { id: number; label: string; time: string } | null
  arrival_time: string | null
  num_adults:   number
  num_children: number
}

export interface AdminActivity {
  id:                  number
  name:                string
  tagline:             string
  category:            string
  image_url:           string
  duration:            string
  base_price:          string
  child_price:         string | null
  pricing_type:        "per_person" | "per_group"
  extra_person_charge: string | null
  min_persons:         number
  max_persons:         number
  opening_time:        string
  closing_time:        string
  is_popular:          boolean
  is_visible:          boolean
  requires_prebooking: boolean
  display_order:       number
  description:         string
  rules_text:          string
  // ── Age restriction ────────────────────────────────────────────
  min_age: number | null     // set via admin panel to restrict children
  children_allowed: boolean  // read-only computed field from backend
}

export interface AdminSlot {
  id:        number
  label:     string
  time:      string
  capacity:  number
  is_active: boolean
}

export interface AdminRule {
  id:    number
  rule:  string
  order: number
}

export interface DailyReport {
  date:           string
  total_bookings: number
  total_revenue:  number
  by_activity: Array<{
    activity__name: string
    total_revenue:  number
    booking_count:  number
    total_persons:  number
  }>
}

export interface WeeklyReport {
  days: Array<{
    date:     string
    revenue:  number
    bookings: number
  }>
}

export interface DashboardStats {
  today_revenue:         number
  today_bookings:        number
  revenue_trend:         number
  booking_trend:         number
  month_revenue:         number
  month_bookings:        number
  total_customers:       number
  today_booking_list:    DashboardBookingRow[]
  tomorrow_booking_list: DashboardBookingRow[]
}

export interface DashboardBookingRow {
  id:             number
  reference:      string
  customer_name:  string
  customer_phone: string
  customer_email: string
  activities:     string[]
  earliest_slot:  string | null
  grand_total:    string
  status:         string
}

export interface RevenueChartData {
  data: Array<{ date: string; revenue: number }>
}

export interface ActivityBreakdownData {
  data: Array<{ activity: string; count: number }>
}

export interface BlockedDate {
  id:       number
  date:     string
  reason:   string
  activity: number | null
}

// ── Admin API ─────────────────────────────────────────────────────

export const adminApi = {

  login: async (username: string, password: string) => {
    const res = await fetch(`${BASE}/api/v1/auth/token/`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.detail || "Invalid credentials")
    setTokens(data.access, data.refresh)
  },

  logout: () => {
    clearTokens()
    window.location.href = "/admin/login"
  },

  dashboard: {
    stats: (): Promise<DashboardStats> =>
      adminFetch("/api/v1/admin/reports/dashboard/"),

    revenueChart: (days = 7): Promise<RevenueChartData> =>
      adminFetch(`/api/v1/admin/reports/revenue-chart/?days=${days}`),

    activityBreakdown: (): Promise<ActivityBreakdownData> =>
      adminFetch("/api/v1/admin/reports/activity-breakdown/"),
  },

  reports: {
    daily: (date?: string): Promise<DailyReport> => {
      const qs = date ? `?date=${date}` : ""
      return adminFetch(`/api/v1/admin/reports/daily/${qs}`)
    },

    weekly: (): Promise<WeeklyReport> =>
      adminFetch("/api/v1/admin/reports/weekly/"),

    exportCsv: (from: string, to: string): Promise<Blob> =>
      adminFetchBlob(`/api/v1/admin/reports/export/?from=${from}&to=${to}`),
  },

  bookings: {
    list: (params?: Record<string, string>): Promise<{ results: AdminBooking[]; count: number }> => {
      const qs = params ? "?" + new URLSearchParams(params).toString() : ""
      return adminFetch(`/api/v1/admin/bookings/${qs}`)
    },

    detail: (id: string | number): Promise<AdminBooking> =>
      adminFetch(`/api/v1/admin/bookings/${id}/`),

    updateStatus: (id: string | number, status: string): Promise<{
      success: boolean; id: number; reference: string; status: string
    }> =>
      adminFetch(`/api/v1/admin/bookings/${id}/status/`, {
        method: "PATCH",
        body:   JSON.stringify({ status }),
      }),

    cancel: (id: string | number): Promise<{ status: string; reference: string }> =>
      adminFetch(`/api/v1/admin/bookings/${id}/cancel/`, { method: "POST" }),

    complete: (id: string | number): Promise<{ status: string; reference: string }> =>
      adminFetch(`/api/v1/admin/bookings/${id}/complete/`, { method: "POST" }),
  },

  activities: {
    list: (): Promise<AdminActivity[]> =>
      adminFetch("/api/v1/admin/activities/"),

    create: (data: Partial<AdminActivity>): Promise<AdminActivity> =>
      adminFetch("/api/v1/admin/activities/", {
        method: "POST",
        body:   JSON.stringify(data),
      }),

    detail: (id: string | number): Promise<AdminActivity> =>
      adminFetch(`/api/v1/admin/activities/${id}/`),

    update: (id: string | number, data: Partial<AdminActivity>): Promise<AdminActivity> =>
      adminFetch(`/api/v1/admin/activities/${id}/`, {
        method: "PATCH",
        body:   JSON.stringify(data),
      }),

    delete: (id: string | number): Promise<null> =>
      adminFetch(`/api/v1/admin/activities/${id}/`, { method: "DELETE" }),

    uploadImage: (id: string | number, file: File): Promise<{ image_url: string }> => {
      const form = new FormData()
      form.append("image", file)
      return adminFetch(`/api/v1/admin/activities/${id}/upload-image/`, {
        method: "POST",
        body:   form,
      })
    },

    slots: {
      list: (activityId: string | number): Promise<AdminSlot[]> =>
        adminFetch(`/api/v1/admin/activities/${activityId}/slots/`),

      create: (activityId: string | number, data: Partial<AdminSlot>): Promise<AdminSlot> =>
        adminFetch(`/api/v1/admin/activities/${activityId}/slots/`, {
          method: "POST",
          body:   JSON.stringify(data),
        }),

      update: (slotId: string | number, data: Partial<AdminSlot>): Promise<AdminSlot> =>
        adminFetch(`/api/v1/admin/slots/${slotId}/`, {
          method: "PATCH",
          body:   JSON.stringify(data),
        }),

      delete: (slotId: string | number): Promise<null> =>
        adminFetch(`/api/v1/admin/slots/${slotId}/`, { method: "DELETE" }),
    },

    rules: {
      list: (activityId: string | number): Promise<AdminRule[]> =>
        adminFetch(`/api/v1/admin/activities/${activityId}/rules/`),

      create: (activityId: string | number, data: { rule: string; order: number }): Promise<AdminRule> =>
        adminFetch(`/api/v1/admin/activities/${activityId}/rules/`, {
          method: "POST",
          body:   JSON.stringify(data),
        }),

      update: (activityId: string | number, ruleId: string | number, data: { rule: string; order: number }): Promise<AdminRule> =>
        adminFetch(`/api/v1/admin/activities/${activityId}/rules/${ruleId}/`, {
          method: "PATCH",
          body:   JSON.stringify(data),
        }),

      delete: (activityId: string | number, ruleId: string | number): Promise<null> =>
        adminFetch(`/api/v1/admin/activities/${activityId}/rules/${ruleId}/`, {
          method: "DELETE",
        }),
    },
  },

  availability: {
    list: (month?: number, year?: number): Promise<BlockedDate[]> => {
      const params = new URLSearchParams()
      if (month) params.set("month", String(month))
      if (year)  params.set("year",  String(year))
      const qs = params.toString() ? `?${params}` : ""
      return adminFetch(`/api/v1/admin/blocked-dates/${qs}`)
    },

    block: (data: { date: string; reason?: string; activity?: number | null }): Promise<BlockedDate> =>
      adminFetch("/api/v1/admin/blocked-dates/", {
        method: "POST",
        body:   JSON.stringify(data),
      }),

    unblock: (id: number): Promise<null> =>
      adminFetch(`/api/v1/admin/blocked-dates/${id}/`, { method: "DELETE" }),
  },
}