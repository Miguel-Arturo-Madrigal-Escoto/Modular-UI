import { useState, useEffect } from 'react';
import { useAppSelector } from "../../app/hooks";
import { CompanyProfile } from "../home/profile/company/CompanyProfile";
import { UserProfile } from "../home/profile/user/UserProfile";
import { ICurrentUser } from '../../app/types/interfaces';


export const RecommendedProfile = () => {
    const { currentUser, currentCompany } =  useAppSelector(state => state.match);
    const [storageRecommendedUser, setStorageRecommendedUser] = useState<ICurrentUser|null>(null);
    const [storageRecommendedCompany, setStorageRecommendedCompany] = useState<ICurrentUser|null>(null);
    
    useEffect(() => {
        // Persist recommended user/company in localStorage
        if (localStorage.getItem('recommendedUser')){
            setStorageRecommendedUser(JSON.parse(localStorage.getItem('recommendedUser')!));
        }
        else if (localStorage.getItem('recommendedCompany')){
            setStorageRecommendedCompany(JSON.parse(localStorage.getItem('recommendedCompany')!));
        }

    }, [currentUser, currentCompany]);

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
