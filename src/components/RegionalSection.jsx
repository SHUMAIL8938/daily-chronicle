import { useState, useEffect } from 'react'
import { cleanTitle, timeAgo, imgSrc, sourceName, FALLBACK_IMG } from '../utils/articleHelpers'
import styles from './RegionalSection.module.css'

function RegionalCard({ article, delay }) {
  return (
    <a
      className={styles.card}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${delay}s` }}
    >
      <img
        className={styles.img}
        src={imgSrc(article)}
        alt={cleanTitle(article.title)}
        loading="lazy"
        onError={(e) => { e.currentTarget.src = FALLBACK_IMG }}
      />
      <div className={styles.kicker}>{sourceName(article)}</div>
      <div className={styles.title}>{cleanTitle(article.title)}</div>
      <div className={styles.desc}>{article.description || ''}</div>
      <div className={styles.meta}>{timeAgo(article.publishedAt)}</div>
    </a>
  )
}

export default function RegionalSection() {
  const [articles, setArticles] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    async function fetchNational() {
      try {
        const res = await fetch(`/api/news?q=india&sortBy=publishedAt&pageSize=6`)

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
    fetchNational()
  }, [])

  if (status === 'error' || (status === 'done' && !articles.length)) return null

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.flag}>INDIA</span>
          <h2 className={styles.heading}>National Edition</h2>
        </div>
        <div className={styles.headerLine} />
      </div>

      {status === 'loading' ? (
        <div className={styles.grid}>
          {[1,2,3,4].map(n => (
            <div key={n} className={styles.skelWrap}>
              <div className={`skel ${styles.skelImg}`} />
              <div className={`skel ${styles.skelLine}`} />
              <div className={`skel ${styles.skelLine}`} style={{ width: '70%' }} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {articles.map((article, i) => (
            <RegionalCard
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