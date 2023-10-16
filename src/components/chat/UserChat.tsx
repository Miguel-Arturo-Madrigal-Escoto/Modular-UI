
import { FC, useState, useEffect } from 'react';
import { ICompanyProfile, IUserMatch, IUserProfile } from '../../app/types/interfaces'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onGetUserDataSocket, onLoadUserMessagesHistory } from '../../app/chat/thunks';
import { defaultImageProfile } from '../common/constants';
import { setActiveUserChat, setActiveUserChatData } from '../../app/chat/chatSlice';
import { scrollToBottom } from '../../utils/scrollToBottom';

interface Props {
    user: IUserMatch
}

export const UserChat: FC<Props> = ({ user }) => {
  
    const [userData, setUserData] = useState<IUserProfile | ICompanyProfile>();
    const dispatch = useAppDispatch();
    const { activeUserChat } = useAppSelector(state => state.chat);

    useEffect(() => {
        const onGetUserData = async () => {
            const data = await dispatch(onGetUserDataSocket({ 
                base_user: user.base_user,
                role: user.role 
            })).unwrap();
            setUserData(data);
        }
        onGetUserData();

    }, [user]);


    const setActiveUser = async () => {
        const prevActiveUserChat = activeUserChat;
        dispatch(setActiveUserChat(user.base_user));

        //if active user changes, fetch again the data for the base user
        if (prevActiveUserChat !== user.base_user){
            const data = await dispatch(onGetUserDataSocket({ 
                base_user: user.base_user,
                role: user.role
            })).unwrap();
            dispatch(setActiveUserChatData(data));  

            // Load the messages history between the users (authenticated & active)
            dispatch(onLoadUserMessagesHistory());

            scrollToBottom('messages');
        }
    }

    return(
        <div className={`flex justify-between items-center p-3 hover:bg-gray-300 rounded-lg relative border-none ${ activeUserChat == user.base_user && 'bg-gray-300' }`} onClick={ setActiveUser  }>
            <div className="w-16 h-16 relative flex flex-shrink-0">
                <img className="shadow-md rounded-full w-full h-full object-cover"
                    src={ userData?.image || defaultImageProfile }
                    alt=""
                />
                {/* SIMBOLO EN LINEA */}
                <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                    {
                        user.online
                        ? <div className="bg-green-500 rounded-full w-3 h-3"></div>
                        : <div className="bg-red-500 rounded-full w-3 h-3"></div>
                    }
                </div>
            </div>
            <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                <p className="font-bold">{ userData?.name }</p>
                <div className="flex items-center text-sm font-bold">
                    {/* <div className="min-w-0">
                        <p className="truncate">Hey, Are you there?</p>
                    </div>
                    <p className="ml-2 whitespace-no-wrap">10min</p> */}
                </div>
            </div>
            <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block"></div>
        </div>
    )
}
