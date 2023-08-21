import { FC } from 'react'
import { IMessageMatch } from '../../app/types/interfaces';

interface Props {
    message: IMessageMatch;
}

export const OtherPersonMessage: FC<Props> = ({ message }) => {
    return (
        <div className="flex flex-row justify-start">
            <div className="messages text-sm text-black grid grid-flow-row gap-2">
                <div className="flex items-center group">
                    <p className="px-6 py-3 rounded-b-full rounded-r-full bg-gray-200 max-w-xs lg:max-w-md">
                        { message.text }
                    </p>
                </div>
                <p className="text-center text-sm text-gray-500">
                    {
                        // TODO: Fecha del mensaje (createdAt)
                    }
                </p>   
            </div>
        </div>
    )
}
