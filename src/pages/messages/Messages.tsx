import { useAppSelector } from '../../app/hooks'
import '../../styles/messages.css'
import Chat from './Chat'
import SideBarChat from './SideBarChat'

export const Messages = () => {

    const { activeUserChat } = useAppSelector(state => state.chat);

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
