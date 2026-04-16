// "use client"

// import { createContext, useContext, useState, ReactNode } from "react"
// import { Activity } from "@/lib/api"

// export interface CartItem {
//   cartId: string
//   activity: Activity
//   date: string           // YYYY-MM-DD
//   arrivalTime: string    // HH:MM  — replaces slotId/slotLabel/slotTime
//   numAdults: number      // ── split from numPersons
//   numChildren: number    // ── new
// }

// interface CartContextType {
//   items: CartItem[]
//   addItem: (activity: Activity) => void
//   removeItem: (cartId: string) => void
//   updateItem: (cartId: string, updates: Partial<CartItem>) => void
//   clearCart: () => void
//   totalAmount: number
// }

// const CartContext = createContext<CartContextType | null>(null)

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [items, setItems] = useState<CartItem[]>([])

//   const addItem = (activity: Activity) => {
//     const cartId = `${activity.id}-${Date.now()}`
//     setItems(prev => [...prev, {
//       cartId,
//       activity,
//       date: "",
//       arrivalTime: "",
//       numAdults: activity.min_persons,
//       numChildren: 0,
//     }])
//   }

//   const removeItem = (cartId: string) =>
//     setItems(prev => prev.filter(i => i.cartId !== cartId))

//   const updateItem = (cartId: string, updates: Partial<CartItem>) =>
//     setItems(prev => prev.map(i => i.cartId === cartId ? { ...i, ...updates } : i))

//   const clearCart = () => setItems([])

//   // Price: adults at full price, children at child_price (if set) else full price
//   const totalAmount = items.reduce((sum, item) => {
//     const adultPrice  = parseFloat(item.activity.base_price)
//     const childPrice  = item.activity.child_price != null
//       ? parseFloat(String(item.activity.child_price))
//       : adultPrice
//     if (item.activity.pricing_type === "per_person") {
//       return sum + adultPrice * item.numAdults + childPrice * item.numChildren
//     }
//     return sum + adultPrice
//   }, 0)

//   return (
//     <CartContext.Provider value={{ items, addItem, removeItem, updateItem, clearCart, totalAmount }}>
//       {children}
//     </CartContext.Provider>
//   )
// }

// export function useCart() {
//   const ctx = useContext(CartContext)
//   if (!ctx) throw new Error("useCart must be used inside CartProvider")
//   return ctx
// }
"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Activity } from "@/lib/api"

export interface CartItem {
  cartId: string
  activity: Activity
  date: string           // YYYY-MM-DD
  arrivalTime: string    // HH:MM
  numAdults: number
  numChildren: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (activity: Activity) => void
  removeItem: (cartId: string) => void
  updateItem: (cartId: string, updates: Partial<CartItem>) => void
  clearCart: () => void
  totalAmount: number
  getItemPrice: (item: CartItem) => number
}

const CartContext = createContext<CartContextType | null>(null)

// ── Shared price calculator ───────────────────────────────────────
// Must stay in sync with calculate_item_price() in serializers.py
//
// per_person:
//   adults  → base_price each
//   children → child_price each (falls back to base_price)
//   extra charge → per person (adult or child) beyond min_persons
//
// per_group:
//   base_price covers whole group up to min_persons
//   extra charge → per person (adult or child) beyond min_persons

export function calculateItemPrice(activity: Activity, numAdults: number, numChildren: number): number {
  const base       = parseFloat(activity.base_price)
  const extra      = parseFloat(activity.extra_person_charge || "0")
  const minPersons = activity.min_persons
  const childRate  = activity.child_price != null
    ? parseFloat(String(activity.child_price))
    : base

  const totalPersons = numAdults + numChildren
  const extraPersons = Math.max(0, totalPersons - minPersons)

  if (activity.pricing_type === "per_person") {
    return (
      base * numAdults +
      childRate * numChildren +
      extra * extraPersons          // extra charge for each person beyond min
    )
  }

  if (activity.pricing_type === "per_group") {
    return (
      base +                        // covers whole group up to min_persons
      extra * extraPersons          // each person beyond min pays extra
    )
  }

  return base
}

// ── Price breakdown string (for UI display) ───────────────────────
export function getItemPriceBreakdown(activity: Activity, numAdults: number, numChildren: number): string | null {
  const base       = parseFloat(activity.base_price)
  const extra      = parseFloat(activity.extra_person_charge || "0")
  const minPersons = activity.min_persons
  const childRate  = activity.child_price != null
    ? parseFloat(String(activity.child_price))
    : base

  const totalPersons = numAdults + numChildren
  const extraPersons = Math.max(0, totalPersons - minPersons)

  const fmt = (n: number) => `₹${n.toLocaleString()}`

  if (activity.pricing_type === "per_person") {
    const parts: string[] = []
    if (numAdults > 0)   parts.push(`${fmt(base)} × ${numAdults} adult${numAdults !== 1 ? "s" : ""}`)
    if (numChildren > 0) parts.push(`${fmt(childRate)} × ${numChildren} child${numChildren !== 1 ? "ren" : ""}`)
    if (extraPersons > 0 && extra > 0) parts.push(`${fmt(extra)} × ${extraPersons} extra`)
    return parts.join(" + ")
  }

  if (activity.pricing_type === "per_group") {
    const parts: string[] = [`${fmt(base)} (group)`]
    if (extraPersons > 0 && extra > 0) parts.push(`${fmt(extra)} × ${extraPersons} extra person${extraPersons !== 1 ? "s" : ""}`)
    return parts.join(" + ")
  }

  return null
}


export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (activity: Activity) => {
    const cartId = `${activity.id}-${Date.now()}`
    setItems(prev => [...prev, {
      cartId,
      activity,
      date:        "",
      arrivalTime: "",
      numAdults:   activity.min_persons,   // default to min so price is valid from the start
      numChildren: 0,
    }])
  }

  const removeItem = (cartId: string) =>
    setItems(prev => prev.filter(i => i.cartId !== cartId))

  const updateItem = (cartId: string, updates: Partial<CartItem>) =>
    setItems(prev => prev.map(i => i.cartId === cartId ? { ...i, ...updates } : i))

  const clearCart = () => setItems([])

  const getItemPrice = (item: CartItem) =>
    calculateItemPrice(item.activity, item.numAdults, item.numChildren)

  const totalAmount = items.reduce((sum, item) => sum + getItemPrice(item), 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateItem, clearCart,
      totalAmount, getItemPrice,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}