import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';


interface Props {
    children: any;
}

export const PrivateRoute: FC<Props> = ({ children }) => {
    const { user, user_data } = useAppSelector(state => state.auth);

    if (user_data?.company === null && user_data?.user === null){
        return <Navigate to="/profile/form" />
    }

    return (
        user ? children : <Navigate to="/login" />
    )
}
