import { createSlice } from '@reduxjs/toolkit'
import { fetchFormData } from './thunks';

interface FormValue {
    value: string;
    display: string;
}

interface FormState {
    modalities: FormValue[];
    locations: FormValue[];
    positions: FormValue[];
    sectors: FormValue[];
}

const initialState: FormState = {
    modalities: [],
    locations: [],
    positions: [],
    sectors: []
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {},
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


export default formSlice.reducer