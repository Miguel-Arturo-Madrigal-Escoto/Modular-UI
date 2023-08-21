import { createSlice } from '@reduxjs/toolkit'
import { IMessageMatch, IUserMatch, IUserProfile } from '../types/interfaces';
import { onLoadUserMessagesHistory } from './thunks';

interface ChatInitialState {
    errors: any;
    activeUserChat: number | null;
    activeUserChatData: IUserProfile | null;
    usersMatch: IUserMatch[];
    messages: IMessageMatch[];
}

const initialState: ChatInitialState = {
    errors: {},
    activeUserChat: null,
    activeUserChatData: null,
    usersMatch: [],
    messages: [],
}

const chatSlice = createSlice({
    name: 'chat',
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
        },
        setUsersMatch: (state, { payload }) => {
            return {
                ...state,
                usersMatch: payload
            }
        },
        setActiveUserChat: (state, { payload }) => {
            return {
                ...state,
                activeUserChat: payload, // base_user id
                messages: payload === state.activeUserChat ? state.messages : []
            }
        },
        setActiveUserChatData: (state, { payload }) => {
            return {
                ...state,
                activeUserChatData: payload,
            }
        },
        addIncommingMessage: (state, { payload }) => {
            if(state.activeUserChat === payload.from || state.activeUserChat === payload.to){
                return {
                    ...state,
                    messages: [...state.messages, payload]
                }
            }
            else{
                return state;
            }
        }
    },
    extraReducers(builder) {

        builder.addCase(onLoadUserMessagesHistory.pending, (state) => {
            return {
                ...state,
                errors: {},
            }
        })

        builder.addCase(onLoadUserMessagesHistory.fulfilled, (state, { payload }) => {
            return {
                ...state,
                errors: {},
                messages: payload.messages
            }
        })

    },
})

export const { clearErrors, setErrors, setUsersMatch, setActiveUserChat, setActiveUserChatData, addIncommingMessage } = chatSlice.actions;

export default chatSlice.reducer