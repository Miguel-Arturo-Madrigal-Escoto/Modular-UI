import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios_base } from '../../api/axios_base';
import { ICurrentUser, IJWTRefreshSuccess, ILoginSuccess, IRegisterSuccess, ISocialLoginSuccess } from '../../pages/auth/types/interfaces';
import { IOnRegister, ISocialOnLogin, IOnRegisterActivate, IOnLogin, IOnRefreshJWT, IOnCreateProfile, IOnUpdateProfile, IOnGetCurrentUserData } from '../types/interfaces';
import { AxiosError } from 'axios';
import { setErrors } from './authSlice';
import { errorNotification, successNotification } from '../../components/common/Alerts';
import { RootState } from '../store';


export const onSocialLogin = createAsyncThunk(
    'auth/onSocialLogin',
    async ({ provider, params }: ISocialOnLogin,  { dispatch }) => {
        try {
            const resp = await axios_base.get<ISocialLoginSuccess>(`auth/oauth2/${provider}/`, { params });
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onLogin = createAsyncThunk(
    'auth/onLogin',
    async (credentials: IOnLogin, { dispatch }) => {
        try {
            const resp = await axios_base.post<ILoginSuccess>(`auth/jwt/create`, credentials);
            return {
                access: resp.data.access,
                refresh: resp.data.refresh,
                user: credentials.email
            };   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onLogout = createAsyncThunk(
    'auth/onLogout',
    async () => {
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
        sessionStorage.removeItem('user');
    }
)

export const onRegister = createAsyncThunk(
    'auth/onRegister',
    async (data: IOnRegister, { dispatch }) => {
        try {
            const resp = await axios_base.post<IRegisterSuccess>(`auth/users/`, data);
            successNotification('Perfil creado con éxito. Por favor, verifica tu cuenta en tu correo electrónico.');
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onRegisterActivate = createAsyncThunk(
    'auth/onRegister/activate',
    async (data: IOnRegisterActivate,  { dispatch }) => {
        try {
            const resp = await axios_base.post(`auth/users/activation/`, data);
            successNotification('Cuenta verificada con éxito.');
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            errorNotification('Enlace de verificación inválido y/o expirado.');
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onRefreshJWT = createAsyncThunk(
    'auth/onRefreshJWT',
    async (data: IOnRefreshJWT,  { dispatch, getState }) => {
        try {
            // check if refresh JWT is valid and refresh token (new access JWT)
            const resp = await axios_base.post<IJWTRefreshSuccess>(`auth/jwt/refresh`, data);

            // check if access JWT is still valid
            // const { auth } = getState() as RootState;
            // await axios_base.post('auth/jwt/verify', { token: auth.access })

            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            dispatch(onLogout());
            errorNotification('La sesión es inválida o ha expirado.');
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onCreateProfile = createAsyncThunk(
    'auth/onCreateProfile',
    async ({ option, data }: IOnCreateProfile,  { dispatch }) => {
        try {
            const resp = await axios_base.post(`auth/${ option }/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            successNotification('Perfil creado con éxito.');
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            errorNotification('Verifique los campos del formulario.');
            throw new Error(`${err.response?.data}`)
        }
    }
)


export const onUpdateProfile = createAsyncThunk(
    `auth/onUpdateProfile`,
    async({ option, data, id }: IOnUpdateProfile, { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.patch(`/auth/${ option }/${ id }/`, data, {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });
            successNotification('Perfil actualizado correctamente.');
            return resp.data;

        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            errorNotification('Verifique los campos del formulario.');
            throw new Error(`${err.response?.data}`)

        }
    }
)

export const onGetCurrentUserData = createAsyncThunk(
    'auth/onGetCurrentUserData',
    async ({ access }: IOnGetCurrentUserData,  { dispatch }) => {
        try {
            const resp = await axios_base.get<ICurrentUser>('auth/users/me/', {
                headers: {
                    Authorization: `JWT ${access}`
                }
            });
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)
