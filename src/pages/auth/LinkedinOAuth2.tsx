import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useOAuth2Authenticate } from './hooks/useAuthenticate';

export const LinkedinOAuth2 = () => {

    const location = useLocation();
    const params = queryString.parse(location.search);
    const authenticateQuery = useOAuth2Authenticate(params, 'linkedin');
    
    console.log(authenticateQuery.data)
  
    return (
        <div>

        </div>
    )
}
