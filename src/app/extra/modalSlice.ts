import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
    open: boolean;
}

export const initialState: ModalState = {
    open: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalOpen: (state) => {
            return {
                ...state,
                open: true
            }
        },
        setModalClosed: (state) => {
            return {
                ...state,
                open: false
            }
        }
    },
})

export const { setModalOpen, setModalClosed } = modalSlice.actions;

export default modalSlice.reducer;