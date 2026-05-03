import React, { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, selectFilters } from '../redux/filtersSlice'
import { useNavigate } from 'react-router-dom'
import styles from './SearchBar.module.css'

function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

function SearchBar({ large = false, placeholder = "Search by city, area, or property name..." }) {
  const dispatch = useDispatch()
  const filters = useSelector(selectFilters)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setFilter({ key: 'searchQuery', value }))
    }, 350),
    [dispatch]
  )

  const handleChange = (e) => {
    debouncedSearch(e.target.value)
  }

  const handleSearch = () => {
    navigate('/listings')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate('/listings')
    }
  }

  return (
    <div className={`${styles.wrapper} ${large ? styles.large : ''}`}>
      <div className={styles.searchIcon}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        placeholder={placeholder}
        defaultValue={filters.searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}

export default SearchBar