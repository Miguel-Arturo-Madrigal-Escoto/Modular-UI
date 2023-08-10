import { createSlice } from '@reduxjs/toolkit'
import { onSaveNewSector } from './thunks';


export interface SectorsState {
    errors: any;
    loading: boolean;
}

export const initialState: SectorsState = {
    errors: {},
    loading: false
}

export const sectorsSlice = createSlice({
    name: 'sectors',
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
        builder.addCase(onSaveNewSector.pending, (state) => {
          return {
            ...state,
            loading: true,
            errors: {},
          }
        })
   
        builder.addCase(onSaveNewSector.fulfilled, (state) => {
          return {
            ...state,
            errors: {},
            loading: false
          }
        }),
  
        builder.addCase(onSaveNewSector.rejected, (state) => {
          return {
            ...state,
            loading: false
          }
        })
     
    }
})

export const { setErrors } = sectorsSlice.actions;

export default sectorsSlice.reducer;