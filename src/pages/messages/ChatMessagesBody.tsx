import { useAppSelector } from "../../app/hooks";
import { MyMessage } from "./MyMessage";
import { OtherPersonMessage } from "./OtherPersonMessage";


export const ChatMessagesBody = () => {

    const { messages } = useAppSelector(state => state.chat);
    const { user_data } = useAppSelector(state => state.auth);
    
    return (
        <div className="flex flex-row justify-start h-full" >
            <div className="chat-body p-4 flex-1 h-full" >
                {
                    // check if I sent the current message (or if this the others person message)
                    messages.map((message, idx) => (
                        
                        message.from === user_data?.id
                        ?  <MyMessage key={ idx } message={ message } />
                        :  <OtherPersonMessage key={ idx } message={ message }  />
                    ))
                }
               
            </div>
        </div>
    )
}
