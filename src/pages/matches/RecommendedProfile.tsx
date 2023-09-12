import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CompanyProfile } from "../home/profile/company/CompanyProfile";
import { UserProfile } from "../home/profile/user/UserProfile";
import { setRecommendedProfileCompany, setRecommendedProfileUser } from '../../app/match/matchSlice';
import { onGetUserSkills } from '../../app/skill/thunks';
import { onGetUserExperiences } from '../../app/experience/thunks';
import { onGetCompanyRoles } from '../../app/roles/thunks';


export const RecommendedProfile = () => {
    // const { currentUser, currentCompany } =  useAppSelector(state => state.match);
    const { user_data } =  useAppSelector(state => state.auth);
    const { recommendedProfileUser, recommendedProfileCompany } =  useAppSelector(state => state.match);

    const dispatch = useAppDispatch();

    const usr = JSON.parse(localStorage.getItem('recommendedUser') || 'null');
    const com = JSON.parse(localStorage.getItem('recommendedCompany') || 'null');
    
    useEffect(() => {    
        if (usr && user_data?.company){
            dispatch(setRecommendedProfileUser(usr));           
        }
        else if (com && user_data?.user){
            dispatch(setRecommendedProfileCompany(com));         
        }

    }, [user_data]);

    useEffect(() => {
        if (recommendedProfileUser){
            dispatch(onGetUserSkills({
                user_id: recommendedProfileUser.user!.id
            }));
            dispatch(onGetUserExperiences({
                user_id: recommendedProfileUser.user!.id
            }));
        }
        else if (recommendedProfileCompany){
            dispatch(onGetCompanyRoles({
                company_id: recommendedProfileCompany.company!.id
            }));
        }

    }, [recommendedProfileUser, recommendedProfileCompany]);

    
    return (
        <div>
            {
                recommendedProfileCompany?.company
                        ? <CompanyProfile user={recommendedProfileCompany!} />
                        : recommendedProfileUser?.user && <UserProfile user={recommendedProfileUser!} />
            }
        </div>
    )
}
