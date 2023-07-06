import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { LoadingIcon } from '../../components/common/LoadingIcon';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onLogin } from '../../app/auth/thunks';

export const GithubOAuth2 = () => {

    const location = useLocation();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.auth);
    const params = queryString.parse(location.search);

 
    useEffect(() => {
        dispatch(onLogin({
            params,
            provider: 'github'
        }));
    }, []);
    
  
    return (
        <LoadingIcon loading={ loading }/>
    )
}
