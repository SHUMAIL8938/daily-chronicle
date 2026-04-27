import { cleanTitle, timeAgo, formatDate, imgSrc, sourceName, FALLBACK_IMG } from '../utils/articleHelpers'
import styles from './HeroArticle.module.css'

export default function HeroArticle({ article }) {
  if (!article) return null

  return (
    <article className={styles.hero}>
      <img
        className={styles.img}
        src={imgSrc(article)}
        alt={cleanTitle(article.title)}
        loading="eager"
        onError={(e) => { e.currentTarget.src = FALLBACK_IMG }}
      />
      <div className={styles.kicker}>
        {sourceName(article)} · {timeAgo(article.publishedAt)}
      </div>
      <h2 className={styles.headline}>{cleanTitle(article.title)}</h2>
      <div className={styles.byline}>
        By Our Correspondents · {formatDate(article.publishedAt)}
      </div>
      <p className={styles.body}>
        {article.description || 'Read the full story at the source for complete details on this developing story.'}
      </p>
      <a
        className={styles.readMore}
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Continue reading →
      </a>
    </article>
  )
}
