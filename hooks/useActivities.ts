// hooks/useActivities.ts
import { useEffect, useState } from 'react'
import { api, Activity } from '@/lib/api'

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.activities.list()
      .then(data => setActivities(data.results))
      .catch(() => setError('Failed to load activities'))
      .finally(() => setLoading(false))
  }, [])

  return { activities, loading, error }
}
