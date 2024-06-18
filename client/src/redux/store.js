import { configureStore } from '@reduxjs/toolkit'
import useReducer from './userSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    user: useReducer,
    cart: cartReducer
  }
})