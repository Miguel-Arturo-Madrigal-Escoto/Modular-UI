import { FC } from 'react'
import { ICurrentUser } from '../../../app/types/interfaces'
import { defaultImageProfile } from '../../../components/common/constants';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setRecommendedProfileCompany, setRecommendedProfileUser } from '../../../app/match/matchSlice';
import { scrollToTopAnimated } from '../../../utils/scrollToTop';

interface Props {
    profile: ICurrentUser; // user or company (base_user)
}

export const Connection: FC<Props> = ({ profile }) => {

    const { user_data } = useAppSelector(state => state.auth);
    const { positions, sectors } = useAppSelector(state => state.form);

    const dispatch = useAppDispatch();

    const onNavigateRecommendedProfile = () => {
        if (user_data?.user){
            localStorage.setItem('recommendedCompany', JSON.stringify(profile));
            dispatch(setRecommendedProfileCompany(profile));
        }
        else if (user_data?.company){
            localStorage.setItem('recommendedUser', JSON.stringify(profile));
            dispatch(setRecommendedProfileUser(profile));
        }
        scrollToTopAnimated('header-profile')
    } 

    return (
        <div 
            className="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600 cursor-pointer" 
            title="View Profile"
            onClick={ onNavigateRecommendedProfile }
        >
            <img src={ profile?.user?.image || profile?.company?.image || defaultImageProfile } className="w-16 rounded-full" />
            <p className="text-center font-bold text-sm mt-1">{ profile?.user?.name || profile?.company?.name }</p>
            <p className="text-xs text-gray-500 text-center">
                {
                    profile?.user 
                    ? positions.find(p => p.id === profile?.user?.position)?.display
                    : profile?.company && sectors.find(s => s.id === profile?.company?.sector)?.display
                }
            </p>
        </div>
    )
}
