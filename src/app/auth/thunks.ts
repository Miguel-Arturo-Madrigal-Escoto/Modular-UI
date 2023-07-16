import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios_base } from '../../api/axios_base';
import { IJWTRefreshSuccess, ILoginSuccess, IRegisterSuccess, ISocialLoginSuccess } from '../../pages/auth/types/interfaces';
import { IOnRegister, ISocialOnLogin, IOnRegisterActivate, IOnLogin, IOnRefreshJWT, IOnCreateProfile } from '../types/interfaces';
import { AxiosError } from 'axios';
import { setErrors } from './authSlice';
import { toast } from 'react-toastify';
import { errorNotification, successNotification } from '../../components/common/Alerts';


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
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onRefreshJWT = createAsyncThunk(
    'auth/onRefreshJWT',
    async (data: IOnRefreshJWT,  { dispatch }) => {
        try {
            const resp = await axios_base.post<IJWTRefreshSuccess>(`auth/jwt/refresh`, data);
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onCreateProfile = createAsyncThunk(
    'auth/onCreateProfile',
    async ({ option, data }: IOnCreateProfile,  { dispatch }) => {
        try {
            const resp = await axios_base.post(`auth/${ option }/`, data);
            successNotification('Perfil creado con éxito.');
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            errorNotification('Verifique los campos del formulario. ');
            throw new Error(`${err.response?.data}`)
        }
    }
)