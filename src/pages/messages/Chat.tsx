import { ChatMessagesBody } from "./ChatMessagesBody";
import { HeaderPersonChat } from "./HeaderPersonChat";
import { NewMessage } from "./NewMessage";

export default function Chat() {


    return (
        <>
            <section className="flex flex-col flex-auto border-l ">
                {/* Header con quién es el chat */}
                <HeaderPersonChat />
                {/* fin header con quién es el chat */}

                <div className="chat-body p-4 flex-1 overflow-y-scroll" id="messages">
                    <ChatMessagesBody />                          
                </div>

                {/* Footer chat */}
                <NewMessage />
                {/* End footer chat */}
            </section>
        </>
  )
}
