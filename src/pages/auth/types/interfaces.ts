export interface IRegister {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ISocialLoginSuccess {
    access_token: string;
    refresh_token: string;
    user: string;
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
}
export interface ICompany {
    companyName: string;
    about: string;
}