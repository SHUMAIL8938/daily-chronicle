import { useState, useEffect } from 'react'
import { cleanTitle, timeAgo, imgSrc, sourceName, FALLBACK_IMG } from '../utils/articleHelpers'
import styles from './SportsSection.module.css'

function SportsCard({ article, delay }) {
  return (
    <a
      className={styles.card}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={styles.imgWrap}>
        <img
          className={styles.img}
          src={imgSrc(article)}
          alt={cleanTitle(article.title)}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMG }}
        />
        <div className={styles.sportTag}>Football</div>
      </div>
      <div className={styles.body}>
        <div className={styles.kicker}>{sourceName(article)}</div>
        <div className={styles.title}>{cleanTitle(article.title)}</div>
        <div className={styles.desc}>{article.description || ''}</div>
        <div className={styles.meta}>{timeAgo(article.publishedAt)}</div>
      </div>
    </a>
  )
}

export default function SportsSection() {
  const [articles, setArticles] = useState([])
  const [status, setStatus] = useState('loading')
  const [tab, setTab] = useState('soccer')

  const TABS = [
    { key: 'soccer',   label: 'Football',   query: 'soccer OR football OR FIFA OR Premier League OR Champions League' },
    { key: 'nfl',      label: 'NFL',      query: 'NFL OR American football OR touchdown' },
  ]

  useEffect(() => {
    async function fetchSports() {
      setStatus('loading')
      try {
        const current = TABS.find(t => t.key === tab)
        const res = await fetch(
          `/api/news?q=${encodeURIComponent(current.query)}&sortBy=publishedAt&pageSize=6`
        )
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        const clean = (data.articles || [])
          .filter(a => a.title && a.title !== '[Removed]')
          .slice(0, 6)
        setArticles(clean)
        setStatus('done')
      } catch {
        setStatus('error')
      }
    }
    fetchSports()
  }, [tab])

  if (status === 'error') return null

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.heading}>Sports Desk</h2>
          <div className={styles.tabs}>
            {TABS.map(t => (
              <button
                key={t.key}
                className={`${styles.tabBtn} ${tab === t.key ? styles.activeTab : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.headerLine} />
      </div>

      {/* Grid */}
      {status === 'loading' ? (
        <div className={styles.grid}>
          {[1,2,3,4].map(n => (
            <div key={n}>
              <div className={`skel ${styles.skelImg}`} />
              <div className={`skel ${styles.skelLine}`} />
              <div className={`skel ${styles.skelLine}`} style={{ width: '65%' }} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {articles.map((article, i) => (
            <SportsCard
              key={article.url + i}
              article={article}
              delay={i * 0.07}
            />
          ))}
        </div>
      )}
    </section>
  )
}