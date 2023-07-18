import { useAppSelector } from "../../app/hooks"
import { LoadingScreen } from "../../components/common/LoadingScreen"
import { useCurrentUser } from "../auth/hooks/useCurrentUser"
import { CompanyProfile } from "./profile/company/CompanyProfile"
import { UserProfile } from "./profile/user/UserProfile"

export const Profile = () => {

    const {access} = useAppSelector(state => state.auth);
    const currentUserQuery = useCurrentUser(access);

    if (currentUserQuery.isLoading) {
        return <LoadingScreen />
    }
    else if (currentUserQuery.data!.company) {
        console.log("es compañia");
        return <CompanyProfile user={currentUserQuery.data!} />
    }
    else if (currentUserQuery.data!.user) {
        console.log("soy usuario");
        return <UserProfile user={currentUserQuery.data!} />
    }

    return (
        <>
            
        </>
    )
}
