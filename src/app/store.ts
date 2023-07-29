import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import modalReducer from './extra/modalSlice'
import rolesReducer from './roles/rolesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    roles: rolesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch