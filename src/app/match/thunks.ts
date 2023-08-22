import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICompanyProfile, IUserProfile, IOnMatchCompany, IOnMatchUser } from '../types/interfaces';
import { axios_base } from "../../api/axios_base";
import { setErrors } from "./matchSlice";
import { AxiosError } from "axios";

export const onGetCompanyMatch = createAsyncThunk(
    'match/onGetCompanyMatch',
    async (data = undefined,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.get<IUserProfile>(`match/get_company_match/`, {
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

export const onGetUserMatch = createAsyncThunk(
    'match/onGetUserMatch',
    async (data = undefined,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.get<ICompanyProfile>(`match/get_user_match/`, {
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

export const onMatchCompany = createAsyncThunk(
    'match/onMatchCompany',
    async (data: IOnMatchCompany,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.post(`match/match_company/`, { user_id: data.user_id, like: data.like },{
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
            console.log(data)
            const { auth } = getState() as RootState;
            const resp = await axios_base.post(`match/match_user/`, { company_id: data.company_id, like: data.like },{
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