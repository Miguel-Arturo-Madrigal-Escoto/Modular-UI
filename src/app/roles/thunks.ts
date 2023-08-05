import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios_base } from '../../api/axios_base';
import { AxiosError } from 'axios';
import { setErrors } from './rolesSlice';
import { errorNotification, successNotification } from '../../components/common/Alerts';
import { ICompanyFilter, ICompanyRoles, ICompanyRolesById } from '../types/interfaces';

export const onAddCompanyRoles = createAsyncThunk(
    'roles/onAddCompanyRoles',
    async (data: ICompanyRoles,  { dispatch }) => {
        try {
            const resp = await axios_base.post<ICompanyRoles>(`company-roles/add_roles/`, data);
            successNotification('Roles agregados con éxito.');
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            errorNotification(`Verifica que el rol ${ Object.keys(err.response?.data as object)[0] } sea correcto.`)
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onGetCompanyRoles = createAsyncThunk(
    'roles/onGetCompanyRoles',
    async ({ company }: ICompanyFilter,  { dispatch }) => {
        try {
            const resp = await axios_base.get<ICompanyRolesById[]>(`company-roles/`, {
                params: {
                    company
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