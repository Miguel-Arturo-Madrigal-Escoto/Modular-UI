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

export interface IOnRefreshJWT {
    refresh: string;
}

export interface IOnGetCurrentUserData {
    access: string;
}

export interface IOnCreateProfile {
    option: string;
    data: any;
}

export interface IOnUpdateProfile {
    option: string; // user | company
    data: any;
    id: number;
}

export interface IOnUpdateProfilePicture {
    option: string; // user | company
    id: number;
    image: File;
}