import { cleanTitle, timeAgo, imgSrc, sourceName, FALLBACK_IMG } from '../utils/articleHelpers'
import styles from './Sidebar.module.css'

function SidebarArticle({ article, delay }) {
  return (
    <a
      className={styles.article}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={styles.text}>
        <div className={styles.kicker}>{sourceName(article)}</div>
        <h3 className={styles.title}>{cleanTitle(article.title)}</h3>
        <div className={styles.meta}>{timeAgo(article.publishedAt)}</div>
      </div>
      <img
        className={styles.img}
        src={imgSrc(article)}
        alt={cleanTitle(article.title)}
        loading="lazy"
        onError={(e) => { e.currentTarget.src = FALLBACK_IMG }}
      />
    </a>
  )
}

export default function Sidebar({ articles }) {
  return (
    <aside className={styles.sidebar}>
      <div className="section-rule"><span>Also Today</span></div>
      {articles.map((article, i) => (
        <SidebarArticle key={article.url + i} article={article} delay={i * 0.08} />
      ))}
    </aside>
  )
}
