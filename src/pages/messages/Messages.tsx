
import { useEffect } from 'react'
import {  useAppDispatch, useAppSelector } from '../../app/hooks'
import '../../styles/messages.css'
import Chat from './Chat'
import SideBarChat from './SideBarChat'
import { onGetUserDataSocket, onLoadUserMessagesHistory } from '../../app/chat/thunks'
import { setActiveUserChatData } from '../../app/chat/chatSlice'


export const Messages = () => {

    const { activeUserChat } = useAppSelector(state => state.chat);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const onGetUserChat = async() => {
            if (activeUserChat){
                dispatch(onLoadUserMessagesHistory())
                const data = await dispatch(onGetUserDataSocket({ base_user: activeUserChat })).unwrap();
                dispatch(setActiveUserChatData(data)); 
            }
        }
        onGetUserChat();

    }, [activeUserChat])

    return (
        <>
            <div className="h-screen w-full flex antialiased bg-white overflow-hidden">
                <div className="flex-1 flex flex-col">
                    <main className="flex-grow flex flex-row min-h-0">
                        <SideBarChat />
                        
                        { activeUserChat ? <Chat /> : <p>Selecciona un usuario</p> }
                                          
                    </main>
                </div>
            </div>
        </>
    )
}
