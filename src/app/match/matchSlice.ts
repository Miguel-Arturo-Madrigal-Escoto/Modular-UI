import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICompanyProfile, ICurrentUser, IUserProfile } from '../types/interfaces';
import { onGetCompanyMatch, onGetUserMatch, onRetrieveCompanyMatchesList, onRetrieveUserMatchesList } from './thunks';




export interface MatchesState {
    errors: any;
    loading: boolean;

    usersQueue: ICurrentUser[]; // queue
    currentUser: ICurrentUser | null; 

    companiesQueue: ICurrentUser[]; // queue
    currentCompany: ICurrentUser | null;

    userMatches: ICompanyProfile[];
    companyMatches: IUserProfile[];

    recommendedProfileUser: ICurrentUser | null; 
    recommendedProfileCompany: ICurrentUser | null; 
}

export const initialState: MatchesState = {
    errors: {},
    loading: false,
    
    usersQueue: [],
    currentUser: null, 

    companiesQueue: [],
    currentCompany: null,

    userMatches: [],
    companyMatches: [],

    recommendedProfileUser: null,
    recommendedProfileCompany: null
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
        },
        dequeueCompany: (state: MatchesState) => {
            const [currentCompany, ...companies] = state.companiesQueue;
            
            return {
              ...state,
              companiesQueue: companies,
              currentCompany
            }
        },
        dequeueUser: (state: MatchesState) => {
            const [currentUser, ...users] = state.usersQueue;
            return {
              ...state,
              usersQueue: users,
              currentUser
            }
        },
        setRecommendedProfileUser: (state, { payload }: PayloadAction<ICurrentUser>) => {
            return {
              ...state,
              recommendedProfileUser: payload
            }
        },
        setRecommendedProfileCompany: (state, { payload }: PayloadAction<ICurrentUser>) => {
            return {
              ...state,
              recommendedProfileCompany: payload
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
            usersQueue: payload
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
            companiesQueue: payload
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

export const { setErrors, clearMatchSlice, dequeueCompany, dequeueUser, setRecommendedProfileUser, setRecommendedProfileCompany } = matchesSlice.actions;

export default matchesSlice.reducer;