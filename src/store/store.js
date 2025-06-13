import { configureStore } from '@reduxjs/toolkit'
// import authSlice from './authSlice.js'
import authSlice from '../store/authSlice.js'

import moviesSlice from './moviesSlice.js'
export const store = configureStore({
  reducer: {
    auth:authSlice,
    movies:moviesSlice
  },
})