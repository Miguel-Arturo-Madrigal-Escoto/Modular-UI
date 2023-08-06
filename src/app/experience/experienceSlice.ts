import { createSlice } from '@reduxjs/toolkit'
import { IUserExperiences } from '../types/interfaces';
import { onAddUserExperience, onGetUserExperiences } from './thunks';


const initialState: IUserExperiences = {
    errors: {},
    experiences: []
}

const experienceSlice = createSlice({
    name: 'experience',
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
        builder.addCase(onAddUserExperience.fulfilled, (state) => {
            return {
                ...state,
                errors: {},
            }
        })

        builder.addCase(onGetUserExperiences.fulfilled, (state, { payload }) => {
            return {
                ...state,
                errors: {},
                experiences: payload
            }
        })
    },
})

export const { clearErrors, setErrors } = experienceSlice.actions;

export default experienceSlice.reducer