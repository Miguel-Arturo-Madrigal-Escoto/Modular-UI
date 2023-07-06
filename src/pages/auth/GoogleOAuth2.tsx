import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LoadingIcon } from '../../components/common/LoadingIcon';
import { onLogin } from '../../app/auth/thunks';

export const GoogleOAuth2 = () => {

    const location = useLocation();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.auth);
    const params = queryString.parse(location.search);

 
    useEffect(() => {
        dispatch(onLogin({
            params,
            provider: 'google'
        }));
    }, []);
    
  
    return (
        <LoadingIcon loading={ loading }/>
    )
}
