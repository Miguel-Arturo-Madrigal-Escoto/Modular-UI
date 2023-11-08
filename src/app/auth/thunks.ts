import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios_base } from '../../api/axios_base';
import { IOnRegister, ISocialOnLogin, IOnRegisterActivate, IOnLogin, IOnRefreshJWT, IOnCreateProfile, IOnUpdateProfile, IOnGetCurrentUserData, IOnUpdateProfilePicture, ISocialLoginSuccess, ILoginSuccess, IRegisterSuccess, IJWTRefreshSuccess, ICurrentUser } from '../types/interfaces';
import { AxiosError } from 'axios';
import { setErrors } from './authSlice';
import { errorNotification, successNotification } from '../../components/common/Alerts';
import { RootState } from '../store';
import { axios_socket } from '../../api/axios_socket';
import { clearChatSlice } from '../chat/chatSlice';
import { clearFormSlice } from '../form/formSlice';
import { clearMatchSlice } from '../match/matchSlice';
import { clearModalSlice } from '../extra/modalSlice';
import { clearRolesSlice } from '../roles/rolesSlice';


export const onSocialLogin = createAsyncThunk(
    'auth/onSocialLogin',
    async ({ provider, params }: ISocialOnLogin,  { dispatch }) => {
        try {
            const resp = await axios_base.get<ISocialLoginSuccess>(`auth/oauth2/${provider}/`, { params });
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            console.log('err: ', err.response?.data)
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onLogin = createAsyncThunk(
    'auth/onLogin',
    async (credentials: IOnLogin, { dispatch }) => {
        try {
            const resp = await axios_base.post<ILoginSuccess>(`auth/jwt/create/`, credentials);
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
    async (_ = undefined, { dispatch }) => {
        // Clear auth data
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
        sessionStorage.removeItem('user');

        // Clear current recommended user/profile
        localStorage.removeItem('recommendedUser');
        localStorage.removeItem('recommendedCompany');

        // Clear data from all slices (dispatch clearSliceAction)
        dispatch(clearChatSlice());
        dispatch(clearFormSlice());
        dispatch(clearMatchSlice());
        dispatch(clearModalSlice()); 
        dispatch(clearRolesSlice()); 
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
    async ({ refresh }: IOnRefreshJWT,  { dispatch, getState }) => {
        try {
            // check if refresh JWT is valid and refresh token (new access JWT)
            const { auth } = getState() as RootState;
            
            const resp = await axios_base.post<IJWTRefreshSuccess>(`auth/jwt/refresh/`, { refresh }, {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });

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
    async ({ option, data }: IOnCreateProfile,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.post(`auth/${ option }/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await axios_socket.post('/api/auth/sign-up/', { name: data.name, email: auth.user, role: option }, {
                headers: {
                    Authorization: `${ auth.access }`
                }
            })
            successNotification('Perfil creado con éxito.');
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            console.log('err.response?.data', err.response?.data)
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
                    Authorization: `JWT ${ auth.access }` // Django JWT
                }
            });

            // update the user's name in socket server database (MongoDB) by base_user_id (inside JWT access token)
            await axios_socket.patch('/api/auth/user/', { name: data?.name }, {
                headers: {
                    Authorization: `${ auth.access }` // Express (JWT header not required)
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
            if (resp.data.user){
                const profilePic = resp.data.user.image;
                const response: ICurrentUser = {
                    ...resp.data,
                    user: {
                        ...resp.data.user,
                        image: profilePic ? import.meta.env.VITE_CLOUDINARY_URL + profilePic : null
                    }
                }
                return response;
            }
            else if (resp.data.company) {
                const profilePic = resp.data.company.image;
                const response: ICurrentUser = {
                    ...resp.data,
                    company: {
                        ...resp.data.company,
                        image: profilePic ? import.meta.env.VITE_CLOUDINARY_URL + profilePic : null
                    }
                }
                return response;
            }
            return resp.data;

             
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)


export const onUpdateProfilePicture = createAsyncThunk(
    `auth/onUpdateProfilePicture`,
    async({ option, id, image }: IOnUpdateProfilePicture, { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            await axios_base.patch(`/auth/${ option }/${ id }/`, { image }, {
                headers: {
                    Authorization: `JWT ${ auth.access }`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            successNotification('Foto de perfil actualizada correctamente.');
            

        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            errorNotification('Seleccione una imagen válida.');
            throw new Error(`${err.response?.data}`)
        }
    }
)