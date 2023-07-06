import queryString from 'query-string';
import { IProviders } from '../../pages/auth/types/interfaces';

export interface IOnLogin {
    params: queryString.ParsedQuery<string>;
    provider: IProviders
}