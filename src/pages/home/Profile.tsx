import { useAppSelector } from "../../app/hooks"
import { LoadingScreen } from "../../components/common/LoadingScreen"
import { useCurrentUser } from "../auth/hooks/useCurrentUser"
import { ConnectionsProfile } from "./profile/ConnectionsProfile"
import { ExperienceProfile } from "./profile/ExperienceProfile"
import { HeaderProfile } from "./profile/HeaderProfile"
import { InfoProfile } from "./profile/InfoProfile"
import { SkillsProfile } from "./profile/SkillsProfile"

export const Profile = () => {

    const {access} = useAppSelector(state => state.auth);
    const currentUserQuery = useCurrentUser(access);

    if (currentUserQuery.isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <div className="h-full bg-gray-200 p-8">
                <HeaderProfile 
                    name={ currentUserQuery.data!.user!.name } 
                    location={ currentUserQuery.data!.user!.location }
                    position={ currentUserQuery.data!.user!.position } 
                />

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">                   
                    <div className="w-full flex flex-col 2xl:w-1/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Acerca de mí</h4>
                            <p className="mt-2 text-gray-700 break-all">{ currentUserQuery.data!.user!.about }</p>
                        </div>

                        <InfoProfile user={ currentUserQuery.data! } />                 
                    </div>
                    <div className="flex flex-col w-full 2xl:w-2/3">
                        <ExperienceProfile />
                        
                        <SkillsProfile />
                    </div>
                </div>
                <ConnectionsProfile />
            </div>
        </>
    )
}
