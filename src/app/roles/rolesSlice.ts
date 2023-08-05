import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { onAddCompanyRoles, onGetCompanyRoles } from './thunks';
import { ICompanyRolesById } from '../types/interfaces';


export interface Role {
    id?: string;
    name: string;
    link: string;
    position: string;
    description: string;
}

export interface RolesState {
    roles: Role[];
    errors: any;
    loading: boolean;
    company_roles: ICompanyRolesById[];
}

export const initialState: RolesState = {
    roles: [],
    errors: {},
    loading: false,
    company_roles: []
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
        clearRoles: (state) => {
            return {
                ...state,
                roles: []
            }
        },
        setErrors: (state, { payload }) => {
            return {
              ...state,
              errors: payload
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(onAddCompanyRoles.pending, (state) => {
          return {
            ...state,
            loading: true,
            errors: {},
          }
        })
  
        // 
        builder.addCase(onAddCompanyRoles.fulfilled, (state, { payload }) => {
          return {
            ...state,
            errors: {},
            loading: false
          }
        }),
  
        // 
        builder.addCase(onAddCompanyRoles.rejected, (state) => {
          return {
            ...state,
            loading: false
          }
        })


        builder.addCase(onGetCompanyRoles.pending, (state) => {
            return {
              ...state,
              loading: true,
              errors: {},
            }
          })
    
          // 
          builder.addCase(onGetCompanyRoles.fulfilled, (state, { payload }) => {
            return {
              ...state,
              errors: {},
              loading: false,
              company_roles: payload
            }
          }),
    
          // 
          builder.addCase(onGetCompanyRoles.rejected, (state) => {
            return {
              ...state,
              loading: false
            }
          })
    }
})

export const { addRole, removeRole, editRole, clearRoles, setErrors } = rolesSlice.actions;

export default rolesSlice.reducer;