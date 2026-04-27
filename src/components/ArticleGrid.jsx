import { cleanTitle, timeAgo, imgSrc, sourceName, FALLBACK_IMG } from '../utils/articleHelpers'
import styles from './ArticleGrid.module.css'

function GridCard({ article, delay }) {
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

export default function ArticleGrid({ articles }) {
  if (!articles.length) return null

  return (
    <>
      <div className={styles.ornament}>✦ &nbsp; ✦ &nbsp; ✦</div>
      <div className="section-rule"><span>More Stories</span></div>
      <div className={styles.grid}>
        {articles.map((article, i) => (
          <GridCard key={article.url + i} article={article} delay={i * 0.06} />
        ))}
      </div>
    </>
  )
}
