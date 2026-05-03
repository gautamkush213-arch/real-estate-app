import React from 'react'
import styles from './LoadingSpinner.module.css'

function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}>
        <div className={styles.ring} />
        <div className={styles.innerDot} />
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default LoadingSpinner