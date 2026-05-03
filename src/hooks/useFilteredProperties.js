import { useSelector } from 'react-redux'
import { selectAllProperties } from '../redux/propertiesSlice'
import { selectFilters } from '../redux/filtersSlice'

export function useFilteredProperties() {
  const all = useSelector(selectAllProperties)
  const filters = useSelector(selectFilters)

  let result = [...all]

  // Type filter
  if (filters.type !== 'all') {
    result = result.filter(p => p.type === filters.type)
  }

  // City filter
  if (filters.city) {
    result = result.filter(p => p.city === filters.city)
  }

  // Price filter
  if (filters.minPrice) {
    result = result.filter(p => p.price >= Number(filters.minPrice))
  }
  if (filters.maxPrice) {
    result = result.filter(p => p.price <= Number(filters.maxPrice))
  }

  // Bedrooms filter
  if (filters.minBedrooms) {
    result = result.filter(p => p.bedrooms >= Number(filters.minBedrooms))
  }

  // Search query
  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.area.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q)
    )
  }

  // Sort
  switch (filters.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      result.sort((a, b) => b.yearBuilt - a.yearBuilt)
      break
    case 'sqft-desc':
      result.sort((a, b) => b.sqft - a.sqft)
      break
    default:
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
  }

  return result
}