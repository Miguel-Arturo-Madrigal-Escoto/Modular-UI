import { FC } from 'react'
import { IMessageMatch } from '../../app/types/interfaces';

interface Props {
    message: IMessageMatch;
}

export const MyMessage: FC<Props> = ({ message }) => {

    const locale = 'es-MX';
    const formatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const formattedDate = messageDate.toLocaleString(locale, {
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
        <div className="flex flex-row justify-end">
            <div className="messages text-sm text-white grid grid-flow-row gap-2">
                <div className="flex items-center flex-row-reverse group">
                    <p className="px-6 py-3 rounded-b-full rounded-l-full bg-indigo-700 max-w-xs lg:max-w-md">
                        {message.text}
                    </p>
                </div>
                <p className="text-start text-sm text-gray-500">
                    {formatTimestamp(message.createdAt)}
                </p>
            </div>
        </div>
    )
}
