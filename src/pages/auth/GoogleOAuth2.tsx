import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useOAuth2Authenticate } from './hooks/useAuthenticate';

export const GoogleOAuth2 = () => {

    const location = useLocation();
    const params = queryString.parse(location.search);
    const authenticateQuery = useOAuth2Authenticate(params, 'google');
    
    console.log(authenticateQuery.data)
  
    return (
        <div>

        </div>
    )
}