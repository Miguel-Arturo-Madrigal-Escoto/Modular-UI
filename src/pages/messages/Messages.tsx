
import { useEffect } from 'react'
import {  useAppDispatch, useAppSelector } from '../../app/hooks'
import '../../styles/messages.css'
import Chat from './Chat'
import SideBarChat from './SideBarChat'
import { onGetUserDataSocket, onLoadUserMessagesHistory } from '../../app/chat/thunks'
import { setActiveUserChatData } from '../../app/chat/chatSlice'
import { NotActiveUser } from './NotActiveUser'
import { scrollToBottom } from '../../utils/scrollToBottom'
import { onRetrieveCompanyMatchesList, onRetrieveUserMatchesList } from '../../app/match/thunks'
import { EmptyTemplate } from '../templates/EmptyTemplate'


export const Messages = () => {

    const { activeUserChat, chatUsers } = useAppSelector(state => state.chat);
    const { access, user_data } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const onGetUserChat = async() => {
            if (activeUserChat){
                dispatch(onLoadUserMessagesHistory())
                const data = await dispatch(onGetUserDataSocket({ 
                    base_user: activeUserChat ,
                    role: chatUsers.find(chatUser => chatUser.base_user === activeUserChat)!.role
                })).unwrap();
                dispatch(setActiveUserChatData(data)); 
                scrollToBottom('messages');
            }
        }
        onGetUserChat();

    }, [activeUserChat])

    useEffect(() => {
        if (access && user_data?.user || user_data?.company){
            if (user_data.user) dispatch(onRetrieveUserMatchesList());
            else dispatch(onRetrieveCompanyMatchesList());
        }

    }, [access]);

    return (
        <>
            <div className="w-full flex antialiased bg-white overflow-hidden" style={{ height: '90vh' }}>
                <div className="flex-1 flex flex-col">
                    <main className="flex-grow flex flex-row min-h-0">
                        <SideBarChat />
                        
                        { chatUsers.length > 0 ? activeUserChat ? <Chat /> : <NotActiveUser /> : <EmptyTemplate scope={'mensajes'}/> }
                                          
                    </main>
                </div>
            </div>
        </>
    )
}
