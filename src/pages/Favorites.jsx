import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectFavoriteIds } from "../redux/favoritesSlice";
import { selectAllProperties } from "../redux/propertiesSlice";
import PropertyCard from "../components/PropertyCard";
import styles from './Favorites.module.css'

function Favorites() {
  const favIds = useSelector(selectFavoriteIds)
  const all = useSelector(selectAllProperties)
  const favorites = all.filter(p => favIds.includes(p.id))

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <div className={styles.breadcrumb}>EstateVista / Saved</div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Saved Properties</h1>
            <span className={styles.count}>{favorites.length} saved</span>
          </div>
        </div>
      </div>

      <div className="container">
        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyHeart}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h2 className={styles.emptyTitle}>No saved properties yet</h2>
            <p className={styles.emptyDesc}>
              Tap the heart icon on any property to save it here for easy access later.
            </p>
            <Link to="/listings" className="btn btn-primary">
              Browse Properties
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {favorites.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
            <div className={styles.footer}>
              <Link to="/listings" className="btn btn-secondary">
                Discover More Properties
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Favorites