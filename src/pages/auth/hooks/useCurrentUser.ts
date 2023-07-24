import { useQuery } from '@tanstack/react-query'
import { axios_base } from '../../../api/axios_base'
import { ICurrentUser } from '../types/interfaces';

export const getCurrentUser = async(access: string | null): Promise<ICurrentUser> => {
    const resp = await axios_base.get<ICurrentUser>('auth/users/me/', {
        headers: {
            Authorization: `JWT ${access}`
        }
    });
    return resp.data;
}

export const useCurrentUser = (access: string | null) => {
    const query = useQuery({ 
        queryKey: ['current_user'], 
        queryFn: () => getCurrentUser(access),
        enabled: access !== null,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })

    return query;
}
