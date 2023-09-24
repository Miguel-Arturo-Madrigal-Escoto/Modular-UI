import { useAppSelector } from "../../app/hooks"
import { IUserMatch } from "../../app/types/interfaces";
import { UserChat } from "./UserChat";

export const UserChatList = () => {
    const { chatUsers, search } = useAppSelector(state => state.chat); // socket users
    const { userMatches, companyMatches } = useAppSelector(state => state.match);
    const { user_data } = useAppSelector(state => state.auth);

    const isUserMatch = (user: IUserMatch) => (userMatches.find(c => c.base_user == user.base_user) || companyMatches.find(u => u.base_user == user.base_user))

    // check for user if search text is present
    if (search !== ''){
        let users = chatUsers.filter(u => u.name.toLowerCase().includes(search));
        users = users.filter(user => isUserMatch(user));

        if (users.length === 0) return <p className="text-gray-700 text-base ml-2">No se han encontrado coincidencias.</p>;
        else return users.map(user => <UserChat user={ user } />)
    }

    return (
        chatUsers.map(user => (
            // Render (chat) only with the users different from the authenticated user
            // and matched users
            user.base_user !== user_data?.id && !!isUserMatch(user) && (
                <UserChat user={ user } key={ user._id } />
            )
        ))
    )
}
