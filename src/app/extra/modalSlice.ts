import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
    openProfileModal: boolean;
    openRolesModal: boolean;
}

export const initialState: ModalState = {
    openProfileModal: false,
    openRolesModal: false,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalOpenProfile: (state) => {
            return {
                ...state,
                openProfileModal: true
            }
        },
        setModalClosedProfile: (state) => {
            return {
                ...state,
                openProfileModal: false
            }
        },
        setModalOpenRoles: (state) => {
            return {
                ...state,
                openRolesModal: true
            }
        },
        setModalClosedRoles: (state) => {
            return {
                ...state,
                openRolesModal: false
            }
        }
    },
})

export const { setModalOpenProfile, setModalClosedProfile, setModalOpenRoles, setModalClosedRoles } = modalSlice.actions;

export default modalSlice.reducer;