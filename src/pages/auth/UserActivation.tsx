import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onRegisterActivate } from '../../app/auth/thunks';
import { useEffect } from 'react';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { clearSuccess } from '../../app/auth/authSlice';


export const UserActivation = () => {

    const params = useParams();
    
    const { loading, error, success } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(onRegisterActivate({
            uid: params.uid!,
            token: params.token!
        }))

    }, []);

    useEffect(() => {
        if (success) {
            alert(success);
            dispatch(clearSuccess())
        }
        else if (error){
            alert(error);
            dispatch(clearSuccess())
        }
    }, [success, error]);

    if (success || error) {
        return <Navigate to="/login" />
    }

    return (
        loading && <LoadingScreen />
    )
}
