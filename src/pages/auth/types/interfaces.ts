export interface ILogin {
    email: string;
    password: string;
}

export interface IGoogleSucessLogin {
    access_token: string;
    refresh_token: string;
    user: string;
}

export type IProviders = 'google' | 'linkedin'