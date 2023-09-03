import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
    openProfileModal: boolean;
    openRolesModal: boolean;
    openExperienceModal: boolean;
}

export const initialState: ModalState = {
    openProfileModal: false,
    openRolesModal: false,
    openExperienceModal: false,
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
        },
        setModalOpenExperience: (state) => {
            return {
                ...state,
                openExperienceModal: true
            }
        },
        setModalClosedExperience: (state) => {
            return {
                ...state,
                openExperienceModal: false
            }
        },
        setModalOpenSkill: (state) => {
            return {
                ...state,
                openSkillModal: true
            }
        },
        setModalClosedSkill: (state) => {
            return {
                ...state,
                openSkillModal: false
            }
        },
        clearModalSlice: () => {
            return initialState;
        }
    },
})

export const { setModalOpenProfile, setModalClosedProfile, setModalOpenRoles, setModalClosedRoles, setModalClosedExperience, setModalOpenExperience, setModalOpenSkill, setModalClosedSkill, clearModalSlice } = modalSlice.actions;

export default modalSlice.reducer;