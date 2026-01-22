import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/axios'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const res = await api.get('/categories/all')
    return res.data
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle'
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'success'
        state.items = action.payload
      })
  }
})

export default categoriesSlice.reducer
