import { Role } from "../../../app/roles/rolesSlice";

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

export interface ICompanyRoles {
    company_id: number;
    roles: Role[];
}

export interface ICompanyFilter {
    company: number;
}

export interface ICompanyRolesById {
    id:          number;
    link:        string;
    name:        string;
    description: string;
    created_at:  Date;
    updated_at:  Date;
    role:        {
        id: number;
        position: string;
    }
    company:     number;
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
    image: FileList;
}

export interface ICompany {
    name: string;
    about: string;
    location: string;
    mission: string;
    vision: string;
    sector: string;
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


export interface ICurrentUser {
    id:       number;
    username: string;
    email:    string;
    created_at: string;
    updated_at: string;
    user:     IUserProfile | null;
    company:  ICompanyProfile | null;
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
    image:           string | null;
    base_user:       number;
}

export interface ICompanyProfile {
    id:        number;
    name:      string;
    about:     string;
    mission:   string;
    vision:    string;
    verified:  boolean;
    location:  string;
    sector:    string;
    image:     string | null;
    base_user: number;
}

export interface IFormData {
    modalities: FormValue[];
    locations:  FormValue[];
    positions:  FormValue[];
    sectors:    FormValue[];
}

export interface FormValue {
    value:   string;
    display: string;
}
