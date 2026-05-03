import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./propertiesSlice";
import favoritesReducer from "./favoritesSlice";
import filtersReducer from "./filtersSlice";

export default configureStore({
  reducer: {
    properties: propertiesReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});