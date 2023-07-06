import { FC } from 'react';
import { Navigate } from 'react-router-dom';


interface Props {
    children: any;
    user: string | null;
}

export const PrivateRoute: FC<Props> = ({ children, user }) => {
    return (
        user ? children : <Navigate to="/login" />
    )
}
