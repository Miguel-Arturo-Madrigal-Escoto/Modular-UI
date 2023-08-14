import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios_base } from '../../api/axios_base';
import { AxiosError } from 'axios';
import { setErrors } from './rolesSlice';
import { errorNotification, successNotification } from '../../components/common/Alerts';
import { ICompanyRoles, ICompanyRolesById, INewRole, IOnSaveNewRole } from '../types/interfaces';
import { RootState } from '../store';

export const onAddCompanyRoles = createAsyncThunk(
    'roles/onAddCompanyRoles',
    async (data: ICompanyRoles,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.post<ICompanyRoles>(`company-roles/add_roles/`, data, {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });
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
    async (data = undefined,  { dispatch, getState }) => {
        try {
            const { auth } = getState() as RootState;
            const resp = await axios_base.get<ICompanyRolesById[]>(`company-roles/`, {
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

export const onSaveNewRole = createAsyncThunk(
    'roles/onSaveNewRole',
    async ({ position }: IOnSaveNewRole,  { dispatch, getState }) => {
        let error = false;
        const { auth } = getState() as RootState;
        try {
            // if role is found, no need to add a new one (just return its id)
            const response = await axios_base.get<INewRole>(`roles/`, {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                },
                params: { position },
            });    
            return response.data.id;
     
        } catch (e) {
            error = true;
        }

        if (error){
            try {
                //! Save model instance if not exists
                const resp = await axios_base.post<IOnSaveNewRole>(`roles/`, { position }, {
                    headers: {
                        Authorization: `JWT ${ auth.access }`
                    }
                });
                const { id } = resp.data;
                return id;   
            } catch (e) {
                const err = e as AxiosError;
                dispatch(setErrors(err.response?.data));
                throw new Error(`${err.response?.data}`)
            }
        }
    }
)