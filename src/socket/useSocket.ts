import { useEffect, useState, useMemo } from 'react';
import io from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addIncommingMessage, setChatUsers } from '../app/chat/chatSlice';
import { IMessageMatch } from '../app/types/interfaces';
import { onDisplayNewMessageNotification } from '../app/chat/thunks';
import { scrollToBottomAnimated } from '../utils/scrollToBottom';


export const useSocket = (serverPath: string) => {
    const { access } = useAppSelector(state => state.auth);

    const socket = useMemo(
        () => io( 
            serverPath, 
            {
                transports: ['websocket'],
                autoConnect: false,
                forceNew: true,
                query: {
                    'auth-token': access
                }
            } 
        ), 
        [ access ]
    );
    const dispatch = useAppDispatch();

    const [online, setOnline] = useState(false);

    useEffect(() => {
        socket?.on('connect', () => {
            setOnline(true)
        });

        socket?.on('disconnect', () => {
            setOnline(false)
        });

        socket?.on('new-message', (newMessage: IMessageMatch) => {
            dispatch(addIncommingMessage(newMessage))

            // display new message notification        
            dispatch(onDisplayNewMessageNotification(newMessage))

            scrollToBottomAnimated('messages');
        })

        socket?.on('user-list', userList => {
            dispatch(setChatUsers(userList));
        })
    }, [socket]);

    return {
        socket,
        online,
    }
}