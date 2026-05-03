import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectFavoriteIds } from "../redux/favoritesSlice";
import styles from './Navbar.module.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const favorites = useSelector(selectFavoriteIds)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClass = `${styles.navbar} ${scrolled ? styles.scrolled : ''}`

  return (
    <header className={navClass}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⬡</span>
          <span className={styles.logoText}>EstateVista</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <NavLink to="/" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            Home
          </NavLink>
          <NavLink to="/listings" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            Listings
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            About
          </NavLink>
        </nav>

        {/* Right actions */}
        <div className={styles.actions}>
          <NavLink to="/favorites" className={styles.favBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {favorites.length > 0 && (
              <span className={styles.favCount}>{favorites.length}</span>
            )}
          </NavLink>
          <button className={`btn btn-primary ${styles.ctaBtn}`} onClick={() => navigate('/listings')}>
            Find a Home
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`${styles.hLine} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.hLine} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.hLine} ${menuOpen ? styles.open : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className={styles.mobileMenu}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className={styles.mobileLink}>Home</NavLink>
          <NavLink to="/listings" onClick={() => setMenuOpen(false)} className={styles.mobileLink}>Listings</NavLink>
          <NavLink to="/favorites" onClick={() => setMenuOpen(false)} className={styles.mobileLink}>
            Saved ({favorites.length})
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className={styles.mobileLink}>About</NavLink>
        </nav>
      )}
    </header>
  )
}

export default Navbar