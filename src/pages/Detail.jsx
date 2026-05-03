import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectPropertyById } from '../redux/propertiesSlice'
import { toggleFavorite, selectIsFavorite } from '../redux/favoritesSlice'
import { formatPrice, formatSqft } from "../utils/format";
import styles from './Detail.module.css'

function Detail() {
  const { id } = useParams()
  const property = useSelector(state => selectPropertyById(state, id))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isFav = useSelector(state => selectIsFavorite(state, property?.id))
  const [activeImg, setActiveImg] = useState(0)
  const [contactSent, setContactSent] = useState(false)

  if (!property) {
    return (
      <div className={styles.notFound}>
        <h2>Property not found</h2>
        <Link to="/listings" className="btn btn-primary">Back to Listings</Link>
      </div>
    )
  }

  const handleContact = (e) => {
    e.preventDefault()
    setContactSent(true)
    setTimeout(() => setContactSent(false), 3000)
  }

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className="container">
          <div className={styles.topBarInner}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Back
            </button>
            <div className={styles.topActions}>
              <button
                className={`${styles.actionBtn} ${isFav ? styles.favActive : ''}`}
                onClick={() => dispatch(toggleFavorite(property.id))}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {isFav ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Left column */}
          <div className={styles.leftCol}>
            {/* Gallery */}
            <div className={styles.gallery}>
              <div className={styles.mainImg}>
                <img src={property.images[activeImg]} alt={property.title} />
                {property.isNew && <span className="badge badge-new" style={{position:'absolute',top:16,left:16}}>New</span>}
                <span className={`badge badge-${property.type}`} style={{position:'absolute',top:16,left:property.isNew ? 72 : 16}}>
                  {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                </span>
              </div>
              <div className={styles.thumbRow}>
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt={`View ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className={styles.infoBlock}>
              <div className={styles.titleRow}>
                <div>
                  <h1 className={styles.title}>{property.title}</h1>
                  <div className={styles.location}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {property.area}, {property.location}
                  </div>
                </div>
                <div className={styles.price}>{formatPrice(property.price, property.type)}</div>
              </div>

              {/* Key specs */}
              <div className={styles.specsRow}>
                {[
                  { icon: '🛏', label: 'Bedrooms', value: property.bedrooms },
                  { icon: '🚿', label: 'Bathrooms', value: property.bathrooms },
                  { icon: '📐', label: 'Area', value: formatSqft(property.sqft) },
                  { icon: '🚗', label: 'Parking', value: property.parking || 'None' },
                  { icon: '📅', label: 'Year Built', value: property.yearBuilt },
                ].map((s, i) => (
                  <div key={i} className={styles.specItem}>
                    <span className={styles.specIcon}>{s.icon}</span>
                    <span className={styles.specValue}>{s.value}</span>
                    <span className={styles.specLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>About This Property</h2>
              <p className={styles.desc}>{property.description}</p>
            </div>

            {/* Amenities */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Amenities</h2>
              <div className={styles.amenitiesGrid}>
                {property.amenities.map((a, i) => (
                  <div key={i} className={styles.amenity}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Agent + Contact */}
          <div className={styles.rightCol}>
            {/* Agent card */}
            <div className={styles.agentCard}>
              <div className={styles.agentHeader}>
                <div className={styles.agentAvatar}>
                  {property.agent.name.charAt(0)}
                </div>
                <div>
                  <div className={styles.agentName}>{property.agent.name}</div>
                  <div className={styles.agentRating}>
                    {'★'.repeat(Math.round(property.agent.rating))} {property.agent.rating}
                  </div>
                </div>
              </div>
              <a href={`tel:${property.agent.phone}`} className={`btn btn-secondary ${styles.callBtn}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z"/>
                </svg>
                {property.agent.phone}
              </a>
            </div>

            {/* Contact form */}
            <div className={styles.contactCard}>
              <h3 className={styles.contactTitle}>Schedule a Visit</h3>
              <form onSubmit={handleContact} className={styles.form}>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Your Name</label>
                  <input className={styles.formInput} type="text" placeholder="Full name" required />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Email</label>
                  <input className={styles.formInput} type="email" placeholder="your@email.com" required />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Phone</label>
                  <input className={styles.formInput} type="tel" placeholder="+91 xxxxx xxxxx" />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Preferred Date</label>
                  <input className={styles.formInput} type="date" />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Message</label>
                  <textarea
                    className={styles.formInput}
                    rows={3}
                    placeholder="I'm interested in this property..."
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                  {contactSent ? '✓ Message Sent!' : 'Send Inquiry'}
                </button>
              </form>
            </div>

            {/* Similar properties link */}
            <Link to="/listings" className={styles.moreLink}>
              View Similar Properties →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail