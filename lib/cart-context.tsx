"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Activity } from "@/lib/api"

export interface CartItem {
  cartId: string
  activity: Activity
  date: string           // YYYY-MM-DD
  arrivalTime: string    // HH:MM  — replaces slotId/slotLabel/slotTime
  numAdults: number      // ── split from numPersons
  numChildren: number    // ── new
}

interface CartContextType {
  items: CartItem[]
  addItem: (activity: Activity) => void
  removeItem: (cartId: string) => void
  updateItem: (cartId: string, updates: Partial<CartItem>) => void
  clearCart: () => void
  totalAmount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (activity: Activity) => {
    const cartId = `${activity.id}-${Date.now()}`
    setItems(prev => [...prev, {
      cartId,
      activity,
      date: "",
      arrivalTime: "",
      numAdults: activity.min_persons,
      numChildren: 0,
    }])
  }

  const removeItem = (cartId: string) =>
    setItems(prev => prev.filter(i => i.cartId !== cartId))

  const updateItem = (cartId: string, updates: Partial<CartItem>) =>
    setItems(prev => prev.map(i => i.cartId === cartId ? { ...i, ...updates } : i))

  const clearCart = () => setItems([])

  // Price: adults at full price, children at child_price (if set) else full price
  const totalAmount = items.reduce((sum, item) => {
    const adultPrice  = parseFloat(item.activity.base_price)
    const childPrice  = item.activity.child_price != null
      ? parseFloat(String(item.activity.child_price))
      : adultPrice
    if (item.activity.pricing_type === "per_person") {
      return sum + adultPrice * item.numAdults + childPrice * item.numChildren
    }
    return sum + adultPrice
  }, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateItem, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
