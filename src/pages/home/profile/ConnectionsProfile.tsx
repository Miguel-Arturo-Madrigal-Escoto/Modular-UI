import { useAppSelector } from "../../../app/hooks"
import { ICurrentUser } from "../../../app/types/interfaces";
import { Connection } from "./Connection";
import { useEffect, useState } from 'react';

export const ConnectionsProfile = () => {

    const { user_data } = useAppSelector(state => state.auth);
    const { usersQueue, companiesQueue } = useAppSelector(state => state.match);
    const [recommendedProfiles, setRecommendedProfiles] = useState<ICurrentUser[]>([]);

    useEffect(() => {
        if (user_data?.user && companiesQueue){
            setRecommendedProfiles(companiesQueue);
        }
        else if (user_data?.company && usersQueue) {
            setRecommendedProfiles(usersQueue);
        }
    }, [usersQueue, companiesQueue, user_data]);

    return (
        recommendedProfiles.length > 0 && (
            <div className="bg-white rounded-lg shadow-xl p-8">
                <div className="flex items-center justify-between">
                    <h4 className="text-xl text-gray-900 font-bold">Perfiles similares ({ recommendedProfiles.length })</h4>
                    <a href="#" title="View All">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                        </svg>
                    </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-8 mt-8">
                    {
                        recommendedProfiles.map(profile => (
                            <Connection key={ profile.id } profile={ profile } />
                        ))
                    }
                </div>
            </div>
        )
  )
}
