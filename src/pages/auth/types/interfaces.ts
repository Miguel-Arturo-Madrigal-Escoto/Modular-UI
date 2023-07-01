export interface ILogin {
    email: string;
    password: string;
}

export interface ISocialLoginSuccess {
    access_token: string;
    refresh_token: string;
    user: string;
}

export type IProviders = 'google' | 'linkedin';

export interface IRegister {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}
