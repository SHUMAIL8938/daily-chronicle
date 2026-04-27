import styles from './Skeleton.module.css'

export default function Skeleton() {
  return (
    <div className={styles.wrap}>
      <div className={styles.frontGrid}>
        <div className={styles.heroSkel}>
          <div className={`skel ${styles.heroImg}`} />
          <div className={`skel ${styles.line}`} style={{ width: '60%', height: 28, marginBottom: 8 }} />
          <div className={`skel ${styles.line}`} />
          <div className={`skel ${styles.line}`} />
          <div className={`skel ${styles.line}`} style={{ width: '75%' }} />
        </div>
        <div>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={`skel ${styles.sidebarItem}`} />
          ))}
        </div>
      </div>
      <div className={styles.gridSkel}>
        {[1, 2, 3].map((n) => (
          <div key={n}>
            <div className={`skel ${styles.gridImg}`} />
            <div className={`skel ${styles.line}`} style={{ marginBottom: 6 }} />
            <div className={`skel ${styles.line}`} style={{ width: '70%' }} />
          </div>
        ))}
      </div>
    </div>
  )
}
