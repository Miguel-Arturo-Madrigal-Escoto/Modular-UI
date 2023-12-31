import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import modalReducer from './extra/modalSlice'
import rolesReducer from './roles/rolesSlice'
import formReducer from './form/formSlice'
import experienceReducer from './experience/experienceSlice'
import sectorsReducer from './sectors/sectorsSlice'
import skillReducer from './skill/skillSlice'
import chatReducer from './chat/chatSlice'
import matchReducer from './match/matchSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    roles: rolesReducer,
    sectors: sectorsReducer,
    form: formReducer,
    experience: experienceReducer,
    skill: skillReducer,
    chat: chatReducer,
    match: matchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch