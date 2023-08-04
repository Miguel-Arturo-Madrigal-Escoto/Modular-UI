import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios_base } from '../../api/axios_base';
import { IFormData } from '../../pages/auth/types/interfaces';

export const fetchFormData = createAsyncThunk(
    'form/fetchFormData',
    async (data = undefined) => {
        try {
            const response = await axios_base.get<IFormData>('form/data/');
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)