import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onSocialLogin } from '../../app/auth/thunks';
import { LoadingScreen } from '../../components/common/LoadingScreen';



export const LinkedinOAuth2 = () => {

    const location = useLocation();
    const dispatch = useAppDispatch();
    const { loading, errors } = useAppSelector(state => state.auth);
    const params = queryString.parse(location.search);

 
    useEffect(() => {
        dispatch(onSocialLogin({
            params,
            provider: 'linkedin'
        }));
    }, []);

    if (Object.values(errors).length > 0){
        return <Navigate to="/login" />
    }
    
  
    return (
        loading && (
            <LoadingScreen />
        )
    )
}
