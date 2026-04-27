import styles from './Masthead.module.css'

const CATEGORIES = [
  { key: 'general', label: 'World' },
  { key: 'business', label: 'Business' },
  { key: 'technology', label: 'Technology' },
  { key: 'science', label: 'Science' },
  { key: 'health', label: 'Health' },
  { key: 'sports', label: 'Sports' },
  { key: 'entertainment', label: 'Arts' },
]

function formatMastheadDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Masthead({ activeCategory, onCategoryChange }) {
  return (
    <header className={styles.masthead}>
      <div className={styles.meta}>
        <span>{formatMastheadDate()}</span>
        <span>Est. MMXXVI · Vol. I, No. 1</span>
        <span>Free Edition</span>
      </div>

      <div className={styles.title}>
        The Daily <em>Chronicle</em>
      </div>

      <div className={styles.tagline}>All the news that's fit to print</div>

      <nav className={styles.navStrip}>
        {CATEGORIES.map((cat) => (
          <a
            key={cat.key}
            href="#"
            className={activeCategory === cat.key ? styles.active : ''}
            onClick={(e) => {
              e.preventDefault()
              onCategoryChange(cat.key)
            }}
          >
            {cat.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
