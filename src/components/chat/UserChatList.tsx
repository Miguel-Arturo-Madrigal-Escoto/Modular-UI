import { useAppSelector } from "../../app/hooks"
import { UserChat } from "./UserChat";

export const UserChatList = () => {
    const { chatUsers, matchedUsers } = useAppSelector(state => state.chat);
    const { user_data } = useAppSelector(state => state.auth);


    return (
        chatUsers.map(user => (
            // Render (chat) only with the users different from the authenticated user
            // and matched users
            user.base_user !== user_data?.id && matchedUsers.includes(user.base_user) && (
                <UserChat user={ user } key={ user._id } />
            )
        ))
    )
}
