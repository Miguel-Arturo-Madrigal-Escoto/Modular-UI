
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

export type IProviders = 'google' | 'linkedin' | 'github';

export interface IProfileOrCompany {
    option: string;
}

export interface IProfile {
    name: string;
    lastname: string;
    position: number;
    expected_salary: number;
    modality: string;
    location: string;
    about: string;
    new_position: string;
    image: FileList;
}

export interface ICompany {
    name: string;
    about: string;
    location: string;
    mission: string;
    vision: string;
    sector: string;
    new_sector: string;
    image: FileList;
}

export interface IRolesForm {
    name: string;
    link: string;
    position: string;
    description: string;
}

export interface IRolesFormEdit {
    description: string;
}


