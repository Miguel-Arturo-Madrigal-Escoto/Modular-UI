import { createSlice } from '@reduxjs/toolkit'
import { fetchFormData } from './thunks';
import { IFormData } from '../types/interfaces';


const initialState: IFormData = {
    modalities: [],
    locations: [],
    positions: [],
    sectors: []
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        clearFormSlice: () => {
            return initialState;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchFormData.fulfilled, (state, { payload }) => {
            return {
                ...state,
                modalities: payload!.modalities,
                locations: payload!.locations,
                positions: payload!.positions,
                sectors: payload!.sectors,
            }
        })
    },
})

export const { clearFormSlice } = formSlice.actions;

export default formSlice.reducer