import { createSlice } from '@reduxjs/toolkit'
import { properties as allProperties } from '../data/properties'

const initialState = {
  all: allProperties,
  status: 'idle'
}

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {}
})

export default propertiesSlice.reducer

export const selectAllProperties = state => state.properties.all
export const selectPropertyById = (state, id) => state.properties.all.find(p => p.id === Number(id))
export const selectFeaturedProperties = state => state.properties.all.filter(p => p.isFeatured)