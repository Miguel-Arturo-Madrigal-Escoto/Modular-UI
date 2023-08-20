import '../../styles/messages.css'
import Chat from './Chat'
import SideBarChat from './SideBarChat'

export const Messages = () => {
    return (
        <>
            <div className="h-screen w-full flex antialiased bg-white overflow-hidden">
                <div className="flex-1 flex flex-col">
                    <main className="flex-grow flex flex-row min-h-0">
                        
                        {SideBarChat()}

                        {Chat()}
                        
                    </main>
                </div>
            </div>
        </>
    )
}
