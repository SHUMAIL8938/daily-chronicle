export const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80'

/** Strip " - Source Name" suffix NewsAPI appends to titles */
export function cleanTitle(title = '') {
  return title.replace(/\s[-–|]\s[^-–|]+$/, '').trim()
}

/** "3h ago", "Just now", etc. */
export function timeAgo(iso) {
  const mins = Math.floor((Date.now() - new Date(iso)) / 60000)
  if (mins < 2) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

/** "Apr 26, 10:34 AM" */
export function formatDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function imgSrc(article) {
  return article.urlToImage || FALLBACK_IMG
}

export function sourceName(article) {
  return article.source?.name || 'News Source'
}

export const DEMO_ARTICLES = [
  {
    title: 'World Leaders Gather for Historic Climate Summit in Geneva',
    description:
      'Representatives from over 140 nations convened Monday in Geneva to forge a new global framework on carbon emissions, with negotiators signaling cautious optimism after preliminary discussions yielded unexpected common ground on offshore energy policy.',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    source: { name: 'World Affairs' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    title: 'Central Banks Signal Coordinated Rate Shift Amid Inflation Data',
    description:
      'The Federal Reserve and European Central Bank both hinted Tuesday at a synchronized policy adjustment after fresh inflation readings came in below analyst forecasts for the third consecutive quarter.',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    source: { name: 'Financial Times' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    title: 'Breakthrough in Quantum Computing Achieved by Research Consortium',
    description:
      'A multinational team announced a new qubit stability record, holding coherence for 12 minutes at room temperature — a milestone researchers say could compress the timeline to practical quantum advantage by a decade.',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    source: { name: 'Science Daily' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    title: 'Ocean Discovery: New Deep-Sea Ecosystem Found Off Pacific Coast',
    description:
      'Marine biologists catalogued more than 60 previously unknown species during a submersible expedition to the Cascadia Basin, including a bioluminescent cephalopod that communicates via complex light patterns.',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80',
    source: { name: 'Nature Research' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    title: 'Global Health Authority Updates Guidance on Preventive Care',
    description:
      'The WHO issued revised recommendations on routine screening protocols, citing a decade of longitudinal data showing early intervention reduces treatment costs by up to 40% while significantly improving long-term patient outcomes.',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    source: { name: 'Health Wire' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    title: 'Architects Unveil Ambitious Urban Renewal Plan for Historic Districts',
    description:
      'A coalition of firms presented a comprehensive framework for revitalizing post-industrial urban cores while preserving architectural heritage — a model drawing interest from city planners in seven countries.',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    source: { name: 'City Journal' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    title: 'Major Film Festival Announces Unprecedented International Lineup',
    description:
      "This year's programme features 48 world premieres spanning 34 countries, with the jury chaired by an acclaimed documentarian whose latest work sparked global conversation about digital identity and privacy.",
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    source: { name: 'Arts Dispatch' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  },
]
