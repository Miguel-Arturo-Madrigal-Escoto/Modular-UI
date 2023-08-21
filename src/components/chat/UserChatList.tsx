import { useAppSelector } from "../../app/hooks"
import { UserChat } from "./UserChat";

export const UserChatList = () => {
    const { usersMatch } = useAppSelector(state => state.chat);
    const { user_data } = useAppSelector(state => state.auth);

    return (
        usersMatch.map(user => (
            // Render (chat) only with the users different from the authenticated user
            user.base_user !== user_data?.id && (
                <UserChat user={ user } key={ user._id } />
            )
        ))
    )
}
