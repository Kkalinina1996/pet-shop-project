import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      const existing = state.items.find(
        item => item.id === product.id
      )

      if (existing) {
        existing.count += 1
      } else {
        state.items.push({
          ...product,
          count: 1
        })
      }
    },

    decreaseCount(state, action) {
      const id = action.payload
      const item = state.items.find(i => i.id === id)

      if (!item) return

      if (item.count > 1) {
        item.count -= 1
      } else {
        state.items = state.items.filter(i => i.id !== id)
      }
    },

    removeFromCart(state, action) {
      const id = action.payload
      state.items = state.items.filter(i => i.id !== id)
    },

    /** 🔥 ВАЖНО: clearCart */
    clearCart(state) {
      state.items = []
    }
  }
})

export const {
  addToCart,
  decreaseCount,
  removeFromCart,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer
