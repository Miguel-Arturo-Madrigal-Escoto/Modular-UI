import { axios_base } from '../../../api/axios_base'
import queryString from 'query-string';
import { ISocialLoginSuccess, IProviders } from '../types/interfaces';


export const onAuthenticate = async (params: queryString.ParsedQuery<string>, provider: IProviders) => {
    try {     
        const resp = await axios_base.get<ISocialLoginSuccess>(`auth/oauth2/${provider}/`, { params });
        return resp.data;
        
    } catch (err) {
        throw new Error('El nombre de usuario y/o email ya están en uso.');
    }
}