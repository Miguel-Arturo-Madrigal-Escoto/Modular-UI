import { createSlice } from '@reduxjs/toolkit'

import { ICompanyProfile, IUserProfile } from '../types/interfaces';
import { onGetCompanyMatch, onGetUserMatch, onRetrieveCompanyMatchesList, onRetrieveUserMatchesList } from './thunks';




export interface MatchesState {
    errors: any;
    loading: boolean;
    user: IUserProfile | null;
    company: ICompanyProfile | null;
    userMatches: ICompanyProfile[];
    companyMatches: IUserProfile[];
}

export const initialState: MatchesState = {
    errors: {},
    company: null,
    user: null, 
    loading: false,
    userMatches: [],
    companyMatches: [],
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
        },
        clearMatchSlice: () => {
          return initialState;
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


        builder.addCase(onRetrieveUserMatchesList.rejected, (state) => {
          return {
            ...state,
            loading: false
          }
        })

        builder.addCase(onRetrieveUserMatchesList.pending, (state) => {
          return {
            ...state,
            loading: true,
            errors: {},
          }
        })
    
        builder.addCase(onRetrieveUserMatchesList.fulfilled, (state, { payload }) => {
          return {
            ...state,
            errors: {},
            loading: false,
            userMatches: payload
          }
        })


        builder.addCase(onRetrieveCompanyMatchesList.rejected, (state) => {
          return {
            ...state,
            loading: false
          }
        })

        builder.addCase(onRetrieveCompanyMatchesList.pending, (state) => {
          return {
            ...state,
            loading: true,
            errors: {},
          }
        })
    
        builder.addCase(onRetrieveCompanyMatchesList.fulfilled, (state, { payload }) => {
          return {
            ...state,
            errors: {},
            loading: false,
            companyMatches: payload
          }
        })
  
    }
})

export const { setErrors, clearMatchSlice } = matchesSlice.actions;

export default matchesSlice.reducer;