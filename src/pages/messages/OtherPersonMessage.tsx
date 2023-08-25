import { FC } from 'react'
import { IMessageMatch } from '../../app/types/interfaces';

interface Props {
    message: IMessageMatch;
}

export const OtherPersonMessage: FC<Props> = ({ message }) => {

    const formatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const formattedDate = messageDate.toLocaleString('es-MX', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        const dateParts = formattedDate.split(',');
        return `${dateParts[1]}, ${dateParts[0]}`;
    }
    

    return (
        <div className="flex flex-row justify-start">
            <div className="messages text-sm text-black grid grid-flow-row gap-2">
                <div className="flex items-center group">
                    <p className="px-6 py-3 rounded-b-full rounded-r-full bg-gray-200 max-w-xs lg:max-w-md">
                        { message.text }
                    </p>
                </div>
                <p className="text-start text-sm text-gray-500">
                    {formatTimestamp(message.createdAt || message.updatedAt)}
                </p>
            </div>
        </div>
    )
}
