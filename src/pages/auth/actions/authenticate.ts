import { axios_base } from '../../../api/axios_base'
import queryString from 'query-string';
import { IGoogleSucessLogin, IProviders } from '../types/interfaces';

export const onAuthenticate = async (params: queryString.ParsedQuery<string>, provider: IProviders) => {
    try {   
        const authenticateWithProvider = {
            'google': await axios_base.get<IGoogleSucessLogin>('auth/oauth2/google/', { params }),
            'linkedin': await axios_base.get('auth/oauth2/google/', { params })
        }

        const resp = authenticateWithProvider[provider];
        return resp.data

    } catch (error) {
        console.log(error)
    }
}