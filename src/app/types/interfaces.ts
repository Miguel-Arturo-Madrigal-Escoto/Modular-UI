import queryString from 'query-string';
import { IProviders } from '../../pages/auth/types/interfaces';
import { Role } from '../roles/rolesSlice';

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

export interface ISocialLoginSuccess {
    access: string;
    refresh: string;
    user: string;
}

export interface ICompanyRoles {
    roles: Role[];
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
    position:        number;
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
    sector:    number;
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
    id: number;
}

export interface IJWTRefreshSuccess {
    access: string;
}

export interface IUserExperience {
    start_date: string;
    end_date: string;
    description: string;
    role: number;
    user: number;
}

export interface ExperienceAdded {
    id:          number;
    role:        number;
    start_date:  Date;
    end_date:    Date;
    description: string;
    user:        number;
}

export interface RoleExperience {
    id:       number;
    position: string;
}

export type IUserExperienceById = ExperienceAdded[]

export interface IUserExperiences {
    errors: any;
    experiences: IUserExperienceById
}

export interface IOnSaveNewRole {
    id?: number;
    position: string;
}

export interface INewRole extends IOnSaveNewRole {}

export interface IOnSaveNewSector {
    id?: number;
    name: string;
}

export interface INewSector extends IOnSaveNewSector {}


