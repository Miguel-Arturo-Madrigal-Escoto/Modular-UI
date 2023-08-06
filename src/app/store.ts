import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import modalReducer from './extra/modalSlice'
import rolesReducer from './roles/rolesSlice'
import formReducer from './form/formSlice'
import experienceReducer from './experience/experienceSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    roles: rolesReducer,
    form: formReducer,
    experience: experienceReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch