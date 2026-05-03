import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Hero from '../components/Hero.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import { selectFeaturedProperties } from '../redux/propertiesSlice'
import styles from './Home.module.css'

const features = [
  {
    icon: '🔍',
    title: 'Smart Search',
    desc: 'Find your ideal property with advanced filters — by price, location, size, and amenities.'
  },
  {
    icon: '❤️',
    title: 'Save Favorites',
    desc: 'Build your personal watchlist. Save and compare properties to make the right choice.'
  },
  {
    icon: '🏆',
    title: 'Verified Listings',
    desc: 'Every property is verified by our expert team for accuracy and authenticity.'
  },
  {
    icon: '📱',
    title: 'Virtual Tours',
    desc: 'Explore properties from anywhere with immersive gallery views and detailed specs.'
  }
]

function Home() {
  const featured = useSelector(selectFeaturedProperties)

  return (
    <div className={styles.page}>
      <Hero />

      {/* Featured section */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.eyebrow}>Handpicked for You</div>
              <h2 className={styles.sectionTitle}>Featured Properties</h2>
            </div>
            <Link to="/listings" className={`btn btn-secondary ${styles.seeAll}`}>
              View All Listings
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>

          <div className={styles.grid}>
            {featured.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className={`section ${styles.whySection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.eyebrow}>Why EstateVista</div>
              <h2 className={styles.sectionTitle}>A Smarter Way to Find Home</h2>
            </div>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((f, i) => (
              <div key={i} className={styles.featureCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Find Your Dream Home?</h2>
              <p className={styles.ctaDesc}>
                Browse 1,200+ premium properties across India. Your perfect home is just a search away.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link to="/listings" className="btn btn-primary">
                Explore Listings
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home