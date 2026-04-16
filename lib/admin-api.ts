
// const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// // ── Token helpers (JWT) ───────────────────────────────────────────
// function getAccessToken() {
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

// // ── Core fetch ────────────────────────────────────────────────────
// async function adminFetch(path: string, options: RequestInit = {}) {
//   const isFormData = options.body instanceof FormData

//   const makeHeaders = (): Record<string, string> => ({
//     ...(!isFormData && { "Content-Type": "application/json" }),
//     Authorization: `Bearer ${getAccessToken()}`,
//     ...(options.headers as Record<string, string>),
//   })

//   const res = await fetch(`${BASE}${path}`, {
//     ...options,
//     headers: makeHeaders(),
//   })

//   if (res.status === 401) {
//     const refreshed = await tryRefresh()
//     if (!refreshed) {
//       clearTokens()
//       window.location.href = "/admin/login"
//       return new Promise(() => {})
//     }
//     const retry = await fetch(`${BASE}${path}`, {
//       ...options,
//       headers: makeHeaders(),
//     })
//     if (!retry.ok) await throwApiError(retry)
//     if (retry.status === 204) return null
//     return retry.json()
//   }

//   if (!res.ok) await throwApiError(res)
//   if (res.status === 204) return null
//   return res.json()
// }

// // ── Refresh token ─────────────────────────────────────────────────
// async function tryRefresh(): Promise<boolean> {
//   const match   = document.cookie.match(/admin_refresh=([^;]+)/)
//   const refresh = match ? match[1] : ""
//   if (!refresh) return false
//   try {
//     const res = await fetch(`${BASE}/api/v1/auth/token/refresh/`, {
//       method:  "POST",
//       headers: { "Content-Type": "application/json" },
//       body:    JSON.stringify({ refresh }),
//     })
//     if (!res.ok) return false
//     const data = await res.json()
//     setTokens(data.access, refresh)
//     return true
//   } catch {
//     return false
//   }
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
//   id: number
//   reference: string
//   status: "pending" | "confirmed" | "completed" | "cancelled" | "expired"
//   customer_name: string
//   customer_email: string
//   customer_phone: string
//   grand_total: string
//   created_at: string
//   items: AdminBookingItem[]
// }

// export interface AdminBookingItem {
//   id: number
//   activity: { id: number; name: string }
//   slot: { id: number; label: string; time: string }
//   visit_date: string
//   num_persons: number
//   price_snapshot: string
// }

// export interface AdminActivity {
//   id: number
//   name: string
//   tagline: string
//   category: string
//   image_url: string
//   duration: string
//   base_price: string
//   child_price: string | null          // ← NEW
//   pricing_type: "per_person" | "per_group"
//   extra_person_charge: string | null
//   min_persons: number
//   max_persons: number
//   opening_time: string                // ← NEW
//   closing_time: string                // ← NEW
//   is_popular: boolean
//   is_visible: boolean
//   requires_prebooking: boolean
//   display_order: number
//   description: string
//   rules_text: string
// }

// export interface AdminSlot {
//   id: number
//   label: string
//   time: string
//   capacity: number
//   is_active: boolean
// }

// export interface AdminRule {                // ← NEW
//   id: number
//   rule: string
//   order: number
// }

// export interface DailyReport {
//   date: string
//   total_bookings: number
//   total_revenue: number
//   by_activity: Array<{
//     activity__name: string
//     total_revenue: number
//     booking_count: number
//     total_persons: number
//   }>
// }

// export interface WeeklyReport {
//   days: Array<{
//     date: string
//     revenue: number
//     bookings: number
//   }>
// }

// export interface DashboardStats {
//   today_revenue:   number
//   today_bookings:  number
//   revenue_trend:   number
//   booking_trend:   number
//   month_revenue:   number
//   month_bookings:  number
//   total_customers: number
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
//   id: number
//   date: string
//   reason: string
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
//       fetch(
//         `${BASE}/api/v1/admin/reports/export/?from=${from}&to=${to}`,
//         { headers: { Authorization: `Bearer ${getAccessToken()}` } }
//       ).then(res => {
//         if (!res.ok) throw new Error(`Export failed: ${res.status}`)
//         return res.blob()
//       }),
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

//     // ── Slots ──────────────────────────────────────────────────
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

//     // ── Rules ──────────────────────────────────────────────────
//     rules: {
//       list: (activityId: string | number): Promise<AdminRule[]> =>
//         adminFetch(`/api/v1/admin/activities/${activityId}/rules/`),

//       create: (activityId: string | number, data: { rule: string; order: number }): Promise<AdminRule> =>
//         adminFetch(`/api/v1/admin/activities/${activityId}/rules/`, {
//           method: "POST",
//           body:   JSON.stringify(data),
//         }),

//       update: (ruleId: string | number, data: { rule: string; order: number }): Promise<AdminRule> =>
//         adminFetch(`/api/v1/admin/activities/${ruleId}/rules/${ruleId}/`, {
//           method: "PATCH",
//           body:   JSON.stringify(data),
//         }),

//       delete: (ruleId: string | number): Promise<null> =>
//         adminFetch(`/api/v1/admin/activities/${ruleId}/rules/${ruleId}/`, {
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


const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// ── Token helpers (JWT) ───────────────────────────────────────────
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

// ── Error helper ──────────────────────────────────────────────────
async function throwApiError(res: Response): Promise<never> {
  const body = await res.json().catch(() => ({}))
  const error: any = new Error(`HTTP ${res.status}`)
  error.status = res.status
  error.data   = body
  throw error
}

// ── Refresh singleton (prevents parallel refresh storms) ──────────
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

// ── Core fetch ────────────────────────────────────────────────────
async function adminFetch(path: string, options: RequestInit = {}) {
  const isFormData = options.body instanceof FormData

  // token passed explicitly so retry always uses the freshest value
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
    // read token AFTER refresh completes — not from a stale closure
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

// ── Blob fetch (CSV export) ───────────────────────────────────────
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

// ── Shared error parser ───────────────────────────────────────────
export function parseApiError(err: any): string {
  const data = err?.data
  if (!data || typeof data !== "object") return err?.message || "Something went wrong"
  return Object.entries(data)
    .map(([field, errors]) => {
      const label = field === "non_field_errors" || field === "detail" ? "" : `${field}: `
      const msg   = Array.isArray(errors) ? errors.join(", ") : String(errors)
      return `${label}${msg}`
    })
    .join("\n")
}

// ── Types ─────────────────────────────────────────────────────────
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

// ── API ───────────────────────────────────────────────────────────
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

  // ── Dashboard ─────────────────────────────────────────────────
  dashboard: {
    stats: (): Promise<DashboardStats> =>
      adminFetch("/api/v1/admin/reports/dashboard/"),

    revenueChart: (days = 7): Promise<RevenueChartData> =>
      adminFetch(`/api/v1/admin/reports/revenue-chart/?days=${days}`),

    activityBreakdown: (): Promise<ActivityBreakdownData> =>
      adminFetch("/api/v1/admin/reports/activity-breakdown/"),
  },

  // ── Reports ───────────────────────────────────────────────────
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

  // ── Bookings ──────────────────────────────────────────────────
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

  // ── Activities ────────────────────────────────────────────────
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

    // ── Slots ────────────────────────────────────────────────
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

    // ── Rules ────────────────────────────────────────────────
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

  // ── Availability / Blocked Dates ──────────────────────────────
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