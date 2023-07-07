import { createSlice } from '@reduxjs/toolkit'
import { onLogin, onLogout } from './thunks';

export interface AuthState {
  access: string | null;
  refresh: string | null;
  user: string | null;
  error?: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  access: sessionStorage.getItem('access'),
  refresh: sessionStorage.getItem('refresh'),
  user: sessionStorage.getItem('user'),
  error: null,
  loading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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

      // when onLogout ends successfully
      builder.addCase(onLogout.fulfilled, () => {
          return {
            access: null,
            refresh: null,
            user: null,
            error: null,
            loading: false
          }
      })
  },
})


export default authSlice.reducer;