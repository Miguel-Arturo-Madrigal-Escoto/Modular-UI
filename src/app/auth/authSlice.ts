import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { onLogin } from './thunks';

export interface AuthState {
  access: string | null;
  refresh: string | null;
  user: string | null;
  error?: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  access: null,
  refresh: null,
  user: null,
  error: null,
  loading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogout: () => {
        return initialState;
    }
  },
  extraReducers(builder) {
      // when onLogin starts
      builder.addCase(onLogin.pending, (state) => {
        return {
          ...state,
          loading: true
        }
      })

      // when onLogin ends successfully
      builder.addCase(onLogin.fulfilled, (state, { payload }) => {
        return {
          ...state,
          access: payload.access,
          refresh: payload.refresh,
          user: payload.user,
          loading: false
        }
      }),
      // when onLogin ends with an error
      builder.addCase(onLogin.rejected, (state) => {
        return {
          ...state,
          error: `El usuario y/o correo ya están en uso.`,
          loading: false
        }
      })
  },
})

// Action creators are generated for each case reducer function
export const { onLogout } = authSlice.actions;

export default authSlice.reducer;