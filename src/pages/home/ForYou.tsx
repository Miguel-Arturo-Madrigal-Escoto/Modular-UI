
import { onLogout } from '../../app/auth/thunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useCurrentUser } from '../auth/hooks/useCurrentUser';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { Navigate } from 'react-router-dom';

export const ForYou = () => {

    const dispatch = useAppDispatch();
    const { access, loading } = useAppSelector(state => state.auth);
    const currentUserQuery = useCurrentUser(access);
  
    if (!currentUserQuery.isFetching){
        if (currentUserQuery.data!.user === null && currentUserQuery.data!.company === null ){
            return <Navigate to="/profile/form/" />
        }
    }
  
    return (

        <>          
            {
                currentUserQuery.isFetching || loading ? (
                    <LoadingScreen />
                ) : (
                    <button onClick={ () => dispatch(onLogout()) }>Log out!</button>
                )
            }
           
        </>
    )
}
