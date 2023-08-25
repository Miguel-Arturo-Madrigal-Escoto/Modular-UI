import { createSlice } from '@reduxjs/toolkit'

import { ICompanyProfile, IUserProfile } from '../types/interfaces';
import { onGetCompanyMatch, onGetUserMatch } from './thunks';




export interface MatchesState {
    errors: any;
    loading: boolean;
    user: IUserProfile | null
    company: ICompanyProfile | null
}

export const initialState: MatchesState = {
    errors: {},
    company: null,
    user: null, 
    loading: false
}

export const matchesSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
        setErrors: (state, { payload }) => {
            return {
              ...state,
              errors: payload
            }
        }
    },
    extraReducers(builder) {
 
  
        builder.addCase(onGetCompanyMatch.rejected, (state) => {
          return {
            ...state,
            loading: false
          }
        })

        builder.addCase(onGetCompanyMatch.pending, (state) => {
          return {
            ...state,
            loading: true,
            errors: {},
          }
        })
    
        builder.addCase(onGetCompanyMatch.fulfilled, (state, { payload }) => {
          return {
            ...state,
            errors: {},
            loading: false,
            user: payload
          }
        })


        builder.addCase(onGetUserMatch.rejected, (state) => {
          return {
            ...state,
            loading: false
          }
        })

        builder.addCase(onGetUserMatch.pending, (state) => {
          return {
            ...state,
            loading: true,
            errors: {},
          }
        })
    
        builder.addCase(onGetUserMatch.fulfilled, (state, { payload }) => {
          return {
            ...state,
            errors: {},
            loading: false,
            company: payload
          }
        })
  
    }
})

export const { setErrors } = matchesSlice.actions;

export default matchesSlice.reducer;