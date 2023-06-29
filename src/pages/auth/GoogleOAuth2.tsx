import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useEffect } from 'react';
import { onAuthenticate } from './actions/authenticate';
import { useAuthenticate } from './hooks/useAuthenticate';

export const GoogleOAuth2 = () => {

    const location = useLocation();
    const params = queryString.parse(location.search);
    const authenticateQuery = useAuthenticate(params);
    
    console.log(authenticateQuery.data)
  
    return (
        <div>

        </div>
    )
}
