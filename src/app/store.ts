import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import modalSlice from './extra/modalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch