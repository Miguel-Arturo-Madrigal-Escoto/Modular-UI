import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { ForYou } from '../pages/home/ForYou';
import { Profile } from '../pages/home/Profile';
import { ProfileEdit } from '../pages/home/ProfileEdit';
import { Matches } from '../pages/matches/Matches';
import { Register } from '../pages/auth/Register';
import { Login } from '../pages/auth/Login';
import { Messages } from '../pages/messages/Messages';
import { GoogleOAuth2 } from '../pages/auth/GoogleOAuth2';
import { LinkedinOAuth2 } from '../pages/auth/LinkedinOAuth2';
import { GithubOAuth2 } from '../pages/auth/GithubOAuth2';
import { ProfileForm } from '../pages/auth/ProfileForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect } from 'react';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { saveSessionStorageState } from '../app/helpers/saveSessionStorageState';
import { UserActivation } from '../pages/auth/UserActivation';
import { onRefreshJWT } from '../app/auth/thunks';


export const AppRouter = () => {

    const { user, access, refresh } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        saveSessionStorageState({ user, access, refresh });
    }, [user, access, refresh]);

    useEffect(() => {
        if (refresh){
            dispatch(onRefreshJWT({
                refresh,
            }))
        }
    }, [refresh]);



    return (
        <Router>
            <Routes>
                <Route path='/for-you' element={ 
                    <PrivateRoute>
                        <ForYou />
                    </PrivateRoute>
                } />

                <Route path='/matches' element={ <Matches /> } />
                <Route path='/register' element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                } />
                <Route path='/login' element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route path='/messages' element={ <Messages /> } />

                <Route path='/auth/oauth2/google' element={ 
                    <PublicRoute>
                        <GoogleOAuth2 />
                    </PublicRoute>
                } />
                <Route path='/auth/oauth2/linkedin' element={ 
                    <PublicRoute>
                        <LinkedinOAuth2 />
                    </PublicRoute>
                } />
                <Route path='/auth/oauth2/github' element={ 
                    <PublicRoute>
                        <GithubOAuth2 />
                    </PublicRoute>
                } />

                <Route path='/register/activate/:uid/:token' element={ 
                    <PublicRoute>
                        <UserActivation />
                    </PublicRoute>
                } />

                <Route path='/profile' element={ <Profile /> } />

                <Route path='/profile/edit' element={ <ProfileEdit /> } />

                <Route path='/profile/form' element={ 
                    <PrivateRoute>
                        <ProfileForm />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    )
}