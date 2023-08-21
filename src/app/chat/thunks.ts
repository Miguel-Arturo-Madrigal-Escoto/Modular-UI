import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrors } from './chatSlice';
import { AxiosError } from 'axios';
import { axios_base } from '../../api/axios_base';
import { IUserProfile, IFindByBaseUser, IMessageMatchHistory } from '../types/interfaces';
import { RootState } from '../store';
import { axios_socket } from '../../api/axios_socket';

export const onGetUserDataSocket = createAsyncThunk(
    'chat/onGetUserDataSocket',
    async (data: IFindByBaseUser,  { dispatch }) => {
        try {
            const resp = await axios_base.get<IUserProfile[]>(`auth/user/`, {
                params: {
                    base_user: data.base_user
                }
            });
            return resp.data[0];   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onLoadUserMessagesHistory = createAsyncThunk(
    'chat/onGetUserMessagesHistory',
    async (data = undefined,  { dispatch, getState }) => {
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