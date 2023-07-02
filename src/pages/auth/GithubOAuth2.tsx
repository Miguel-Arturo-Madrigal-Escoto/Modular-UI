import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useOAuth2Authenticate } from './hooks/useAuthenticate';
import { LoadingIcon } from '../../components/common/LoadingIcon';

export const GithubOAuth2 = () => {

    const location = useLocation();
    const params = queryString.parse(location.search);
    const authenticateQuery = useOAuth2Authenticate(params, 'github');
    
    console.log(authenticateQuery.data)
    
  
    return (
        <div style={{
            'width': '100vw',
            'height': '100vh',
            'display': 'flex',
            'justifyContent': 'center',
            'alignItems': 'center',
        }}>
            {
                authenticateQuery.isFetching && <LoadingIcon /> 
            }
        </div>
    )
}
