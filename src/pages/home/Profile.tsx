import { useAppSelector } from "../../app/hooks"
import { CompanyProfile } from "./profile/company/CompanyProfile"
import { UserProfile } from "./profile/user/UserProfile"

export const Profile = () => {

    const { user_data } = useAppSelector(state => state.auth);

    console.log(user_data)

    return (
        <>
            {
                user_data?.company 
                        ? <CompanyProfile user={user_data!} />
                        : user_data?.user && <UserProfile user={user_data!} />
            }
        </>
    )
}
