import { FC } from 'react'
import { IMessageMatch } from '../../app/types/interfaces';

interface Props {
    message: IMessageMatch;
}

export const MyMessage: FC<Props> = ({ message }) => {
    return (
        <div className="flex flex-row justify-start">
            <div className="messages text-sm text-white grid grid-flow-row gap-2">
                <div className="flex items-center flex-row-reverse group">
                    <p className="px-6 py-3 rounded-b-full rounded-l-full bg-indigo-700 max-w-xs lg:max-w-md">
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
