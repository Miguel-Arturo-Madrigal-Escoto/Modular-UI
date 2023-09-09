import { useAppSelector } from "../../app/hooks"
import { UserChat } from "./UserChat";

export const UserChatList = () => {
    const { chatUsers } = useAppSelector(state => state.chat); // socket users
    const { userMatches, companyMatches } = useAppSelector(state => state.match);
    const { user_data } = useAppSelector(state => state.auth);


    return (
        chatUsers.map(user => (
            // Render (chat) only with the users different from the authenticated user
            // and matched users
            user.base_user !== user_data?.id && 
            (userMatches.find(c => c.base_user == user.base_user) || companyMatches.find(u => u.base_user == user.base_user)) && (
                <UserChat user={ user } key={ user._id } />
            )
        ))
    )
}
