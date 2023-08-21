import { useEffect, useState, useCallback, useMemo, Children } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addIncommingMessage, setUsersMatch } from '../app/chat/chatSlice';


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
        [ serverPath ]
    );
    const dispatch = useAppDispatch();

    const [online, setOnline] = useState(false);

    const socketConnect = useCallback(
        () => {
            if (access){
                socket.connect();
            }
        },
        [serverPath, access],
    );

    const socketDisconnect = useCallback(
        () => {
            socket?.disconnect();
        },
        [socket],
    )


    useEffect(() => {
        socket?.on('connect', () => setOnline(true));

        socket?.on('disconnect', () => setOnline(false));

        socket?.on('new-message', newMessage => {
            dispatch(addIncommingMessage(newMessage))
        })

        socket?.on('user-list', userList => {
            dispatch(setUsersMatch(userList));
        })
    }, [socket]);

    return {
        socket,
        online,
        socketConnect,
        socketDisconnect
    }
}