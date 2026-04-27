import styles from './StatusBanner.module.css'

export default function StatusBanner({ status, error }) {
  if (status === 'demo') {
    return (
      <div className={`${styles.banner} ${styles.info}`}>
        ℹ Showing demo articles. Set the{' '}
        <code>NEWSAPI_KEY</code> environment variable in Vercel to load live headlines.
      </div>
    )
  }

  if (status === 'error' && error) {
    return (
      <div className={`${styles.banner} ${styles.warn}`}>
        ⚠ Could not load live news: {error}. Check that{' '}
        <code>NEWSAPI_KEY</code> is set in your Vercel environment variables.
      </div>
    )
  }

  return null
}
