import React from 'react'
import SearchBar from "./SearchBar";
import styles from './Hero.module.css'

const stats = [
  { value: '1,200+', label: 'Properties Listed' },
  { value: '48', label: 'Cities Covered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '₹500Cr+', label: 'Deals Closed' },
]

function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background */}
      <div className={styles.bg}>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
          alt="Luxury property"
          className={styles.bgImg}
        />
        <div className={styles.bgOverlay} />
      </div>

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          India's Premier Real Estate Platform
        </div>

        <h1 className={styles.heading}>
          Find Your
          <span className={styles.headingAccent}> Perfect</span>
          <br />Home Today
        </h1>

        <p className={styles.subheading}>
          Explore curated luxury properties across India's most prestigious addresses.
          From sea-facing penthouses to heritage estates.
        </p>

        {/* Search */}
        <div className={styles.searchWrap}>
          <SearchBar large placeholder="Search by city, area or property type..." />
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          <span className={styles.tagLabel}>Popular:</span>
          {['Mumbai', 'Bengaluru', 'Goa', 'Hyderabad', 'Pune'].map(city => (
            <button key={city} className={styles.tag}>{city}</button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <div key={i} className={styles.stat}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero