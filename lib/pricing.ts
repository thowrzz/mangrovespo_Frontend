// lib/pricing.ts

export interface PricingActivity {
  base_price: string
  pricing_type: "per_person" | "per_group"
  min_persons: number
  extra_person_charge: string | null
}

export function calculatePrice(activity: PricingActivity, persons: number): number {
  const base  = parseFloat(activity.base_price)
  const extra = parseFloat(activity.extra_person_charge || "0")
  const min   = activity.min_persons

  // Extra charge applies to every person beyond the minimum
  const extraPersons = Math.max(0, persons - min)
  const extraTotal   = extra * extraPersons

  if (activity.pricing_type === "per_person") {
    // base covers 1 person, multiply for all persons, then add extra beyond min
    return base * persons + extraTotal
  } else {
    // base covers the whole group up to min, add extra for each person beyond min
    return base + extraTotal
  }
}

export function getPriceBreakdown(activity: PricingActivity, persons: number): string {
  const base  = parseFloat(activity.base_price)
  const extra = parseFloat(activity.extra_person_charge || "0")
  const min   = activity.min_persons
  const extraPersons = Math.max(0, persons - min)

  if (activity.pricing_type === "per_person") {
    if (extra > 0 && extraPersons > 0) {
      return `₹${base.toLocaleString()} × ${persons} persons + ₹${extra.toLocaleString()} × ${extraPersons} extra`
    }
    return `₹${base.toLocaleString()} × ${persons} persons`
  } else {
    if (extra > 0 && extraPersons > 0) {
      return `₹${base.toLocaleString()} (group) + ₹${extra.toLocaleString()} × ${extraPersons} extra`
    }
    return `₹${base.toLocaleString()} (group, up to ${min} persons)`
  }
}