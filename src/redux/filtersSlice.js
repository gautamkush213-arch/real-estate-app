import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    type: 'all',
    city: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    sortBy: 'default',
    searchQuery: ''
  },
  reducers: {
    setFilter: (state, action) => {
      const { key, value } = action.payload
      state[key] = value
    },
    resetFilters: () => ({
      type: 'all',
      city: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      sortBy: 'default',
      searchQuery: ''
    })
  }
})

export const { setFilter, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer
export const selectFilters = state => state.filters