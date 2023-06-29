import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useEffect } from 'react';
import { axios_base } from '../../api/axios_base';
import { onAuthenticate } from './actions/authenticate';

export const GoogleOAuth2 = () => {

    const location = useLocation()
    const params = queryString.parse(location.search)
    
    useEffect(() => {

        const onAuth = async () => {
            await onAuthenticate(params)
        }
        onAuth();

        
    }, []);

    return (
        <div>

        </div>
    )
}
