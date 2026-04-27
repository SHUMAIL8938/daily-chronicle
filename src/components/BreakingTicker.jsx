import { useMemo } from 'react'
import { cleanTitle } from '../utils/articleHelpers'
import styles from './BreakingTicker.module.css'

export default function BreakingTicker({ articles }) {
  const titles = useMemo(
    () => articles.slice(0, 8).map((a) => cleanTitle(a.title)),
    [articles]
  )

  // Duplicate for seamless loop
  const items = [...titles, ...titles]

  return (
    <div className={styles.wrap}>
      <div className={styles.label}>Breaking</div>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {items.map((title, i) => (
            <span key={i} className={styles.item}>
              {title}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
