import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/axios'

export const fetchSaleProducts = createAsyncThunk(
  'sale/fetchSaleProducts',
  async () => {
    const response = await api.get('/products/sale')
    return response.data
  }
)

const saleSlice = createSlice({
  name: 'sale',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSaleProducts.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchSaleProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchSaleProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default saleSlice.reducer
