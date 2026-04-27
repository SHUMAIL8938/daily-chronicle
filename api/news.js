// api/news.js — Vercel serverless function
// Proxies NewsAPI so the API key never touches the browser and CORS is bypassed.
// Set NEWSAPI_KEY in Vercel → Project → Settings → Environment Variables.

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.NEWSAPI_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'NEWSAPI_KEY environment variable is not set.' })
  }

  const { category = 'general', country = 'us', pageSize = 20 } = req.query

  const params = new URLSearchParams({ country, pageSize, apiKey })
  if (category !== 'general') params.set('category', category)

  const upstream = `https://newsapi.org/v2/top-headlines?${params}`

  try {
    const upstreamRes = await fetch(upstream)
    const data = await upstreamRes.json()

    if (data.status !== 'ok') {
      return res.status(502).json({ error: data.message || 'NewsAPI error' })
    }

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60')
    res.setHeader('Access-Control-Allow-Origin', '*')

    return res.status(200).json(data)
  } catch (err) {
    console.error('NewsAPI fetch failed:', err)
    return res.status(502).json({ error: 'Failed to reach NewsAPI', detail: err.message })
  }
}
