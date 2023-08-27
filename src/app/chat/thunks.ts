import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrors } from './chatSlice';
import { AxiosError } from 'axios';
import { axios_base } from '../../api/axios_base';
import { IUserProfile, IFindByBaseUser, IMessageMatchHistory, IBaseUserMatches, ICompanyProfile, IMessageMatch } from '../types/interfaces';
import { RootState } from '../store';
import { axios_socket } from '../../api/axios_socket';
import { neutralNotification } from '../../components/common/Alerts';
import { scrollToBottomAnimated } from '../../utils/scrollToBottom';

export const onGetUserDataSocket = createAsyncThunk(
    'chat/onGetUserDataSocket',
    async (data: IFindByBaseUser,  { dispatch }) => {
        try {
            const resp = await axios_base.get<IUserProfile[] | ICompanyProfile[]>(`auth/${ data.role }/`, {
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
    'chat/onLoadUserMessagesHistory',
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

export const onGetBaseUserMatches = createAsyncThunk(
    'chat/onGetBaseUserMatches',
    async (role: 'user' | 'company',  { dispatch, getState }) => {
        try {    
            const { auth } = getState() as RootState;
            const resp = await axios_base.get<IBaseUserMatches>(`match/retrieve_${ role }_matches/`, {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });
            return resp.data.matches;      
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
            neutralNotification('Has recibido un nuevo mensaje 👾');
        }
        scrollToBottomAnimated('messages');
    }
)