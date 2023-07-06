import { FC } from 'react';
import { Navigate } from 'react-router-dom';


interface Props {
    children: any;
    user: string | null;
}

export const PublicRoute: FC<Props> = ({ children, user }) => {
    return (
        !user ? children : <Navigate to="/for-you" />
    )
}