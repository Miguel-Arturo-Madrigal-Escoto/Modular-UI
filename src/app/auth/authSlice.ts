import { createSlice } from '@reduxjs/toolkit'
import { onSocialLogin, onLogout, onRegister, onRegisterActivate, onLogin, onRefreshJWT, onCreateProfile } from './thunks';

export interface AuthState {
  access: string | null;
  refresh: string | null;
  user: string | null;
  errors: any;
  loading: boolean;
}

export const initialState: AuthState = {
  access: sessionStorage.getItem('access'),
  refresh: sessionStorage.getItem('refresh'),
  user: sessionStorage.getItem('user'),
  errors: {},
  loading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrors: (state) => {
        return {
          ...state,
          errors: {}
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
      // when onLogin starts
      builder.addCase(onSocialLogin.pending, (state) => {
        return {
          ...state,
          loading: true,
          errors: {},
        }
      })

      // when onLogin ends successfully
      builder.addCase(onSocialLogin.fulfilled, (state, { payload }) => {
        return {
          ...state,
          access: payload!.access,
          refresh: payload!.refresh,
          user: payload!.user,
          loading: false
        }
      }),

      // when onLogin ends with an error
      builder.addCase(onSocialLogin.rejected, (state) => {
        return {
          ...state,
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
            loading: false
          }
      })

      // when onRegister ends successfully
      builder.addCase(onRegister.pending, (state) => {
          return {
            ...state,
            loading: true,
            errors: {},
          }
      })
      
      // when onRegister starts
      builder.addCase(onRegister.fulfilled, (state) => {
        return {
          ...state,
          loading: false,
        }
      })
      
      // when onRegister ends with an error
      builder.addCase(onRegister.rejected, (state) => {

        return {
          ...state,
          loading: false,
        }
      })

      builder.addCase(onRegisterActivate.pending, (state) => {
        return {
          ...state,
          loading: true,
          errors: {},
        }
      })

      builder.addCase(onRegisterActivate.fulfilled, (state) => {
        return {
          ...state,
          loading: false,
        }
      })

      builder.addCase(onRegisterActivate.rejected, (state) => {
        return {
          ...state,
          loading: false,
        }
      })

      builder.addCase(onLogin.pending, (state) => {
        return {
          ...state,
          loading: true,
          errors: {},
        }
      })

      builder.addCase(onLogin.fulfilled, (state, { payload }) => {
          return {
            ...state,
            access: payload!.access,
            refresh: payload!.refresh,
            user: payload!.user,
            loading: false
          }
      })

      builder.addCase(onLogin.rejected, (state) => {
          return {
            ...state,
            loading: false,
          }
      })

      builder.addCase(onRefreshJWT.pending, (state) => {
          return {
            ...state,
            loading: true,
            errors: {},
          }
      })

      builder.addCase(onRefreshJWT.fulfilled, (state, { payload }) => {
          return {
            ...state,
            loading: false,
            access: payload!.access
          }
      })

      builder.addCase(onRefreshJWT.rejected, (state) => {
        return {
          ...state,
          access: null,
          refresh: null,
          user: null,
          loading: false,
        }
      })

      builder.addCase(onCreateProfile.pending, (state) => {
        return {
          ...state,
          loading: true,
          errors: {},
        }
      })

      builder.addCase(onCreateProfile.fulfilled, (state) => {
        return {
          ...state,
          loading: false,
        }
      })  

      builder.addCase(onCreateProfile.rejected, (state) => {
        return {
          ...state,
          loading: false,
        }
      })
  
  },
})

export const { clearErrors, setErrors } = authSlice.actions;

export default authSlice.reducer;