// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   signupData: null,
//   loading: false,
//   token: localStorage.getItem("token")
//     ? JSON.parse(localStorage.getItem("token"))
//     : null,
//   user: localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))
//     : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setSignupData(state, action) {
//       state.signupData = action.payload;
//     },
//     setLoading(state, action) {
//       state.loading = action.payload;
//     },
//     setToken(state, action) {
//       state.token = action.payload;
//     },
//     setUser(state, action) {
//       state.user = action.payload;
//     },
//   },
// });

// export const { setSignupData, setLoading, setToken, setUser } =
//   authSlice.actions;

// export default authSlice.reducer;

// src/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit"

const getToken = () => {
  try {
    return localStorage.getItem("token") 
      ? JSON.parse(localStorage.getItem("token")) 
      : null
  } catch { return null }
}

const initialState = {
  signupData: null,
  loading: false,
  token: getToken(),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setToken(state, action) {
      state.token = action.payload
    },
  },
})



export const { setSignupData, setLoading, setToken } = authSlice.actions
export default authSlice.reducer

