import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICompanyProfile, IUserProfile, IOnMatchCompany, IOnMatchUser, IsMatch, ICurrentUser } from '../types/interfaces';
import { axios_base } from "../../api/axios_base";
import { setErrors } from "./matchSlice";
import { AxiosError } from "axios";

export const onGetCompanyMatch = createAsyncThunk(
    'match/onGetCompanyMatch',
    async (data = undefined,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.get<ICurrentUser[]>(`match/get_company_match/`, {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });

            const baseUsers: ICurrentUser[]  = resp.data.map(base_user => ({
                ...base_user,
                user: {
                    id: base_user.user!.id,
                    about: base_user.user!.about,
                    expected_salary: base_user.user!.expected_salary,
                    name: base_user.user!.name,
                    lastname: base_user.user!.lastname,
                    base_user: base_user.user!.base_user,
                    location: base_user.user!.location,
                    modality: base_user.user!.modality,
                    position: base_user.user!.position,
                    image: base_user?.user?.image ? `${ import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD }`.slice(0, -1) + base_user?.user?.image : null
                },
            }));
            return baseUsers;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onGetUserMatch = createAsyncThunk(
    'match/onGetUserMatch',
    async (data = undefined,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.get<ICurrentUser[]>(`match/get_user_match/`, {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });
            const baseUsers: ICurrentUser[]  = resp.data.map(base_user => ({
                ...base_user,
                company: {
                    id:        base_user.company!.id,
                    name:      base_user.company!.name,
                    about:     base_user.company!.about,
                    mission:   base_user.company!.mission,
                    vision:    base_user.company!.vision,
                    verified:  base_user.company!.verified,
                    location:  base_user.company!.location,
                    sector:    base_user.company!.sector,
                    base_user: base_user.company!.base_user,
                    image: base_user?.company?.image ? `${ import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD }`.slice(0, -1) + base_user.company.image : null
                }
            }));
            return baseUsers;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onMatchCompany = createAsyncThunk(
    'match/onMatchCompany',
    async (data: IOnMatchCompany,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.post<IsMatch>(`match/match_company/`, { user_id: data.user_id, like: data.like },{
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onMatchUser = createAsyncThunk(
    'match/onMatchUser',
    async (data: IOnMatchUser,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.post<IsMatch>(`match/match_user/`, { company_id: data.company_id, like: data.like },{
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onRetrieveUserMatchesList = createAsyncThunk(
    'match/onRetrieveUserMatchesList',
    async (data = undefined,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.get<ICompanyProfile[]>(`match/retrieve_user_matches_list/`, {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });
            const companies: ICompanyProfile[] = resp.data.map(company => ({
                ...company,
                image: company.image && `${ import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD }`.slice(0, -1) + company.image
            }))
            return companies;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)


export const onRetrieveCompanyMatchesList = createAsyncThunk(
    'match/onRetrieveCompanyMatchesList',
    async (data = undefined,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.get<IUserProfile[]>(`match/retrieve_company_matches_list/`, {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });
            const users: IUserProfile[] = resp.data.map(user => ({
                ...user,
                image: user.image && `${ import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD }`.slice(0, -1) + user.image
            }))
            return users;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)