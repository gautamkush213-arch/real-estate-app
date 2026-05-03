import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, resetFilters, selectFilters } from '../redux/filtersSlice'
import { cities } from '../data/properties'
import styles from './PropertyFilters.module.css'

function PropertyFilters({ resultCount }) {
  const dispatch = useDispatch()
  const filters = useSelector(selectFilters)

  const handleChange = (key, value) => {
    dispatch(setFilter({ key, value }))
  }

  const handleReset = () => {
    dispatch(resetFilters())
  }

  const isFiltered = filters.type !== 'all' || filters.city || filters.minPrice ||
    filters.maxPrice || filters.minBedrooms || filters.sortBy !== 'default'

  return (
    <div className={styles.filters}>
      {/* Type tabs */}
      <div className={styles.typeTabs}>
        {['all', 'sale', 'rent'].map(t => (
          <button
            key={t}
            className={`${styles.typeTab} ${filters.type === t ? styles.active : ''}`}
            onClick={() => handleChange('type', t)}
          >
            {t === 'all' ? 'All' : t === 'sale' ? 'For Sale' : 'For Rent'}
          </button>
        ))}
      </div>

      {/* Filter row */}
      <div className={styles.row}>
        {/* City */}
        <div className={styles.field}>
          <label className={styles.label}>City</label>
          <select
            className={styles.select}
            value={filters.city}
            onChange={e => handleChange('city', e.target.value)}
          >
            <option value="">All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Min Price */}
        <div className={styles.field}>
          <label className={styles.label}>Min Price</label>
          <input
            type="number"
            className={styles.input}
            placeholder="₹ Min"
            value={filters.minPrice}
            onChange={e => handleChange('minPrice', e.target.value)}
          />
        </div>

        {/* Max Price */}
        <div className={styles.field}>
          <label className={styles.label}>Max Price</label>
          <input
            type="number"
            className={styles.input}
            placeholder="₹ Max"
            value={filters.maxPrice}
            onChange={e => handleChange('maxPrice', e.target.value)}
          />
        </div>

        {/* Bedrooms */}
        <div className={styles.field}>
          <label className={styles.label}>Min Bedrooms</label>
          <select
            className={styles.select}
            value={filters.minBedrooms}
            onChange={e => handleChange('minBedrooms', e.target.value)}
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>{n}+ Beds</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className={styles.field}>
          <label className={styles.label}>Sort By</label>
          <select
            className={styles.select}
            value={filters.sortBy}
            onChange={e => handleChange('sortBy', e.target.value)}
          >
            <option value="default">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="sqft-desc">Largest First</option>
          </select>
        </div>

        {/* Reset */}
        {isFiltered && (
          <button className={styles.resetBtn} onClick={handleReset}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.37"/>
            </svg>
            Reset
          </button>
        )}
      </div>

      {/* Results count */}
      <div className={styles.resultCount}>
        <span className={styles.count}>{resultCount}</span> properties found
        {isFiltered && <span className={styles.filtered}> · Filtered</span>}
      </div>
    </div>
  )
}

export default PropertyFilters