import { FC } from "react";

interface Props {
    title: string;
    message: string;
}

export const TitleForm:FC<Props> = ({title, message}) => {
  return (
    <>
        <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
                {title}
            </h2>
            <p className="mt-2 text-sm text-gray-500">{message}</p>
        </div>
    </>
  )
}
