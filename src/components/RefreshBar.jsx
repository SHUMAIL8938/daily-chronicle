import styles from './RefreshBar.module.css'

export default function RefreshBar({ status, lastUpdated, onRefresh }) {
  const label = () => {
    if (status === 'loading') return 'Fetching latest news…'
    if (status === 'demo')    return 'Demo mode — add NEWSAPI_KEY env var for live news'
    if (status === 'error')   return 'Failed to fetch'
    if (lastUpdated)
      return `Updated ${lastUpdated.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
    return ''
  }

  return (
    <div className={styles.bar}>
      <div className={styles.label}>{label()}</div>
      <button
        className={styles.btn}
        onClick={onRefresh}
        disabled={status === 'loading'}
      >
        ↻ Refresh
      </button>
    </div>
  )
}
