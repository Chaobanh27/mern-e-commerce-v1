/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SummaryApi from '../common/index'

const initialState = {
  user : null
}

export const fetchUserDetailsAPI = createAsyncThunk(
  'activeUser/fetchUserDetailsAPI',
  async () => {
    const fetchData = await fetch(SummaryApi.current_user.url, {
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })
    const data = await fetchData.json()

    return data
  }
)

export const fetchUserLogoutAPI = createAsyncThunk(
  'activeUser/fetchUserLogoutAPI',
  async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    return data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail : (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetailsAPI.fulfilled, (state, action) => {
      let userDetails = action.payload
      state.user = userDetails
    }),
    builder.addCase(fetchUserLogoutAPI.fulfilled, (state) => {
      state.user = null
    })

  }
})


export const { setUserDetail } = userSlice.actions

export const selectCurrentUserDetails = (state) => {
  return state.user.user
}

export default userSlice.reducer