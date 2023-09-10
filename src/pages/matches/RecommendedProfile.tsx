import { useState, useEffect } from 'react';
import { useAppSelector } from "../../app/hooks";
import { CompanyProfile } from "../home/profile/company/CompanyProfile";
import { UserProfile } from "../home/profile/user/UserProfile";
import { ICurrentUser } from '../../app/types/interfaces';


export const RecommendedProfile = () => {
    // const { currentUser, currentCompany } =  useAppSelector(state => state.match);
    const { user_data } =  useAppSelector(state => state.auth);
    const [storageRecommendedUser, setStorageRecommendedUser] = useState<ICurrentUser|null>(null);
    const [storageRecommendedCompany, setStorageRecommendedCompany] = useState<ICurrentUser|null>(null);
    
    useEffect(() => {
        // Persist recommended user/company in localStorage
        if (!localStorage.getItem('recommendedUser') && !localStorage.getItem('recommendedCompany')) return;

        if (user_data?.company){
            setStorageRecommendedUser(JSON.parse(localStorage.getItem('recommendedUser')!));
        }
        else if (user_data?.user){
            setStorageRecommendedCompany(JSON.parse(localStorage.getItem('recommendedCompany')!));
        }

    }, [user_data]);

    return (
        <>
            {
                storageRecommendedCompany?.company
                        ? <CompanyProfile user={storageRecommendedCompany!} />
                        : storageRecommendedUser?.user && <UserProfile user={storageRecommendedUser!} />
            }
        </>
    )
}
