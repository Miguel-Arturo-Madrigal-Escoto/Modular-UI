import { useQuery } from '@tanstack/react-query'
import { axios_base } from '../../../api/axios_base'

export const createProfile = async (option: 'user' | 'company', data: any) => {
    const resp = await axios_base.post(`auth/${ option }/`, data);
    return resp.data
}