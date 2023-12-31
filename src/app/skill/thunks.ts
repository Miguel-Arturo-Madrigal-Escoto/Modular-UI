import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { errorNotification, successNotification } from "../../components/common/Alerts";
import { axios_base } from "../../api/axios_base";
import { AxiosError } from "axios";
import {  SkillAdded, IUserSkillById, ISkill, IOnGetUserSkills } from "../types/interfaces";
import { setErrors } from "./skillSlice";

export const onAddUserSkill = createAsyncThunk(
    'skills/onAddUserSkill',
    async (data: ISkill,  { dispatch, getState }) => {
        
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.post<SkillAdded>(`skills/`, data, {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });
            successNotification('Habilidad agregada con éxito.');
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            errorNotification(`Verifica que los datos sean correctos`)
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onGetUserSkills = createAsyncThunk(
    'skills/onGetUserSkills',
    async (data: IOnGetUserSkills,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const { user_id } = data;
            const resp = await axios_base.get<IUserSkillById>(`skills/`, {
                params: {
                    user_id
                },
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