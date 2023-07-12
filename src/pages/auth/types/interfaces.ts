export interface IRegister {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface IAuthorizationRedirect {
    authorization_url: string;
} 

export interface ILogin {
    email: string;
    password: string;
    remember: boolean;
}

export interface ISocialLoginSuccess {
    access: string;
    refresh: string;
    user: string;
}

export interface ILoginSuccess {
    access: string;
    refresh: string;
}

export interface IRegisterSuccess {
    username: string;
    email:    string;
    user:     null;
    company:  null;
}

export type IProviders = 'google' | 'linkedin' | 'github';

export interface IProfileOrCompany {
    option: 'user' | 'company';
}

export interface IProfile {
    name: string;
    lastname: string;
    position: string;
    expected_salary: number;
    modality: string;
    location: string;
}

export interface ICompany {
    name: string;
    about: string;
}

export interface ICurrentUser {
    id: number;
    username: string;
    email: string;
    user: number | null;
    company: number | null;
}