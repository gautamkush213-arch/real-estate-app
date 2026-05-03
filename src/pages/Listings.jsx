import React, { useState } from 'react'
import PropertyCard from '../components/PropertyCard.jsx'
import PropertyFilters from '../components/PropertyFilters.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { useFilteredProperties } from '../hooks/useFilteredProperties.js'
import styles from './Listings.module.css'

function Listings() {
  const [viewMode, setViewMode] = useState('grid')
  const filtered = useFilteredProperties()

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className={styles.headerContent}>
            <div>
              <div className={styles.breadcrumb}>EstateVista / Listings</div>
              <h1 className={styles.title}>Property Listings</h1>
            </div>
            <SearchBar placeholder="Search properties..." />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container">
        <div className={styles.layout}>
          {/* Filters */}
          <aside className={styles.sidebar}>
            <PropertyFilters resultCount={filtered.length} />
          </aside>

          {/* Results */}
          <div className={styles.results}>
            {/* View toggle */}
            <div className={styles.resultsHeader}>
              <span className={styles.resultText}>
                Showing <strong>{filtered.length}</strong> properties
              </span>
              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewActive : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </button>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewActive : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
                    <line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>🏠</div>
                <h3 className={styles.emptyTitle}>No properties found</h3>
                <p className={styles.emptyDesc}>Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className={`${styles.grid} ${viewMode === 'list' ? styles.listView : ''}`}>
                {filtered.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listings