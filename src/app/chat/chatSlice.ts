import { createSlice } from '@reduxjs/toolkit'
import { ICompanyProfile, IMessageMatch, IUserMatch, IUserProfile } from '../types/interfaces';
import { onGetBaseUserMatches, onLoadUserMessagesHistory } from './thunks';

interface ChatInitialState {
    errors: any;
    activeUserChat: number | null;
    activeUserChatData: IUserProfile | ICompanyProfile | null;
    chatUsers: IUserMatch[];
    matchedUsers: number[];
    messages: IMessageMatch[];
}

const initialState: ChatInitialState = {
    errors: {},
    activeUserChat: null,
    activeUserChatData: null,
    chatUsers: [],
    matchedUsers: [],
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
        setChatUsers: (state, { payload }) => {
            return {
                ...state,
                chatUsers: payload
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
        },
        clearChatSlice: () => {
            return initialState;
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

        builder.addCase(onGetBaseUserMatches.fulfilled, (state, { payload }) => {
            return {
                ...state,
                errors: {},
                matchedUsers: payload
            }
        })

    },
})

export const { clearErrors, setErrors, setChatUsers, setActiveUserChat, setActiveUserChatData, addIncommingMessage, clearChatSlice } = chatSlice.actions;

export default chatSlice.reducer