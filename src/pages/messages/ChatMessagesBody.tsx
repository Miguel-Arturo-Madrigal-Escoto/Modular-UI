import { useAppSelector } from "../../app/hooks";
import { defaultImageProfile } from "../../components/common/constants";
import { MyMessage } from "./MyMessage";
import { OtherPersonMessage } from "./OtherPersonMessage";


export const ChatMessagesBody = () => {

    const { activeUserChatData, messages } = useAppSelector(state => state.chat);
    const { user_data } = useAppSelector(state => state.auth);


    return (
        <div className="flex flex-row justify-start">
            {
                messages.length > 0 && (
                    <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
                        <img className="shadow-md rounded-full w-full h-full object-cover"
                            src={ activeUserChatData?.image || defaultImageProfile }
                            alt=""
                        />
                    </div>
                )
            }
            <div className="chat-body p-4 flex-1 overflow-y-scroll">
                {
                    // check if I sent the current message (or if this the others person message)
                    messages.map((message) => (
                        
                        message.from === user_data?.id
                        ?  <MyMessage key={ message._id } message={ message } />
                        :  <OtherPersonMessage key={ message._id } message={ message }  />
                    ))
                }
               
            </div>
        </div>
    )
}
