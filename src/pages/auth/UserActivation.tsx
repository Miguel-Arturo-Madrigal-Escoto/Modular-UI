import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onRegisterActivate } from '../../app/auth/thunks';
import { useEffect } from 'react';
import { LoadingScreen } from '../../components/common/LoadingScreen';


export const UserActivation = () => {

    const params = useParams();
    
    const { loading } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(onRegisterActivate({
            uid: params.uid!,
            token: params.token!
        }))

    }, []);

    if (!loading)
        return <Navigate to="/login" />

    return (
        loading && <LoadingScreen />
    )
}
