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

export interface IJWTRefreshSuccess {
    access: string;
}

export type IProviders = 'google' | 'linkedin' | 'github';

export interface IProfileOrCompany {
    option: string;
}

export interface IProfile {
    name: string;
    lastname: string;
    position: string;
    expected_salary: number;
    modality: string;
    location: string;
    about: string;
}

export interface ICompany {
    name: string;
    about: string;
}

export interface ICurrentUser {
    id:       number;
    username: string;
    email:    string;
    created_at: string;
    updated_at: string;
    user:     IUserProfile | null;
}

export interface IUserProfile {
    id:              number;
    name:            string;
    lastname:        string;
    position:        string;
    expected_salary: number;
    modality:        string;
    location:        string;
    about:           string;
    image:           null;
    base_user:       number;
}