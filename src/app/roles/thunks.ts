import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios_base } from '../../api/axios_base';
import { ICompanyFilter, ICompanyRoles, ICompanyRolesById } from '../../pages/auth/types/interfaces';
import { AxiosError } from 'axios';
import { setErrors } from './rolesSlice';
import { successNotification } from '../../components/common/Alerts';

export const onAddCompanyRoles = createAsyncThunk(
    'roles/onAddCompanyRoles',
    async (data: ICompanyRoles,  { dispatch }) => {
        try {
            const resp = await axios_base.post<ICompanyRoles>(`roles/add_roles/`, data);
            successNotification('Roles agregados con éxito.');
            return resp.data;   
        } catch (error) {
            const err = error as AxiosError;
            dispatch(setErrors(err.response?.data));
            throw new Error(`${err.response?.data}`)
        }
    }
)

export const onGetCompanyRoles = createAsyncThunk(
    'roles/onGetCompanyRoles',
    async ({ company }: ICompanyFilter,  { dispatch }) => {
        try {
            const resp = await axios_base.get<ICompanyRolesById[]>(`roles/`, {
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