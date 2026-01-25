import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

/*
  Загружаем ТОЛЬКО товары со скидкой
  backend: /products/all
  фильтруем по discount_price
*/

export const fetchSaleProducts = createAsyncThunk(
  'sales/fetchSaleProducts',
  async () => {
    const response = await api.get('/products/all')

    // оставляем только товары со скидкой
    return response.data.filter(
      product => product.discount_price !== null
    )
  }
)

const saleSlice = createSlice({
  name: 'sales',
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
