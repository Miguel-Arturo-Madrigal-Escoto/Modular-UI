import { axios_base } from '../../../api/axios_base'
import queryString from 'query-string';

export const onAuthenticate = async (params: queryString.ParsedQuery<string>) => {
    try {   

        const resp = await axios_base.get<IGoogleSucessLogin>('auth/oauth2/google/', {
            params
        });

        return resp.data

    } catch (error) {
        console.log(error)
    }
}