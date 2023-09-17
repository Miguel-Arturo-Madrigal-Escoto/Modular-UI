import { FC } from 'react'
import { IMessageMatch } from '../../app/types/interfaces';
import { formatMessageDate } from '../../app/helpers/formatMessageDate';
import { defaultImageProfile } from '../../components/common/constants';
import { useAppSelector } from '../../app/hooks';


interface Props {
    message: IMessageMatch;
}

export const OtherPersonMessage: FC<Props> = ({ message }) => {

    const { activeUserChatData } = useAppSelector(state => state.chat);

    return (
        <div className="flex flex-row justify-start mt-4">
            <div className="messages text-sm text-black grid grid-flow-row gap-2">
                <div className="flex items-center group">
                    <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
                        <img className="shadow-md rounded-full w-full h-full object-cover"
                            src={ activeUserChatData?.image || defaultImageProfile }
                            alt=""
                        />
                    </div>
                    <p className="px-6 py-3 rounded-b-full rounded-r-full bg-gray-200 max-w-xs lg:max-w-md">
                        { message.text }
                    </p>
                </div>
                <p className="text-start text-sm text-gray-500">
                    { formatMessageDate(message.createdAt!)  }
                </p>   
            </div>
        </div>
    )
}
