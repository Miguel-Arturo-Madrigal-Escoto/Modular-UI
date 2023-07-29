import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface Role {
    id: string;
    position: string;
    description: string;
}

export interface RolesState {
    roles: Role[];
}

export const initialState: RolesState = {
    roles: []
}

export const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        addRole: (state, { payload }: PayloadAction<Role>) => {
            return {
                ...state,
                roles: [...state.roles, payload]
            }
        },
        removeRole: (state, { payload }: PayloadAction<string>) => {
            return {
                ...state,
                roles: state.roles.filter(role => role.id !== payload)
            }
        },
        editRole: (state, { payload }: PayloadAction<Role>) => {
            return {
                ...state,
                roles: state.roles.map(role => role.id === payload.id ? payload : role)
            }
        },
    },
})

export const { addRole, removeRole, editRole } = rolesSlice.actions;

export default rolesSlice.reducer;