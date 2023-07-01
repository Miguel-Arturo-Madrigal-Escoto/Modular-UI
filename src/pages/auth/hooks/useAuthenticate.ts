import { useQuery } from '@tanstack/react-query'
import { onAuthenticate } from '../actions/authenticate'
import queryString from 'query-string';
import { IProviders } from '../types/interfaces';

export const useOAuth2Authenticate = (params: queryString.ParsedQuery<string>, provider: IProviders) => {
    const query = useQuery(
        ['authenticate', provider],
        () => onAuthenticate(params, provider)
    )

    return query;
}