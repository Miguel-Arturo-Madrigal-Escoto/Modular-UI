import { createSlice } from '@reduxjs/toolkit'
import { onSocialLogin, onLogout, onRegister, onRegisterActivate, onLogin } from './thunks';

export interface AuthState {
  access: string | null;
  refresh: string | null;
  user: string | null;
  error?: string | null;
  success?: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  access: sessionStorage.getItem('access'),
  refresh: sessionStorage.getItem('refresh'),
  user: sessionStorage.getItem('user'),
  error: null,
  success: null,
  loading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSuccess: (state) => {
        return {
          ...state,
          success: null
        }
    }
  },
  extraReducers(builder) {
      // when onLogin starts
      builder.addCase(onSocialLogin.pending, (state) => {
        return {
          ...state,
          loading: true
        }
      })

      // when onLogin ends successfully
      builder.addCase(onSocialLogin.fulfilled, (state, { payload }) => {
        return {
          ...state,
          access: payload.access,
          refresh: payload.refresh,
          user: payload.user,
          loading: false
        }
      }),

      // when onLogin ends with an error
      builder.addCase(onSocialLogin.rejected, (state) => {
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

      // when onRegister ends successfully
      builder.addCase(onRegister.pending, (state) => {
          return {
            ...state,
            loading: true
          }
      })
      
      // when onRegister starts
      builder.addCase(onRegister.fulfilled, (state) => {
        return {
          ...state,
          loading: false,
          success: 'Registro exitoso, Por favor, verifica tu correo.'
        }
      })

      builder.addCase(onRegisterActivate.pending, (state) => {
        return {
          ...state,
          loading: true
        }
      })

      builder.addCase(onRegisterActivate.fulfilled, (state) => {
        return {
          ...state,
          loading: false,
          success: 'Verificación completada.'
        }
      })

      builder.addCase(onRegisterActivate.rejected, (state) => {
        return {
          ...state,
          loading: false,
          error: 'El token ha expirado y/o es inválido.'
        }
      })

      builder.addCase(onLogin.pending, (state) => {
        return {
          ...state,
          loading: true
        }
      })

      builder.addCase(onLogin.fulfilled, (state, { payload }) => {
          return {
            ...state,
            access: payload.access,
            refresh: payload.refresh,
            user: payload.user,
            loading: false
          }
      })


      
  },
})

export const { clearSuccess } = authSlice.actions;

export default authSlice.reducer;