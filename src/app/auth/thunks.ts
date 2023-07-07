import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios_base } from '../../api/axios_base';
import { ISocialLoginSuccess } from '../../pages/auth/types/interfaces';
import { IOnLogin } from '../types/interfaces';

export const onLogin = createAsyncThunk(
    'auth/onLogin',
    async ({ provider, params }: IOnLogin) => {
        try {
            const resp = await axios_base.get<ISocialLoginSuccess>(`auth/oauth2/${provider}/`, { params });
            return resp.data;   
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