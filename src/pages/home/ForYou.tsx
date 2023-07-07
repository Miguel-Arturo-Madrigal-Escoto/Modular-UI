
import { onLogout } from '../../app/auth/thunks';
import { useAppDispatch } from '../../app/hooks'

export const ForYou = () => {

    const dispatch = useAppDispatch();
  
    return (

        <>          
            <button onClick={ () => dispatch(onLogout()) }>Log out!</button>
        </>
    )
}
