import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { onSocialLogin } from '../../app/auth/thunks';

export const GoogleOAuth2 = () => {

    const location = useLocation();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.auth);
    const params = queryString.parse(location.search);

 
    useEffect(() => {
        dispatch(onSocialLogin({
            params,
            provider: 'google'
        }));
    }, []);
    
  
    return (
        loading && (
            <LoadingScreen />
        )
    )
}
