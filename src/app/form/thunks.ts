import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios_base } from '../../api/axios_base';
import { FormValue, IFormData } from '../types/interfaces';
import { RootState } from '../store';


export const fetchFormData = createAsyncThunk(
    'form/fetchFormData',
    async (_ = undefined, { getState }) => {
        try {
            const { auth } = getState() as RootState;
            const response = await axios_base.get<IFormData>('form/data/', {
                headers: {
                    Authorization: `JWT ${ auth.access }`
                }
            });
            const other: FormValue = {
                value: 'otro',
                display: 'Otro',
                id: -1
            }
            return {
                ...response.data,
                positions: [...response.data.positions, other],
                sectors: [...response.data.sectors, other]
            }
        } catch (error) {
            console.log(error);
        }
    }
)