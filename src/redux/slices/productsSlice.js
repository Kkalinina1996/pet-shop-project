import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data } = await axios.get('http://localhost:3333/products/all')
    return data
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const { data } = await axios.get(
      `http://localhost:3333/products/${id}`
    )
    return data
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentProduct: null,
    status: 'idle'
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload
      })
  }
})

export const { clearCurrentProduct } = productsSlice.actions
export default productsSlice.reducer
