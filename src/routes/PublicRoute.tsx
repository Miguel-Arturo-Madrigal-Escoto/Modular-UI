import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';


interface Props {
    children: any;
}

export const PublicRoute: FC<Props> = ({ children }) => {

    const { user } = useAppSelector(state => state.auth);

    return (
        !user ? children : <Navigate to="/for-you" />
    )
}