// src/slices/profileSlice.js

import { createSlice } from "@reduxjs/toolkit"

const getUser = () => {
  try {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  } catch { return null }
}

const initialState = {
  user: getUser(),
  loading: false,
}


const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
  },
})

export const { setUser, setLoading } = profileSlice.actions
export default profileSlice.reducer