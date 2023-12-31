import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrors } from './chatSlice';
import { AxiosError } from 'axios';
import { axios_base } from '../../api/axios_base';
import { IUserProfile, IFindByBaseUser, IMessageMatchHistory, ICompanyProfile, IMessageMatch } from '../types/interfaces';
import { RootState } from '../store';
import { axios_socket } from '../../api/axios_socket';
import { neutralNotification } from '../../components/common/Alerts';

export const onGetUserDataSocket = createAsyncThunk(
    'chat/onGetUserDataSocket',
    async (data: IFindByBaseUser,  { dispatch }) => {
        try {
            const resp = await axios_base.get<IUserProfile[] | ICompanyProfile[]>(`auth/${ data.role }/`, {
                params: {
                    base_user: data.base_user
                }
            });
            // users/companies (depending on data.role)
            const users = resp.data.map(usr => ({
                ...usr,
                image: usr.image ? import.meta.env.VITE_CLOUDINARY_URL + usr.image : null
            }))
            return users[0];  
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onLoadUserMessagesHistory = createAsyncThunk(
    'chat/onLoadUserMessagesHistory',
    async (_ = undefined,  { dispatch, getState }) => {
        try {    
            const { auth, chat } = getState() as RootState;
            const resp = await axios_socket.get<IMessageMatchHistory>(`/api/messages/${chat.activeUserChat}`, {
                headers: {
                    Authorization: `${ auth.access }`
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

export const onDisplayNewMessageNotification = createAsyncThunk(
    'chat/onDisplayNewMessageNotification',
    async (data: IMessageMatch,  { getState }) => {
        const { auth } = getState() as RootState;
        if (auth.user_data?.id !== data.from){
            neutralNotification(`Has recibido un nuevo mensaje de ${ data.name }👾`);
        }
    }
)