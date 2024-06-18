/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SummaryApi from '../common/index'

const initialState = {
  cart : 0
}

export const fetchAddToCardproductCountAPI = createAsyncThunk(
  'activeCart/fetchAddToCardproductCountAPI',
  async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })
    const resData = await dataResponse.json()

    return resData.data
  }
)


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartProductCount : (state, action) => {
      state.cart = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddToCardproductCountAPI.fulfilled, (state, action) => {
      let cartProductCount = action.payload.count
      state.cart = cartProductCount
    })
  }
})


export const { setCartProductCount } = cartSlice.actions

export const selectCurrentCartProductCount = (state) => {
  return state.cart.cart
}

export default cartSlice.reducer