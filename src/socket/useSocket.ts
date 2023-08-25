import { useEffect, useState, useCallback, useMemo } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addIncommingMessage, setChatUsers } from '../app/chat/chatSlice';


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

        socket?.on('new-message', newMessage => {
            dispatch(addIncommingMessage(newMessage))
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