import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios_base } from '../../api/axios_base';
import { ILoginSuccess, IRegisterSuccess, ISocialLoginSuccess } from '../../pages/auth/types/interfaces';
import { IOnRegister, ISocialOnLogin, IOnRegisterActivate, IOnLogin } from '../types/interfaces';

export const onSocialLogin = createAsyncThunk(
    'auth/onSocialLogin',
    async ({ provider, params }: ISocialOnLogin) => {
        try {
            const resp = await axios_base.get<ISocialLoginSuccess>(`auth/oauth2/${provider}/`, { params });
            return resp.data;   
        } catch (error) {
            throw new Error(`${ error }`);
        }
    }
)

export const onLogin = createAsyncThunk(
    'auth/onLogin',
    async (credentials: IOnLogin) => {
        try {
            const resp = await axios_base.post<ILoginSuccess>(`auth/jwt/create`, credentials);
            return {
                access: resp.data.access,
                refresh: resp.data.refresh,
                user: credentials.email
            };   
        } catch (error) {
            throw new Error(`${ error }`);
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
    async (data: IOnRegister) => {
        try {
            const resp = await axios_base.post<IRegisterSuccess>(`auth/users/`, data);
            return resp.data;   
        } catch (error) {
            throw new Error(`${ error }`);
        }
    }
)

export const onRegisterActivate = createAsyncThunk(
    'auth/onRegister/activate',
    async (data: IOnRegisterActivate) => {
        try {
            const resp = await axios_base.post(`auth/users/activation/`, data);
            return resp.data;   
        } catch (error) {
            throw new Error(`${ error }`);
        }
    }
)