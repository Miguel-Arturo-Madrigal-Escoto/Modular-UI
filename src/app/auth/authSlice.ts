import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  access: string | null;
  refresh: string | null;
  user: string | null;
}

const initialState: AuthState = {
  access: null,
  refresh: null,
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state = action.payload
    },
    logout: (state) => {
        state = {
            access: null,
            refresh: null,
            user: null
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;