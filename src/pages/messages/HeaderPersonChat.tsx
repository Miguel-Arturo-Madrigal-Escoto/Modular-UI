import { useAppSelector } from "../../app/hooks"
import { defaultImageProfile } from "../../components/common/constants";


export const HeaderPersonChat = () => {

    const { activeUserChatData } = useAppSelector(state => state.chat);

    return (
        <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center border-b border-gray-200">
            <div className="flex">
                <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                    <img className="shadow-md rounded-full w-full h-full object-cover"
                        src={ activeUserChatData?.image || defaultImageProfile }
                        alt=""
                    />
                </div>
                <div className="text-sm">
                    <p className="font-bold">{ activeUserChatData?.name }</p>
                    {/* <p>Active 1h ago</p> */}
                </div>
            </div>
            <div className="flex">
                <a href="#" className="block rounded-full w-10 h-10 p-2 ml-4">
                    <svg viewBox="0 0 20 20" className="w-full h-full fill-current text-indigo-500">
                        <path d="M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 Z M9,11 L9,10.5 L9,9 L11,9 L11,15 L9,15 L9,11 Z M9,5 L11,5 L11,7 L9,7 L9,5 Z"/>
                    </svg>
                </a>
            </div>
    </div>
    )
}
