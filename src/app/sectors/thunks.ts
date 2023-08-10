import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { axios_base } from '../../api/axios_base';
import { INewSector, IOnSaveNewSector } from '../types/interfaces';
import { AxiosError } from 'axios';
import { setErrors } from './sectorsSlice';


export const onSaveNewSector = createAsyncThunk(
    'sectors/onSaveNewSector',
    async ({ name }: IOnSaveNewSector,  { dispatch, getState }) => {
        let error = false;
        const { auth } = getState() as RootState;
        try {
            // if sector is found, no need to add a new one (just return this id)
            const response = await axios_base.get<INewSector>(`sectors/`, {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                },
                params: { name },
            });    
            return response.data.id;
     
        } catch (e) {
            error = true;
        }

        if (error){
            try {
                //! Save model instance if not exists
                const resp = await axios_base.post<IOnSaveNewSector>(`sectors/`, { name }, {
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