
import { UserChatList } from '../../components/chat/UserChatList'
import { SearchChat } from './SearchChat'

export default function SideBarChat() {
    return (
        <>
            <section className="flex flex-col flex-none overflow-auto w-24 hover:w-100 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
                <div className="header p-4 flex flex-row justify-between items-center flex-none">
                    <p className="text-md font-bold hidden md:block group-hover:block">Mis mensajes</p>
                </div>
                <div className="search-box p-4 flex-none">
                    <SearchChat />
                </div>
                
                <div className="contacts p-2 flex-1 overflow-y-scroll">
                    {/* List of users  */}          
                    <UserChatList />               
                </div>
            </section>
        </>
  )
}
