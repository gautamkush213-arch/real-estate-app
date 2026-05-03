import { createSlice } from '@reduxjs/toolkit'

const savedFavorites = JSON.parse(localStorage.getItem('estate-favorites') || '[]')

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: savedFavorites
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(fid => fid !== id)
      } else {
        state.ids.push(id)
      }
      localStorage.setItem('estate-favorites', JSON.stringify(state.ids))
    }
  }
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer

export const selectFavoriteIds = (state) => state.favorites.ids;
export const selectIsFavorite = (state, id) => state.favorites.ids.includes(id)