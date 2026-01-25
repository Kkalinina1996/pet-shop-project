import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import categoriesReducer from './slices/categoriesSlice'
import cartReducer from './slices/cartSlice'
import salesReducer from './slices/saleSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    sales: salesReducer
  }
})
