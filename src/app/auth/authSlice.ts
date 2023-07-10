import { createSlice } from '@reduxjs/toolkit'
import { onSocialLogin, onLogout, onRegister, onRegisterActivate, onLogin } from './thunks';

export interface AuthState {
  access: string | null;
  refresh: string | null;
  user: string | null;
  errors: any;
  success: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  access: sessionStorage.getItem('access'),
  refresh: sessionStorage.getItem('refresh'),
  user: sessionStorage.getItem('user'),
  errors: {},
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
    },
    clearErrors: (state) => {
        return {
          ...state,
          errors: {}
        }
    },
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
      builder.addCase(onSocialLogin.rejected, (state, { payload }) => {
        return {
          ...state,
          errors: payload,
          loading: false
        }
      })

      // when onLogout ends successfully
      builder.addCase(onLogout.fulfilled, () => {
          return {
            access: null,
            refresh: null,
            user: null,
            errors: {},
            success: null,
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
      
      // when onRegister ends with an error
      builder.addCase(onRegister.rejected, (state, { payload }) => {

        return {
          ...state,
          loading: false,
          errors: payload
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
          success: 'Cuenta verificada con éxito.'
        }
      })

      builder.addCase(onRegisterActivate.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          errors: payload
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

      builder.addCase(onLogin.rejected, (state, { payload }) => {
          return {
            ...state,
            loading: false,
            errors: payload
          }
      })
  
  },
})

export const { clearSuccess, clearErrors } = authSlice.actions;

export default authSlice.reducer;