import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⬡</span>
            <span className={styles.logoText}>EstateVista</span>
          </div>
          <p className={styles.tagline}>
            India's most trusted platform for premium real estate. Curating exceptional homes for discerning buyers.
          </p>
          <div className={styles.socials}>
            {['Twitter', 'LinkedIn', 'Instagram'].map(s => (
              <a key={s} href="#" className={styles.social} aria-label={s}>
                <span>{s[0]}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className={styles.links}>
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Explore</h4>
            <Link to="/listings" className={styles.link}>All Properties</Link>
            <Link to="/listings" className={styles.link}>For Sale</Link>
            <Link to="/listings" className={styles.link}>For Rent</Link>
            <Link to="/favorites" className={styles.link}>Saved Properties</Link>
          </div>
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Cities</h4>
            {['Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Goa'].map(c => (
              <a key={c} href="#" className={styles.link}>{c}</a>
            ))}
          </div>
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Company</h4>
            <Link to="/about" className={styles.link}>About Us</Link>
            <a href="#" className={styles.link}>Careers</a>
            <a href="#" className={styles.link}>Press</a>
            <a href="#" className={styles.link}>Contact</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>© 2024 EstateVista. All rights reserved.</p>
        <div className={styles.legal}>
          <a href="#" className={styles.legalLink}>Privacy Policy</a>
          <a href="#" className={styles.legalLink}>Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer