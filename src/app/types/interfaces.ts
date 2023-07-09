import queryString from 'query-string';
import { IProviders } from '../../pages/auth/types/interfaces';

export interface ISocialOnLogin {
    params: queryString.ParsedQuery<string>;
    provider: IProviders
}

export interface IOnRegister {
    username: string;
    email: string;
    password: string;
}

export interface IOnLogin {
    email: string;
    password: string;
}

export interface IOnRegisterActivate {
    uid: string;
    token: string;
}
