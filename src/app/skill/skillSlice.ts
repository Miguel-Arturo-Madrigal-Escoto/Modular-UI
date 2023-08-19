import { createSlice } from '@reduxjs/toolkit'
import { IUserSkills } from '../types/interfaces';
import { onAddUserSkill, onGetUserSkills } from './thunks';


const initialState: IUserSkills = {
    errors: {},
    skills: []
}

const skillSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        clearErrors: (state) => {
            return {
              ...state,
              errors: {}
            }
        },
        setErrors: (state, { payload }) => {
            return {
              ...state,
              errors: payload
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(onAddUserSkill.fulfilled, (state) => {
            return {
                ...state,
                errors: {},
            }
        })

        builder.addCase(onGetUserSkills.fulfilled, (state, { payload }) => {
            return {
                ...state,
                errors: {},
                skills: payload
            }
        })
    },
})

export const { clearErrors, setErrors } = skillSlice.actions;

export default skillSlice.reducer