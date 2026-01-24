import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './slices/productsSlice'
import categoriesReducer from './slices/categoriesSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,     // 👈 ОБЯЗАТЕЛЬНО
    categories: categoriesReducer,
    cart: cartReducer
  }
})

export default store
