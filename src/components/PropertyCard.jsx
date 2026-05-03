import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite, selectIsFavorite } from '../redux/favoritesSlice'
import { formatPrice } from '../utils/format'
import styles from './PropertyCard.module.css'

function PropertyCard({ property, index = 0 }) {
  const [imgIdx, setImgIdx] = useState(0)
  const dispatch = useDispatch()
  const isFav = useSelector(state => selectIsFavorite(state, property.id))

  const handleFav = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavorite(property.id))
  }

  return (
    <Link
      to={`/property/${property.id}`}
      className={styles.card}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Image */}
      <div className={styles.imageWrap}>
        <img
          src={property.images[imgIdx]}
          alt={property.title}
          className={styles.image}
          loading="lazy"
        />

        {/* Badges */}
        <div className={styles.topBadges}>
          <span className={`badge badge-${property.type}`}>
            {property.type === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
          {property.isNew && <span className="badge badge-new">New</span>}
        </div>

        {/* Favorite button */}
        <button
          className={`${styles.favBtn} ${isFav ? styles.favActive : ''}`}
          onClick={handleFav}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Image dots */}
        {property.images.length > 1 && (
          <div className={styles.dots}>
            {property.images.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === imgIdx ? styles.dotActive : ''}`}
                onClick={(e) => { e.preventDefault(); setImgIdx(i) }}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.price}>{formatPrice(property.price, property.type)}</div>
        <h3 className={styles.title}>{property.title}</h3>
        <div className={styles.location}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {property.area}, {property.city}
        </div>

        <div className={styles.divider} />

        <div className={styles.specs}>
          <div className={styles.spec}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className={styles.spec}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 12h16M4 12a8 8 0 0 1 16 0"/>
            </svg>
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className={styles.spec}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/>
            </svg>
            <span>{property.sqft.toLocaleString()} ft²</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PropertyCard