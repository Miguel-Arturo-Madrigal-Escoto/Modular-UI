import { useContext } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { INewMessageInput } from "./types/interfaces";
import { SocketContext } from '../../context/SocketContext';
import { useAppSelector } from '../../app/hooks';


export const NewMessage = () => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm<INewMessageInput>();

    const { socket } = useContext(SocketContext);
    const { user_data } = useAppSelector(state => state.auth);
    const { activeUserChat } = useAppSelector(state => state.chat);

    const onSubmit: SubmitHandler<INewMessageInput> = async data => {
        if (!data.newMessage) return;

        try {
            socket?.emit('new-message', {
                from: user_data?.id,
                to: activeUserChat,
                text: data.newMessage
            });
            reset({
                newMessage: ''
            });
        } catch (error) {
            
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="chat-footer flex-none">
                <div className="flex flex-row items-center p-4">
                    <div className="relative flex-grow">
                        <label>
                            <input className="rounded-full py-2 pl-3 pr-10 w-full border border border-gray-800 focus:border-gray-700 bg-gray-100  focus:outline-none focus:shadow-md transition duration-300 ease-in"
                                type="text" placeholder="Nuevo mensaje" {...register('newMessage')} />
                        </label>
                    </div>
                    <button type="submit" className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6">
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 0l20 10L0 20V0zm0 8v4l10-2L0 8z"/></svg>
                    </button>
                </div>
            </div>
        </form>
    )
}
