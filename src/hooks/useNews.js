import { useState, useEffect, useCallback, useRef } from 'react'
import { DEMO_ARTICLES } from '../utils/articleHelpers'

const REFRESH_INTERVAL = 60 * 60 * 1000 // 60 minutes

export function useNews(category) {
  const [articles, setArticles] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'live' | 'demo' | 'error'
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const timerRef = useRef(null)

  const fetchNews = useCallback(async () => {
    setStatus('loading')
    setError(null)

    try {
      const res = await fetch(`/api/news?category=${category}&pageSize=20`)

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${res.status}`)
      }

      const data = await res.json()
      const clean = (data.articles || []).filter(
        (a) => a.title && a.title !== '[Removed]'
      )

      setArticles(clean)
      setStatus('live')
      setLastUpdated(new Date())
    } catch (err) {
      console.error('News fetch error:', err)
      // Fall back to demo articles gracefully
      setArticles(DEMO_ARTICLES)
      setStatus('demo')
      setError(err.message)
      setLastUpdated(new Date())
    }
  }, [category])

  // Fetch on mount and when category changes
  useEffect(() => {
    fetchNews()

    // Auto-refresh
    timerRef.current = setInterval(fetchNews, REFRESH_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [fetchNews])

  return { articles, status, error, lastUpdated, refresh: fetchNews }
}
