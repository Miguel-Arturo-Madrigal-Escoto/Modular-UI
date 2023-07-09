import { FC } from 'react'

interface Props {
    message: string | null;
}

export const FormErrorMessage: FC<Props> = ({ message }) => {

    return (
        <>
            <span className="ml-3 text-sm font-bol tracking-wide text-red-500">{ message }</span>
        </>
    )
}
