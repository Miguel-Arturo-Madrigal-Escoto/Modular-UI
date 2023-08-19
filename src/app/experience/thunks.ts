import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { errorNotification, successNotification } from "../../components/common/Alerts";
import { axios_base } from "../../api/axios_base";
import { AxiosError } from "axios";
import { ExperienceAdded, IUserExperience, IUserExperienceById} from "../types/interfaces";
import { setErrors } from "./experienceSlice";

export const onAddUserExperience = createAsyncThunk(
    'experience/onAddUserExperience',
    async (data: IUserExperience,  { dispatch, getState }) => {
        
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.post<ExperienceAdded>(`experience/`, data, {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });
            successNotification('Experiencia agregada con éxito.');
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            errorNotification(`Verifica que los datos sean correctos`)
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onGetUserExperiences = createAsyncThunk(
    'experience/onGetUserExperiences',
    async (data = undefined,  { dispatch, getState }) => {
        try {
            
            const { auth } = getState() as RootState;
            const resp = await axios_base.get<IUserExperienceById>(`experience/`, {
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