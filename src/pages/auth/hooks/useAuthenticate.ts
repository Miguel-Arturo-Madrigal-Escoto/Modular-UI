import { useQuery } from '@tanstack/react-query'
import { onAuthenticate } from '../actions/authenticate'
import queryString from 'query-string';

export const useAuthenticate = (params: queryString.ParsedQuery<string>) => {
    const query = useQuery(
        ['authenticate'],
        () => onAuthenticate(params)
    )

    return query;
}