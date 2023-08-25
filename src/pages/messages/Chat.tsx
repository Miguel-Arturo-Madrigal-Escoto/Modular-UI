import { ChatMessagesBody } from "./ChatMessagesBody";
import { HeaderPersonChat } from "./HeaderPersonChat";
import { NewMessage } from "./NewMessage";

export default function Chat() {


    return (
        <>
            <section className="flex flex-col flex-auto border-l ">
                {/* Header con quién es el chat */}
                <HeaderPersonChat />
                {/* FIN header con quién es el chat */}

                <div className="chat-body p-4 flex-1 overflow-y-scroll">
                    <ChatMessagesBody />                          
                </div>

                {/* FOOTER CHAT */}
                <NewMessage />
                {/* END FOOTER CHAT */}
            </section>
        </>
  )
}
